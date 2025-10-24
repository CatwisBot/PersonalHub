import { FileText, Clock, AlertCircle } from "lucide-react";
import { TugasFormData } from "./types";

interface TugasFormProps {
  formData: TugasFormData;
  onChange: (data: TugasFormData) => void;
  currentLevel: "mendesak" | "penting" | "normal";
}

export default function TugasForm({
  formData,
  onChange,
  currentLevel,
}: TugasFormProps) {
  return (
    <>
      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <FileText className="w-4 h-4 text-green-400" />
          Nama Tugas
        </label>
        <input
          type="text"
          value={formData.nama}
          onChange={(e) => onChange({ ...formData, nama: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder="Contoh: Buat laporan, Meeting dengan klien"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <FileText className="w-4 h-4 text-green-400" />
          Deskripsi (Opsional)
        </label>
        <textarea
          value={formData.deskripsi}
          onChange={(e) => onChange({ ...formData, deskripsi: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
          placeholder="Detail tugas yang perlu dikerjakan..."
          rows={3}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <Clock className="w-4 h-4 text-green-400" />
          Deadline
        </label>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => onChange({ ...formData, deadline: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Auto-calculated Level Display */}
      {formData.deadline && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">
                Level Prioritas (Otomatis):
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-lg font-medium ${
                currentLevel === "mendesak"
                  ? "bg-red-500/20 text-red-400 border border-red-500/50"
                  : currentLevel === "penting"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/50"
              }`}
            >
              {currentLevel === "mendesak" && "🔥 Mendesak (≤1 hari)"}
              {currentLevel === "penting" && "⚠️ Penting (≤3 hari)"}
              {currentLevel === "normal" && "📌 Normal (>3 hari)"}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Level ditentukan otomatis: Mendesak (1 hari), Penting (2-3 hari),
            Normal (≥4 hari)
          </p>
        </div>
      )}
    </>
  );
}
