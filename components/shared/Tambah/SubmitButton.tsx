import { Plus, Loader2 } from "lucide-react";
import { TabType } from "./types";

interface SubmitButtonProps {
  loading: boolean;
  activeTab: TabType;
}

export default function SubmitButton({ loading, activeTab }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
        loading
          ? "bg-slate-600 cursor-not-allowed"
          : activeTab === "pengeluaran"
          ? "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30"
          : activeTab === "tugas"
          ? "bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30"
          : activeTab === "hutang"
          ? "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30"
          : "bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg shadow-purple-500/30"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Menyimpan...
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          Simpan{" "}
          {activeTab === "pengeluaran"
            ? "Pengeluaran"
            : activeTab === "tugas"
            ? "Tugas"
            : activeTab === "hutang"
            ? "Hutang"
            : "Budget"}
        </>
      )}
    </button>
  );
}
