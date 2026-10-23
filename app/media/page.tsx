import type { Metadata } from 'next'
import MediaComponent from '@/components/MediaComponent'
import EngagementSections from '@/components/media/EngagementSections'
import MediaArchive from '@/components/media/MediaArchive'
import MediaHero from '@/components/media/MediaHero'
import PressClippings from '@/components/media/PressClippings'
import { getPublishedMediaItems } from '@/lib/media'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const pageTitle = 'Media & Public Engagement'
const pageDescription =
  'Selected media coverage, broadcasts, public lectures and policy resources featuring Professor Dr. Mohd Talib Latif on air quality, atmospheric chemistry, transboundary haze and climate change.'
const canonicalUrl = 'https://talib-latif.com/media'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: canonicalUrl,
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
  },
}

export default function MediaPage() {
  const items = getPublishedMediaItems()
  const news = items.filter((item) => item.type === 'news')
  const broadcasts = items.filter((item) => item.type === 'video' || item.type === 'interview')
  const events = items.filter((item) => item.type === 'event')
  const reports = items.filter((item) => item.type === 'report')
  const featured = items.filter((item) => item.featured && item.type === 'news').slice(0, 3)

  return (
    <main className="bg-[#f8fafc]">
      <MediaHero
        newsCount={news.length}
        broadcastCount={broadcasts.length}
        eventCount={events.length}
        reportCount={reports.length}
      />

      {/* <FeaturedMedia items={featured} /> */}

      <section
        aria-labelledby="archive-heading"
        className="bg-[#f8fafc] py-14 md:py-16"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
              Archive
            </p>
            <h2
              id="archive-heading"
              className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
            >
              In the News
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
              Newspaper articles, online reports and expert commentary featuring Professor Latif.
              Filter by topic, outlet or year, or search the full archive.
            </p>
          </div>

          <MediaArchive items={news} />
        </div>
      </section>

      <PressClippings />

      <EngagementSections items={items} />

      {/* <section
        aria-labelledby="media-gallery-heading"
        className="border-t border-[#e2e8f0] bg-[#f8fafc] py-14 md:py-16"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
              Archive Gallery
            </p>
            <h2
              id="media-gallery-heading"
              className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
            >
              Photographs &amp; Coverage
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
              Photographs and coverage records from media appearances, interviews and public
              events.
            </p>
          </div>

          <MediaComponent />
        </div>
      </section> */}
    </main>
  )
}
