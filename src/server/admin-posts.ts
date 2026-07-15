import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { getDb, type DB } from '~/db/client'
import { posts as postsTable } from '~/db/schema'
import { CATEGORIES } from '~/data/posts'
import { requireUser } from '~/server/auth'

export type AdminPost = {
  id: number
  slug: string
  title: string
  category: string
  author: string
  authorId: number | null
  date: string
  views: number
  canEdit: boolean
  canDelete: boolean
}

function slugify(input: string): string {
  const s = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
  return s || 'artikel'
}

function parseTags(s: string): string[] {
  return s
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

async function uniqueSlug(db: DB, base: string, ignoreId?: number): Promise<string> {
  let slug = base
  let n = 1
  while (true) {
    const found = await db.select().from(postsTable).where(eq(postsTable.slug, slug)).limit(1)
    const row = found[0]
    if (!row || row.id === ignoreId) return slug
    n += 1
    slug = `${base}-${n}`
  }
}

/** Daftar artikel untuk panel admin, lengkap dengan flag hak akses per baris. */
export const adminListPosts = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminPost[]> => {
    const user = await requireUser()
    const db = await getDb()
    if (!db) return []
    const rows = await db.select().from(postsTable).orderBy(desc(postsTable.date))
    return rows.map((r) => {
      const isOwner = r.authorId != null && r.authorId === user.id
      return {
        id: r.id,
        slug: r.slug,
        title: r.title,
        category: r.category,
        author: r.author,
        authorId: r.authorId ?? null,
        date: r.date,
        views: r.views,
        canEdit: user.role === 'admin' || isOwner,
        canDelete: user.role === 'admin' || (user.role === 'guru' && isOwner),
      }
    })
  },
)

const idInput = z.object({ id: z.number().int().positive() })

/** Ambil satu artikel untuk form edit (dengan cek kepemilikan). */
export const getPostById = createServerFn({ method: 'GET' })
  .validator((i: unknown) => idInput.parse(i))
  .handler(async ({ data }) => {
    const user = await requireUser()
    const db = await getDb()
    if (!db) throw new Error('Database belum terhubung.')
    const found = await db.select().from(postsTable).where(eq(postsTable.id, data.id)).limit(1)
    const row = found[0]
    if (!row) throw new Error('Artikel tidak ditemukan.')
    const isOwner = row.authorId != null && row.authorId === user.id
    if (user.role !== 'admin' && !isOwner) {
      throw new Error('Anda tidak punya akses ke artikel ini.')
    }
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      cover: row.cover,
      category: row.category,
      author: row.author,
      date: row.date,
      tags: (row.tags ?? []).join(', '),
    }
  })

const postInput = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  excerpt: z.string().min(1, 'Ringkasan wajib diisi'),
  content: z.string().min(1, 'Isi artikel wajib diisi'),
  cover: z.string().min(1, 'URL gambar sampul wajib diisi'),
  category: z.enum(CATEGORIES as unknown as [string, ...string[]]),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  tags: z.string().optional().default(''),
})

/** Buat artikel baru. Penulis diambil dari sesi. */
export const createPost = createServerFn({ method: 'POST' })
  .validator((i: unknown) => postInput.parse(i))
  .handler(async ({ data }) => {
    const user = await requireUser()
    const db = await getDb()
    if (!db) throw new Error('Database belum terhubung.')
    const slug = await uniqueSlug(db, slugify(data.title))
    await db.insert(postsTable).values({
      slug,
      title: data.title.trim(),
      excerpt: data.excerpt.trim(),
      content: data.content,
      cover: data.cover.trim(),
      category: data.category,
      author: user.name,
      authorId: user.id,
      date: data.date,
      views: 0,
      tags: parseTags(data.tags ?? ''),
    })
    return { ok: true, slug }
  })

const updateInput = postInput.extend({ id: z.number().int().positive() })

/** Ubah artikel (admin: semua; guru/staf: miliknya sendiri). */
export const updatePost = createServerFn({ method: 'POST' })
  .validator((i: unknown) => updateInput.parse(i))
  .handler(async ({ data }) => {
    const user = await requireUser()
    const db = await getDb()
    if (!db) throw new Error('Database belum terhubung.')
    const found = await db.select().from(postsTable).where(eq(postsTable.id, data.id)).limit(1)
    const row = found[0]
    if (!row) throw new Error('Artikel tidak ditemukan.')
    const isOwner = row.authorId != null && row.authorId === user.id
    if (user.role !== 'admin' && !isOwner) {
      throw new Error('Anda tidak boleh mengubah artikel ini.')
    }
    const slug = await uniqueSlug(db, slugify(data.title), data.id)
    await db
      .update(postsTable)
      .set({
        slug,
        title: data.title.trim(),
        excerpt: data.excerpt.trim(),
        content: data.content,
        cover: data.cover.trim(),
        category: data.category,
        date: data.date,
        tags: parseTags(data.tags ?? ''),
      })
      .where(eq(postsTable.id, data.id))
    return { ok: true, slug }
  })

/** Hapus artikel (admin: semua; guru: miliknya; staf: tidak boleh). */
export const deletePost = createServerFn({ method: 'POST' })
  .validator((i: unknown) => idInput.parse(i))
  .handler(async ({ data }) => {
    const user = await requireUser()
    const db = await getDb()
    if (!db) throw new Error('Database belum terhubung.')
    const found = await db.select().from(postsTable).where(eq(postsTable.id, data.id)).limit(1)
    const row = found[0]
    if (!row) throw new Error('Artikel tidak ditemukan.')
    const isOwner = row.authorId != null && row.authorId === user.id
    const allowed = user.role === 'admin' || (user.role === 'guru' && isOwner)
    if (!allowed) throw new Error('Anda tidak boleh menghapus artikel ini.')
    await db.delete(postsTable).where(eq(postsTable.id, data.id))
    return { ok: true }
  })
