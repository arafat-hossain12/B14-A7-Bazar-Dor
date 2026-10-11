import Link from "next/link";
import { Product } from "@/lib/api";
import { changeText, formatPrice, unitLabel } from "@/lib/format";

const tone = {
  up: "text-up",
  down: "text-down",
  flat: "text-ink",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-soft text-2xl">
          {product.image}
        </div>
        <div>
          <p className="text-base font-semibold leading-6">{product.nameBn}</p>
          <p className="text-xs leading-4">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs leading-4">আজকের দাম</p>
          <p>
            <span className="text-xl font-bold">{formatPrice(product.today)} </span>
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <span
          className={`rounded-xl bg-soft px-2 py-1 text-xs font-semibold ${tone[product.change.dir]}`}
        >
          {changeText(product.change.dir, product.change.pct)}
        </span>
      </div>
    </Link>
  );
}