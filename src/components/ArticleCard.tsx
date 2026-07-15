import { Link } from '@tanstack/react-router'
import type { Post } from '~/data/posts'
import { formatDateID } from '~/lib/format'

export function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="relative block">
        <div
          className="aspect-[16/10] bg-soft bg-cover bg-center"
          style={{ backgroundImage: `url('${post.cover}')` }}
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-brand/90 px-3 py-1 text-xs font-bold text-white">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex items-center gap-2.5 text-[13px] text-muted">
          <span>🗓 {formatDateID(post.date)}</span>
          <span>· ✍ {post.author}</span>
        </div>
        <h3 className="mb-2.5 text-[19px] font-semibold leading-snug">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm text-muted">{post.excerpt}</p>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="mt-4 text-sm font-bold text-brand"
        >
          Baca selengkapnya →
        </Link>
      </div>
    </article>
  )
}
