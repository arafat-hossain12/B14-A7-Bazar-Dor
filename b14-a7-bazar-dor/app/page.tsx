import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পেজটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-slate-500">
        আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link href="/" className="btn mt-6 bg-green-600 text-white hover:bg-green-700">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}