import { Suspense } from "react";
import { getAllPublicationsGrouped } from "@/lib/academic";
import { getBooksAndChapters, getConferenceProceedings } from "@/lib/publications-extra";
import { getContent } from "@/lib/content";
import PublicationsPageContent from "@/components/PublicationsPageContent";
import { PublicationsListSkeleton } from "@/components/PublicationsSkeleton";

async function PublicationsData() {
  const [{ years, grouped, topCited }, profile] = await Promise.all([
    getAllPublicationsGrouped(),
    getContent("profile"),
  ]);

  return (
    <PublicationsPageContent
      years={years}
      grouped={grouped}
      topCited={topCited}
      proceedings={getConferenceProceedings()}
      books={getBooksAndChapters()}
      metrics={profile.metrics ?? []}
    />
  );
}

export default function SelectedPublications() {
  return (
    <main className="pt-20">
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#64748b]">Research Output</p>
            <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl">Publications</h1>
            <p className="text-sm leading-relaxed text-[#64748b] sm:text-base">
              Journal articles are verified against Scopus and ORCID. Conference proceedings and
              books are transcribed from the CV. Prof. Dr. Mohd Talib Latif is consistently ranked
              in the Stanford/Elsevier top 2% of scientists.
            </p>
          </div>

          <Suspense fallback={<PublicationsListSkeleton />}>
            <PublicationsData />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
