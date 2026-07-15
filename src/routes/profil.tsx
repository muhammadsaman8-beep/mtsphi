import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profil')({
  head: () => ({ meta: [{ title: 'Profil — MTs Al Hidayatul Islamiyah' }] }),
  component: Profil,
})

function Profil() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-r from-[#08301f] to-brand-600 px-6 py-16 text-white">
        <div className="pattern-islamic absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm text-white/70">Beranda / <b className="text-white">Profil</b></p>
          <h1 className="mt-3 text-4xl font-extrabold">Profil Madrasah</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold text-brand">Sejarah Singkat</h2>
        <p className="mt-3 text-muted">
          MTs Al Hidayatul Islamiyah berdiri sejak 1998 dengan misi membina
          generasi Qur'ani yang berilmu dan berakhlak mulia. (Ganti dengan narasi
          sejarah madrasah Anda.)
        </p>

        <h2 className="mt-10 text-2xl font-bold text-brand">Visi & Misi</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="mb-2 font-semibold">Visi</h3>
            <p className="text-sm text-muted">Terwujudnya generasi beriman, berilmu, dan berakhlak karimah.</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="mb-2 font-semibold">Misi</h3>
            <ul className="list-disc pl-5 text-sm text-muted">
              <li>Menyelenggarakan pendidikan Islam terpadu.</li>
              <li>Mengembangkan bakat & potensi siswa.</li>
              <li>Membangun karakter & akhlak mulia.</li>
            </ul>
          </div>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-brand">Akreditasi & Legalitas</h2>
        <p className="mt-3 text-muted">Terakreditasi A · NPSN 12345678. (Sesuaikan data resmi madrasah.)</p>
      </section>
    </>
  )
}
