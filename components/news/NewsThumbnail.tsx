'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { NewsItem } from '@/lib/news'
import { PLATFORM_ICONS } from './platform-icons'

export default function NewsThumbnail({
  item,
  sizes,
  priority = false,
}: {
  item: NewsItem
  sizes: string
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const Icon = PLATFORM_ICONS[item.platform]

  if (!item.image || failed) {
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full items-center justify-center bg-[#f1f5f9]"
      >
        <div className="flex flex-col items-center gap-2.5 px-4 text-[#94a3b8]">
          <Icon size={28} strokeWidth={1.25} />
          <span className="max-w-[10rem] text-center text-[10px] font-semibold uppercase tracking-[0.18em]">
            {item.source}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={item.image}
      alt={item.imageAlt ?? item.title}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      onError={() => setFailed(true)}
    />
  )
}
