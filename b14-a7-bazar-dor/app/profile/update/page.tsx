"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("আগে সাইন ইন করুন");
      router.push("/signin?callbackUrl=/profile/update");
    }
    if (session?.user?.name) setName(session.user.name);
  }, [session, isPending, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  if (isPending) {
    return <div className="skeleton mx-auto mt-10 h-64 w-full max-w-3xl rounded-2xl" />;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">তথ্য আপডেট</h1>
        <p className="text-sm text-ink/70">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-line bg-surface p-6"
      >
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-brand"
          />
        </label>
        <button
          disabled={loading}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-brand-strong bg-brand text-sm font-semibold text-brand-content shadow-[0_3px_1px_rgba(5,137,62,0.3)] hover:bg-brand-strong disabled:opacity-60"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Update Information"
          )}
        </button>
      </form>
    </div>
  );
}