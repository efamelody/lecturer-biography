import { ExternalLink } from 'lucide-react'
import { getNewsLinkLabel, type NewsItem } from '@/lib/news'
import NewsMeta from './NewsMeta'
import NewsThumbnail from './NewsThumbnail'

type NewsCardVariant = 'featured' | 'compact' | 'standard'

function NewsCardLink({
  item,
  className,
  children,
}: {
  item: NewsItem
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={item.originalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2 ${className}`}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

function CardCta({ item, className = '' }: { item: NewsItem; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium text-[#475569] transition-colors group-hover:text-[#0f172a] motion-reduce:transition-none ${className}`}
    >
      {getNewsLinkLabel(item)}
      <ExternalLink size={11} aria-hidden="true" />
    </span>
  )
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <NewsCardLink item={item} className="rounded-lg">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white transition-colors duration-200 group-hover:border-[#cbd5e1] motion-reduce:transition-none">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f1f5f9]">
          <NewsThumbnail
            item={item}
            priority
            sizes="(min-width: 1024px) 58vw, (min-width: 768px) 100vw, 100vw"
          />
          {item.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-sm bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#475569] backdrop-blur-sm">
              Latest
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <NewsMeta item={item} />
          <h3 className="mt-3 font-serif text-2xl font-bold leading-snug tracking-tight text-[#0f172a] sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">{item.excerpt}</p>
          <CardCta item={item} className="mt-auto pt-5" />
        </div>
      </article>
    </NewsCardLink>
  )
}

function CompactCard({ item }: { item: NewsItem }) {
  return (
    <NewsCardLink
      item={item}
      className="rounded-lg lg:py-6 lg:first:pt-0 lg:last:pb-0"
    >
      <article className="flex h-full gap-4 sm:gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-[#f1f5f9] sm:h-28 sm:w-28">
          <NewsThumbnail item={item} sizes="112px" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <NewsMeta item={item} compact />
          <h3 className="mt-2 font-serif text-base font-bold leading-snug tracking-tight text-[#0f172a] sm:text-lg">
            {item.title}
          </h3>
          <CardCta item={item} className="mt-auto pt-2.5" />
        </div>
      </article>
    </NewsCardLink>
  )
}

function StandardCard({ item }: { item: NewsItem }) {
  return (
    <NewsCardLink item={item} className="rounded-lg">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white transition-colors duration-200 group-hover:border-[#cbd5e1] motion-reduce:transition-none">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f1f5f9]">
          <NewsThumbnail
            item={item}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <NewsMeta item={item} compact />
          <h3 className="mt-2 font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a] sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{item.excerpt}</p>
          <CardCta item={item} className="mt-auto pt-5" />
        </div>
      </article>
    </NewsCardLink>
  )
}

export default function NewsCard({
  item,
  variant = 'standard',
}: {
  item: NewsItem
  variant?: NewsCardVariant
}) {
  if (variant === 'featured') return <FeaturedCard item={item} />
  if (variant === 'compact') return <CompactCard item={item} />
  return <StandardCard item={item} />
}
