"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, TrendingUp, Wallet, CheckSquare, HandCoins, Target, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
  showButton?: boolean;
}

export default function SplashScreenComponent({ onFinish, duration = 2000, showButton = true }: SplashScreenProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check authentication status
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();

    // Progress animation untuk efek visual
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowCTA(true); // Show button when progress complete
          return 100;
        }
        return prev + 4;
      });
    }, duration / 25);

    return () => {
      clearInterval(progressInterval);
    };
  }, [duration]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-purple-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-2xl">
        {/* Logo Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative inline-block animate-float">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            {/* Main Logo */}
            <div className="relative bg-linear-to-br from-blue-500 via-cyan-500 to-purple-500 p-8 rounded-full shadow-2xl">
              <Image 
                src="/favicon.ico" 
                alt="PersonalHub Logo" 
                width={80} 
                height={80}
                className="w-20 h-20"
                priority
              />
            </div>
          </div>
        </div>

        {/* App Name with Gradient Text */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 animate-slide-up">
          <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PersonalHub
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-300 text-base sm:text-xl mb-8 animate-slide-up-delay flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span>Kelola Keuangan & Produktivitas Anda</span>
          <TrendingUp className="w-5 h-5 text-green-400 animate-pulse" />
        </p>

        {/* Feature Icons */}
        <div className="flex justify-center gap-6 mb-8 animate-slide-up-delay-2">
          <div className="bg-green-500/20 p-3 rounded-lg backdrop-blur-sm border border-green-500/30 animate-bounce-subtle">
            <Wallet className="w-6 h-6 text-green-400" />
          </div>
          <div className="bg-blue-500/20 p-3 rounded-lg backdrop-blur-sm border border-blue-500/30 animate-bounce-subtle" style={{ animationDelay: '0.1s' }}>
            <CheckSquare className="w-6 h-6 text-blue-400" />
          </div>
          <div className="bg-yellow-500/20 p-3 rounded-lg backdrop-blur-sm border border-yellow-500/30 animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
            <HandCoins className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="bg-purple-500/20 p-3 rounded-lg backdrop-blur-sm border border-purple-500/30 animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>
            <Target className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        {/* Progress Bar or CTA Buttons */}
        {!showCTA || isCheckingAuth ? (
          <div className="animate-slide-up-delay-3">
            <div className="w-full max-w-xs mx-auto bg-slate-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-slate-700/50">
              <div
                className="h-full bg-linear-to-r from-blue-500 via-cyan-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-3">Menyiapkan...</p>
          </div>
        ) : isAuthenticated ? (
          // User sudah login - Tombol "Catat Sekarang"
          <div className="animate-slide-up space-y-4">
            <button
              onClick={onFinish}
              className="group relative overflow-hidden bg-linear-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-700 hover:via-cyan-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 flex items-center gap-3 mx-auto"
            >
              <span className="relative z-10">Catat Sekarang</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
            </button>
            
            <p className="text-gray-400 text-sm">
              Klik untuk mulai mengelola keuangan Anda
            </p>
          </div>
        ) : (
          // User belum login - Tombol "Masuk" dan "Daftar"
          <div className="animate-slide-up space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push("/auth/signin")}
                className="group relative overflow-hidden bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Masuk</span>
              </button>
              
              <button
                onClick={() => router.push("/auth/signup")}
                className="group relative overflow-hidden bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Daftar</span>
              </button>
            </div>
            
            <p className="text-gray-400 text-sm text-center">
              Masuk atau daftar untuk mulai menggunakan PersonalHub
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-slide-up-delay {
          opacity: 0;
          animation: slide-up 0.8s ease-out 0.2s forwards;
        }

        .animate-slide-up-delay-2 {
          opacity: 0;
          animation: slide-up 0.8s ease-out 0.4s forwards;
        }

        .animate-slide-up-delay-3 {
          opacity: 0;
          animation: slide-up 0.8s ease-out 0.6s forwards;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-fade-in-slow {
          opacity: 0;
          animation: slide-up 1s ease-out 1s forwards;
        }
      `}</style>
    </div>
  );
}
