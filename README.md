# MTs Al Hidayatul Islamiyah — Website (TanStack Start + Cloudflare)

Website madrasah: **Profil** + **Blog Kegiatan**, dibangun dengan **TanStack**
(Start, Router, Query) + **Tailwind CSS v4**, siap deploy ke
**Cloudflare Pages** dengan database **Cloudflare D1** (via **Drizzle ORM**).

## ✨ Fitur

- **Beranda** — hero, statistik, sambutan, program unggulan, blog terbaru, CTA PPDB
- **Blog Kegiatan** — daftar artikel, **filter kategori & pagination via URL**, featured, sidebar (kategori + populer)
- **Detail Artikel** (`/blog/$slug`) — konten, tag, tombol bagikan, artikel terkait
- **Profil** & **Kontak** (form + tombol WhatsApp)
- **Server Functions** (`createServerFn`) membaca dari **D1**, dengan fallback ke data mock saat dev lokal
- Type-safe end-to-end (TypeScript + Zod + Drizzle)

## 🚀 Menjalankan (lokal)

```bash
npm install
npm run dev          # http://localhost:3000
```

> Saat `npm run dev`, binding D1 belum ada, jadi data diambil dari mock
> (`src/data/posts.ts`). Ini normal — UI tetap berjalan penuh. File
> `src/routeTree.gen.ts` dibuat otomatis pada run pertama.

## ☁️ Deploy ke Cloudflare Pages + D1

### 1. Login & buat database D1

```bash
npx wrangler login
npx wrangler d1 create mts-alhidayatul-db
```

Salin `database_id` yang muncul ke **`wrangler.toml`** (ganti
`REPLACE_WITH_YOUR_DATABASE_ID`).

### 2. Terapkan skema + seed data

```bash
# Lokal (untuk diuji dengan preview:cf)
npm run db:migrate:local
npm run db:seed:local

# Produksi (remote D1)
npm run db:migrate
npm run db:seed
```

> Migrasi awal sudah disediakan di `drizzle/migrations/0000_init.sql`.
> Jika mengubah `src/db/schema.ts` di kemudian hari, jalankan
> `npm run db:generate` untuk membuat migrasi baru.

### 3. Uji D1 secara lokal (opsional)

```bash
npm run preview:cf   # build + wrangler pages dev (D1 lokal aktif)
```

### 4. Deploy

```bash
npm run deploy       # build + wrangler pages deploy
```

Saat pertama deploy, Pages akan membuat project. Pastikan binding **D1**
bernama `DB` terpasang di project (via `wrangler.toml` atau dashboard
Pages → Settings → Functions → D1 bindings).

## 🗄 Arsitektur data

| Bagian | File |
|--------|------|
| Skema tabel | `src/db/schema.ts` |
| Akses binding D1 | `src/db/client.ts` (`getDb()`) |
| Query artikel | `src/server/posts.ts` (`getPosts`, `getPost`) |
| Migrasi SQL | `drizzle/migrations/` |
| Seed data | `drizzle/seed.sql` |
| Data mock (dev) | `src/data/posts.ts` |

Server function memanggil `getDb()`. Bila D1 ada → query Drizzle; bila tidak
(dev lokal) → pakai mock. Jadi UI tak pernah rusak walau DB belum siap.

> Catatan versi: cara mengambil binding di `src/db/client.ts` memakai
> `getEvent()` dari `@tanstack/react-start/server` (context Nitro/Cloudflare).
> Bila versi TanStack Start berbeda, sesuaikan sumber binding di file itu
> saja — sisa aplikasi tidak perlu berubah.

## 🖼 Gambar

Letakkan foto asli madrasah di `public/img/`:
`hero.jpg`, `tahfidz.jpg`, `sains.jpg`, `prestasi.jpg`.

## 📁 Struktur

```
src/
├─ router.tsx · styles.css
├─ routes/  __root, index, profil, kontak, blog/index, blog/$slug
├─ components/  Navbar, Footer, ArticleCard, NotFound, DefaultCatchBoundary
├─ server/posts.ts     # server functions (D1 + fallback mock)
├─ db/schema.ts        # skema Drizzle
├─ db/client.ts        # akses binding D1
├─ data/posts.ts       # data mock
└─ lib/format.ts
drizzle/
├─ migrations/0000_init.sql
└─ seed.sql
wrangler.toml · drizzle.config.ts
```

## 🧰 Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router (file-based, search params type-safe) |
| Data | Server Functions + TanStack Query |
| Database | Cloudflare D1 + Drizzle ORM |
| Hosting | Cloudflare Pages |
| Styling | Tailwind CSS v4 |
| Validasi | Zod |

Dibuat dengan ♥ untuk MTs Al Hidayatul Islamiyah.
