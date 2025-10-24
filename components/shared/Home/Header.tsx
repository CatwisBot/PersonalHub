'use client';

import { Sparkles, Wallet, CheckSquare, HandCoins } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, getUserProfile } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [namaUser, setNamaUser] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      
      if (currentUser) {
        const profile = await getUserProfile(currentUser.id);
        if (profile) {
          setNamaUser(profile.nama || "");
        }
      }
    }
    
    fetchUser();
  }, []);
  return (
    <header className="bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-700/50">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-blue-200">
              Your Personal Productivity Hub
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 animate-pulse">
              PersonalHub
            </span>
          </h1>

          {/* Slogan */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-100">
            Note Anything, Achieve Everything
          </p>

          {/* Features Icons */}
          <div className="flex justify-center gap-3 sm:gap-6 pt-8 md:pb-8">
            <div className="flex flex-col items-center space-y-2 bg-blue-900/30 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-blue-700/30">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span className="text-xs sm:text-sm font-medium">Pengeluaran</span>
            </div>

            <div className="flex flex-col items-center space-y-2 bg-blue-900/30 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-blue-700/30">
              <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-xs sm:text-sm font-medium">Tugas</span>
            </div>

            <div className="flex flex-col items-center space-y-2 bg-blue-900/30 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-blue-700/30">
              <HandCoins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium">Hutang</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 -mb-1">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="rgb(15, 23, 42)"
            className="drop-shadow-lg"
          />
        </svg>
      </div>
    </header>
  );
}
