"use client";

import { useState, useEffect } from "react";
import { getCurrentUser, getUserProfile } from "@/lib/auth";
import { Sparkles, TrendingUp, Zap, Award, Target, Calendar } from "lucide-react";

export default function Intro() {
  const [nama, setNama] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getCurrentUser();
        if (user) {
          const profile = await getUserProfile(user.id);
          if (profile) {
            setNama(profile.nama || "Pengguna");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Selamat Pagi");
    } else if (hour < 15) {
      setGreeting("Selamat Siang");
    } else if (hour < 18) {
      setGreeting("Selamat Sore");
    } else {
      setGreeting("Selamat Malam");
    }

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="mb-8 animate-pulse">
        <div className="h-32 bg-slate-800/50 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-3xl"></div>
      
      {/* Main Card */}
      <div className="relative bg-linear-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-blue-500/20 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Greeting Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl animate-bounce-subtle">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {greeting}, <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{nama}</span>! 👋
              </h2>
              <p className="text-gray-400 text-sm md:text-base mt-1">
                Semoga hari Anda produktif dan menyenangkan
              </p>
            </div>
          </div>

          {/* Quick Stats / Motivational Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {/* Card 1 */}
            <div className="bg-linear-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-gray-300 font-medium">Progress</span>
              </div>
              <p className="text-lg font-bold text-white">Terus Maju</p>
            </div>

            {/* Card 2 */}
            <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-400" />
                <span className="text-xs text-gray-300 font-medium">Energi</span>
              </div>
              <p className="text-lg font-bold text-white">Semangat!</p>
            </div>

            {/* Card 3 */}
            <div className="bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-gray-300 font-medium">Target</span>
              </div>
              <p className="text-lg font-bold text-white">Fokus</p>
            </div>

            {/* Card 4 */}
            <div className="bg-linear-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-gray-300 font-medium">Hari Ini</span>
              </div>
              <p className="text-lg font-bold text-white">Capai!</p>
            </div>
          </div>

          {/* Date & Time Info */}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
