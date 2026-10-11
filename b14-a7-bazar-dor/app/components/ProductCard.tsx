import Link from "next/link";
import { Product } from "@/lib/api";
import { changeText, formatPrice, unitLabel } from "@/lib/format";

const badge = {
  up: "bg-green-100 text-green-700",
  down: "bg-red-100 text-red-700",
  flat: "bg-slate-100 text-slate-600",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 text-4xl">
        {product.image}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{product.nameBn}</h3>
      <p className="text-sm text-slate-500">{unitLabel(product.unit)}</p>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-slate-500">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(product.today)} টাকা</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[product.change.dir]}`}
        >
          {changeText(product.change.dir, product.change.pct)}
        </span>
      </div>
    </Link>
  );
}