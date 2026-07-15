import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '~/db/client'
import { users } from '~/db/schema'
import { verifyPassword } from '~/lib/password'
// PENTING: hanya impor TIPE dari lib/session di level atas.
// Modul session.ts memakai `useSession` (khusus server); mengimpornya secara
// statis akan membuatnya bocor ke bundle client dan build ditolak
// (tanstack-start-core:import-protection). Karena itu useAppSession diambil
// lewat `await import(...)` DI DALAM handler server (kode ini tidak pernah ikut
// ke client).
import type { SessionUser } from '~/lib/session'
import type { Role } from '~/lib/roles'

const loginInput = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
})

/** Login: verifikasi email+password, lalu simpan user ke sesi. */
export const login = createServerFn({ method: 'POST' })
  .validator((i: unknown) => loginInput.parse(i))
  .handler(async ({ data }) => {
    const { useAppSession } = await import('~/lib/session')
    const db = await getDb()
    if (!db) {
      throw new Error('Database belum terhubung. Jalankan migrasi & seed D1 dulu.')
    }
    const email = data.email.trim().toLowerCase()
    const found = await db.select().from(users).where(eq(users.email, email)).limit(1)
    const row = found[0]
    if (!row || !(await verifyPassword(data.password, row.passwordHash))) {
      throw new Error('Email atau kata sandi salah.')
    }
    const user: SessionUser = {
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role as Role,
    }
    const session = await useAppSession()
    await session.update({ user })
    return { user }
  })

/** Logout: kosongkan sesi. */
export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  const { useAppSession } = await import('~/lib/session')
  const session = await useAppSession()
  await session.clear()
  return { ok: true }
})

/** Ambil user yang sedang login (atau null). Dipakai di beforeLoad & UI. */
export const getCurrentUser = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SessionUser | null> => {
    const { useAppSession } = await import('~/lib/session')
    const session = await useAppSession()
    return session.data.user ?? null
  },
)

// ---- Util internal (dipanggil DI DALAM handler server function lain) ----
// Penting: otorisasi WAJIB dicek di setiap handler yang menyentuh data privat,
// bukan hanya di route guard (beforeLoad). Keduanya memakai impor dinamis agar
// tidak menarik modul sesi ke client.

export async function requireUser(): Promise<SessionUser> {
  const { useAppSession } = await import('~/lib/session')
  const session = await useAppSession()
  const user = session.data.user
  if (!user) throw new Error('Anda harus login terlebih dahulu.')
  return user
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser()
  if (user.role !== 'admin') {
    throw new Error('Hanya administrator yang boleh melakukan tindakan ini.')
  }
  return user
}
