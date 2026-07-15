-- Akun awal untuk panel madrasah.
-- ============================================================
--  Admin default
--    Email     : admin@mtsalhidayatul.sch.id
--    Kata sandi: Admin#2026
--  >>> GANTI kata sandi ini setelah login pertama (lewat menu Pengguna,
--      atau buat admin baru lalu hapus yang ini). <<<
-- ============================================================
INSERT OR IGNORE INTO users (name, email, password_hash, role) VALUES
('Administrator', 'admin@mtsalhidayatul.sch.id', 'pbkdf2$100000$vmjwp+G/KsU6o7seC4bV6w==$7bE/x6fOX/fx72jDPI3FpOca2UiRoC0A+93UdwR72Uo=', 'admin');
