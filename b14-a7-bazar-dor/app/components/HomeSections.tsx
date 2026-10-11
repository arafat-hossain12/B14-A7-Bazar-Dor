import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default async function HomeSections() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold text-green-700">আজ দাম বেড়েছে ▲</h2>
        <div className={grid}>
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold text-red-600">আজ দাম কমেছে ▼</h2>
        <div className={grid}>
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-8">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-slate-500">
          সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও দামের পরিবর্তন
        </p>
        <div className={grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}