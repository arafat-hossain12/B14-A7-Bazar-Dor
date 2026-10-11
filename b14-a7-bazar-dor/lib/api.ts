export const API = "https://openapi.programming-hero.com/api/bazardor";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${API}/products?category=${encodeURIComponent(category)}`
    : `${API}/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("পণ্যের তথ্য আনা যায়নি");
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("ক্যাটাগরি আনা যায়নি");
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}