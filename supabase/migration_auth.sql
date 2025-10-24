-- =============================================
-- MIGRATION: ADD AUTHENTICATION & MULTI-USER SUPPORT
-- =============================================
-- Jalankan SQL ini di Supabase SQL Editor setelah schema.sql
-- Dashboard > SQL Editor > New Query
-- =============================================

-- 1. Buat tabel profiles untuk menyimpan data user
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tambah kolom user_id ke semua tabel existing
ALTER TABLE pengeluaran ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE pemasukan ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE tugas ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE hutang ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE budget_bulanan ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Tambah kolom kepada di tabel hutang
ALTER TABLE hutang ADD COLUMN IF NOT EXISTS kepada VARCHAR(255);

-- 4. Buat indexes untuk user_id
CREATE INDEX IF NOT EXISTS idx_pengeluaran_user_id ON pengeluaran(user_id);
CREATE INDEX IF NOT EXISTS idx_pemasukan_user_id ON pemasukan(user_id);
CREATE INDEX IF NOT EXISTS idx_tugas_user_id ON tugas(user_id);
CREATE INDEX IF NOT EXISTS idx_hutang_user_id ON hutang(user_id);
CREATE INDEX IF NOT EXISTS idx_budget_user_id ON budget_bulanan(user_id);

-- 5. Update UNIQUE constraint untuk budget_bulanan (sekarang per user)
ALTER TABLE budget_bulanan DROP CONSTRAINT IF EXISTS budget_bulanan_bulan_tahun_key;
ALTER TABLE budget_bulanan ADD CONSTRAINT budget_bulanan_user_bulan_tahun_key 
  UNIQUE(user_id, bulan, tahun);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS pada semua tabel
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengeluaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE pemasukan ENABLE ROW LEVEL SECURITY;
ALTER TABLE tugas ENABLE ROW LEVEL SECURITY;
ALTER TABLE hutang ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_bulanan ENABLE ROW LEVEL SECURITY;

-- Policies untuk profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies untuk pengeluaran
CREATE POLICY "Users can view own pengeluaran" ON pengeluaran
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pengeluaran" ON pengeluaran
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pengeluaran" ON pengeluaran
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pengeluaran" ON pengeluaran
  FOR DELETE USING (auth.uid() = user_id);

-- Policies untuk pemasukan
CREATE POLICY "Users can view own pemasukan" ON pemasukan
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pemasukan" ON pemasukan
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pemasukan" ON pemasukan
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pemasukan" ON pemasukan
  FOR DELETE USING (auth.uid() = user_id);

-- Policies untuk tugas
CREATE POLICY "Users can view own tugas" ON tugas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tugas" ON tugas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tugas" ON tugas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tugas" ON tugas
  FOR DELETE USING (auth.uid() = user_id);

-- Policies untuk hutang
CREATE POLICY "Users can view own hutang" ON hutang
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own hutang" ON hutang
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hutang" ON hutang
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own hutang" ON hutang
  FOR DELETE USING (auth.uid() = user_id);

-- Policies untuk budget_bulanan
CREATE POLICY "Users can view own budget" ON budget_bulanan
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own budget" ON budget_bulanan
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own budget" ON budget_bulanan
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own budget" ON budget_bulanan
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- TRIGGER: Auto-create profile on user signup
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nama, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nama', 'User'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger untuk auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger untuk update timestamp profiles
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- CATATAN PENTING
-- =============================================
-- 1. Data existing (yang sudah ada) tidak punya user_id, jadi akan invisible buat semua user
-- 2. Untuk assign data lama ke user tertentu, run manual update:
--    UPDATE pengeluaran SET user_id = 'USER_UUID_HERE' WHERE user_id IS NULL;
-- 3. Atau hapus semua data lama:
--    TRUNCATE pengeluaran, pemasukan, tugas, hutang, budget_bulanan CASCADE;
