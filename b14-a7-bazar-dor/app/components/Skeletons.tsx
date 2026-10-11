export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="skeleton h-16 w-16" />
      <div className="skeleton mt-3 h-5 w-3/4" />
      <div className="skeleton mt-2 h-4 w-1/3" />
      <div className="mt-4 flex justify-between">
        <div className="skeleton h-8 w-1/3" />
        <div className="skeleton h-6 w-16" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}