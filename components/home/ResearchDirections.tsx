import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PlaceholderFigure from '@/components/ui/PlaceholderFigure'
import { getResearchContent } from '@/lib/research'

export default function ResearchDirections() {
  const { themes } = getResearchContent()

  return (
    <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Research directions"
          title="Research themes and expertise"
          description="The group's work connects molecular-level atmospheric chemistry to regional air quality, climate and human exposure."
          action={
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 border-b border-[#cbd5e1] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569] transition-colors hover:border-[#0f172a] hover:text-[#0f172a]"
            >
              Explore research
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.slice(0, 6).map((theme) => (
            <Link
              key={theme.slug}
              href={`/research#${theme.slug}`}
              className="group flex h-full flex-col border border-[#e2e8f0] bg-white transition-colors hover:border-[#94a3b8]"
            >
              <PlaceholderFigure
                src={theme.image}
                alt={`Illustrative placeholder for ${theme.title}`}
                className="aspect-[16/10]"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a] group-hover:text-[#0f766e]">
                  {theme.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748b]">
                  {theme.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {theme.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="border border-[#d6e8e5] bg-[#f0f7f6] px-2 py-1 text-[10px] font-medium leading-none text-[#0f5f59]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
