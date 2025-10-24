"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Sparkles, TrendingUp } from "lucide-react";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect ke home setelah 3 detik
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-purple-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce-slow">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-linear-to-br from-blue-500 via-cyan-500 to-purple-500 p-8 rounded-full">
              <Rocket className="w-20 h-20 text-white transform rotate-45" />
            </div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 animate-fade-in">
          <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PersonalHub
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-300 text-lg sm:text-xl mb-8 animate-fade-in-delay flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Kelola Keuangan & Produktivitas Anda
          <TrendingUp className="w-5 h-5 text-green-400" />
        </p>

        {/* Loading Animation */}
        <div className="flex flex-col items-center gap-4 animate-fade-in-delay-2">
          {/* Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200/20 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-cyan-500 rounded-full animate-spin" />
          </div>

          {/* Loading Text */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Memuat</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>

        {/* Version */}
        <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs animate-fade-in-delay-3">
          v1.0.0
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.3s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.6s forwards;
        }

        .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.9s forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
