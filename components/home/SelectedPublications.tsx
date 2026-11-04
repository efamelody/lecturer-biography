import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { formatCitationCount, getHighlightPublications } from '@/lib/academic'

export default async function SelectedPublications() {
  const publications = await getHighlightPublications(5)

  return (
    <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Selected publications"
          title="Representative research outputs"
          description="A selection of highly cited and recent work. The full journal record is available in the publications explorer."
          action={
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 border-b border-[#cbd5e1] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569] transition-colors hover:border-[#0f172a] hover:text-[#0f172a]"
            >
              All publications
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-8 divide-y divide-[#e2e8f0] border-y border-[#e2e8f0] bg-white">
          {publications.map((publication) => (
            <article
              key={publication.id}
              className="grid gap-3 px-5 py-5 md:grid-cols-[4.5rem_1fr_auto] md:items-start md:gap-5"
            >
              <span className="text-xs font-medium text-[#94a3b8]">{publication.year}</span>
              <div className="min-w-0">
                <h3 className="text-sm font-medium leading-snug text-[#0f172a]">
                  {publication.doi ? (
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[#0f766e]"
                    >
                      {publication.title}
                    </a>
                  ) : (
                    publication.title
                  )}
                </h3>
                {publication.journal && (
                  <p className="mt-1 text-xs italic text-[#64748b]">{publication.journal}</p>
                )}
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                {publication.citedByCount != null && (
                  <span className="border border-[#e2e8f0] bg-[#f8fafc] px-2 py-1 text-[10px] font-semibold text-[#64748b]">
                    {formatCitationCount(publication.citedByCount)} cites
                  </span>
                )}
                {publication.doi && (
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${publication.title} on DOI`}
                    className="text-[#94a3b8] transition-colors hover:text-[#0f172a]"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
