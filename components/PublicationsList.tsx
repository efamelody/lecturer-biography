import { ExternalLink } from 'lucide-react';
import { getTopPublications, formatCitationCount } from '@/lib/academic';

const DOI_BASE = "https://doi.org";

export default async function PublicationsList() {
  const publications = await getTopPublications(10);

  return (
    <div className="space-y-0">
      {publications.map((pub) => (
        <div
          key={pub.id}
          className="group flex items-start gap-4 py-5 border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f8fafc] hover:px-4 hover:-mx-4 rounded transition-all duration-200"
        >
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] group-hover:bg-[#0f172a] transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs font-medium text-[#94a3b8] shrink-0">{pub.year}</span>
              <h3 className="text-sm font-medium text-[#0f172a] leading-snug">
                {pub.doi ? (
                  <a href={`${DOI_BASE}/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#475569] transition-colors">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748b]">
              {pub.journal && <span className="italic">{pub.journal}</span>}
              <span className="text-[#cbd5e1]">/</span>
              <span>{pub.authors}</span>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#64748b] bg-[#f1f5f9] px-2 py-1 rounded">
              {formatCitationCount(pub.citedByCount)} cites
            </span>
            {pub.doi && (
              <a
                href={`${DOI_BASE}/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 opacity-0 group-hover:opacity-100 hover:bg-[#f1f5f9] rounded-lg transition-all duration-200"
              >
                <ExternalLink size={14} className="text-[#94a3b8]" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
