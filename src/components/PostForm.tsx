import { useState, type FormEvent } from 'react'
import { CATEGORIES } from '~/data/posts'

export type PostFormValues = {
  title: string
  excerpt: string
  content: string
  cover: string
  category: string
  date: string
  tags: string
}

const inputCls =
  'rounded-xl border border-line bg-white px-4 py-2.5 outline-none focus:border-brand'
const labelCls = 'flex flex-col gap-1.5 text-sm font-semibold text-ink'

export function PostForm({
  initial,
  heading,
  submitLabel,
  onSubmit,
}: {
  initial: PostFormValues
  heading: string
  submitLabel: string
  onSubmit: (values: PostFormValues) => Promise<void>
}) {
  const [values, setValues] = useState<PostFormValues>(initial)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function set<K extends keyof PostFormValues>(key: K, value: string) {
    setValues((s) => ({ ...s, [key]: value }))
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await onSubmit(values)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan artikel.')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-5 text-2xl font-extrabold text-ink">{heading}</h1>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6">
        <label className={labelCls}>
          Judul
          <input className={inputCls} value={values.title} onChange={(e) => set('title', e.target.value)} required />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Kategori
            <select className={inputCls} value={values.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className={labelCls}>
            Tanggal
            <input type="date" className={inputCls} value={values.date} onChange={(e) => set('date', e.target.value)} required />
          </label>
        </div>

        <label className={labelCls}>
          URL Gambar Sampul
          <input className={inputCls} value={values.cover} onChange={(e) => set('cover', e.target.value)} placeholder="https://…" required />
        </label>

        <label className={labelCls}>
          Ringkasan
          <textarea className={inputCls} rows={2} value={values.excerpt} onChange={(e) => set('excerpt', e.target.value)} required />
        </label>

        <label className={labelCls}>
          Isi Artikel
          <textarea
            className={`${inputCls} font-normal`}
            rows={12}
            value={values.content}
            onChange={(e) => set('content', e.target.value)}
            placeholder="Tulis isi artikel di sini. Pisahkan antar-paragraf dengan satu baris kosong."
            required
          />
        </label>

        <label className={labelCls}>
          Tag (pisahkan dengan koma)
          <input className={inputCls} value={values.tags} onChange={(e) => set('tags', e.target.value)} placeholder="tahfizh, prestasi" />
        </label>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? 'Menyimpan…' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}
