import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { getCurrentUser, logout } from '~/server/auth'
import { ROLE_LABELS } from '~/lib/roles'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    // Route guard untuk UX. Otorisasi sebenarnya tetap dicek di tiap server function.
    const user = await getCurrentUser()
    if (!user) throw redirect({ to: '/login' })
    return { user }
  },
  loader: ({ context }) => ({ user: context.user }),
  component: AdminLayout,
})

function AdminLayout() {
  const { user } = Route.useLoaderData()
  const router = useRouter()

  async function handleLogout() {
    await logout()
    await router.navigate({ to: '/login' })
    await router.invalidate()
  }

  const navLink =
    'rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white'

  return (
    <div className="min-h-screen bg-soft">
      <header className="bg-gradient-to-r from-[#08301f] to-brand-600 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
          <span className="flex items-center gap-2 font-extrabold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-goldsoft text-base">🕌</span>
            Panel Madrasah
          </span>
          <nav className="flex items-center gap-1">
            <Link to="/admin" activeOptions={{ exact: true }} className={navLink}>
              Dashboard
            </Link>
            <Link to="/admin/posts" className={navLink}>
              Artikel
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin/users" className={navLink}>
                Pengguna
              </Link>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="hidden sm:inline">
              <b>{user.name}</b> · {ROLE_LABELS[user.role]}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-white/15 px-4 py-1.5 font-semibold transition hover:bg-white/25"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
