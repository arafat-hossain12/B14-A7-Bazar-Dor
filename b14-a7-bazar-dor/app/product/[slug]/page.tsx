import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { changeText, formatPrice, toBn, unitLabel } from "@/lib/format";

const bnNum = (n: number) => (Number.isInteger(n) ? toBn(n) : toBn(n.toFixed(2)));

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/signin?redirected=1&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const unit = unitLabel(product.unit).replace("প্রতি ", "");
  const min = Math.min(...product.markets.map((m) => m.min));
  const max = Math.max(...product.markets.map((m) => m.max));
  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);
  const avg = Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length);

  const diff = product.today - product.yesterday;
  const verb = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত";
  const tone = { up: "text-up", down: "text-down", flat: "text-ink" }[
    product.change.dir
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:underline">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span>{product.nameBn}</span>
      </nav>

      <section className="flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-5 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-soft text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{product.nameBn}</h1>
            <p className="text-sm text-ink/70">
              {unitLabel(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম <b>{verb}</b>
              {diff !== 0 && <> · {toBn(Math.abs(diff))} টাকা</>}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-soft px-6 py-4 text-center">
          <p className="text-sm text-ink/70">আজকের দাম</p>
          <p className="text-4xl font-bold">{formatPrice(product.today)}</p>
          <p className="text-sm text-ink/70">টাকা / {unit}</p>
          <p className={`mt-1 text-sm font-semibold ${tone}`}>
            {changeText(product.change.dir, product.change.pct)}
          </p>
        </div>
      </section>

      <section className="space-y-8 rounded-2xl border border-line bg-surface p-5">
        <div>
          <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Stat label="সর্বনিম্ন দাম" value={formatPrice(min)} note="সবচেয়ে কম দামের বাজার" color="text-down" />
            <Stat label="সর্বাধিক দাম" value={formatPrice(max)} note="সবচেয়ে বেশি দামের বাজার" color="text-up" />
            <Stat label="গড় দাম" value={formatPrice(avg)} note={`প্রতি ${unit}-এর হিসাবে`} color="text-down" />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-ink/60">
                  <th className="px-4 py-3 text-left font-semibold">বাজার</th>
                  <th className="px-4 py-3 text-left font-semibold">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-semibold">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-semibold">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.market}
                    className={`border-b border-ink/80 last:border-b-0 ${
                      i % 2 === 1 ? "bg-soft" : ""
                    }`}
                  >
                    <td className="px-4 py-3">{r.market}</td>
                    <td className="px-4 py-3">{r.division}</td>
                    <td className="px-4 py-3 text-right">{toBn(r.min)} টাকা</td>
                    <td className="px-4 py-3 text-right">{toBn(r.max)} টাকা</td>
                    <td className="px-4 py-3 text-right font-bold">{bnNum(r.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-xs">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>
        {value} <span className="text-base font-medium">টাকা</span>
      </p>
      <p className="text-xs text-ink/70">{note}</p>
    </div>
  );
}