-- =============================================
-- PERSONAL HUB DATABASE SCHEMA
-- =============================================
-- Jalankan SQL ini di Supabase SQL Editor
-- Dashboard > SQL Editor > New Query
-- =============================================

-- 1. Tabel Pengeluaran (Expenses)
CREATE TABLE IF NOT EXISTS pengeluaran (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jumlah DECIMAL(15, 2) NOT NULL,
  kategori VARCHAR(100),
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabel Pemasukan (Income)
CREATE TABLE IF NOT EXISTS pemasukan (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jumlah DECIMAL(15, 2) NOT NULL,
  kategori VARCHAR(100),
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Tabel Tugas (Tasks)
CREATE TABLE IF NOT EXISTS tugas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  level VARCHAR(50) NOT NULL CHECK (level IN ('mendesak', 'penting', 'normal')),
  deadline DATE NOT NULL,
  selesai BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Tabel Hutang (Debts)
CREATE TABLE IF NOT EXISTS hutang (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jumlah DECIMAL(15, 2) NOT NULL,
  jatuh_tempo DATE NOT NULL,
  lunas BOOLEAN DEFAULT FALSE,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Tabel Budget Bulanan (Monthly Budget)
CREATE TABLE IF NOT EXISTS budget_bulanan (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bulan INTEGER NOT NULL CHECK (bulan BETWEEN 1 AND 12),
  tahun INTEGER NOT NULL,
  total_budget DECIMAL(15, 2) NOT NULL,
  target_tabungan DECIMAL(15, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(bulan, tahun)
);

-- =============================================
-- INDEXES untuk performa lebih baik
-- =============================================

CREATE INDEX idx_pengeluaran_tanggal ON pengeluaran(tanggal DESC);
CREATE INDEX idx_pengeluaran_kategori ON pengeluaran(kategori);
CREATE INDEX idx_pemasukan_tanggal ON pemasukan(tanggal DESC);
CREATE INDEX idx_pemasukan_kategori ON pemasukan(kategori);
CREATE INDEX idx_tugas_deadline ON tugas(deadline);
CREATE INDEX idx_tugas_selesai ON tugas(selesai);
CREATE INDEX idx_tugas_level ON tugas(level);
CREATE INDEX idx_hutang_jatuh_tempo ON hutang(jatuh_tempo);
CREATE INDEX idx_hutang_lunas ON hutang(lunas);
CREATE INDEX idx_budget_bulan_tahun ON budget_bulanan(bulan, tahun);

-- =============================================
-- TRIGGERS untuk auto-update timestamp
-- =============================================

-- Function untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger untuk pengeluaran
CREATE TRIGGER update_pengeluaran_updated_at BEFORE UPDATE ON pengeluaran
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk pemasukan
CREATE TRIGGER update_pemasukan_updated_at BEFORE UPDATE ON pemasukan
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk tugas
CREATE TRIGGER update_tugas_updated_at BEFORE UPDATE ON tugas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk hutang
CREATE TRIGGER update_hutang_updated_at BEFORE UPDATE ON hutang
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk budget_bulanan
CREATE TRIGGER update_budget_bulanan_updated_at BEFORE UPDATE ON budget_bulanan
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
-- Uncomment jika ingin mengaktifkan RLS untuk multi-user
-- Untuk saat ini, semua user bisa akses semua data

-- ALTER TABLE pengeluaran ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tugas ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE hutang ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE budget_bulanan ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Enable all access for authenticated users" ON pengeluaran
--     FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Enable all access for authenticated users" ON tugas
--     FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Enable all access for authenticated users" ON hutang
--     FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Enable all access for authenticated users" ON budget_bulanan
--     FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- SAMPLE DATA (Optional - untuk testing)
-- =============================================

-- Insert Budget Bulanan untuk Oktober 2025
INSERT INTO budget_bulanan (bulan, tahun, total_budget, target_tabungan)
VALUES (10, 2025, 5000000, 3000000)
ON CONFLICT (bulan, tahun) DO NOTHING;

-- Insert Sample Pengeluaran
INSERT INTO pengeluaran (nama, jumlah, kategori, tanggal, keterangan) VALUES
('Belanja Bulanan', 1500000, 'Kebutuhan', '2025-10-10', 'Belanja bulanan di supermarket'),
('Listrik', 500000, 'Utilitas', '2025-10-12', 'Tagihan listrik bulan Oktober'),
('Internet', 300000, 'Utilitas', '2025-10-15', 'Tagihan internet bulanan'),
('Bensin', 200000, 'Transportasi', '2025-10-18', 'Isi bensin minggu ini')
ON CONFLICT DO NOTHING;

-- Insert Sample Pemasukan
INSERT INTO pemasukan (nama, jumlah, kategori, tanggal, keterangan) VALUES
('Gaji Bulanan', 8000000, 'Gaji', '2025-10-01', 'Gaji bulan Oktober'),
('Freelance Project', 2000000, 'Freelance', '2025-10-15', 'Project website untuk klien'),
('Bonus', 1000000, 'Bonus', '2025-10-20', 'Bonus performa')
ON CONFLICT DO NOTHING;

-- Insert Sample Tugas
INSERT INTO tugas (nama, deskripsi, level, deadline, selesai) VALUES
('Selesaikan Laporan Keuangan', 'Buat laporan keuangan bulan Oktober', 'mendesak', '2025-10-20', false),
('Review Code Project', 'Review code untuk fitur baru', 'penting', '2025-10-22', false),
('Update Documentation', 'Update dokumentasi API', 'normal', '2025-10-25', false),
('Meeting dengan Tim', 'Meeting bulanan dengan tim', 'penting', '2025-10-21', false),
('Backup Database', 'Backup semua database', 'normal', '2025-10-30', false)
ON CONFLICT DO NOTHING;

-- Insert Sample Hutang
INSERT INTO hutang (nama, jumlah, jatuh_tempo, lunas, keterangan) VALUES
('Budi', 500000, '2025-11-01', false, 'Pinjaman untuk modal usaha'),
('Siti', 300000, '2025-11-05', false, 'Pinjaman darurat'),
('Andi', 200000, '2025-11-10', false, 'Pinjaman untuk renovasi')
ON CONFLICT DO NOTHING;
