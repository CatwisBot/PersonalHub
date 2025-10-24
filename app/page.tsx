"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/Home/Header";
import Ratio from "@/components/shared/Home/Ratio";
import Content from "@/components/shared/Home/Content";
import SplashScreen from "@/components/shared/SplashScreen";
import { getCurrentUser } from "@/lib/auth";
import { useApp } from "@/contexts/AppContext";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();
  const { setShowNavbar, isAuthenticated: globalIsAuth, hasSeenSplash, setHasSeenSplash } = useApp();

  // Check auth on mount and when global auth changes
  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      const authenticated = !!user;
      
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        // If not authenticated, ensure we show splash
        setShowContent(false);
        setShowNavbar(false);
        setHasSeenSplash(false);
        setIsCheckingAuth(false);
      } else if (authenticated && hasSeenSplash) {
        // If authenticated and already finished splash, skip splash immediately
        setShowContent(true);
        setShowNavbar(true);
        setIsCheckingAuth(false); // Skip loading state
      } else {
        // Authenticated but hasn't seen splash yet
        setIsCheckingAuth(false);
      }
    }
    
    checkAuth();
  }, [globalIsAuth, hasSeenSplash, setShowNavbar, setHasSeenSplash]);

  const handleSplashFinish = async () => {
    setIsCheckingAuth(true);
    const user = await getCurrentUser();
    
    if (user) {
      setIsAuthenticated(true);
      setShowContent(true);
      setShowNavbar(true);
      setHasSeenSplash(true); // Mark that user has seen and finished splash (global)
    } else {
      // User belum login, tetap di splash
      setIsAuthenticated(false);
      setShowContent(false);
    }
    setIsCheckingAuth(false);
  };

  // If checking auth or not showing content yet, show splash
  if (isCheckingAuth || !showContent) {
    return <SplashScreen onFinish={handleSplashFinish} duration={2000} />;
  }

  // Only show main content with navbar if authenticated
  if (isAuthenticated) {
    return (
      <>
        <Header />
        <Content />
        <Ratio />
      </>
    );
  }

  // This should not be reached
  return null;
}