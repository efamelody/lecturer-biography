'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Newspaper, RotateCcw, Search, X } from 'lucide-react'
import MediaCard from './MediaCard'
import {
  MEDIA_TOPICS,
  getMediaSortKey,
  getMediaYear,
  type MediaItem,
  type MediaTopic,
} from '@/lib/media'

const PAGE_SIZE = 6

type SortOption = 'newest' | 'oldest' | 'title'

const labelClass =
  'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]'
const controlClass =
  'w-full rounded-md border border-[#e2e8f0] bg-white py-2.5 text-sm text-[#0f172a] transition-colors hover:border-[#cbd5e1] focus:border-[#64748b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#94a3b8]/40 motion-reduce:transition-none'

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClass} appearance-none pl-3 pr-9`}
        >
          {children}
        </select>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
        />
      </div>
    </div>
  )
}

export default function MediaArchive({ items }: { items: MediaItem[] }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState<'all' | MediaTopic>('all')
  const [outlet, setOutlet] = useState('all')
  const [year, setYear] = useState('all')
  const [sort, setSort] = useState<SortOption>('newest')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const topics = useMemo(
    () => MEDIA_TOPICS.filter((entry) => items.some((item) => item.primaryTopic === entry)),
    [items],
  )

  const outlets = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.outlet))).sort((a, b) => a.localeCompare(b)),
    [items],
  )

  const years = useMemo(
    () =>
      Array.from(
        new Set(items.map((item) => getMediaYear(item)).filter((value): value is string => !!value)),
      ).sort((a, b) => b.localeCompare(a)),
    [items],
  )

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()

    const result = items.filter((item) => {
      if (topic !== 'all' && item.primaryTopic !== topic) return false
      if (outlet !== 'all' && item.outlet !== outlet) return false
      if (year !== 'all' && getMediaYear(item) !== year) return false
      if (!needle) return true

      const haystack = [
        item.title,
        item.outlet,
        item.summary,
        item.primaryTopic,
        ...item.topics,
        item.formatLabel ?? '',
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(needle)
    })

    result.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      const keyA = getMediaSortKey(a)
      const keyB = getMediaSortKey(b)
      if (!keyA && !keyB) return a.title.localeCompare(b.title)
      if (!keyA) return 1
      if (!keyB) return -1
      return sort === 'newest' ? keyB.localeCompare(keyA) : keyA.localeCompare(keyB)
    })

    return result
  }, [items, query, topic, outlet, year, sort])

  const visibleItems = filtered.slice(0, visible)
  const hasActiveFilters =
    query.trim() !== '' || topic !== 'all' || outlet !== 'all' || year !== 'all' || sort !== 'newest'

  function applyFilter<T>(setter: (value: T) => void, value: T) {
    setter(value)
    setVisible(PAGE_SIZE)
  }

  function resetFilters() {
    setQuery('')
    setTopic('all')
    setOutlet('all')
    setYear('all')
    setSort('newest')
    setVisible(PAGE_SIZE)
  }

  const remaining = filtered.length - visibleItems.length

  return (
    <div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-[#cbd5e1] bg-white px-6 py-16 text-center">
          <Newspaper size={22} aria-hidden="true" className="mx-auto text-[#94a3b8]" />
          <h3 className="mt-4 font-serif text-xl font-bold text-[#0f172a]">
            No contributions match these filters
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#64748b]">
            Try a different search term, or clear the filters to browse the full archive.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-[#0f172a] bg-[#0f172a] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1e293b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <ul
            id="media-results"
            aria-label="News contributions"
            className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6"
          >
            {visibleItems.map((item) => (
              <li key={item.id} className="h-full">
                <MediaCard item={item} />
              </li>
            ))}
          </ul>

          {remaining > 0 ? (
            <div className="mt-8 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
                aria-controls="media-results"
                className="inline-flex items-center gap-2 rounded-md border border-[#e2e8f0] bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#94a3b8] hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94a3b8]/50 focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                Load more contributions
              </button>
              <p className="text-[11px] text-[#94a3b8]">
                {remaining} remaining
              </p>
            </div>
          ) : (
            filtered.length > PAGE_SIZE && (
              <p className="mt-8 text-center text-[11px] uppercase tracking-[0.14em] text-[#94a3b8]">
                End of archive
              </p>
            )
          )}
        </>
      )}
    </div>
  )
}
