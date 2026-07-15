import { createFileRoute, Link } from '@tanstack/react-router'
import { adminListPosts } from '~/server/admin-posts'
import { getCurrentUser } from '~/server/auth'
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from '~/lib/roles'

export const Route = createFileRoute('/admin/')({
  loader: async () => {
    const [user, posts] = await Promise.all([getCurrentUser(), adminListPosts()])
    return { user, posts }
  },
  component: Dashboard,
})

function Dashboard() {
  const { user, posts } = Route.useLoaderData()
  const mine = posts.filter((p) => p.authorId != null && p.authorId === user?.id).length

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">
        Selamat datang, {user?.name} 👋
      </h1>
      <p className="mt-1 text-muted">
        Peran Anda: <b className="text-brand">{user ? ROLE_LABELS[user.role] : '-'}</b> —{' '}
        {user ? ROLE_DESCRIPTIONS[user.role] : ''}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-sm text-muted">Total Artikel</p>
          <p className="mt-1 text-3xl font-extrabold text-ink">{posts.length}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-sm text-muted">Artikel Saya</p>
          <p className="mt-1 text-3xl font-extrabold text-ink">{mine}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-sm text-muted">Total Dilihat</p>
          <p className="mt-1 text-3xl font-extrabold text-ink">
            {posts.reduce((sum, p) => sum + p.views, 0)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/admin/posts/new"
          className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-600"
        >
          + Tulis Artikel
        </Link>
        <Link
          to="/admin/posts"
          className="rounded-full border border-line bg-white px-5 py-2.5 font-semibold text-brand"
        >
          Kelola Artikel
        </Link>
        {user?.role === 'admin' && (
          <Link
            to="/admin/users"
            className="rounded-full border border-line bg-white px-5 py-2.5 font-semibold text-brand"
          >
            Kelola Pengguna
          </Link>
        )}
      </div>
    </div>
  )
}
