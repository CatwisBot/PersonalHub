"use client";

import { Calendar, Tag, FileText, DollarSign, Trash2 } from "lucide-react";
import { deletePemasukan } from "@/lib/api";

interface PemasukanListProps {
  data: any[];
  onRefresh: () => void;
}

export default function PemasukanList({ data, onRefresh }: PemasukanListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pemasukan ini?")) return;

    try {
      await deletePemasukan(id);
      onRefresh();
    } catch (error) {
      console.error("Error deleting pemasukan:", error);
      alert("Gagal menghapus pemasukan");
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-green-400" />
        Pemasukan
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {data.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Belum ada pemasukan</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-green-500/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{item.nama}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold">
                    +Rp {item.jumlah.toLocaleString("id-ID")}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {item.kategori}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </span>
              </div>
              {item.keterangan && (
                <div className="mt-2 flex items-start gap-1 text-sm text-gray-400">
                  <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>{item.keterangan}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
