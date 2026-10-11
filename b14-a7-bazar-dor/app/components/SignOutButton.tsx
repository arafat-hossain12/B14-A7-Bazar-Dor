"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const onClick = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      className="flex h-10 items-center rounded-lg border border-up px-4 text-sm font-semibold text-up hover:bg-soft"
    >
      ↩ সাইন আউট
    </button>
  );
}