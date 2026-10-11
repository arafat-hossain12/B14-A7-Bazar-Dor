import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import ProductCard from "./ProductCard";

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

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

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-base text-up">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className={grid}>
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-base text-down">▼</span> আজ দাম কমেছে
        </h2>
        <div className={grid}>
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-ink/70">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className={grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}