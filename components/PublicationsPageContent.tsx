"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Publication } from "@/lib/academic";
import { formatCitationCount } from "@/lib/academic";

const DOI_BASE = "https://doi.org";

function PubRow({ pub, showCitations = true }: { pub: Publication; showCitations?: boolean }) {
  return (
    <div className="group flex items-start gap-4 py-5 border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f8fafc] hover:px-4 hover:-mx-4 rounded transition-all duration-200">
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
        {showCitations && (
          <span className="text-[10px] font-semibold text-[#64748b] bg-[#f1f5f9] px-2 py-1 rounded">
            {formatCitationCount(pub.citedByCount)} cites
          </span>
        )}
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
  );
}

export default function PublicationsPageContent({
  years,
  grouped,
  topCited,
}: {
  years: number[];
  grouped: Record<number, Publication[]>;
  topCited: Publication[];
}) {
  const [activeTab, setActiveTab] = useState<"most-cited" | number>("most-cited");

  const publications = activeTab === "most-cited" ? topCited : grouped[activeTab] || [];
  const header = activeTab === "most-cited" ? "Most Cited" : `Publications — ${activeTab}`;

  return (
    <div className="flex gap-10">
      <aside className="w-44 shrink-0">
        <nav className="sticky top-24 space-y-0.5">
          <button
            onClick={() => setActiveTab("most-cited")}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              activeTab === "most-cited"
                ? "bg-[#f1f5f9] text-[#0f172a] border-l-2 border-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
            }`}
          >
            Most Cited
          </button>
          <div className="border-t border-[#e2e8f0] my-2" />
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveTab(year)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-between ${
                activeTab === year
                  ? "bg-[#f1f5f9] text-[#0f172a] border-l-2 border-[#0f172a]"
                  : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
              }`}
            >
              <span>{year}</span>
              <span className="text-[10px] text-[#94a3b8] font-normal">{grouped[year].length}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#0f172a] tracking-tight">{header}</h2>
          <p className="text-sm text-[#64748b] mt-1">
            {activeTab === "most-cited"
              ? "Highest impact works ranked by citation count"
              : `${grouped[activeTab]?.length || 0} publications from ${activeTab}`}
          </p>
        </div>

        <div className="space-y-0">
          {publications.length > 0 ? (
            publications.map((pub) => <PubRow key={pub.id} pub={pub} showCitations={activeTab === "most-cited"} />)
          ) : (
            <p className="text-sm text-[#64748b] py-8 text-center">No publications found.</p>
          )}
        </div>

        <div className="mt-12 p-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-center">
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
    </div>
  );
}
