import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq, like, ne, or, sql } from 'drizzle-orm'
import { z } from 'zod'
import { POSTS, CATEGORIES, type Category, type Post } from '~/data/posts'
import { getDb } from '~/db/client'
import { posts as postsTable, type PostRow } from '~/db/schema'

const listInput = z.object({
  kategori: z.string().optional(),
  q: z.string().optional(),
  page: z.number().int().positive().catch(1),
})

const PAGE_SIZE = 6

export type PostListResult = {
  items: Post[]
  total: number
  page: number
  pageCount: number
  categories: { name: string; count: number }[]
  popular: Post[]
}

function rowToPost(r: PostRow): Post {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    cover: r.cover,
    category: r.category as Category,
    author: r.author,
    date: r.date,
    views: r.views,
    tags: r.tags ?? [],
  }
}

// ---------- Fallback data mock (dipakai saat D1 belum tersedia) ----------
function listFromMock(input: z.infer<typeof listInput>): PostListResult {
  const { kategori, q, page } = input
  let items = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))
  if (kategori) items = items.filter((p) => p.category === kategori)
  if (q) {
    const term = q.toLowerCase()
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.tags.some((t) => t.includes(term)),
    )
  }
  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const paged = items.slice(start, start + PAGE_SIZE)
  const categories = CATEGORIES.map((name) => ({
    name,
    count: POSTS.filter((p) => p.category === name).length,
  }))
  const popular = [...POSTS].sort((a, b) => b.views - a.views).slice(0, 3)
  return { items: paged, total, page, pageCount, categories, popular }
}

/**
 * Server function: daftar artikel + filter kategori, pencarian, pagination.
 * Membaca dari Cloudflare D1 bila binding tersedia, jika tidak memakai mock.
 */
export const getPosts = createServerFn({ method: 'GET' })
  .validator((input: unknown) => listInput.parse(input))
  .handler(async ({ data }): Promise<PostListResult> => {
    const { kategori, q, page } = data
    const db = await getDb()
    if (!db) return listFromMock(data)

    const where = and(
      kategori ? eq(postsTable.category, kategori) : undefined,
      q
        ? or(
            like(postsTable.title, `%${q}%`),
            like(postsTable.excerpt, `%${q}%`),
            like(postsTable.tags, `%${q.toLowerCase()}%`),
          )
        : undefined,
    )

    const filtered = await db
      .select()
      .from(postsTable)
      .where(where)
      .orderBy(desc(postsTable.date))

    const total = filtered.length
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
    const start = (page - 1) * PAGE_SIZE
    const items = filtered.slice(start, start + PAGE_SIZE).map(rowToPost)

    const catRows = await db
      .select({ name: postsTable.category, count: sql<number>`count(*)` })
      .from(postsTable)
      .groupBy(postsTable.category)
    const catMap = new Map(catRows.map((r) => [r.name, Number(r.count)]))
    const categories = CATEGORIES.map((name) => ({
      name,
      count: catMap.get(name) ?? 0,
    }))

    const popularRows = await db
      .select()
      .from(postsTable)
      .orderBy(desc(postsTable.views))
      .limit(3)
    const popular = popularRows.map(rowToPost)

    return { items, total, page, pageCount, categories, popular }
  })

const slugInput = z.object({ slug: z.string() })

/** Server function: satu artikel berdasarkan slug + artikel terkait. */
export const getPost = createServerFn({ method: 'GET' })
  .validator((input: unknown) => slugInput.parse(input))
  .handler(async ({ data }) => {
    const db = await getDb()
    if (!db) {
      const post = POSTS.find((p) => p.slug === data.slug)
      if (!post) return null
      const related = POSTS.filter(
        (p) => p.category === post.category && p.slug !== post.slug,
      ).slice(0, 3)
      return { post, related }
    }

    const found = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.slug, data.slug))
      .limit(1)
    const row = found[0]
    if (!row) return null

    const relatedRows = await db
      .select()
      .from(postsTable)
      .where(and(eq(postsTable.category, row.category), ne(postsTable.slug, row.slug)))
      .limit(3)

    return { post: rowToPost(row), related: relatedRows.map(rowToPost) }
  })
