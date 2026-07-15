import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="bg-[#08301f] px-6 pt-14 pb-7 text-white/70">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-9 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-500 text-lg text-white">
                ✥
              </span>
              <b className="text-white">MTs Al Hidayatul Islamiyah</b>
            </div>
            <p className="text-sm">
              Membina generasi Qur'ani, berilmu, dan berakhlak mulia sejak 1998.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[15px] text-white">Menu</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/" className="hover:text-gold">Beranda</Link></li>
              <li><Link to="/profil" className="hover:text-gold">Profil</Link></li>
              <li><Link to="/blog" search={{ page: 1 }} className="hover:text-gold">Blog Kegiatan</Link></li>
              <li><Link to="/kontak" className="hover:text-gold">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[15px] text-white">Layanan</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>PPDB Online</li>
              <li>Prestasi</li>
              <li>Ekstrakurikuler</li>
              <li>Download</li>
              <li><Link to="/login" className="hover:text-gold">Login Staf/Guru</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[15px] text-white">Kontak</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Jl. Pendidikan No. 12</li>
              <li>Telp: (0812) 3456-7890</li>
              <li>info@mtsalhidayah.sch.id</li>
              <li>Sen–Jum · 07.00–15.00</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-6 text-[13px]">
          <span>© {new Date().getFullYear()} MTs Al Hidayatul Islamiyah. Hak cipta dilindungi.</span>
          <span>Dibuat dengan ♥ · TanStack Start</span>
        </div>
      </div>
    </footer>
  )
}
