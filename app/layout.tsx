import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppProvider } from "@/contexts/AppContext";
import LayoutClient from "@/components/shared/LayoutClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PersonalHub",
  description: "Note Anything, Achieve Everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <AppProvider>
          <LayoutClient>{children}</LayoutClient>
        </AppProvider>
      </body>
    </html>
  );
}
