import { ExternalLink } from 'lucide-react';
import publicationsData from '@/content/selected-publications.json';

export default function SelectedPublications() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Research Output</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">Selected Publications</h1>
            <p className="text-[#64748b]">A curated collection of notable research works</p>
          </div>

          <div className="space-y-0">
            {publicationsData.map((pub, index) => (
              <div
                key={pub.id}
                className="group flex items-start gap-4 py-5 border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f8fafc] hover:px-4 hover:-mx-4 rounded transition-all duration-200"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] group-hover:bg-[#0f172a] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-[#0f172a] mb-1 leading-snug">{pub.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748b]">
                    <span className="italic">{pub.journal}</span>
                    <span className="text-[#cbd5e1]">/</span>
                    <span>{pub.year}</span>
                    <span className="text-[#cbd5e1]">/</span>
                    <span>{pub.authors}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 p-2 opacity-0 group-hover:opacity-100 hover:bg-[#f1f5f9] rounded-lg transition-all duration-200">
                  <ExternalLink size={16} className="text-[#94a3b8]" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-center">
            <p className="text-sm text-[#64748b] mb-2">For a complete list of publications, please visit:</p>
            <div className="flex justify-center gap-4 text-sm font-medium text-[#0f172a]">
              <a href="#" className="hover:text-[#64748b] transition-colors">ResearchGate</a>
              <span className="text-[#cbd5e1]">•</span>
              <a href="#" className="hover:text-[#64748b] transition-colors">ORCID</a>
              <span className="text-[#cbd5e1]">•</span>
              <a href="#" className="hover:text-[#64748b] transition-colors">Google Scholar</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
