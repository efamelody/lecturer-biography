'use client'

import { useEffect, useRef, useState } from 'react'

const facebookPageUrl = 'https://www.facebook.com/UKMAtmosphere'
const facebookPluginUrl = 'https://www.facebook.com/plugins/page.php'

export default function ResearchFacebookFeed() {
  const [pluginWidth, setPluginWidth] = useState(500)
  const feedContainerRef = useRef<HTMLDivElement>(null)
  const iframeHeight = 640

  useEffect(() => {
    const container = feedContainerRef.current
    if (!container) return

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.max(180, Math.min(500, Math.floor(entry.contentRect.width)))
      setPluginWidth((currentWidth) => (currentWidth === width ? currentWidth : width))
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const iframeUrl = new URL(facebookPluginUrl)
  iframeUrl.searchParams.set('href', facebookPageUrl)
  // Meta's current Page Plugin timeline tab can render only the page header;
  // this legacy parameter currently loads the timeline posts for this page.
  iframeUrl.searchParams.set('show_posts', 'true')
  iframeUrl.searchParams.set('width', String(pluginWidth))
  iframeUrl.searchParams.set('height', String(iframeHeight))
  iframeUrl.searchParams.set('small_header', 'false')
  iframeUrl.searchParams.set('adapt_container_width', 'true')
  iframeUrl.searchParams.set('hide_cover', 'false')
  iframeUrl.searchParams.set('show_facepile', 'false')

  return (
    <div className="border border-[#e2e8f0] bg-white p-4 md:p-5">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
          Latest updates
        </p>
        <h3 className="mt-1 font-serif text-xl font-bold tracking-tight text-[#0f172a]">
          UKM Atmosphere on Facebook
        </h3>
      </div>

      <div
        id="ukm-atmosphere-facebook-feed"
        ref={feedContainerRef}
        className="mx-auto w-full max-w-[500px]"
      >
        <iframe
          title="Recent posts from the UKM Atmosphere Facebook page"
          src={iframeUrl.toString()}
          width={pluginWidth}
          height={iframeHeight}
          loading="lazy"
          scrolling="auto"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="block max-w-full border-0 bg-white"
        />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#64748b]">
        Scroll within the feed to see more posts.
      </p>

      <p className="mt-3 border-t border-[#e2e8f0] pt-3 text-xs leading-relaxed text-[#64748b]">
        The feed is provided by Facebook and may use Facebook cookies.
      </p>
    </div>
  )
}
