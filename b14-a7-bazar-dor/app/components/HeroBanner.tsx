"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      })
    );
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-line bg-surface px-6 py-10 md:flex-row md:px-8">
        <div className="flex max-w-xl flex-col items-start gap-2">
          <span className="min-h-7 rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
            {today || "\u00A0"}
          </span>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-1 text-base leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-3 flex h-10 items-center rounded-lg border border-brand-strong bg-brand px-4 text-sm font-semibold text-brand-content shadow-[0_3px_1px_rgba(5,137,62,0.3)] hover:bg-brand-strong"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="বাজার দর"
          width={315}
          height={263}
          priority
          className="h-auto w-64 md:w-80"
        />
      </div>
    </section>
  );
}