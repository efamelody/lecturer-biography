import { ArrowUpRight } from 'lucide-react'
import { NEWS_SOCIAL_LINKS } from '@/lib/news'
import { PLATFORM_ICONS } from './platform-icons'

export default function SocialFollowLinks() {
  return (
    <section aria-labelledby="follow-links-heading" className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
            Follow
          </p>
          <h2
            id="follow-links-heading"
            className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
          >
            Updates from the network
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
            Follow Prof. Latif, UKM Atmosphere and IPI UKM for live posts and announcements.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {NEWS_SOCIAL_LINKS.map((link) => {
            const Icon = PLATFORM_ICONS[link.platform]

            return (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-4 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-5 transition-colors hover:border-[#cbd5e1] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#e2e8f0] bg-white">
                    <Icon size={16} aria-hidden="true" className="text-[#475569]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold text-[#0f172a]">{link.label}</span>
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[#94a3b8] transition-colors group-hover:text-[#0f172a]"
                      />
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#64748b]">
                      {link.description}
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
