"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { API, Category } from "@/lib/api";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    fetch(`${API}/categories`)
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const linkClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-green-600 text-white"
        : "text-slate-600 hover:bg-green-50 hover:text-green-700"
    }`;

  const links = (
    <>
      <Link href="/" className={linkClass(pathname === "/")}>
        হোম
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className={linkClass(pathname === `/category/${c.slug}`)}
        >
          {c.icon} {c.nameBn}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-green-700">🛒 বাজার দর</span>
          <span className="text-xs text-slate-500">{date || "\u00A0"}</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {links}
        </nav>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24" />
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm hover:bg-slate-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {session.user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
                <span className="hidden sm:inline">{session.user.name}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-sm sm:btn-md btn-outline btn-error"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm sm:btn-md btn-ghost">
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm sm:btn-md bg-green-600 text-white hover:bg-green-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 lg:hidden">
        {links}
      </nav>
    </header>
  );
}