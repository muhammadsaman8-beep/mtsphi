import { drizzle } from 'drizzle-orm/d1'
import { getEvent } from '@tanstack/react-start/server'
import * as schema from './schema'

export type DB = ReturnType<typeof drizzle<typeof schema>>

/**
 * Mengambil binding D1 ("DB") dari runtime Cloudflare.
 *
 * Di produksi (Cloudflare Pages), Nitro mengekspos binding lewat context
 * event. Saat `npm run dev` (Vite biasa) binding TIDAK ada, sehingga fungsi
 * ini mengembalikan undefined dan server function akan memakai data mock.
 * Untuk menguji D1 secara lokal, gunakan `npm run preview:cf`.
 */
export function getD1(): D1Database | undefined {
  // 1) Jalur utama: context event Nitro/Cloudflare.
  try {
    const event = getEvent() as { context?: any } | undefined
    const env = event?.context?.cloudflare?.env
    if (env?.DB) return env.DB as D1Database
  } catch {
    // abaikan — fallback di bawah
  }

  // 2) Fallback: beberapa runtime menaruh binding di globalThis.
  const g = globalThis as any
  if (g?.DB) return g.DB as D1Database
  if (g?.__env__?.DB) return g.__env__.DB as D1Database
  return undefined
}

/** Instance Drizzle bila D1 tersedia, atau null bila tidak (dev lokal). */
export function getDb(): DB | null {
  const d1 = getD1()
  return d1 ? drizzle(d1, { schema }) : null
}
