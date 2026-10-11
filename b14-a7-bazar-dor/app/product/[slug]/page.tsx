import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { changeText, formatPrice, toBn, unitLabel } from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?redirected=1&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const min = Math.min(...product.markets.map((m) => m.min));
  const max = Math.max(...product.markets.map((m) => m.max));
  const avg = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  const divisions = product.markets.reduce<Record<string, typeof product.markets>>(
    (acc, m) => {
      (acc[m.division] ||= []).push(m);
      return acc;
    },
    {}
  );

  const dirColor = {
    up: "text-green-600",
    down: "text-red-600",
    flat: "text-slate-500",
  }[product.change.dir];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/" className="text-sm text-green-700 hover:underline">
        ← হোমে ফিরে যান
      </Link>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-5xl">
            {product.image}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{product.nameBn}</h1>
            <p className="mt-1 text-slate-500">
              আজকের গড় দাম {formatPrice(product.today)} টাকা,{" "}
              {unitLabel(product.unit)}।{" "}
              <span className={dirColor}>
                {changeText(product.change.dir, product.change.pct)}
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="badge badge-success badge-outline">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="badge badge-outline">{unitLabel(product.unit)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="সর্বনিম্ন দাম" value={`${formatPrice(min)} টাকা`} />
          <Stat label="সর্বোচ্চ দাম" value={`${formatPrice(max)} টাকা`} />
          <Stat label="গড় দাম" value={`${formatPrice(avg)} টাকা`} />
          <Stat label="আজকের দাম" value={`${formatPrice(product.today)} টাকা`} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <Past label="গতকাল" v={product.yesterday} />
          <Past label="গত সপ্তাহ" v={product.lastWeek} />
          <Past label="গত মাস" v={product.lastMonth} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="space-y-6">
          {Object.entries(divisions).map(([division, markets]) => (
            <div key={division}>
              <h3 className="mb-2 font-semibold text-green-700">📍 {division} বিভাগ</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {markets.map((m) => (
                  <div
                    key={m.market}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="font-medium">{m.market}</span>
                    <span className="text-sm text-slate-600">
                      {toBn(m.min)} – {toBn(m.max)} টাকা
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-green-50 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-green-700">{value}</p>
    </div>
  );
}

function Past({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold">{formatPrice(v)} টাকা</p>
    </div>
  );
}