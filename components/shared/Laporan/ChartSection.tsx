"use client";

import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

interface ChartSectionProps {
  pengeluaran: any[];
  pemasukan: any[];
  totalPemasukan: number;
  totalPengeluaran: number;
}

export default function ChartSection({
  pengeluaran,
  pemasukan,
  totalPemasukan,
  totalPengeluaran,
}: ChartSectionProps) {
  // Group by category
  const pengeluaranByKategori = pengeluaran.reduce((acc: any, item) => {
    acc[item.kategori] = (acc[item.kategori] || 0) + item.jumlah;
    return acc;
  }, {});

  const pemasukanByKategori = pemasukan.reduce((acc: any, item) => {
    acc[item.kategori] = (acc[item.kategori] || 0) + item.jumlah;
    return acc;
  }, {});

  const topPengeluaran = Object.entries(pengeluaranByKategori)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 5);

  const topPemasukan = Object.entries(pemasukanByKategori)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 5);

  const maxValue = Math.max(
    ...topPengeluaran.map(([, val]) => val as number),
    ...topPemasukan.map(([, val]) => val as number),
    1
  );

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-400" />
        Grafik Keuangan
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pengeluaran Chart */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            Top 5 Pengeluaran per Kategori
          </h4>
          <div className="space-y-3">
            {topPengeluaran.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">Tidak ada data</p>
            ) : (
              topPengeluaran.map(([kategori, jumlah]) => (
                <div key={kategori}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{kategori}</span>
                    <span className="text-red-400 font-semibold">
                      Rp {(jumlah as number).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${((jumlah as number) / maxValue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pemasukan Chart */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Top 5 Pemasukan per Kategori
          </h4>
          <div className="space-y-3">
            {topPemasukan.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">Tidak ada data</p>
            ) : (
              topPemasukan.map(([kategori, jumlah]) => (
                <div key={kategori}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{kategori}</span>
                    <span className="text-green-400 font-semibold">
                      Rp {(jumlah as number).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${((jumlah as number) / maxValue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Pemasukan</p>
            <p className="text-green-400 font-bold text-lg">
              Rp {totalPemasukan.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Pengeluaran</p>
            <p className="text-red-400 font-bold text-lg">
              Rp {totalPengeluaran.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Selisih</p>
            <p
              className={`font-bold text-lg ${
                totalPemasukan - totalPengeluaran >= 0
                  ? "text-blue-400"
                  : "text-yellow-400"
              }`}
            >
              Rp {(totalPemasukan - totalPengeluaran).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
