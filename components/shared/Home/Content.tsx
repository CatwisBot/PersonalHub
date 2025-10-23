"use client";

import Link from "next/link";
import { 
  Wallet, 
  CheckSquare, 
  HandCoins, 
  ArrowRight, 
  AlertCircle,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function Content() {
  // Dummy data - nanti bisa diganti dengan data dari API/database
  const totalPengeluaran = 2500000;
  
  const pengeluaranTerbaru = [
    { id: 1, nama: "Belanja Bulanan", jumlah: 1500000, tanggal: "2025-10-24" },
    { id: 2, nama: "Listrik", jumlah: 500000, tanggal: "2025-10-23" },
    { id: 3, nama: "Internet", jumlah: 300000, tanggal: "2025-10-22" },
  ];

  const tugasBelumSelesai = 5;
  
  const tugas = [
    { id: 1, nama: "Selesaikan Laporan Keuangan", level: "mendesak", deadline: "2025-10-25" },
    { id: 2, nama: "Review Code Project", level: "penting", deadline: "2025-10-27" },
    { id: 3, nama: "Update Documentation", level: "normal", deadline: "2025-10-30" },
  ];

  const hutang = [
    { id: 1, nama: "Budi", jumlah: 500000, jatuhTempo: "2025-11-01" },
    { id: 2, nama: "Siti", jumlah: 300000, jatuhTempo: "2025-11-05" },
    { id: 3, nama: "Andi", jumlah: 200000, jatuhTempo: "2025-11-10" },
  ];

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "mendesak":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "penting":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "normal":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "mendesak":
        return <AlertCircle className="w-4 h-4" />;
      case "penting":
        return <Clock className="w-4 h-4" />;
      case "normal":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Section 1: Pengeluaran */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-linear-to-r from-green-600 to-emerald-600 p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-lg backdrop-blur-sm">
                    <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Pengeluaran</h3>
                    <p className="text-xs sm:text-sm text-green-100">Total Bulan Ini</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <p className="text-2xl sm:text-3xl font-bold">{formatRupiah(totalPengeluaran)}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 sm:mb-4">
                Pengeluaran Terbaru
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {pengeluaranTerbaru.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors gap-2 sm:gap-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-100 text-sm sm:text-base">{item.nama}</p>
                      <p className="text-xs text-gray-400">{item.tanggal}</p>
                    </div>
                    <p className="font-semibold text-green-400 text-sm sm:text-base">
                      {formatRupiah(item.jumlah)}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/laporan"
                className="flex items-center justify-center space-x-2 mt-4 sm:mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Section 2: Tugas */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-linear-to-r from-blue-600 to-cyan-600 p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-lg backdrop-blur-sm">
                    <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Tugas</h3>
                    <p className="text-xs sm:text-sm text-blue-100">Belum Selesai</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <p className="text-2xl sm:text-3xl font-bold">{tugasBelumSelesai} Tugas</p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 sm:mb-4">
                Daftar Tugas
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {tugas.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <p className="font-medium text-gray-100 flex-1 text-sm sm:text-base">
                        {item.nama}
                      </p>
                      <span
                        className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full border w-fit ${getLevelColor(
                          item.level
                        )}`}
                      >
                        {getLevelIcon(item.level)}
                        <span className="capitalize">{item.level}</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Deadline: {item.deadline}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/tambah"
                className="flex items-center justify-center space-x-2 mt-4 sm:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                <span>Kelola Tugas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Section 3: Hutang */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-linear-to-r from-yellow-600 to-amber-600 p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-lg backdrop-blur-sm">
                    <HandCoins className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Hutang</h3>
                    <p className="text-xs sm:text-sm text-yellow-100">Belum Dibayar</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <p className="text-2xl sm:text-3xl font-bold">{hutang.length} Hutang</p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 sm:mb-4">
                Daftar Hutang
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {hutang.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors gap-2 sm:gap-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-100 text-sm sm:text-base">{item.nama}</p>
                      <p className="text-xs text-gray-400">
                        Jatuh Tempo: {item.jatuhTempo}
                      </p>
                    </div>
                    <p className="font-semibold text-yellow-400 text-sm sm:text-base">
                      {formatRupiah(item.jumlah)}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/laporan"
                className="flex items-center justify-center space-x-2 mt-4 sm:mt-6 w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
