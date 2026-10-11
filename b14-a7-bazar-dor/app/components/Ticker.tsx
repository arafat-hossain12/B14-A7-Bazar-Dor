import { getProducts } from "@/lib/api";
import { changeText, formatPrice, unitLabel } from "@/lib/format";

const color = {
  up: "text-green-400",
  down: "text-red-400",
  flat: "text-slate-400",
};

export default async function Ticker() {
  let products;
  try {
    products = await getProducts();
  } catch {
    return null;
  }

  const items = products.map((p) => (
    <span key={p.id} className="mx-6 inline-flex items-center gap-2 text-sm">
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-slate-300">
        {formatPrice(p.today)} টাকা/{unitLabel(p.unit).replace("প্রতি ", "")}
      </span>
      <span className={color[p.change.dir]}>
        {changeText(p.change.dir, p.change.pct)}
      </span>
    </span>
  ));

  return (
    <div className="marquee overflow-hidden bg-slate-900 py-2 text-white">
      <div className="marquee-track">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}