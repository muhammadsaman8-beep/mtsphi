import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getPost } from '~/server/posts'
import { ArticleCard } from '~/components/ArticleCard'
import { formatDateID } from '~/lib/format'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const result = await getPost({ data: { slug: params.slug } })
    if (!result) throw notFound()
    return result
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.post.title ?? 'Artikel'} — MTs Al Hidayatul Islamiyah` }],
  }),
  component: PostDetail,
})

function PostDetail() {
  const { post, related } = Route.useLoaderData()

  return (
    <article>
      {/* Cover */}
      <div
        className="relative flex min-h-[360px] items-end overflow-hidden text-white"
        style={{ backgroundImage: `url('${post.cover}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#062a1b]/90 to-transparent" />
        <div className="relative mx-auto w-full max-w-3xl px-6 py-10">
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-[#3a2f10]">{post.category}</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-white/85">🗓 {formatDateID(post.date)} · ✍ {post.author} · 👁 {post.views}x</p>
        </div>
      </div>

      {/* Konten */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {post.content.split('\n\n').map((par, i) => (
          <p key={i} className="mb-4 text-[17px] leading-relaxed text-ink/90">{par}</p>
        ))}

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-soft px-3 py-1.5 text-[13px] text-muted">#{t}</span>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            Bagikan ke WhatsApp
          </a>
          <Link to="/blog" search={{}} className="...">Blog
            ← Kembali ke Blog
          </Link>
        </div>
      </div>

      {/* Artikel terkait */}
      {related.length > 0 && (
        <section className="bg-soft py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-2xl font-bold">Artikel Terkait</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
