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
  // Relasi opsional ke users.id (penulis). Null untuk artikel seed lama.
  authorId: integer('author_id'),
  date: text('date').notNull(), // ISO yyyy-mm-dd
  views: integer('views').notNull().default(0),
  // Disimpan sebagai JSON string; drizzle otomatis parse ke string[].
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})

export type PostRow = typeof posts.$inferSelect
export type NewPostRow = typeof posts.$inferInsert

// Tabel pengguna untuk login berbasis peran (admin / guru / staf).
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('staf'), // 'admin' | 'guru' | 'staf'
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})

export type UserRow = typeof users.$inferSelect
export type NewUserRow = typeof users.$inferInsert
