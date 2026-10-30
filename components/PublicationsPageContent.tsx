"use client";

import { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import type { Publication, PublicationAuthor } from "@/lib/academic";
import { formatCitationCount } from "@/lib/academic";

const DOI_BASE = "https://doi.org";
const COLLAPSED_AUTHOR_COUNT = 6;

function AuthorName({ author }: { author: PublicationAuthor }) {
  return (
    <span
      className={
        author.isProfileAuthor
          ? "font-semibold text-[#0f172a] bg-[#f1f5f9] px-1 rounded"
          : undefined
      }
    >
      {author.name}
    </span>
  );
}

function AuthorList({ authors }: { authors: PublicationAuthor[] }) {
  const [expanded, setExpanded] = useState(false);

  if (!authors || authors.length === 0) return null;

  if (authors.length <= COLLAPSED_AUTHOR_COUNT) {
    return (
      <span>
        {authors.map((author, index) => (
          <span key={`${author.name}-${index}`}>
            {index > 0 && ", "}
            <AuthorName author={author} />
          </span>
        ))}
      </span>
    );
  }

  const profileIndex = authors.findIndex((author) => author.isProfileAuthor);
  const profileAuthor = profileIndex >= 0 ? authors[profileIndex] : null;
  const visible = expanded ? authors : authors.slice(0, COLLAPSED_AUTHOR_COUNT);
  const showProfileSeparately = !expanded && profileIndex >= COLLAPSED_AUTHOR_COUNT;

  return (
    <span>
      {visible.map((author, index) => (
        <span key={`${author.name}-${index}`}>
          {index > 0 && ", "}
          <AuthorName author={author} />
        </span>
      ))}
      {showProfileSeparately && profileAuthor && (
        <>
          , … <AuthorName author={profileAuthor} />
        </>
      )}
      {!expanded && <span> et al. ({authors.length} authors)</span>}
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="ml-2 text-[11px] font-medium text-[#0f172a] underline underline-offset-2 hover:text-[#475569]"
      >
        {expanded ? "Show fewer" : "Show all authors"}
      </button>
    </span>
  );
}

function PubRow({ pub, showCitations = true }: { pub: Publication; showCitations?: boolean }) {
  return (
    <div className="group flex flex-wrap items-start gap-x-3 gap-y-2 rounded border-b border-[#e2e8f0] py-4 transition-all duration-200 last:border-b-0 hover:bg-[#f8fafc] sm:flex-nowrap sm:gap-x-4 sm:py-5 sm:hover:-mx-4 sm:hover:px-4">
      <div className="mt-1.5 flex-shrink-0">
        <div className="h-1.5 w-1.5 rounded-full bg-[#94a3b8] transition-colors group-hover:bg-[#0f172a]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-baseline gap-2">
          <span className="shrink-0 text-xs font-medium text-[#94a3b8]">{pub.year}</span>
          <h3 className="text-sm font-medium leading-snug text-[#0f172a] break-words [overflow-wrap:anywhere]">
            {pub.doi ? (
              <a href={`${DOI_BASE}/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#475569]">
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
          {pub.authorList?.length ? (
            <AuthorList authors={pub.authorList} />
          ) : (
            <span>{pub.authors}</span>
          )}
        </div>
      </div>
      <div className="flex basis-full items-center gap-2 pl-[1.125rem] sm:basis-auto sm:flex-shrink-0 sm:pl-0">
        {showCitations && pub.citedByCount != null && (
          <span className="rounded bg-[#f1f5f9] px-2 py-1 text-[10px] font-semibold text-[#64748b]">
            {formatCitationCount(pub.citedByCount)} cites
          </span>
        )}
        {pub.doi && (
          <a
            href={`${DOI_BASE}/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${pub.title} on DOI`}
            className="rounded-lg p-2 opacity-100 transition-all duration-200 hover:bg-[#f1f5f9] focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
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
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
      <aside className="w-full lg:w-44 lg:shrink-0">
        <nav
          aria-label="Publication filters"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:sticky lg:top-24 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          <button
            onClick={() => setActiveTab("most-cited")}
            className={`shrink-0 whitespace-nowrap rounded border px-3 py-2 text-left text-sm font-medium transition-colors lg:w-full lg:border-0 lg:border-l-2 ${
              activeTab === "most-cited"
                ? "border-[#0f172a] bg-[#f1f5f9] text-[#0f172a] lg:border-[#0f172a]"
                : "border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a] lg:border-transparent"
            }`}
          >
            Most Cited
          </button>
          <div className="my-2 hidden border-t border-[#e2e8f0] lg:block" />
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveTab(year)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded border px-3 py-2 text-left text-sm font-medium transition-colors lg:w-full lg:justify-between lg:border-0 lg:border-l-2 ${
                activeTab === year
                  ? "border-[#0f172a] bg-[#f1f5f9] text-[#0f172a] lg:border-[#0f172a]"
                  : "border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a] lg:border-transparent"
              }`}
            >
              <span>{year}</span>
              <span className="text-[10px] font-normal text-[#94a3b8]">{grouped[year].length}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-5 sm:mb-6">
          <h2 className="font-serif text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl">{header}</h2>
          <div className="mt-1 flex items-center gap-2">
            <p className="min-w-0 text-sm text-[#64748b]">
              {activeTab === "most-cited"
                ? "Highest impact works ranked by citation count"
                : `${grouped[activeTab]?.length || 0} publications from ${activeTab}`}
            </p>
            <span className="group relative inline-flex shrink-0 items-center">
              <span
                tabIndex={0}
                role="note"
                aria-label="Verified against Scopus and ORCID"
                aria-describedby="verification-note"
                className="inline-flex cursor-help items-center justify-center rounded-full p-0.5 text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#64748b] focus:outline-none focus-visible:text-[#0f172a]"
              >
                <Info size={14} aria-hidden="true" />
              </span>
              <div
                id="verification-note"
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-6 z-20 w-64 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md bg-[#0f172a] px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 sm:left-0 sm:translate-x-0"
              >
                Verified against Scopus and ORCID
              </div>
            </span>
          </div>
        </div>

        <div className="space-y-0">
          {publications.length > 0 ? (
            publications.map((pub) => <PubRow key={pub.id} pub={pub} showCitations={activeTab === "most-cited"} />)
          ) : (
            <p className="py-8 text-center text-sm text-[#64748b]">No publications found.</p>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 text-center sm:mt-12 sm:p-6">
          <p className="mb-2 text-sm text-[#64748b]">For the full profiles, please visit:</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-[#0f172a]">
            <a href="https://www.scopus.com/authid/detail.uri?authorId=57218373467" className="hover:text-[#64748b] transition-colors">Scopus</a>
            <span className="text-[#cbd5e1]">•</span>
            <a href="https://orcid.org/0000-0003-2339-3321" className="hover:text-[#64748b] transition-colors">ORCID</a>
            <span className="text-[#cbd5e1]">•</span>
            <a href="https://www.researchgate.net/profile/Mohd-Talib-Latif" className="hover:text-[#64748b] transition-colors">ResearchGate</a>
            <span className="text-[#cbd5e1]">•</span>
            <a href="https://scholar.google.com/citations?user=dfDhReYAAAAJ&hl=en" className="hover:text-[#64748b] transition-colors">Google Scholar</a>
          </div>
        </div>
      </div>
    </div>
  );
}
