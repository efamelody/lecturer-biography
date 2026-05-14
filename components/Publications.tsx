import { ExternalLink } from 'lucide-react';

const publications = [
  {
    title: 'Chemical characterization and source apportionment of PM2.5 during Southeast Asian haze episodes',
    journal: 'Atmospheric Environment',
    year: '2025',
    authors: 'Latif, M.T., et al.',
  },
  {
    title: 'Temporal variations of surface ozone and its precursors in urban and rural areas of Malaysia',
    journal: 'Science of the Total Environment',
    year: '2025',
    authors: 'Latif, M.T., Baharudin, N.H., et al.',
  },
  {
    title: 'Air quality assessment during COVID-19 lockdown: implications for future environmental policies',
    journal: 'Environmental Research',
    year: '2025',
    authors: 'Khan, M.F., Latif, M.T., et al.',
  },
  {
    title: 'Marine aerosol properties in the sea-surface microlayer of tropical waters',
    journal: 'Atmospheric Chemistry and Physics',
    year: '2024',
    authors: 'Latif, M.T., Mahmud, M., et al.',
  },
  {
    title: 'Long-term trends in air quality and meteorological parameters in Southeast Asia',
    journal: 'Environmental Pollution',
    year: '2024',
    authors: 'Latif, M.T., et al.',
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-20 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Recent Works</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight">
            Selected Publications
          </h2>
        </div>
        <div className="space-y-0">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 py-5 border-b border-[#e2e8f0] last:border-b-0 hover:bg-white hover:px-4 hover:-mx-4 rounded transition-all duration-200"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] group-hover:bg-[#0f172a] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-[#0f172a] mb-1 leading-snug group-hover:text-[#0f172a] transition-colors">
                  {pub.title}
                </h3>
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
        <div className="text-center mt-12">
          <a
            href="/publications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] transition-colors shadow-sm"
          >
            View All Publications
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
