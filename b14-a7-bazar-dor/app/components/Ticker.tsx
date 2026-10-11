import { getProducts } from "@/lib/api";
import { changeText, formatPrice, unitLabel } from "@/lib/format";

const color = {
  up: "text-up",
  down: "text-down",
  flat: "text-ink/60",
};

export default async function Ticker() {
  let products;
  try {
    products = await getProducts();
  } catch {
    return null;
  }

  const items = products.map((p) => (
    <div
      key={p.id}
      className="flex shrink-0 items-center gap-1.5 border-r border-soft py-2 pl-4 pr-4 text-sm"
    >
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span>
        {formatPrice(p.today)} টাকা/{unitLabel(p.unit).replace("প্রতি ", "")}
      </span>
      <span className={`font-semibold ${color[p.change.dir]}`}>
        {changeText(p.change.dir, p.change.pct)}
      </span>
    </div>
  ));

  return (
    <div className="marquee overflow-hidden border-b border-line bg-surface">
      <div className="marquee-track">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}