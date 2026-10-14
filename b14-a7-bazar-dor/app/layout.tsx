import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Ticker from "./components/Ticker";

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="light" className={hind.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Suspense fallback={<div className="h-16 border-b border-line bg-surface" />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<div className="h-10 border-b border-line bg-surface" />}>
          <Ticker />
        </Suspense>
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="skeleton h-64 w-full rounded-2xl" />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}