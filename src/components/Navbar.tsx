import { Link } from '@tanstack/react-router'

const MENU = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil' },
  { to: '/blog', label: 'Blog Kegiatan' },
  { to: '/kontak', label: 'Kontak' },
] as const

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex h-[74px] max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/img/logo.webp"
            alt="Logo MTs Al Hidayatul Islamiyah"
            className="h-11 w-11 rounded-xl object-contain shadow"
          />
          <span className="leading-tight">
            <b className="block text-sm">MTs Al Hidayatul Islamiyah</b>
            <span className="text-xs text-muted">Terakreditasi C · NPSN 10508155 NSM 121215060001</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 text-[15px] font-medium md:flex">
          {MENU.map((m) => (
            <li key={m.to}>
              <Link
                to={m.to}
                className="py-1.5 text-ink transition hover:text-brand"
                activeProps={{ className: 'text-brand font-semibold' }}
                activeOptions={{ exact: m.to === '/' }}
              >
                {m.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Login Panel
          </a>
        </div>
      </nav>
    </header>
  )
}
