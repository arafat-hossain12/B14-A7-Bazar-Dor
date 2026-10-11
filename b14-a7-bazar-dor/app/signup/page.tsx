"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  const social = async (provider: "google" | "github") => {
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">নতুন অ্যাকাউন্ট খুলুন</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input name="name" type="text" className="input input-bordered w-full" />
          </label>
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
            {loading ? <span className="loading loading-spinner" /> : "রেজিস্টার"}
          </button>
        </form>

        <div className="divider text-xs">অথবা</div>

        <div className="space-y-2">
          <button onClick={() => social("google")} className="btn btn-outline w-full">
            Google দিয়ে সাইন আপ
          </button>
          <button onClick={() => social("github")} className="btn btn-outline w-full">
            GitHub দিয়ে সাইন আপ
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}