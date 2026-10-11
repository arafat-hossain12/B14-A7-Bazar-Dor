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
    return <div className="skeleton mx-auto mt-12 h-64 w-full max-w-md" />;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-center text-2xl font-bold">তথ্য আপডেট</h1>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <button
          disabled={loading}
          className="btn w-full bg-green-600 text-white hover:bg-green-700"
        >
          {loading ? <span className="loading loading-spinner" /> : "Update Information"}
        </button>
      </form>
    </div>
  );
}