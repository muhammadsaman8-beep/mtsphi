import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { getCurrentUser, login } from '~/server/auth'

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'Masuk — Panel Madrasah' }] }),
  beforeLoad: async () => {
    const user = await getCurrentUser()
    if (user) throw redirect({ to: '/admin' })
  },
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login({ data: { email, password } })
      await navigate({ to: '/admin' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal masuk. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-[#08301f] to-brand-600 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-goldsoft text-2xl">🔐</div>
          <h1 className="text-2xl font-extrabold text-ink">Masuk Panel Madrasah</h1>
          <p className="mt-1 text-sm text-muted">Khusus admin, guru, dan staf.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 font-normal outline-none focus:border-brand"
              placeholder="nama@mtsalhidayatul.sch.id"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Kata Sandi
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 font-normal outline-none focus:border-brand"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? 'Memproses…' : 'Masuk'}
          </button>
        </form>

        <a href="/" className="mt-6 block text-center text-sm text-muted hover:text-brand">
          ← Kembali ke situs
        </a>
      </div>
    </div>
  )
}
