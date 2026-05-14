// app/publications/page.tsx
import { getPublications } from "@/lib/academic";
import { PublicationCard } from "@/components/PublicationCard";

export default async function PublicationsPage() {
  const [mostCited, mostRecent] = await Promise.all([
    getPublications('cited', 5),
    getPublications('recent', 5)
  ]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      {/* SECTION 1: Featured (With Citations) */}
      <section className="mb-20">
        <h2 className="text-2xl font-serif font-bold mb-8">Featured Publications</h2>
        <div className="space-y-2">
          {mostCited.map((paper: any) => (
            <PublicationCard 
              key={paper.id} 
              paper={paper} 
              showCitations={true} // SHOW citations here
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: Recent (No Citations) */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-8">Recent Research</h2>
        <div className="space-y-2">
          {mostRecent.map((paper: any) => (
            <PublicationCard 
              key={paper.id} 
              paper={paper} 
              showCitations={false} // HIDE citations here
            />
          ))}
        </div>
      </section>
    </main>
  );
}