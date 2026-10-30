import { Suspense } from "react";
import { getAllPublicationsGrouped } from "@/lib/academic";
import PublicationsPageContent from "@/components/PublicationsPageContent";
import { PublicationsListSkeleton } from "@/components/PublicationsSkeleton";

async function PublicationsData() {
  const { years, grouped, topCited } = await getAllPublicationsGrouped();

  return <PublicationsPageContent years={years} grouped={grouped} topCited={topCited} />;
}

export default function SelectedPublications() {
  return (
    <main className="pt-20">
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl md:mb-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#64748b]">Research Output</p>
            <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl">Publications</h1>
            <p className="text-sm text-[#64748b] sm:text-base">Prof. Dr. Mohd Talib Latif consistently ranked <span className="font-medium text-[#0f172a] underline decoration-[#e2e8f0] underline-offset-4">Stanford/Elsevier top 2% of scientists</span></p>
          </div>

          <Suspense fallback={<PublicationsListSkeleton />}>
            <PublicationsData />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
