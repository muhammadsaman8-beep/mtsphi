import { createFileRoute, Link } from '@tanstack/react-router'
import { getPosts } from '~/server/posts'
import { ArticleCard } from '~/components/ArticleCard'

export const Route = createFileRoute('/')({
  loader: () => getPosts({ data: { page: 1 } }),
  component: Home,
})

const STATS = [
  { n: '480+', l: 'Siswa Aktif' },
  { n: '32', l: 'Guru & Tenaga Ahli' },
  { n: '18', l: 'Ekstrakurikuler' },
  { n: '75+', l: 'Prestasi Diraih' },
]

const PROGRAMS = [
  { i: '⚇', t: "Tahfizh Al-Qur'an", d: 'Program menghafal dengan bimbingan ustadz berpengalaman.' },
  { i: '⚙', t: 'Sains & Teknologi', d: 'Laboratorium modern & pembelajaran berbasis proyek.' },
  { i: '⚑', t: 'Bahasa Arab & Inggris', d: 'Penguatan dua bahasa untuk komunikasi global.' },
  { i: '♫', t: 'Seni & Kaligrafi', d: 'Wadah kreativitas melalui seni Islami & budaya.' },
  { i: '⚽', t: 'Olahraga & Pramuka', d: 'Membangun kedisiplinan & jiwa kepemimpinan.' },
  { i: '❤', t: 'Kepedulian Sosial', d: 'Kegiatan bakti sosial untuk menumbuhkan empati.' },
]

function Home() {
  const { items } = Route.useLoaderData()
  const latest = items.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062a1b]/95 via-[#08301f]/70 to-[#08301f]/20" />
        <div className="pattern-islamic absolute inset-0 opacity-[0.14]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
          <span className="text-sm font-bold uppercase tracking-widest text-white">
            — Membina Generasi Qur'ani & Berprestasi
          </span>
          <h1 className="mt-4 max-w-[16ch] text-4xl font-extrabold leading-tight md:text-5xl">
            Madrasah Tsanawiyah Al Hidayatul Islamiyah
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg text-white/90">
            Pendidikan berbasis nilai Islam yang memadukan keunggulan akademik,
            akhlak mulia, dan pengembangan bakat siswa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a href="#ppdb" className="rounded-full bg-gold px-5 py-3 font-semibold text-[#3a2f10]">
              Daftar PPDB 2026/2027 →
            </a>
            <Link to="/profil" className="rounded-full border border-white/35 bg-white/10 px-5 py-3 font-semibold text-white">
              Jelajahi Profil
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto -mt-11 max-w-6xl px-6">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white shadow md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className="border-line p-7 text-center md:[&:not(:last-child)]:border-r">
              <b className="block text-3xl font-extrabold text-brand">{s.n}</b>
              <span className="text-sm text-muted">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SAMBUTAN */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-2">
        <div
          className="aspect-[4/3] rounded-2xl bg-soft bg-cover bg-center shadow"
          style={{ backgroundImage: "url('/img/tahfidz.jpg')" }}
        />
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-brand-500">— Sambutan Kepala Madrasah</span>
          <h2 className="mt-3 text-3xl font-extrabold">Selamat Datang di Rumah Ilmu & Akhlak</h2>
          <p className="mt-4 text-muted">
            Kami berkomitmen mencetak generasi yang beriman, berilmu, dan
            berakhlak karimah melalui kurikulum terpadu antara ilmu agama dan
            ilmu umum.
          </p>
          <blockquote className="my-5 border-l-[3px] border-gold pl-4 italic">
            “Didiklah anak-anakmu sesuai dengan zamannya.”
          </blockquote>
          <p className="font-bold text-brand">— H. Ahmad Fauzi, S.Pd.I., M.Pd. · Kepala Madrasah</p>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="bg-soft py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-11 max-w-xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-500">Program Unggulan</span>
            <h2 className="mt-3 text-3xl font-extrabold">Membentuk Karakter & Kompetensi</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div key={p.t} className="rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:shadow">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-goldsoft text-2xl text-brand">{p.i}</div>
                <h3 className="mb-2 text-lg font-semibold">{p.t}</h3>
                <p className="text-sm text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG TERBARU */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-11 max-w-xl">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-500">Blog Kegiatan Terbaru</span>
          <h2 className="mt-3 text-3xl font-extrabold">Kabar & Kegiatan Madrasah</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-11 flex justify-center">
          <Link to="/blog" className="rounded-full border border-line bg-white px-6 py-3 font-semibold text-brand">
            Lihat Semua Kegiatan
          </Link>
        </div>
      </section>

      {/* CTA PPDB */}
      <section id="ppdb" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-600 p-14 text-center text-white">
          <div className="pattern-islamic absolute inset-0 opacity-[0.12]" />
          <h2 className="relative text-3xl font-extrabold">Bergabung Bersama Kami</h2>
          <p className="relative mx-auto mt-3.5 max-w-[52ch] text-white/90">
            Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027 telah dibuka.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3.5">
            <a href="#" className="rounded-full bg-gold px-6 py-3 font-semibold text-[#3a2f10]">Daftar Sekarang</a>
            <Link to="/kontak" className="rounded-full border border-white/35 bg-white/10 px-6 py-3 font-semibold text-white">Hubungi via WhatsApp</Link>
          </div>
        </div>
      </section>
    </>
  )
}
