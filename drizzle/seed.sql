-- Seed data artikel blog. Aman dijalankan ulang (INSERT OR IGNORE by slug).
-- Kolom `tags` disimpan sebagai JSON string. Paragraf dipisah dua newline
-- (char(10)||char(10)) agar cocok dengan content.split('\n\n') di UI.

INSERT OR IGNORE INTO posts (slug, title, excerpt, content, cover, category, author, date, views, tags) VALUES
('juara-umum-mtq-kabupaten-2026',
 'Juara Umum Lomba MTQ Tingkat Kabupaten 2026',
 'Kontingen MTs Al Hidayatul Islamiyah meraih juara umum setelah menyabet gelar di cabang tilawah, tahfizh, dan kaligrafi.',
 'Alhamdulillah, kontingen madrasah kembali menorehkan prestasi membanggakan pada ajang MTQ tingkat kabupaten tahun ini. Dari total 8 cabang yang diperlombakan, siswa-siswi kami berhasil menyabet gelar juara di cabang tilawah, tahfizh 5 juz, dan kaligrafi.' || char(10) || char(10) || 'Keberhasilan ini merupakan buah dari latihan rutin dan bimbingan intensif para pembina. Semoga menjadi motivasi untuk terus berprestasi.',
 '/img/prestasi.jpg', 'Prestasi', 'Tim Redaksi', '2026-07-02', 512, '["mtq","prestasi","tahfizh"]'),

('wisuda-tahfizh-angkatan-7',
 'Khataman & Wisuda Tahfizh Angkatan ke-7',
 'Sebanyak 45 siswa menyelesaikan target hafalan dalam acara khataman yang khidmat dan penuh haru.',
 'Acara khataman dan wisuda tahfizh angkatan ke-7 berlangsung khidmat di aula madrasah. Sebanyak 45 siswa diwisuda setelah menyelesaikan target hafalan mereka.' || char(10) || char(10) || 'Orang tua dan wali murid turut hadir menyaksikan momen membanggakan ini.',
 '/img/tahfidz.jpg', 'Keagamaan', 'Ust. Rahmat', '2026-07-12', 320, '["tahfizh","keagamaan"]'),

('praktikum-sains-kelas-8',
 'Praktikum Sains: Belajar Sambil Bereksperimen',
 'Siswa kelas VIII antusias mengikuti praktikum IPA di laboratorium madrasah.',
 'Pembelajaran IPA menjadi lebih hidup melalui praktikum langsung di laboratorium. Siswa kelas VIII belajar tentang reaksi kimia sederhana dengan penuh antusias.',
 '/img/sains.jpg', 'Kegiatan Belajar', 'Bu Aisyah', '2026-07-08', 210, '["sains","praktikum"]'),

('ppdb-2026-dibuka',
 'PPDB 2026/2027 Resmi Dibuka',
 'Pendaftaran peserta didik baru kini dapat dilakukan secara online melalui website.',
 'Penerimaan Peserta Didik Baru (PPDB) tahun ajaran 2026/2027 resmi dibuka. Calon siswa dapat mendaftar secara online melalui website madrasah.',
 '/img/hero.jpg', 'Pengumuman', 'Tim Redaksi', '2026-07-05', 640, '["ppdb","pengumuman"]'),

('perkemahan-pramuka',
 'Perkemahan Sabtu Minggu Pramuka',
 'Melatih kemandirian dan kerja sama melalui kegiatan kepramukaan yang seru.',
 'Kegiatan Perkemahan Sabtu Minggu (Persami) diikuti oleh seluruh anggota pramuka madrasah. Berbagai kegiatan seru melatih kemandirian dan kerja sama tim.',
 '/img/sains.jpg', 'Ekstrakurikuler', 'Kak Dinda', '2026-06-22', 180, '["pramuka","ekstrakurikuler"]'),

('tahun-baru-islam-1448',
 'Peringatan Tahun Baru Islam 1448 H',
 'Rangkaian kegiatan pawai dan lomba islami menyambut tahun baru Hijriah.',
 'Menyambut tahun baru Islam 1448 H, madrasah menggelar pawai dan berbagai lomba islami yang diikuti seluruh siswa dengan antusias.',
 '/img/tahfidz.jpg', 'Keagamaan', 'Ust. Rahmat', '2026-06-15', 240, '["keagamaan","kegiatan"]');
