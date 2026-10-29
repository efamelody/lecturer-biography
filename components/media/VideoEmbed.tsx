'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { MediaThumbnailQuality } from '@/lib/media'

const THUMBNAIL_FALLBACKS: MediaThumbnailQuality[] = [
  'maxresdefault',
  'sddefault',
  'hqdefault',
  'mqdefault',
  'default',
]

function getThumbnailSources(quality?: MediaThumbnailQuality): MediaThumbnailQuality[] {
  const start = quality ?? 'maxresdefault'
  const index = THUMBNAIL_FALLBACKS.indexOf(start)
  return index > 0 ? THUMBNAIL_FALLBACKS.slice(index) : THUMBNAIL_FALLBACKS
}

interface VideoEmbedProps {
  videoId: string
  title: string
  /** Controls the thumbnail `sizes` hint before playback. */
  size?: 'featured' | 'compact'
  thumbnailQuality?: MediaThumbnailQuality
}

export default function VideoEmbed({
  videoId,
  title,
  size = 'compact',
  thumbnailQuality,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const [thumbnailIndex, setThumbnailIndex] = useState(0)
  const sources = getThumbnailSources(thumbnailQuality)

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#0f172a]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/${sources[thumbnailIndex]}.jpg`}
        alt=""
        fill
        sizes={
          size === 'featured'
            ? '(min-width: 1024px) 66vw, 100vw'
            : '(min-width: 640px) 50vw, 100vw'
        }
        className="object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
        onError={() =>
          setThumbnailIndex((index) => (index + 1 < sources.length ? index + 1 : index))
        }
      />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#0f172a] shadow-lg transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Play size={22} aria-hidden="true" className="ml-0.5 fill-current" />
        </span>
      </span>
    </button>
  )
}
