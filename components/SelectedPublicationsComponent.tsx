import PublicationsList from '@/components/PublicationsList';

export default function SelectedPublications() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Research Output</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">Top-Cited Publications</h1>
            <p className="text-[#64748b]">Highest impact works ranked by citation count — data via OpenAlex</p>
          </div>

          <PublicationsList />
        </div>
      </section>
    </main>
  );
}
