'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryItem = {
  _id: string
  title: string
  type?: string
  description?: string
  eventDate?: string
  image: any
}

const typeLabels: Record<string, string> = {
  'news-interview': 'News Interview',
  'newspaper': 'Newspaper',
  'key-activity': 'Key Activities & Events',
  'media-coverage': 'Media Coverage',
}

function Lightbox({
  items,
  index,
  onClose,
}: {
  items: GalleryItem[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % items.length)
  }, [items.length])

  const goPrev = useCallback(() => {
    setCurrent((i) => (i - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  const item = items[current]

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
      >
        <X size={28} />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 text-white/80 hover:text-white z-10"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 text-white/80 hover:text-white z-10"
          >
            <ChevronRight size={36} />
          </button>
        </>
      )}

      <div
        className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-h-[80vh]">
          <Image
            src={urlFor(item.image).width(1600).url()}
            alt={item.title || ''}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>
        <div className="text-white text-center mt-4 max-w-2xl">
          <p className="text-lg font-medium">{item.title}</p>
          {item.description && (
            <p className="text-sm text-white/70 mt-1">{item.description}</p>
          )}
          {item.eventDate && (
            <p className="text-xs text-white/50 mt-1">
              {new Date(item.eventDate).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group bg-white border border-[#e2e8f0] rounded-lg overflow-hidden hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200 text-left w-full"
    >
      <div className="aspect-[16/9] bg-[#f1f5f9] relative overflow-hidden">
        {item.image && (
          <Image
            src={urlFor(item.image).width(600).height(338).url()}
            alt={item.title || ''}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>
      <div className="p-5 text-left">
        {item.type && (
          <span className="text-[10px] font-medium text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded inline-block mb-2">
            {typeLabels[item.type] || item.type}
          </span>
        )}
        <h3 className="text-sm font-medium text-[#0f172a] leading-snug mb-1 line-clamp-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-[#64748b] mb-1 line-clamp-2">
            {item.description}
          </p>
        )}
        {item.eventDate && (
          <p className="text-xs text-[#94a3b8]">
            {new Date(item.eventDate).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </button>
  )
}

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => {
          const globalIndex = items.indexOf(item)
          return (
            <GalleryCard
              key={item._id}
              item={item}
              onClick={() => setLightboxIndex(globalIndex)}
            />
          )
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
