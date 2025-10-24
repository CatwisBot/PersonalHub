"use client";

import { ReactNode } from "react";
import Navbar from "@/components/shared/_Navbar/Navbar";
import Footer from "@/components/shared/_Footer/Footer";
import { useApp } from "@/contexts/AppContext";

export default function LayoutClient({ children }: { children: ReactNode }) {
  const { showNavbar } = useApp();

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
}
