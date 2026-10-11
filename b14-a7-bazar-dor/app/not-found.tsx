import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পেজটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-ink/70">
        আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-6 flex h-10 items-center rounded-lg border border-brand-strong bg-brand px-4 text-sm font-semibold text-brand-content shadow-[0_3px_1px_rgba(5,137,62,0.3)]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}