export type Category =
  | 'Keagamaan'
  | 'Kegiatan Belajar'
  | 'Ekstrakurikuler'
  | 'Prestasi'
  | 'Pengumuman'

export const CATEGORIES: Category[] = [
  'Keagamaan',
  'Kegiatan Belajar',
  'Ekstrakurikuler',
  'Prestasi',
  'Pengumuman',
]

export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string
  cover: string
  category: Category
  author: string
  date: string // ISO
  views: number
  tags: string[]
}

// Data contoh (mock). Ganti dengan Drizzle + database saat produksi.
export const POSTS: Post[] = [
  {
    slug: 'juara-umum-mtq-kabupaten-2026',
    title: 'Juara Umum Lomba MTQ Tingkat Kabupaten 2026',
    excerpt:
      'Kontingen MTs Al Hidayatul Islamiyah meraih juara umum setelah menyabet gelar di cabang tilawah, tahfizh, dan kaligrafi.',
    content:
      'Alhamdulillah, kontingen madrasah kembali menorehkan prestasi membanggakan pada ajang MTQ tingkat kabupaten tahun ini. Dari total 8 cabang yang diperlombakan, siswa-siswi kami berhasil menyabet gelar juara di cabang tilawah, tahfizh 5 juz, dan kaligrafi.\n\nKeberhasilan ini merupakan buah dari latihan rutin dan bimbingan intensif para pembina. Semoga menjadi motivasi untuk terus berprestasi.',
    cover: '/img/prestasi.jpg',
    category: 'Prestasi',
    author: 'Tim Redaksi',
    date: '2026-07-02',
    views: 512,
    tags: ['mtq', 'prestasi', 'tahfizh'],
  },
  {
    slug: 'wisuda-tahfizh-angkatan-7',
    title: 'Khataman & Wisuda Tahfizh Angkatan ke-7',
    excerpt:
      'Sebanyak 45 siswa menyelesaikan target hafalan dalam acara khataman yang khidmat dan penuh haru.',
    content:
      'Acara khataman dan wisuda tahfizh angkatan ke-7 berlangsung khidmat di aula madrasah. Sebanyak 45 siswa diwisuda setelah menyelesaikan target hafalan mereka.\n\nOrang tua dan wali murid turut hadir menyaksikan momen membanggakan ini.',
    cover: '/img/tahfidz.jpg',
    category: 'Keagamaan',
    author: 'Ust. Rahmat',
    date: '2026-07-12',
    views: 320,
    tags: ['tahfizh', 'keagamaan'],
  },
  {
    slug: 'praktikum-sains-kelas-8',
    title: 'Praktikum Sains: Belajar Sambil Bereksperimen',
    excerpt:
      'Siswa kelas VIII antusias mengikuti praktikum IPA di laboratorium madrasah.',
    content:
      'Pembelajaran IPA menjadi lebih hidup melalui praktikum langsung di laboratorium. Siswa kelas VIII belajar tentang reaksi kimia sederhana dengan penuh antusias.',
    cover: '/img/sains.jpg',
    category: 'Kegiatan Belajar',
    author: 'Bu Aisyah',
    date: '2026-07-08',
    views: 210,
    tags: ['sains', 'praktikum'],
  },
  {
    slug: 'ppdb-2026-dibuka',
    title: 'PPDB 2026/2027 Resmi Dibuka',
    excerpt:
      'Pendaftaran peserta didik baru kini dapat dilakukan secara online melalui website.',
    content:
      'Penerimaan Peserta Didik Baru (PPDB) tahun ajaran 2026/2027 resmi dibuka. Calon siswa dapat mendaftar secara online melalui website madrasah.',
    cover: '/img/hero.jpg',
    category: 'Pengumuman',
    author: 'Tim Redaksi',
    date: '2026-07-05',
    views: 640,
    tags: ['ppdb', 'pengumuman'],
  },
  {
    slug: 'perkemahan-pramuka',
    title: 'Perkemahan Sabtu Minggu Pramuka',
    excerpt:
      'Melatih kemandirian dan kerja sama melalui kegiatan kepramukaan yang seru.',
    content:
      'Kegiatan Perkemahan Sabtu Minggu (Persami) diikuti oleh seluruh anggota pramuka madrasah. Berbagai kegiatan seru melatih kemandirian dan kerja sama tim.',
    cover: '/img/sains.jpg',
    category: 'Ekstrakurikuler',
    author: 'Kak Dinda',
    date: '2026-06-22',
    views: 180,
    tags: ['pramuka', 'ekstrakurikuler'],
  },
  {
    slug: 'tahun-baru-islam-1448',
    title: 'Peringatan Tahun Baru Islam 1448 H',
    excerpt:
      'Rangkaian kegiatan pawai dan lomba islami menyambut tahun baru Hijriah.',
    content:
      'Menyambut tahun baru Islam 1448 H, madrasah menggelar pawai dan berbagai lomba islami yang diikuti seluruh siswa dengan antusias.',
    cover: '/img/tahfidz.jpg',
    category: 'Keagamaan',
    author: 'Ust. Rahmat',
    date: '2026-06-15',
    views: 240,
    tags: ['keagamaan', 'kegiatan'],
  },
]
