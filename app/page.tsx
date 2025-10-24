"use client";

import { useState } from "react";
import Header from "@/components/shared/Home/Header";
import Ratio from "@/components/shared/Home/Ratio";
import Content from "@/components/shared/Home/Content";
import SplashScreen from "@/components/shared/SplashScreen";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} duration={2000} />;
  }

  return (
    <main>
      <Header />
      <Content />
      <Ratio />
    </main>
  );
}