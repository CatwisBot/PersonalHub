"use client";

import { HandCoins, Calendar, User, FileText } from "lucide-react";

interface HutangListProps {
  data: any[];
  onToggle: (id: string, lunas: boolean) => void;
}

export default function HutangList({ data, onToggle }: HutangListProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <HandCoins className="w-5 h-5 text-red-400" />
        Daftar Hutang
      </h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {data.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Belum ada hutang</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg p-4 border-2 ${
                item.lunas
                  ? "bg-slate-700/30 border-slate-600"
                  : "bg-red-500/20 border-red-500"
              } transition-all`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.lunas || false}
                  onChange={() => onToggle(item.id, item.lunas || false)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-2 focus:ring-green-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4
                      className={`font-semibold ${
                        item.lunas ? "text-gray-400 line-through" : "text-white"
                      }`}
                    >
                      {item.nama}
                    </h4>
                    <span
                      className={`font-bold ${
                        item.lunas ? "text-gray-400" : "text-red-400"
                      }`}
                    >
                      Rp {item.jumlah.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {item.kepada}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID")}
                    </span>
                    {item.lunas ? (
                      <span className="px-2 py-0.5 rounded bg-green-500/30 text-green-300">
                        Lunas
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-red-500/30 text-red-300">
                        Belum Lunas
                      </span>
                    )}
                  </div>
                  {item.keterangan && (
                    <div className="mt-2 flex items-start gap-1 text-sm text-gray-400">
                      <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>{item.keterangan}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
