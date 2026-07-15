import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { getCurrentUser } from '~/server/auth'
import { createUser, deleteUser, listUsers, updateUserRole } from '~/server/users'
import { ROLES, ROLE_LABELS, type Role } from '~/lib/roles'
import { formatDateID } from '~/lib/format'

export const Route = createFileRoute('/admin/users/')({
  beforeLoad: async () => {
    const user = await getCurrentUser()
    if (!user) throw redirect({ to: '/login' })
    if (user.role !== 'admin') throw redirect({ to: '/admin' })
    return { user }
  },
  loader: () => listUsers(),
  component: UsersPage,
})

const inputCls = 'rounded-xl border border-line bg-white px-4 py-2.5 outline-none focus:border-brand'

function UsersPage() {
  const usersList = Route.useLoaderData()
  const { user: me } = Route.useRouteContext()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('guru')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onCreate(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await createUser({ data: { name, email, password, role } })
      setName('')
      setEmail('')
      setPassword('')
      setRole('guru')
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menambah pengguna.')
    } finally {
      setLoading(false)
    }
  }

  async function onDelete(id: number, nm: string) {
    if (!window.confirm(`Hapus pengguna “${nm}”?`)) return
    try {
      await deleteUser({ data: { id } })
      await router.invalidate()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Gagal menghapus pengguna.')
    }
  }

  async function onRoleChange(id: number, newRole: Role) {
    try {
      await updateUserRole({ data: { id, role: newRole } })
      await router.invalidate()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Gagal mengubah peran.')
    }
  }

  return (
    <div>
      <h1 className="mb-5 text-2xl font-extrabold text-ink">Kelola Pengguna</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-soft text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Peran</th>
                <th className="px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u.id} className="border-t border-line">
                  <td className="px-4 py-3 font-semibold text-ink">
                    {u.name}
                    {me?.id === u.id && <span className="ml-2 text-xs text-muted">(Anda)</span>}
                  </td>
                  <td className="px-4 py-3 text-muted">{u.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      disabled={me?.id === u.id}
                      onChange={(e) => onRoleChange(u.id, e.target.value as Role)}
                      className="rounded-lg border border-line bg-white px-2 py-1 disabled:opacity-60"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {me?.id !== u.id && (
                      <button
                        onClick={() => onDelete(u.id, u.name)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="mb-4 font-bold text-ink">Tambah Pengguna</h2>
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={onCreate} className="flex flex-col gap-3">
            <input className={inputCls} placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={inputCls} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className={inputCls} type="password" placeholder="Kata sandi (min. 6)" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <select className={inputCls} value={role} onChange={(e) => setRole(e.target.value as Role)}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-full bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
            >
              {loading ? 'Menyimpan…' : '+ Tambah Pengguna'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
