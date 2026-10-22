import { ExternalLink } from 'lucide-react'
import { formatMediaDate, type MediaItem } from '@/lib/media'

function Meta({ item }: { item: MediaItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3b82f6]">
        {item.outlet}
      </span>
      <span aria-hidden="true" className="text-[#cbd5e1]">
        &middot;
      </span>
      <time
        dateTime={item.publishedOn ?? item.publishedIn ?? item.publishedYear}
        className="text-[11px] uppercase tracking-[0.12em] text-[#94a3b8]"
      >
        {formatMediaDate(item)}
      </time>
    </div>
  )
}

function LeadStory({ item }: { item: MediaItem }) {
  return (
    <div>
      <Meta item={item} />
      <h3 className="mt-3 font-serif text-2xl font-bold leading-[1.2] tracking-tight text-[#0f172a] sm:text-[2rem]">
        {item.title}
      </h3>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#64748b]">{item.summary}</p>
      {item.url && (
        <span className="mt-5 inline-flex items-center gap-1.5 border-b border-[#0f172a] pb-0.5 text-sm font-medium text-[#0f172a] transition-colors group-hover:border-[#94a3b8] group-hover:text-[#475569] motion-reduce:transition-none">
          Read original article
          <ExternalLink size={13} aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

function SecondaryStory({ item }: { item: MediaItem }) {
  return (
    <div>
      <Meta item={item} />
      <h3 className="mt-2 font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a]">
        {item.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#64748b]">{item.summary}</p>
      {item.url && (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#475569] transition-colors group-hover:text-[#0f172a] motion-reduce:transition-none">
          Read original article
          <ExternalLink size={11} aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

export default function FeaturedMedia({ items }: { items: MediaItem[] }) {
  if (items.length === 0) return null

  const [lead, ...secondary] = items.slice(0, 3)

  return (
    <section
      aria-labelledby="featured-heading"
      className="border-y border-[#e2e8f0] bg-white py-12 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center gap-4">
          <h2
            id="featured-heading"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748b]"
          >
            Featured coverage
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-[#e2e8f0]" />
          <span className="hidden text-[11px] text-[#94a3b8] sm:block">Selected contributions</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:border-r lg:border-[#e2e8f0] lg:pr-10">
            {lead.url ? (
              <a
                href={lead.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-4"
              >
                <LeadStory item={lead} />
              </a>
            ) : (
              <LeadStory item={lead} />
            )}
          </div>

          {secondary.length > 0 && (
            <div className="flex flex-col divide-y divide-[#e2e8f0] lg:col-span-5">
              {secondary.map((item) =>
                item.url ? (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-5 first:pt-0 last:pb-0 first:sm:pt-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-4"
                  >
                    <SecondaryStory item={item} />
                  </a>
                ) : (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0">
                    <SecondaryStory item={item} />
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
