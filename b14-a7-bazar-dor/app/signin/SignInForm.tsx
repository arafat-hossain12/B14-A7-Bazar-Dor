"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const toasted = useRef(false);

  useEffect(() => {
    if (params.get("redirected") && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  };

  const social = async (provider: "google" | "github") => {
    const { error } = await signIn.social({ provider, callbackURL: callbackUrl });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">সাইন ইন করুন</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" className="input input-bordered w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" className="input input-bordered w-full" />
          </label>
          <button
            disabled={loading}
            className="btn w-full bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? <span className="loading loading-spinner" /> : "সাইন ইন"}
          </button>
        </form>

        <div className="divider text-xs">অথবা</div>

        <div className="space-y-2">
          <button onClick={() => social("google")} className="btn btn-outline w-full">
            Google দিয়ে সাইন ইন
          </button>
          <button onClick={() => social("github")} className="btn btn-outline w-full">
            GitHub দিয়ে সাইন ইন
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-green-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}