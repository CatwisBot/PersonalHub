"use client";

import { CheckSquare, Calendar, FileText, AlertCircle } from "lucide-react";

interface TugasListProps {
  data: any[];
  onToggle: (id: string, selesai: boolean) => void;
}

export default function TugasList({ data, onToggle }: TugasListProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "mendesak":
        return "border-red-500 bg-red-500/20";
      case "penting":
        return "border-yellow-500 bg-yellow-500/20";
      default:
        return "border-green-500 bg-green-500/20";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "mendesak":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "penting":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <CheckSquare className="w-4 h-4 text-green-400" />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <CheckSquare className="w-5 h-5 text-green-400" />
        Daftar Tugas
      </h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {data.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Belum ada tugas</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg p-4 border-2 ${
                item.selesai ? "bg-slate-700/30 border-slate-600" : getLevelColor(item.level)
              } transition-all`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.selesai || false}
                  onChange={() => onToggle(item.id, item.selesai || false)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-2 focus:ring-green-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4
                      className={`font-semibold ${
                        item.selesai ? "text-gray-400 line-through" : "text-white"
                      }`}
                    >
                      {item.nama}
                    </h4>
                    {!item.selesai && getLevelIcon(item.level)}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Deadline: {new Date(item.deadline).toLocaleDateString("id-ID")}
                    </span>
                    {!item.selesai && (
                      <span
                        className={`px-2 py-0.5 rounded ${
                          item.level === "mendesak"
                            ? "bg-red-500/30 text-red-300"
                            : item.level === "penting"
                            ? "bg-yellow-500/30 text-yellow-300"
                            : "bg-green-500/30 text-green-300"
                        }`}
                      >
                        {item.level}
                      </span>
                    )}
                    {item.selesai && (
                      <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-300">
                        Selesai
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
