import { ExternalLink, FileText, Presentation } from 'lucide-react'
import {
  formatMediaDate,
  getMediaLinkLabel,
  getMediaTypeLabel,
  type MediaItem,
  type MediaType,
} from '@/lib/media'

const SECTION_DEFINITIONS = [
  {
    id: 'lectures',
    title: 'Highlighted Conferences & Events',
    description: 'Keynote addresses, conference sessions and panel discussions.',
    types: ['event'] as MediaType[],
    Icon: Presentation,
  },
  {
    id: 'policy',
    title: 'Policy & Public Resources',
    description: 'Technical reports and public-facing environmental resources.',
    types: ['report'] as MediaType[],
    Icon: FileText,
  },
]

function EngagementRow({ item }: { item: MediaItem }) {
  const content = (
    <div>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.12em]">
        <span className="font-semibold text-[#3b82f6]">{item.outlet}</span>
        <span aria-hidden="true" className="text-[#cbd5e1]">
          &middot;
        </span>
        <span className="text-[#64748b]">{getMediaTypeLabel(item)}</span>
        <span aria-hidden="true" className="text-[#cbd5e1]">
          &middot;
        </span>
        <time
          dateTime={item.publishedOn ?? item.publishedIn ?? item.publishedYear}
          className="text-[#94a3b8]"
        >
          {formatMediaDate(item)}
        </time>
      </div>

      <h3 className="mt-2 font-serif text-xl font-bold leading-snug tracking-tight text-[#0f172a]">
        {item.title}
      </h3>

      <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-[#64748b]">{item.summary}</p>

      {item.url && (
        <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-[#475569] transition-colors group-hover:text-[#0f172a] motion-reduce:transition-none">
          {getMediaLinkLabel(item)}
          <ExternalLink size={11} aria-hidden="true" />
        </span>
      )}
    </div>
  )

  if (!item.url) {
    return <div className="py-6 first:pt-0 last:pb-0">{content}</div>
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-sm py-6 first:pt-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-4"
    >
      {content}
    </a>
  )
}

export default function EngagementSections({ items }: { items: MediaItem[] }) {
  const sections = SECTION_DEFINITIONS.map((definition) => ({
    ...definition,
    entries: items.filter((item) => definition.types.includes(item.type)),
  })).filter((definition) => definition.entries.length > 0)

  if (sections.length === 0) return null

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {sections.map((group) => {
          const Icon = group.Icon
          return (
            <section
              key={group.id}
              aria-labelledby={`${group.id}-heading`}
              className="border-t border-[#e2e8f0] py-12 first:border-t-0 md:py-14"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#e2e8f0] bg-[#f8fafc]">
                      <Icon size={16} aria-hidden="true" className="text-[#475569]" />
                    </span>
                    <h2
                      id={`${group.id}-heading`}
                      className="font-serif text-2xl font-bold tracking-tight text-[#0f172a]"
                    >
                      {group.title}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#64748b]">
                    {group.description}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <div className="divide-y divide-[#e2e8f0] border-t border-[#e2e8f0]">
                    {group.entries.map((item) => (
                      <EngagementRow key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
