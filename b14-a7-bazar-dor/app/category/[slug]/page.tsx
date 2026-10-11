"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { API, Category, Product } from "@/lib/api";
import { toBn } from "@/lib/format";
import ProductCard from "@/app/components/ProductCard";
import { GridSkeleton } from "@/app/components/Skeletons";

type Sort = "default" | "asc" | "desc";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<Sort>("default");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetch(`${API}/products?category=${encodeURIComponent(slug)}`)
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      fetch(`${API}/categories`)
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
    ]).then(([prods, cats]: [Product[], Category[]]) => {
      if (cancelled) return;
      setProducts(Array.isArray(prods) ? prods : []);
      setCategory(cats.find((c) => c.slug === slug) ?? null);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        <div className="skeleton h-24 w-full rounded-2xl" />
        <div className="skeleton h-16 w-full rounded-2xl" />
        <GridSkeleton count={6} />
      </div>
    );
  }

  if (!category || products.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
        <p className="text-7xl">🛒</p>
        <h1 className="mt-4 text-3xl font-bold">৪০৪ — ক্যাটাগরি পাওয়া যায়নি</h1>
        <p className="mt-2 text-ink/70">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ঠিকানাটি সঠিক নয়।
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

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold leading-8">{category.nameBn}</h1>
          <p className="text-sm text-ink/70">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 rounded-2xl border border-line bg-surface p-4">
        <label htmlFor="sort" className="text-sm text-ink/70">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-8 cursor-pointer appearance-none rounded-lg border border-line bg-surface pl-3 pr-8 text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2.5 top-1/2 size-2.5 -translate-y-1/2"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M1.5 3.5 5 7l3.5-3.5" />
          </svg>
        </div>
      </div>

      <p className="text-sm text-ink/70">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}