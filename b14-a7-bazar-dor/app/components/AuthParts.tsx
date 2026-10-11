"use client";

import Link from "next/link";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-ink/70">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-line bg-surface p-6">{children}</div>
      <Link
        href="/"
        className="mt-6 block text-center text-sm text-ink/60 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}

export function PrimaryButton({
  children,
  loading,
}: {
  children: ReactNode;
  loading?: boolean;
}) {
  return (
    <button
      disabled={loading}
      className="flex h-10 w-full items-center justify-center rounded-lg border border-brand-strong bg-brand text-sm font-semibold text-brand-content shadow-[0_3px_1px_rgba(5,137,62,0.3)] hover:bg-brand-strong disabled:opacity-60"
    >
      {loading ? <span className="loading loading-spinner loading-sm" /> : children}
    </button>
  );
}

export function Divider() {
  return (
    <div className="my-4 flex items-center gap-4 text-xs text-ink/70">
      <span className="h-px flex-1 bg-line" />
      অথবা
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const go = async (provider: "google" | "github") => {
    const { error } = await signIn.social({ provider, callbackURL });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  };

  const btn =
    "flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface text-sm font-semibold hover:bg-soft";

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <button type="button" onClick={() => go("google")} className={btn}>
        <svg className="size-4" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.1 5.3-4.5 7l7.3 5.7c4.3-4 6.9-9.9 6.9-17.2z" />
          <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" />
          <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.9 2.3-8.6 2.3-6.3 0-11.7-4-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
        </svg>
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => go("github")} className={btn}>
        <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}