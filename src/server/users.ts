import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '~/db/client'
import { users } from '~/db/schema'
import { hashPassword } from '~/lib/password'
import { requireAdmin } from '~/server/auth'
import type { Role } from '~/lib/roles'

const roleEnum = z.enum(['admin', 'guru', 'staf'])

export type UserRow = {
  id: number
  name: string
  email: string
  role: Role
  createdAt: string
}

/** Daftar semua pengguna (admin saja). */
export const listUsers = createServerFn({ method: 'GET' }).handler(
  async (): Promise<UserRow[]> => {
    await requireAdmin()
    const db = await getDb()
    if (!db) return []
    const rows = await db.select().from(users).orderBy(desc(users.createdAt))
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: r.role as Role,
      createdAt: r.createdAt,
    }))
  },
)

const createInput = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
  role: roleEnum,
})

/** Tambah pengguna baru (admin saja). */
export const createUser = createServerFn({ method: 'POST' })
  .validator((i: unknown) => createInput.parse(i))
  .handler(async ({ data }) => {
    await requireAdmin()
    const db = await getDb()
    if (!db) throw new Error('Database belum terhubung.')
    const email = data.email.trim().toLowerCase()
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existing[0]) throw new Error('Email sudah terdaftar.')
    const passwordHash = await hashPassword(data.password)
    await db.insert(users).values({
      name: data.name.trim(),
      email,
      passwordHash,
      role: data.role,
    })
    return { ok: true }
  })

const idInput = z.object({ id: z.number().int().positive() })

/** Hapus pengguna (admin saja, tidak boleh menghapus diri sendiri). */
export const deleteUser = createServerFn({ method: 'POST' })
  .validator((i: unknown) => idInput.parse(i))
  .handler(async ({ data }) => {
    const admin = await requireAdmin()
    if (admin.id === data.id) throw new Error('Tidak bisa menghapus akun Anda sendiri.')
    const db = await getDb()
    if (!db) throw new Error('Database belum terhubung.')
    await db.delete(users).where(eq(users.id, data.id))
    return { ok: true }
  })

const roleInput = z.object({ id: z.number().int().positive(), role: roleEnum })

/** Ubah peran pengguna (admin saja). */
export const updateUserRole = createServerFn({ method: 'POST' })
  .validator((i: unknown) => roleInput.parse(i))
  .handler(async ({ data }) => {
    await requireAdmin()
    const db = await getDb()
    if (!db) throw new Error('Database belum terhubung.')
    await db.update(users).set({ role: data.role }).where(eq(users.id, data.id))
    return { ok: true }
  })
