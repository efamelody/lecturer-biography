import type { Metadata } from 'next'
import FacebookFeed from '@/components/news/FacebookFeed'
import Newsroom from '@/components/news/Newsroom'
import SocialFollowLinks from '@/components/news/SocialFollowLinks'
import TalksSection from '@/components/activities/TalksSection'
import { getPublishedNewsItems } from '@/lib/news'

const pageTitle = 'News & Activities'
const pageDescription =
  'Recent research activities, academic engagements, conference participation, media commentary and research group announcements from Prof. Dr. Mohd Talib Latif and the UKM Atmosphere research community.'
const canonicalUrl = 'https://talib-latif.com/activities'

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

export default function ActivitiesPage() {
  const items = getPublishedNewsItems()

  return (
    <main className="bg-[#f8fafc]">
      <section className="pt-28 pb-12 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]">
            Activities
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#0f172a] md:text-5xl">
            News &amp; Activities
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Discover the latest research activities, academic engagements and contributions from
            Prof. Dr. Mohd Talib Latif and the UKM Atmosphere research community.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="all-updates-heading"
        className="border-t border-[#e2e8f0] bg-white py-14 md:py-16"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
              All updates
            </p>
            <h2
              id="all-updates-heading"
              className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
            >
              Recent updates
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
              Curated academic engagements, research activities, media commentary and research
              group announcements.
            </p>
          </div>

          {items.length > 0 ? (
            <Newsroom items={items} />
          ) : (
            <p className="rounded-lg border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-6 py-12 text-center text-sm text-[#64748b]">
              Updates are being curated. Please check back soon.
            </p>
          )}
        </div>
      </section>

      <TalksSection />
      <FacebookFeed />
      <SocialFollowLinks />
    </main>
  )
}
