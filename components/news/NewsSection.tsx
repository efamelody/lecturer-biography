import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getLatestNews } from '@/lib/news'
import NewsCard from './NewsCard'

export default function NewsSection() {
  const items = getLatestNews(4)
  if (items.length === 0) return null

  const [featured, ...rest] = items

  return (
    <section
      id="news"
      aria-labelledby="latest-news-heading"
      className="border-t border-[#e2e8f0] bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
              Newsroom
            </p>
            <h2
              id="latest-news-heading"
              className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl"
            >
              Latest News &amp; Activities
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:text-[15px]">
              Discover the latest research activities, academic engagements and contributions from
              Prof. Dr. Mohd Talib Latif and the UKM Atmosphere research community.
            </p>
          </div>

          <Link
            href="/activities"
            className="inline-flex shrink-0 items-center gap-1.5 self-start border-b border-[#cbd5e1] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569] transition-colors hover:border-[#0f172a] hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-4 md:self-auto"
          >
            View all updates
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <NewsCard item={featured} variant="featured" />
          </div>

          {rest.length > 0 && (
            <div className="lg:col-span-5">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-[#e2e8f0]">
                {rest.map((item) => (
                  <NewsCard key={item.id} item={item} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
