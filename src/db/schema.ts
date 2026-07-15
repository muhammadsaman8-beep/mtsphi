import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// Tabel artikel blog kegiatan madrasah.
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  cover: text('cover').notNull(),
  category: text('category').notNull(),
  author: text('author').notNull(),
  date: text('date').notNull(), // ISO yyyy-mm-dd
  views: integer('views').notNull().default(0),
  // Disimpan sebagai JSON string; drizzle otomatis parse ke string[].
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})

export type PostRow = typeof posts.$inferSelect
export type NewPostRow = typeof posts.$inferInsert
