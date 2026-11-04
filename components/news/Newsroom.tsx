import { ExternalLink } from 'lucide-react'
import { formatNewsDate, getNewsLinkLabel, type NewsItem } from '@/lib/news'
import NewsThumbnail from './NewsThumbnail'

function Meta({ item }: { item: NewsItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.12em]">
      <span className="font-semibold text-[#3b82f6]">{item.source}</span>
      <span aria-hidden="true" className="text-[#cbd5e1]">
        ·
      </span>
      <span className="text-[#64748b]">{item.category}</span>
      <span aria-hidden="true" className="text-[#cbd5e1]">
        ·
      </span>
      <time dateTime={item.date} className="text-[#94a3b8]">
        {formatNewsDate(item)}
      </time>
    </div>
  )
}

export default function Newsroom({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null

  const [featured, ...rest] = items

  return (
    <div>
      <article className="grid gap-8 border-b border-[#e2e8f0] pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
        <a
          href={featured.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-4"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f1f5f9]">
            <NewsThumbnail
              item={featured}
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </div>
        </a>

        <div className="min-w-0">
          <Meta item={featured} />
          <h2 className="mt-3 font-serif text-2xl font-bold leading-snug tracking-tight text-[#0f172a] md:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
            {featured.excerpt}
          </p>
          <a
            href={featured.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f172a] transition-colors hover:text-[#0f766e]"
          >
            {getNewsLinkLabel(featured)}
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </article>

      {rest.length > 0 && (
        <ul className="divide-y divide-[#e2e8f0] border-b border-[#e2e8f0]">
          {rest.map((item) => (
            <li key={item.id}>
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-2 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-4 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
              >
                <div className="text-xs leading-relaxed text-[#64748b]">
                  <p className="font-semibold text-[#475569]">{item.source}</p>
                  <p className="mt-1">{formatNewsDate(item)}</p>
                  <p className="mt-1 uppercase tracking-[0.1em] text-[#94a3b8]">{item.category}</p>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold leading-snug text-[#0f172a]">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#64748b]">
                    {item.excerpt}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#475569]">
                    {getNewsLinkLabel(item)}
                    <ExternalLink size={11} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
