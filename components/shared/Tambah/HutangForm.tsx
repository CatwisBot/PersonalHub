import { FileText, DollarSign, Calendar } from "lucide-react";
import { HutangFormData } from "./types";

interface HutangFormProps {
  formData: HutangFormData;
  onChange: (data: HutangFormData) => void;
  formatRupiah: (angka: string) => string;
}

export default function HutangForm({
  formData,
  onChange,
  formatRupiah,
}: HutangFormProps) {
  return (
    <>
      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <FileText className="w-4 h-4 text-red-400" />
          Nama Hutang
        </label>
        <input
          type="text"
          value={formData.nama}
          onChange={(e) => onChange({ ...formData, nama: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="Contoh: Hutang ke Bank, Pinjaman pribadi"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <DollarSign className="w-4 h-4 text-red-400" />
          Jumlah Hutang
        </label>
        <input
          type="number"
          value={formData.jumlah}
          onChange={(e) => onChange({ ...formData, jumlah: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="1000000"
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
          <Calendar className="w-4 h-4 text-red-400" />
          Jatuh Tempo
        </label>
        <input
          type="date"
          value={formData.jatuh_tempo}
          onChange={(e) => onChange({ ...formData, jatuh_tempo: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <FileText className="w-4 h-4 text-red-400" />
          Keterangan (Opsional)
        </label>
        <textarea
          value={formData.keterangan}
          onChange={(e) => onChange({ ...formData, keterangan: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
          placeholder="Tambahkan catatan tentang hutang ini..."
          rows={3}
        />
      </div>
    </>
  );
}
