"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { API, Category } from "@/lib/api";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-lg text-brand-content">
            🛒
          </span>
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-7 tracking-tight">বাজার দর</span>
            <span className="text-xs leading-4">{date || "\u00A0"}</span>
          </span>
        </Link>

        {isPending ? (
          <div className="skeleton h-10 w-28" />
        ) : user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-soft"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="size-9 rounded-[10px] object-cover" />
              ) : (
                <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand font-semibold text-brand-content">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
              )}
              <span className="hidden sm:inline">{user.name}</span>
              <span className="text-xs opacity-60">▾</span>
            </button>

            {open && (
              <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-line bg-surface p-2 shadow-lg">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-ink/60">{user.email}</p>
                </div>
                <div className="my-1 h-px bg-line" />
                <Link
                  href="/profile"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-soft"
                >
                  আমার প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-up hover:bg-soft"
                >
                  ↩ সাইন আউট
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="flex h-10 items-center rounded-lg px-4 text-sm font-semibold hover:bg-soft"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="flex h-10 items-center rounded-lg border border-brand-strong bg-brand px-4 text-sm font-semibold text-brand-content shadow-[0_3px_1px_rgba(5,137,62,0.3)] hover:bg-brand-strong"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <div className="border-t border-soft">
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition ${
                  active ? "bg-brand text-brand-content" : "hover:bg-soft"
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}