import { Suspense } from "react";
import HeroBanner from "./components/HeroBanner";
import HomeSections from "./components/HomeSections";
import { GridSkeleton } from "./components/Skeletons";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-8">
            <GridSkeleton count={6} />
          </div>
        }
      >
        <HomeSections />
      </Suspense>
    </>
  );
}