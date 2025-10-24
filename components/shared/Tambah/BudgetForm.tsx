import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import { BudgetFormData } from "./types";

interface BudgetFormProps {
  formData: BudgetFormData;
  onChange: (data: BudgetFormData) => void;
  formatRupiah: (angka: string) => string;
}

export default function BudgetForm({
  formData,
  onChange,
  formatRupiah,
}: BudgetFormProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-white font-medium mb-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            Bulan
          </label>
          <select
            value={formData.bulan}
            onChange={(e) =>
              onChange({ ...formData, bulan: Number(e.target.value) })
            }
            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            {[
              "Januari",
              "Februari",
              "Maret",
              "April",
              "Mei",
              "Juni",
              "Juli",
              "Agustus",
              "September",
              "Oktober",
              "November",
              "Desember",
            ].map((bulan, idx) => (
              <option key={idx} value={idx + 1}>
                {bulan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-white font-medium mb-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            Tahun
          </label>
          <input
            type="number"
            value={formData.tahun}
            onChange={(e) =>
              onChange({ ...formData, tahun: Number(e.target.value) })
            }
            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            min="2020"
            max="2100"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <DollarSign className="w-4 h-4 text-purple-400" />
          Total Budget Bulanan
        </label>
        <input
          type="number"
          value={formData.total_budget}
          onChange={(e) =>
            onChange({ ...formData, total_budget: e.target.value })
          }
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="5000000"
          required
        />
        <p className="text-gray-500 text-sm mt-1">
          {formData.total_budget
            ? `Rp ${formatRupiah(formData.total_budget)}`
            : "Masukkan total budget dalam Rupiah"}
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          Target Tabungan (Opsional)
        </label>
        <input
          type="number"
          value={formData.target_tabungan}
          onChange={(e) =>
            onChange({ ...formData, target_tabungan: e.target.value })
          }
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="3000000"
        />
        <p className="text-gray-500 text-sm mt-1">
          {formData.target_tabungan
            ? `Rp ${formatRupiah(formData.target_tabungan)}`
            : "Target tabungan yang ingin dicapai"}
        </p>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
        <p className="text-purple-300 text-sm">
          💡 <strong>Tips:</strong> Budget ini akan digunakan untuk menghitung
          sisa budget dan persentase pengeluaran di dashboard.
        </p>
      </div>
    </>
  );
}
