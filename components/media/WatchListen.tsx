import { ExternalLink } from 'lucide-react'
import {
  formatMediaDate,
  getMediaLinkLabel,
  getMediaTypeLabel,
  type MediaItem,
} from '@/lib/media'
import VideoEmbed from './VideoEmbed'

function getDateLabel(item: MediaItem): string | null {
  if (!item.publishedOn && !item.publishedIn && !item.publishedYear) return null
  return formatMediaDate(item)
}

function MetaLine({ item }: { item: MediaItem }) {
  const date = getDateLabel(item)

  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.12em]">
      <span className="font-semibold text-[#3b82f6]">{item.outlet}</span>
      <span aria-hidden="true" className="text-[#cbd5e1]">
        &middot;
      </span>
      <span className="text-[#64748b]">{getMediaTypeLabel(item)}</span>
      {date && (
        <>
          <span aria-hidden="true" className="text-[#cbd5e1]">
            &middot;
          </span>
          <time
            dateTime={item.publishedOn ?? item.publishedIn ?? item.publishedYear}
            className="text-[#94a3b8]"
          >
            {date}
          </time>
        </>
      )}
    </div>
  )
}

export default function WatchListen({ items }: { items: MediaItem[] }) {
  const playable = items.filter(
    (item): item is MediaItem & { videoId: string } => Boolean(item.videoId),
  )

  if (playable.length === 0) return null

  return (
    <section
      aria-labelledby="watch-listen-heading"
      className="bg-white py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
            Watch &amp; Listen
          </p>
          <h2
            id="watch-listen-heading"
            className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
          >
            Broadcasts, Podcasts &amp; Interviews
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
            Recorded conversations, podcast appearances and broadcast interviews on air quality,
            haze and climate.
          </p>
        </div>

        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {playable.map((item) => (
            <li key={item.id}>
              <article className="flex h-full flex-col">
                <VideoEmbed
                  videoId={item.videoId}
                  title={item.title}
                  thumbnailQuality={item.thumbnailQuality}
                />

                <div className="mt-4">
                  <MetaLine item={item} />
                  <h3 className="mt-2 font-serif text-xl font-bold leading-snug tracking-tight text-[#0f172a]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                    {item.summary}
                  </p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#475569] transition-colors hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2 motion-reduce:transition-none"
                    >
                      {getMediaLinkLabel(item)}
                      <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
