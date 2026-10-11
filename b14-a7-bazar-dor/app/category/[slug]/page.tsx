"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { API, Category, Product } from "@/lib/api";
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
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="skeleton mb-6 h-9 w-48" />
        <GridSkeleton count={8} />
      </div>
    );
  }

  if (!category || products.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
        <p className="text-7xl">🛒</p>
        <h1 className="mt-4 text-3xl font-bold">৪০৪ — ক্যাটাগরি পাওয়া যায়নি</h1>
        <p className="mt-2 text-slate-500">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ঠিকানাটি সঠিক নয়।
        </p>
        <Link href="/" className="btn mt-6 bg-green-600 text-white hover:bg-green-700">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">
          {category.icon} {category.nameBn}
        </h1>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium">সাজান:</span>
          <select
            className="select select-bordered select-sm sm:select-md"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}