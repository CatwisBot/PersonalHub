"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, Wallet, CheckSquare, HandCoins, Plus, Loader2 } from "lucide-react";
import { getPengeluaran, getPemasukan, getTugas, getHutang, updateTugas, updateHutang, getTotalPemasukan, getTotalPengeluaran } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { useApp } from "@/contexts/AppContext";

import PemasukanModal from "./PemasukanModal";
import PengeluaranList from "./PengeluaranList";
import PemasukanList from "./PemasukanList";
import TugasList from "./TugasList";
import HutangList from "./HutangList";
import ChartSection from "./ChartSection";

export default function LaporanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setShowNavbar } = useApp();
  const tabParam = searchParams.get("tab") as "keuangan" | "tugas" | "hutang" | null;
  
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<"keuangan" | "tugas" | "hutang">(tabParam || "keuangan");
  const [showPemasukanModal, setShowPemasukanModal] = useState(false);
  const [pengeluaran, setPengeluaran] = useState<any[]>([]);
  const [pemasukan, setPemasukan] = useState<any[]>([]);
  const [tugas, setTugas] = useState<any[]>([]);
  const [hutang, setHutang] = useState<any[]>([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      
      if (!user) {
        router.push("/");
      } else {
        setShowNavbar(true);
        setIsCheckingAuth(false);
        fetchData();
      }
    }
    
    checkAuth();
  }, [router, setShowNavbar]);

  // Update tab when URL parameter changes
  useEffect(() => {
    if (tabParam && ["keuangan", "tugas", "hutang"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pengeluaranData, pemasukanData, tugasData, hutangData, totalIn, totalOut] = await Promise.all([
        getPengeluaran(currentMonth, currentYear), 
        getPemasukan(currentMonth, currentYear), 
        getTugas(), 
        getHutang(),
        getTotalPemasukan(currentMonth, currentYear), 
        getTotalPengeluaran(currentMonth, currentYear),
      ]);
      setPengeluaran(pengeluaranData);
      setPemasukan(pemasukanData);
      setTugas(tugasData);
      setHutang(hutangData);
      setTotalPemasukan(totalIn);
      setTotalPengeluaran(totalOut);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTugas = async (id: string) => {
    await updateTugas(id, { selesai: true });
    fetchData();
  };

  const handleToggleHutang = async (id: string) => {
    await updateHutang(id, { lunas: true });
    fetchData();
  };

  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 py-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  const saldo = totalPemasukan - totalPengeluaran;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Laporan Keuangan & Produktivitas</h1>
          <p className="text-gray-400 text-sm sm:text-base">Bulan {new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Total Pemasukan</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">Rp {totalPemasukan.toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-linear-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Total Pengeluaran</span>
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-red-400">Rp {totalPengeluaran.toLocaleString('id-ID')}</p>
          </div>

          <div className={`bg-linear-to-br ${saldo >= 0 ? 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' : 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'} backdrop-blur-sm rounded-xl p-6 border`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Saldo</span>
              <Wallet className={`w-5 h-5 ${saldo >= 0 ? 'text-blue-400' : 'text-yellow-400'}`} />
            </div>
            <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-blue-400' : 'text-yellow-400'}`}>Rp {saldo.toLocaleString('id-ID')}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={() => setActiveTab("keuangan")} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === "keuangan" ? "bg-blue-500 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"}`}>
            <Wallet className="w-5 h-5" />
            Keuangan
          </button>
          <button onClick={() => setActiveTab("tugas")} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === "tugas" ? "bg-green-500 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"}`}>
            <CheckSquare className="w-5 h-5" />
            Tugas
          </button>
          <button onClick={() => setActiveTab("hutang")} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === "hutang" ? "bg-red-500 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"}`}>
            <HandCoins className="w-5 h-5" />
            Hutang
          </button>
        </div>

        {activeTab === "keuangan" && (
          <div className="space-y-6">
            <ChartSection pengeluaran={pengeluaran} pemasukan={pemasukan} totalPemasukan={totalPemasukan} totalPengeluaran={totalPengeluaran} />
            <button onClick={() => setShowPemasukanModal(true)} className="w-full md:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all">
              <Plus className="w-5 h-5" />
              Tambah Pemasukan
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PemasukanList data={pemasukan} onRefresh={fetchData} />
              <PengeluaranList data={pengeluaran} />
            </div>
          </div>
        )}

        {activeTab === "tugas" && <TugasList data={tugas} onToggle={handleToggleTugas} />}
        {activeTab === "hutang" && <HutangList data={hutang} onToggle={handleToggleHutang} />}
      </div>

      {showPemasukanModal && <PemasukanModal onClose={() => setShowPemasukanModal(false)} onSuccess={() => { fetchData(); setShowPemasukanModal(false); }} />}
    </div>
  );
}
