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

          <div className="mt-16 p-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-center">
            <p className="text-sm text-[#64748b] mb-2">For a complete list of publications, please visit:</p>
            <div className="flex justify-center gap-4 text-sm font-medium text-[#0f172a]">
              <a href="https://www.researchgate.net/profile/Mohd-Talib-Latif" className="hover:text-[#64748b] transition-colors">ResearchGate</a>
              <span className="text-[#cbd5e1]">•</span>
              <a href="https://orcid.org/0000-0003-2339-3321" className="hover:text-[#64748b] transition-colors">ORCID</a>
              <span className="text-[#cbd5e1]">•</span>
              <a href="https://scholar.google.com/citations?user=dfDhReYAAAAJ&hl=en" className="hover:text-[#64748b] transition-colors">Google Scholar</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
