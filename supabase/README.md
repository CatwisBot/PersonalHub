# 🚀 Setup Supabase untuk PersonalHub

Ikuti langkah-langkah berikut untuk menghubungkan aplikasi PersonalHub dengan Supabase.

## 📋 Langkah 1: Buat Project Supabase

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Klik **"New Project"**
3. Isi informasi project:
   - **Name**: PersonalHub (atau nama yang Anda inginkan)
   - **Database Password**: Buat password yang kuat dan simpan
   - **Region**: Pilih region terdekat (misalnya: Southeast Asia - Singapore)
4. Klik **"Create new project"** dan tunggu beberapa menit

## 📋 Langkah 2: Jalankan SQL Schema

1. Di Supabase Dashboard, buka **SQL Editor** (menu sebelah kiri)
2. Klik **"New Query"**
3. Copy seluruh isi file `supabase/schema.sql` dari project ini
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Pastikan tidak ada error - Anda akan melihat pesan sukses

## 📋 Langkah 3: Dapatkan API Keys

1. Di Supabase Dashboard, buka **Settings** > **API**
2. Copy **Project URL** dan **anon/public key**
3. Buka file `.env.local` di root project
4. Ganti nilai dengan credentials Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 📋 Langkah 4: Test Koneksi

1. Restart development server:
```bash
npm run dev
```

2. Buka browser dan akses `http://localhost:3000`
3. Data seharusnya muncul dari Supabase (sample data yang sudah diinsert)

## 🗄️ Struktur Database

### Tabel yang dibuat:

1. **pengeluaran** - Menyimpan data pengeluaran
   - id, nama, jumlah, kategori, tanggal, keterangan

2. **tugas** - Menyimpan data tugas/tasks
   - id, nama, deskripsi, level (mendesak/penting/normal), deadline, selesai

3. **hutang** - Menyimpan data hutang
   - id, nama, jumlah, jatuh_tempo, lunas, keterangan

4. **budget_bulanan** - Menyimpan budget per bulan
   - id, bulan, tahun, total_budget, target_tabungan

## 🔧 API Functions Yang Tersedia

File `lib/api.ts` menyediakan fungsi-fungsi siap pakai:

### Pengeluaran
- `getPengeluaran(bulan?, tahun?)` - Get all expenses
- `getTotalPengeluaran(bulan, tahun)` - Get total expenses
- `getPengeluaranTerbaru(limit)` - Get recent expenses
- `addPengeluaran(data)` - Add new expense

### Tugas
- `getTugas(selesaiOnly?)` - Get all tasks
- `getTugasBelumSelesai(limit?)` - Get incomplete tasks
- `countTugasBelumSelesai()` - Count incomplete tasks
- `addTugas(data)` - Add new task
- `updateTugas(id, updates)` - Update task

### Hutang
- `getHutang(lunasOnly?)` - Get all debts
- `getHutangBelumLunas(limit?)` - Get unpaid debts
- `countHutangJatuhTempoMingguIni()` - Count debts due this week
- `getTotalNilaiHutang()` - Get total debt amount
- `addHutang(data)` - Add new debt
- `updateHutang(id, updates)` - Update debt

### Budget
- `getBudgetBulanan(bulan, tahun)` - Get monthly budget
- `getCurrentMonthBudget()` - Get current month budget
- `setBudgetBulanan(data)` - Set/update monthly budget

### Dashboard
- `getDashboardData()` - Get all dashboard data at once

## 📊 Melihat Data di Supabase

1. Buka **Table Editor** di Supabase Dashboard
2. Pilih tabel yang ingin dilihat (pengeluaran, tugas, hutang, budget_bulanan)
3. Anda bisa menambah, edit, atau hapus data langsung dari sini

## 🔐 Security (Optional)

Saat ini, semua user bisa akses semua data. Jika ingin mengaktifkan Row Level Security (RLS):

1. Uncomment bagian RLS di `schema.sql`
2. Jalankan kembali SQL tersebut
3. Setup authentication di Supabase
4. Update policies sesuai kebutuhan

## ❓ Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan file `.env.local` sudah dibuat dan terisi dengan benar
- Restart development server setelah menambah environment variables

### Error: "relation does not exist"
- Pastikan SQL schema sudah dijalankan dengan benar di Supabase
- Check di Table Editor apakah tabel sudah terbuat

### Data tidak muncul
- Check console browser untuk error messages
- Pastikan sample data sudah diinsert (bagian akhir schema.sql)
- Check Network tab di browser DevTools untuk melihat request/response

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
