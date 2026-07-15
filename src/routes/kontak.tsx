import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/kontak')({
  head: () => ({ meta: [{ title: 'Kontak — MTs Al Hidayatul Islamiyah' }] }),
  component: Kontak,
})

function Kontak() {
  const wa = import.meta.env.VITE_WHATSAPP ?? '6281234567890'
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-r from-[#08301f] to-brand-600 px-6 py-16 text-white">
        <div className="pattern-islamic absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm text-white/70">Beranda / <b className="text-white">Kontak</b></p>
          <h1 className="mt-3 text-4xl font-extrabold">Hubungi Kami</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-brand">Informasi Kontak</h2>
          <ul className="mt-4 flex flex-col gap-3 text-muted">
            <li>📍 Jl. Pendidikan No. 12</li>
            <li>☎ (0812) 3456-7890</li>
            <li>✉ info@mtsalhidayah.sch.id</li>
            <li>🕒 Senin–Jumat · 07.00–15.00</li>
          </ul>
          <a
            href={`https://wa.me/${wa}?text=${encodeURIComponent("Assalamu'alaikum, saya ingin bertanya seputar madrasah.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 font-semibold text-white"
          >
            Chat via WhatsApp
          </a>
        </div>
        <form className="rounded-2xl border border-line bg-white p-6" onSubmit={(e) => e.preventDefault()}>
          <h2 className="mb-4 text-xl font-bold">Kirim Pesan</h2>
          <input className="mb-3 w-full rounded-xl border border-line px-4 py-3" placeholder="Nama" />
          <input className="mb-3 w-full rounded-xl border border-line px-4 py-3" placeholder="Email" type="email" />
          <textarea className="mb-3 h-28 w-full rounded-xl border border-line px-4 py-3" placeholder="Pesan" />
          <button className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white">Kirim</button>
        </form>
      </section>
    </>
  )
}
