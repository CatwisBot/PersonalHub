import { FileText, DollarSign, Tag, Calendar } from "lucide-react";
import { PengeluaranFormData } from "./types";

interface PengeluaranFormProps {
  formData: PengeluaranFormData;
  onChange: (data: PengeluaranFormData) => void;
  formatRupiah: (angka: string) => string;
}

export default function PengeluaranForm({
  formData,
  onChange,
  formatRupiah,
}: PengeluaranFormProps) {
  return (
    <>
      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <FileText className="w-4 h-4 text-blue-400" />
          Nama Pengeluaran
        </label>
        <input
          type="text"
          value={formData.nama}
          onChange={(e) => onChange({ ...formData, nama: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Contoh: Makan siang, Transport, dll"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <DollarSign className="w-4 h-4 text-blue-400" />
          Jumlah
        </label>
        <input
          type="number"
          value={formData.jumlah}
          onChange={(e) => onChange({ ...formData, jumlah: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="50000"
          required
        />
        <p className="text-gray-500 text-sm mt-1">
          {formData.jumlah
            ? `Rp ${formatRupiah(formData.jumlah)}`
            : "Masukkan jumlah dalam Rupiah"}
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <Tag className="w-4 h-4 text-blue-400" />
          Kategori (Opsional)
        </label>
        <input
          type="text"
          value={formData.kategori}
          onChange={(e) => onChange({ ...formData, kategori: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Makanan, Transport, Hiburan, dll"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <Calendar className="w-4 h-4 text-blue-400" />
          Tanggal
        </label>
        <input
          type="date"
          value={formData.tanggal}
          onChange={(e) => onChange({ ...formData, tanggal: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <FileText className="w-4 h-4 text-blue-400" />
          Keterangan (Opsional)
        </label>
        <textarea
          value={formData.keterangan}
          onChange={(e) => onChange({ ...formData, keterangan: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="Tambahkan catatan jika diperlukan..."
          rows={3}
        />
      </div>
    </>
  );
}
