"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { navItems } from "@/constant/navItems";
import { getCurrentUser, signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsAuthenticated: setGlobalAuth, setShowNavbar, setHasSeenSplash } = useApp();
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsAuthenticated(false);
    setGlobalAuth(false); // Update global state
    setShowNavbar(false); // Hide navbar immediately
    setHasSeenSplash(false); // Reset splash flag
    
    // Force full page reload to reset all states
    window.location.href = "/";
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar immediately when scrolling up
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        // Clear any existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
          setScrollTimeout(null);
        }
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <nav
      className={`bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-xl border-b border-blue-700 sticky top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 sm:space-x-8 mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "hover:bg-blue-700/50 hover:scale-105"
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-base font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-600/80 bg-red-600 text-white shadow-lg"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm font-medium">Keluar</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
