interface PublicationCardProps {
  paper: any;
  showCitations?: boolean; // Optional prop, defaults to false
}

export function PublicationCard({ paper, showCitations = false }: PublicationCardProps) {
  return (
    <div className="group py-6 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors px-4 rounded-lg">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {paper.publication_year}
            </span>
            {paper.open_access?.is_oa && (
              <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100 font-medium">
                Open Access
              </span>
            )}
          </div>
          <h3 className="text-lg font-serif font-semibold text-slate-900 leading-snug group-hover:text-blue-800 transition-colors">
            <a href={paper.doi} target="_blank" rel="noopener noreferrer">
              {paper.title}
            </a>
          </h3>
          <p className="text-sm text-slate-500 mt-2 italic font-medium">
            {paper.primary_location?.source?.display_name || "International Journal"}
          </p>
        </div>
        
        {/* Only show this block if showCitations is true */}
        {showCitations && (
          <div className="hidden sm:flex flex-col items-center justify-center bg-white border border-slate-200 rounded-lg py-2 px-4 shadow-sm min-w-[90px]">
            <span className="text-xl font-bold text-slate-900">{paper.cited_by_count}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Citations</span>
          </div>
        )}
      </div>
    </div>
  );
}