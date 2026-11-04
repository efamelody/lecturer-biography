import { ExternalLink, Facebook } from 'lucide-react'
import { FACEBOOK_PAGE_PLUGIN_URL, FACEBOOK_PAGE_URL } from '@/lib/news'

export default function FacebookFeed() {
  return (
    <section
      aria-labelledby="facebook-feed-heading"
      className="border-t border-[#e2e8f0] bg-[#f8fafc] py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
              Live from Facebook
            </p>
            <h2
              id="facebook-feed-heading"
              className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
            >
              UKM Atmosphere on Facebook
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#64748b]">
              Recent activity from the UKM Atmosphere research community, loaded directly from
              Facebook. If the timeline is unavailable, use the link below.
            </p>

            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-[#e2e8f0] bg-white px-4 py-2.5 text-xs font-medium text-[#475569] transition-colors hover:border-[#94a3b8] hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2"
            >
              <Facebook size={13} aria-hidden="true" />
              Open the Facebook page
              <ExternalLink size={11} aria-hidden="true" />
            </a>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#94a3b8]">
              Facebook content is provided by Meta and may be blocked by privacy settings or ad
              blockers.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-lg border border-[#e2e8f0] bg-white">
              <iframe
                title="UKM Atmosphere Facebook page timeline"
                src={FACEBOOK_PAGE_PLUGIN_URL}
                width={500}
                height={700}
                loading="lazy"
                className="h-[700px] w-full border-0"
              />
              <noscript>
                <div className="border-t border-[#e2e8f0] p-4 text-sm text-[#64748b]">
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#475569] underline underline-offset-2"
                  >
                    View the UKM Atmosphere Facebook page
                  </a>
                </div>
              </noscript>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
