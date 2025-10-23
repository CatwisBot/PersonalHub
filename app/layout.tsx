import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/shared/_Navbar/Navbar";
import Footer from "@/components/shared/_Footer/Footer";
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
