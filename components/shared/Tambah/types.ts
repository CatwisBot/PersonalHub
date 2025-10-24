export type TabType = "pengeluaran" | "tugas" | "hutang" | "budget";

export interface PengeluaranFormData {
  nama: string;
  jumlah: string;
  kategori: string;
  tanggal: string;
  keterangan: string;
}

export interface TugasFormData {
  nama: string;
  deskripsi: string;
  deadline: string;
}

export interface HutangFormData {
  nama: string;
  jumlah: string;
  jatuh_tempo: string;
  keterangan: string;
}

export interface BudgetFormData {
  bulan: number;
  tahun: number;
  total_budget: string;
  target_tabungan: string;
}
