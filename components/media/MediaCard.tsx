import { ExternalLink } from 'lucide-react'
import { formatMediaDate, getMediaLinkLabel, type MediaItem } from '@/lib/media'

export function TopicTag({ topic }: { topic: string }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-[#e2e8f0] bg-[#f8fafc] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#64748b]">
      {topic}
    </span>
  )
}

export default function MediaCard({ item }: { item: MediaItem }) {
  const card = (
    <article className="flex h-full flex-col rounded-lg border border-[#e2e8f0] bg-white p-5 transition-colors duration-200 group-hover:border-[#cbd5e1] motion-reduce:transition-none sm:p-6">
      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3b82f6]">
            {item.outlet}
          </span>
          <time
            dateTime={item.publishedOn ?? item.publishedIn ?? item.publishedYear}
            className="text-[11px] text-[#94a3b8]"
          >
            {formatMediaDate(item)}
          </time>
        </div>

        <h3 className="font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a]">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{item.summary}</p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#f1f5f9] pt-4">
        <TopicTag topic={item.primaryTopic} />
        {item.url ? (
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#475569] transition-colors group-hover:text-[#0f172a] motion-reduce:transition-none">
            {getMediaLinkLabel(item)}
            <ExternalLink size={12} aria-hidden="true" />
          </span>
        ) : (
          <span className="shrink-0 text-[11px] text-[#94a3b8]">Link pending</span>
        )}
      </div>
    </article>
  )

  if (!item.url) {
    return <div className="h-full">{card}</div>
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2"
    >
      {card}
    </a>
  )
}
