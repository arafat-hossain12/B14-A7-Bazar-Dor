"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import {
  AuthShell,
  Divider,
  Field,
  PrimaryButton,
  SocialButtons,
} from "@/app/components/AuthParts";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const image = String(form.get("image") || "").trim();
    const password = String(form.get("password") || "");

    if (!name || !email || !password) {
      toast.error("নাম, ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      ...(image ? { image } : {}),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="নাম" name="name" placeholder="আপনার নাম" />
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" />
        <Field label="ছবির লিংক (ঐচ্ছিক)" name="image" placeholder="https://..." />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৬ অক্ষর" />
        <PrimaryButton loading={loading}>অ্যাকাউন্ট তৈরি করুন</PrimaryButton>
      </form>

      <Divider />
      <SocialButtons callbackURL="/" />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}