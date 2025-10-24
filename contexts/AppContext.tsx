"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";

interface AppContextType {
  showNavbar: boolean;
  setShowNavbar: (show: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  hasSeenSplash: boolean;
  setHasSeenSplash: (seen: boolean) => void;
  checkAuth: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  const checkAuth = async () => {
    const user = await getCurrentUser();
    setIsAuthenticated(!!user);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showNavbar,
        setShowNavbar,
        isAuthenticated,
        setIsAuthenticated,
        hasSeenSplash,
        setHasSeenSplash,
        checkAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
