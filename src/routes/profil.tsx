import { createFileRoute } from '@tanstack/react-router'
import { GuruSlider, type Guru } from '~/components/GuruSlider'

export const Route = createFileRoute('/profil')({
  head: () => ({ meta: [{ title: 'Profil — MTs Al Hidayatul Islamiyah' }] }),
  component: Profil,
})

const GURU: Guru[] = [
  { name: 'Ust Taufiq Rahman, S. Pd', role: 'Kepala Madrasah', photo: '/img/guru/guru-01.jpg' },
  { name: 'Ust. Arifin, S. Pd.I', role: 'Wakil Kepala Madrasah', photo: '/img/guru/guru-02.jpg' },
  { name: 'Ustdzah Anisah, S. Pd', role: 'Wakil Kepala Madrasah', photo: '/img/guru/guru-03.jpg' },
  { name: 'Ustdzah Nurhasanah, S. Pd.I', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-04.jpg' },
  { name: 'Nama Guru 5', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-05.jpg' },
  { name: 'Nama Guru 6', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-06.jpg' },
  { name: 'Nama Guru 7', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-07.jpg' },
  { name: 'Nama Guru 8', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-08.jpg' },
  { name: 'Nama Guru 9', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-09.jpg' },
  { name: 'Nama Guru 10', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-10.jpg' },
  { name: 'Nama Guru 11', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-11.jpg' },
  { name: 'Nama Guru 12', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-12.jpg' },
  { name: 'Nama Guru 13', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-13.jpg' },
  { name: 'Nama Guru 14', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-14.jpg' },
  { name: 'Nama Guru 15', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-15.jpg' },
  { name: 'Nama Guru 16', role: 'Guru Mata Pelajaran', photo: '/img/guru/guru-16.jpg' },
  { name: 'Nama Guru 17', role: 'Staf Tata Usaha', photo: '/img/guru/guru-17.jpg' },
]

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
      </section>

      {/* DEWAN GURU - GALERI SLIDER */}
      <section className="bg-soft py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-500">— Dewan Guru & Tenaga Kependidikan</span>
            <h2 className="mt-3 text-3xl font-extrabold">Guru Madrasah Kami</h2>
            <p className="mx-auto mt-2 max-w-[52ch] text-muted">
              Tim pendidik profesional yang membimbing siswa dengan ilmu dan akhlak mulia.
            </p>
          </div>
          <GuruSlider guru={GURU} />
          <p className="mt-4 text-center text-xs text-muted">Geser untuk melihat semua guru →</p>
        </div>
      </section>
    </>
  )
}
