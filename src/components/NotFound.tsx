import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-5xl font-extrabold text-brand">404</h1>
      <p className="text-muted">Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="rounded-full bg-brand px-6 py-3 font-semibold text-white">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
