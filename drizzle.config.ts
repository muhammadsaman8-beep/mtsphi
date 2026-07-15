import { defineConfig } from 'drizzle-kit'

// Digunakan oleh `npm run db:generate` untuk membuat file migrasi SQL
// dari skema di src/db/schema.ts. Migrasi diterapkan ke D1 lewat wrangler
// (lihat script db:migrate / db:migrate:local).
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
})
