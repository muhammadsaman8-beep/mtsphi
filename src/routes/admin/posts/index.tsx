import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { adminListPosts, deletePost } from '~/server/admin-posts'
import { formatDateID } from '~/lib/format'

export const Route = createFileRoute('/admin/posts/')({
  loader: () => adminListPosts(),
  component: PostsList,
})

function PostsList() {
  const posts = Route.useLoaderData()
  const router = useRouter()
  const [busy, setBusy] = useState<number | null>(null)

  async function handleDelete(id: number, title: string) {
    if (!window.confirm(`Hapus artikel “${title}”? Tindakan ini tidak bisa dibatalkan.`)) return
    setBusy(id)
    try {
      await deletePost({ data: { id } })
      await router.invalidate()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Gagal menghapus artikel.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-ink">Kelola Artikel</h1>
        <Link
          to="/admin/posts/new"
          className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-600"
        >
          + Tulis Artikel
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-muted">
          Belum ada artikel. Klik “Tulis Artikel” untuk membuat yang pertama.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-soft text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Judul</th>
                <th className="px-4 py-3 font-semibold">Kategori</th>
                <th className="px-4 py-3 font-semibold">Penulis</th>
                <th className="px-4 py-3 font-semibold">Tanggal</th>
                <th className="px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="px-4 py-3 font-semibold text-ink">{p.title}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-goldsoft px-2.5 py-1 text-xs font-bold text-[#7a5f1c]">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.author}</td>
                  <td className="px-4 py-3 text-muted">{formatDateID(p.date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {p.canEdit ? (
                        <Link
                          to="/admin/posts/$id"
                          params={{ id: String(p.id) }}
                          className="rounded-lg border border-line px-3 py-1.5 font-semibold text-brand hover:bg-soft"
                        >
                          Edit
                        </Link>
                      ) : (
                        <span className="rounded-lg px-3 py-1.5 text-xs text-muted">Tidak ada akses</span>
                      )}
                      {p.canDelete && (
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          disabled={busy === p.id}
                          className="rounded-lg border border-red-200 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                        >
                          {busy === p.id ? '…' : 'Hapus'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
