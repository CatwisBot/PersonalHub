"use client";

import { useState, useEffect } from "react";
import { Plus, Wallet, CheckSquare, HandCoins, TrendingUp, Loader2 } from "lucide-react";
import {
  addPengeluaran,
  addTugas,
  addHutang,
  setBudgetBulanan,
  calculateTaskLevel,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { useApp } from "@/contexts/AppContext";

import TabButton from "@/components/shared/Tambah/TabButton";
import AlertMessage from "@/components/shared/Tambah/AlertMessage";
import PengeluaranForm from "@/components/shared/Tambah/PengeluaranForm";
import TugasForm from "@/components/shared/Tambah/TugasForm";
import HutangForm from "@/components/shared/Tambah/HutangForm";
import BudgetForm from "@/components/shared/Tambah/BudgetForm";
import SubmitButton from "@/components/shared/Tambah/SubmitButton";
import InfoCards from "@/components/shared/Tambah/InfoCards";

import type {
  TabType,
  PengeluaranFormData,
  TugasFormData,
  HutangFormData,
  BudgetFormData,
} from "@/components/shared/Tambah/types";

export default function TambahPage() {
  const router = useRouter();
  const { setShowNavbar } = useApp();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("pengeluaran");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pengeluaranForm, setPengeluaranForm] = useState<PengeluaranFormData>({
    nama: "",
    jumlah: "",
    kategori: "",
    tanggal: new Date().toISOString().split("T")[0],
    keterangan: "",
  });

  const [tugasForm, setTugasForm] = useState<TugasFormData>({
    nama: "",
    deskripsi: "",
    deadline: "",
  });

  const [hutangForm, setHutangForm] = useState<HutangFormData>({
    nama: "",
    jumlah: "",
    jatuh_tempo: "",
    keterangan: "",
  });

  const [budgetForm, setBudgetForm] = useState<BudgetFormData>({
    bulan: new Date().getMonth() + 1,
    tahun: new Date().getFullYear(),
    total_budget: "",
    target_tabungan: "",
  });

  // Check auth - MUST be after all useState hooks
  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      
      if (!user) {
        router.push("/");
      } else {
        setShowNavbar(true);
        setIsCheckingAuth(false);
      }
    }
    
    checkAuth();
  }, [router, setShowNavbar]);

  const currentLevel = tugasForm.deadline
    ? calculateTaskLevel(tugasForm.deadline)
    : "normal";

  const formatRupiah = (angka: string) => {
    const number = angka.replace(/[^,\d]/g, "");
    return new Intl.NumberFormat("id-ID").format(Number(number));
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      switch (activeTab) {
        case "pengeluaran":
          await addPengeluaran({
            nama: pengeluaranForm.nama,
            jumlah: Number(pengeluaranForm.jumlah),
            kategori: pengeluaranForm.kategori || null,
            tanggal: pengeluaranForm.tanggal,
            keterangan: pengeluaranForm.keterangan || null,
          });
          setPengeluaranForm({
            nama: "",
            jumlah: "",
            kategori: "",
            tanggal: new Date().toISOString().split("T")[0],
            keterangan: "",
          });
          break;

        case "tugas":
          await addTugas({
            nama: tugasForm.nama,
            deskripsi: tugasForm.deskripsi || null,
            level: calculateTaskLevel(tugasForm.deadline),
            deadline: tugasForm.deadline,
            selesai: false,
          });
          setTugasForm({
            nama: "",
            deskripsi: "",
            deadline: "",
          });
          break;

        case "hutang":
          await addHutang({
            nama: hutangForm.nama,
            jumlah: Number(hutangForm.jumlah),
            jatuh_tempo: hutangForm.jatuh_tempo,
            keterangan: hutangForm.keterangan || null,
            lunas: false,
          });
          setHutangForm({
            nama: "",
            jumlah: "",
            jatuh_tempo: "",
            keterangan: "",
          });
          break;

        case "budget":
          await setBudgetBulanan({
            bulan: budgetForm.bulan,
            tahun: budgetForm.tahun,
            total_budget: Number(budgetForm.total_budget),
            target_tabungan: Number(budgetForm.target_tabungan) || 0,
          });
          break;
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.refresh();
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "pengeluaran" as TabType, label: "Pengeluaran", icon: Wallet, color: "blue" },
    { id: "tugas" as TabType, label: "Tugas", icon: CheckSquare, color: "green" },
    { id: "hutang" as TabType, label: "Hutang", icon: HandCoins, color: "red" },
    { id: "budget" as TabType, label: "Budget", icon: TrendingUp, color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Tambah Data Baru</h1>
          <p className="text-gray-400 text-sm sm:text-base">Kelola keuangan dan produktivitas Anda dengan mudah</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {tabs.map((tab) => (
            <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
          ))}
        </div>

        {success && <AlertMessage type="success" message="Data berhasil disimpan! ���" />}
        {error && <AlertMessage type="error" message={error} />}

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === "pengeluaran" && (
              <PengeluaranForm formData={pengeluaranForm} onChange={setPengeluaranForm} formatRupiah={formatRupiah} />
            )}
            {activeTab === "tugas" && (
              <TugasForm formData={tugasForm} onChange={setTugasForm} currentLevel={currentLevel} />
            )}
            {activeTab === "hutang" && (
              <HutangForm formData={hutangForm} onChange={setHutangForm} formatRupiah={formatRupiah} />
            )}
            {activeTab === "budget" && (
              <BudgetForm formData={budgetForm} onChange={setBudgetForm} formatRupiah={formatRupiah} />
            )}
            <SubmitButton loading={loading} activeTab={activeTab} />
          </form>
        </div>

        <InfoCards activeTab={activeTab} />
      </div>
    </div>
  );
}
