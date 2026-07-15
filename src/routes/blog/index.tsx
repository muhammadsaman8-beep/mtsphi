import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { getPosts } from '~/server/posts'
import { ArticleCard } from '~/components/ArticleCard'
import { CATEGORIES } from '~/data/posts'
import { formatDateID } from '~/lib/format'

const searchSchema = z.object({
  kategori: z.string().optional(),
  q: z.string().optional(),
  page: z.number().int().positive().catch(1),
})

export const Route = createFileRoute('/blog/')({
  head: () => ({ meta: [{ title: 'Blog Kegiatan — MTs Al Hidayatul Islamiyah' }] }),
  // Filter blog disimpan di URL (type-safe search params)
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getPosts({ data: deps }),
  component: BlogPage,
})

function BlogPage() {
  const { items, page, pageCount, categories, popular } = Route.useLoaderData()
  const search = Route.useSearch()
  const featured = items[0]
  const rest = items.slice(1)

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#08301f] to-brand-600 px-6 py-16 text-white">
        <div className="pattern-islamic absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm text-white/70">Beranda / <b className="text-white">Blog Kegiatan</b></p>
          <h1 className="mt-3 text-4xl font-extrabold">Blog Kegiatan Madrasah</h1>
          <p className="mt-3 max-w-[56ch] text-white/90">
            Dokumentasi kegiatan belajar, keagamaan, ekstrakurikuler, dan prestasi siswa.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-11">
        {/* Filter kategori (mengubah URL search params) */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          <FilterChip label="Semua" active={!search.kategori} to={{ kategori: undefined }} />
          {CATEGORIES.map((c) => (
            <FilterChip key={c} label={c} active={search.kategori === c} to={{ kategori: c }} />
          ))}
        </div>

        {/* Featured */}
        {featured && (
          <div className="mb-11 grid overflow-hidden rounded-3xl border border-line bg-white shadow md:grid-cols-[1.25fr_1fr]">
            <div className="min-h-[300px] bg-cover bg-center" style={{ backgroundImage: `url('${featured.cover}')` }} />
            <div className="p-9">
              <span className="rounded-full bg-goldsoft px-3 py-1 text-xs font-bold text-[#7a5f1c]">★ Sorotan · {featured.category}</span>
              <h2 className="mt-3.5 text-2xl font-bold leading-snug">{featured.title}</h2>
              <p className="mt-3.5 text-muted">{featured.excerpt}</p>
              <p className="mt-4 text-[13px] text-muted">🗓 {formatDateID(featured.date)} · ✍ {featured.author}</p>
              <Link to="/blog/$slug" params={{ slug: featured.slug }} className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 font-semibold text-white">
                Baca Selengkapnya →
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Grid artikel */}
          <div>
            {rest.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-muted">Belum ada artikel lain untuk filter ini.</p>
            )}

            {/* Pagination */}
            <div className="mt-11 flex justify-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => {
                const p = i + 1
                return (
                  <Link
                    key={p}
                    to="/blog"
                    search={(prev) => ({ ...prev, page: p })}
                    className={`grid h-10 w-10 place-items-center rounded-xl border font-semibold ${
                      p === page ? 'border-brand bg-brand text-white' : 'border-line bg-white text-muted'
                    }`}
                  >
                    {p}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h4 className="mb-4 border-b border-line pb-3 font-semibold">Kategori</h4>
              <ul className="flex flex-col gap-1.5">
                {categories.map((c) => (
                  <li key={c.name}>
                    <Link to="/blog" search={{ kategori: c.name, page: 1 }} className="flex items-center justify-between py-1.5 text-[15px] text-muted hover:text-brand">
                      <span>{c.name}</span>
                      <span className="rounded-full bg-soft px-2.5 text-xs font-bold text-brand">{c.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <h4 className="mb-4 border-b border-line pb-3 font-semibold">Artikel Populer</h4>
              {popular.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="flex gap-3 border-b border-line py-2.5 last:border-0">
                  <span className="h-14 w-16 flex-none rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${p.cover}')` }} />
                  <span>
                    <span className="text-xs text-muted">{formatDateID(p.date)}</span>
                    <b className="mt-1 block text-sm leading-snug">{p.title}</b>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function FilterChip({
  label,
  active,
  to,
}: {
  label: string
  active: boolean
  to: { kategori: string | undefined }
}) {
  return (
    <Link
      to="/blog"
      search={{ kategori: to.kategori, page: 1 }}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-muted hover:text-brand'
      }`}
    >
      {label}
    </Link>
  )
}
