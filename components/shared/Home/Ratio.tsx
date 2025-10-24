"use client";

import {
  TrendingUp,
  TrendingDown,
  Target,
  Wallet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";

export default function Ratio() {
  // Dummy data - nanti bisa diganti dengan data dari API/database
  const totalBudget = 5000000;
  const totalPengeluaran = 2500000;
  const sisaBudget = totalBudget - totalPengeluaran;
  const persenPengeluaran = (totalPengeluaran / totalBudget) * 100;
  const persenSisa = 100 - persenPengeluaran;

  const totalTugas = 10;
  const tugasSelesai = 5;
  const tugasBelumSelesai = 5;
  const persenProduktivitas = (tugasSelesai / totalTugas) * 100;

  const totalHutang = 3;
  const totalNilaiHutang = 1000000;
  const hutangJatuhTempoMingguIni = 1;

  const targetBulanan = {
    tabungan: 3000000,
    realisasi: sisaBudget,
    persenCapai: (sisaBudget / 3000000) * 100,
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const getStatusColor = (persen: number) => {
    if (persen >= 70) return "text-green-400";
    if (persen >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressBarColor = (persen: number) => {
    if (persen >= 70) return "bg-green-500";
    if (persen >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Card Component untuk menghindari duplikasi
  const StatsCard = ({ type, className = "" }: { type: string; className?: string }) => {
    switch (type) {
      case "produktivitas":
        return (
          <div className={`bg-linear-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 ${className}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              {persenProduktivitas >= 50 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">
              Produktivitas Tugas
            </h3>
            <p className={`text-2xl sm:text-3xl font-bold ${getStatusColor(persenProduktivitas)} mb-2`}>
              {persenProduktivitas.toFixed(0)}%
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{tugasSelesai}/{totalTugas} selesai</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3 bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${getProgressBarColor(persenProduktivitas)} transition-all duration-500`}
                style={{ width: `${persenProduktivitas}%` }}
              />
            </div>
          </div>
        );
      case "budget":
        return (
          <div className={`bg-linear-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 ${className}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Wallet className="w-6 h-6 text-green-400" />
              </div>
              {persenSisa >= 50 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">
              Sisa Budget
            </h3>
            <p className={`text-2xl sm:text-3xl font-bold ${getStatusColor(persenSisa)} mb-2`}>
              {persenSisa.toFixed(0)}%
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatRupiah(sisaBudget)}</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="mt-3 bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${getProgressBarColor(persenSisa)} transition-all duration-500`}
                style={{ width: `${persenSisa}%` }}
              />
            </div>
          </div>
        );
      case "tabungan":
        return (
          <div className={`bg-linear-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 ${className}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              {targetBulanan.persenCapai >= 70 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-400" />
              )}
            </div>
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">
              Target Tabungan
            </h3>
            <p className={`text-2xl sm:text-3xl font-bold ${getStatusColor(targetBulanan.persenCapai)} mb-2`}>
              {targetBulanan.persenCapai.toFixed(0)}%
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatRupiah(targetBulanan.realisasi)}</span>
              <span>/ {formatRupiah(targetBulanan.tabungan)}</span>
            </div>
            <div className="mt-3 bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${getProgressBarColor(targetBulanan.persenCapai)} transition-all duration-500`}
                style={{ width: `${Math.min(targetBulanan.persenCapai, 100)}%` }}
              />
            </div>
          </div>
        );
      case "hutang":
        return (
          <div className={`bg-linear-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 ${className}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
              {hutangJatuhTempoMingguIni > 0 ? (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              )}
            </div>
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">
              Status Hutang
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
              {totalHutang} Hutang
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatRupiah(totalNilaiHutang)}</span>
              <span className="text-red-400">{hutangJatuhTempoMingguIni} mendesak</span>
            </div>
            <div className="mt-3 bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all duration-500"
                style={{ width: `${(hutangJatuhTempoMingguIni / totalHutang) * 100}%` }}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 py-15">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Analisis & Statistik
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Ringkasan performa keuangan dan produktivitas Anda bulan ini
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="mb-6">
          {/* Custom Scrollbar Styles for mobile */}
          <style jsx>{`
            @media (max-width: 1023px) {
              .stats-scroll::-webkit-scrollbar {
                height: 8px;
              }
              .stats-scroll::-webkit-scrollbar-track {
                background: rgba(51, 65, 85, 0.3);
                border-radius: 10px;
                margin: 0 20px;
              }
              .stats-scroll::-webkit-scrollbar-thumb {
                background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                border-radius: 10px;
                transition: all 0.3s ease;
              }
              .stats-scroll::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(90deg, #2563eb, #7c3aed);
              }
              .stats-scroll {
                scrollbar-width: thin;
                scrollbar-color: #3b82f6 rgba(51, 65, 85, 0.3);
              }
            }
          `}</style>
          
          {/* Desktop: Grid 4 kolom */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            <StatsCard type="produktivitas" />
            <StatsCard type="budget" />
            <StatsCard type="tabungan" />
            <StatsCard type="hutang" />
          </div>

          {/* Mobile & Tablet: Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="stats-scroll flex overflow-x-auto gap-4 sm:gap-6 pb-4 snap-x snap-mandatory">
              <StatsCard type="produktivitas" className="min-w-[280px] sm:min-w-[320px] shrink-0 snap-center" />
              <StatsCard type="budget" className="min-w-[280px] sm:min-w-[320px] shrink-0 snap-center" />
              <StatsCard type="tabungan" className="min-w-[280px] sm:min-w-[320px] shrink-0 snap-center" />
              <StatsCard type="hutang" className="min-w-[280px] sm:min-w-[320px] shrink-0 snap-center" />
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <span>←</span>
                <span>Geser untuk melihat lebih banyak</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Insight Produktivitas */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                  Produktivitas
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {persenProduktivitas >= 70
                    ? "Luar biasa! Produktivitas Anda sangat tinggi. Pertahankan!"
                    : persenProduktivitas >= 40
                    ? "Cukup baik, tapi masih ada ruang untuk peningkatan."
                    : "Ayo semangat! Masih banyak tugas yang perlu diselesaikan."}
                </p>
              </div>
            </div>
          </div>

          {/* Insight Keuangan */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                <Wallet className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                  Manajemen Keuangan
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {persenSisa >= 50
                    ? "Bagus! Anda berhasil menghemat lebih dari setengah budget."
                    : persenSisa >= 30
                    ? "Hati-hati dengan pengeluaran di sisa bulan ini."
                    : "Waspada! Budget Anda hampir habis."}
                </p>
              </div>
            </div>
          </div>

          {/* Insight Hutang */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50">
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500/20 p-2 rounded-lg mt-1">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                  Peringatan Hutang
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {hutangJatuhTempoMingguIni > 0
                    ? `Ada ${hutangJatuhTempoMingguIni} hutang yang akan jatuh tempo minggu ini. Segera lunasi!`
                    : "Tidak ada hutang yang mendesak. Tetap bijak kelola keuangan."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-linear-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-indigo-500/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-500/20 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Kesimpulan Bulan Ini
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Berdasarkan analisis data Anda
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-white font-semibold text-sm sm:text-base mb-1">
                {persenProduktivitas >= 50 && persenSisa >= 40
                  ? "🎉 Performa Sangat Baik!"
                  : persenProduktivitas >= 40 || persenSisa >= 30
                  ? "👍 Cukup Baik, Tetap Semangat!"
                  : "⚠️ Butuh Perbaikan"}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                {persenProduktivitas >= 50 && persenSisa >= 40
                  ? "Produktivitas dan keuangan Anda terkendali dengan baik"
                  : "Fokus pada produktivitas dan pengelolaan budget"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
