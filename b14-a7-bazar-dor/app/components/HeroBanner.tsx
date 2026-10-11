"use client";

import React from "react";
import Image from "next/image";

export default function HeroBanner() {
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      style={{
        backgroundColor: "#f4fbf7",
        borderRadius: "16px",
        maxWidth: "1200px",
        margin: "24px auto",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* Left side texts and button */}
      <div style={{ flex: "1 1 550px" }}>
        <p
          style={{
            fontSize: "13px",
            color: "#00a651",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          {today}
        </p>

        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            color: "#111827",
            lineHeight: "1.25",
            marginBottom: "14px",
          }}
        >
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম — ক্যাটাগরিভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          style={{
            backgroundColor: "#00a651",
            color: "#ffffff",
            border: "none",
            padding: "10px 22px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
          }}
        >
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Right side image using Next.js Image component */}
      <div
        style={{
          flex: "1 1 350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/bazar-hero.png"
          alt="Bazar Hero Banner"
          width={400}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
          }}
          priority
        />
      </div>
    </section>
  );
}
