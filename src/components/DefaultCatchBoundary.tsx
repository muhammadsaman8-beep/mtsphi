import type { ErrorComponentProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand">Terjadi Kesalahan</h1>
      <p className="text-muted">{error?.message ?? 'Silakan coba lagi.'}</p>
      <Link to="/" className="rounded-full bg-brand px-6 py-3 font-semibold text-white">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
