"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import {
  AuthShell,
  Divider,
  Field,
  PrimaryButton,
  SocialButtons,
} from "@/app/components/AuthParts";

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

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৬ অক্ষর" />
        <PrimaryButton loading={loading}>সাইন ইন</PrimaryButton>
      </form>

      <Divider />
      <SocialButtons callbackURL={callbackUrl} />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}