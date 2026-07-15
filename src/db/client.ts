import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export type DB = ReturnType<typeof drizzle<typeof schema>>

/**
 * Mengambil binding D1 ("DB") dari runtime Cloudflare.
 *
 * Catatan versi: `getEvent()` dari `@tanstack/react-start/server` sudah
 * DIHAPUS di TanStack Start terbaru. Cara yang benar untuk mengakses binding
 * di Cloudflare Workers/Pages sekarang adalah lewat modul runtime
 * `cloudflare:workers` yang mengekspor `env`.
 *
 * - Di produksi (Cloudflare): `import('cloudflare:workers')` berhasil dan
 *   `env.DB` berisi binding D1.
 * - Saat `npm run dev` (Node/Vite): modul itu tidak ada, import gagal dan
 *   ditangkap oleh try/catch, sehingga fungsi mengembalikan undefined dan
 *   server function memakai data mock. Untuk uji D1 lokal: `npm run preview:cf`.
 */
async function resolveD1(): Promise<D1Database | undefined> {
  // 1) Jalur utama: modul runtime Cloudflare.
  //    Specifier disimpan di variabel + \`@vite-ignore\` agar Vite/Rollup tidak
  //    mencoba mem-bundle modul virtual ini saat build.
  try {
    const specifier = 'cloudflare:workers'
    const mod: any = await import(/* @vite-ignore */ specifier)
    const env = mod?.env ?? mod?.default?.env
    if (env?.DB) return env.DB as D1Database
  } catch {
    // bukan runtime Cloudflare (mis. dev lokal) — lanjut ke fallback
  }

  // 2) Fallback: beberapa runtime menaruh binding di globalThis.
  const g = globalThis as any
  if (g?.DB) return g.DB as D1Database
  if (g?.env?.DB) return g.env.DB as D1Database
  if (g?.__env__?.DB) return g.__env__.DB as D1Database
  return undefined
}

/** Instance Drizzle bila D1 tersedia, atau null bila tidak (dev lokal). */
export async function getDb(): Promise<DB | null> {
  const d1 = await resolveD1()
  return d1 ? drizzle(d1, { schema }) : null
}
