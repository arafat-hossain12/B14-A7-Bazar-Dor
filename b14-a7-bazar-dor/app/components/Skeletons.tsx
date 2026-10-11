export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex gap-3">
        <div className="skeleton size-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-3/4" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-24" />
        </div>
        <div className="skeleton h-6 w-16 rounded-xl" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}