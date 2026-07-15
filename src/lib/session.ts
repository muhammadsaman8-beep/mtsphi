import { useSession } from '@tanstack/react-start/server'
import type { Role } from '~/lib/roles'

// Data yang disimpan di dalam cookie sesi terenkripsi.
export type SessionUser = {
  id: number
  name: string
  email: string
  role: Role
}

type SessionData = { user?: SessionUser }

// PENTING: rahasia sesi HARUS >= 32 karakter.
// Di produksi, set variabel `SESSION_SECRET` pada Worker
// (Dashboard > Worker > Settings > Variables, atau `wrangler secret put SESSION_SECRET`).
// Nilai dev di bawah hanya dipakai saat lokal bila SESSION_SECRET belum diset.
const DEV_SECRET = 'mts-alhidayatul-dev-session-secret-change-me'

async function getSessionSecret(): Promise<string> {
  try {
    const specifier = 'cloudflare:workers'
    const mod: any = await import(/* @vite-ignore */ specifier)
    const env = mod?.env ?? mod?.default?.env
    if (env?.SESSION_SECRET) return String(env.SESSION_SECRET)
  } catch {
    // bukan runtime Cloudflare (dev lokal)
  }
  const g = globalThis as any
  const fromGlobal =
    g?.SESSION_SECRET ?? g?.env?.SESSION_SECRET ?? g?.process?.env?.SESSION_SECRET
  const secret = fromGlobal ? String(fromGlobal) : DEV_SECRET
  // Jamin panjang minimal 32 karakter.
  return secret.length >= 32 ? secret : (secret + DEV_SECRET).slice(0, 48)
}

/** Sesi aplikasi (cookie HttpOnly terenkripsi). Panggil di dalam server function. */
export async function useAppSession() {
  const password = await getSessionSecret()
  return useSession<SessionData>({ name: 'mts-session', password })
}
