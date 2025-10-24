"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import LaporanContent from "@/components/shared/Laporan/LaporanContent";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 py-12 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
    </div>
  );
}

export default function LaporanPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LaporanContent />
    </Suspense>
  );
}
