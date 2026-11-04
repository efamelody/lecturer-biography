'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Newspaper, RotateCcw, Search, X } from 'lucide-react'
import {
  MEDIA_TOPICS,
  formatMediaDate,
  getMediaLinkLabel,
  getMediaSortKey,
  getMediaTypeLabel,
  getMediaYear,
  type MediaItem,
  type MediaTopic,
} from '@/lib/media'

const PAGE_SIZE = 8

type SortOption = 'newest' | 'oldest' | 'title'

const labelClass =
  'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]'
const controlClass =
  'w-full border border-[#e2e8f0] bg-white py-2.5 text-sm text-[#0f172a] transition-colors hover:border-[#cbd5e1] focus:border-[#64748b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#94a3b8]/40 motion-reduce:transition-none'

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

function groupByYear(items: MediaItem[]) {
  const groups = new Map<string, MediaItem[]>()

  for (const item of items) {
    const year = getMediaYear(item) ?? 'Undated'
    const existing = groups.get(year) ?? []
    existing.push(item)
    groups.set(year, existing)
  }

  return Array.from(groups.entries()).sort(([a], [b]) => {
    if (a === 'Undated') return 1
    if (b === 'Undated') return -1
    return b.localeCompare(a)
  })
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
  const grouped = useMemo(() => groupByYear(visibleItems), [visibleItems])
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
      <div className="border border-[#e2e8f0] bg-[#f8fafc] p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr_auto] lg:items-end">
          <div>
            <label htmlFor="media-search" className={labelClass}>
              Search
            </label>
            <div className="relative">
              <Search
                size={15}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
              />
              <input
                id="media-search"
                type="search"
                value={query}
                onChange={(event) => applyFilter(setQuery, event.target.value)}
                placeholder="Title, outlet or topic"
                className={`${controlClass} py-2.5 pl-9 pr-9`}
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => applyFilter(setQuery, '')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#94a3b8] hover:text-[#0f172a]"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <FilterSelect
            id="media-topic"
            label="Topic"
            value={topic}
            onChange={(value) => applyFilter(setTopic, value as 'all' | MediaTopic)}
          >
            <option value="all">All topics</option>
            {topics.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id="media-outlet"
            label="Outlet"
            value={outlet}
            onChange={(value) => applyFilter(setOutlet, value)}
          >
            <option value="all">All outlets</option>
            {outlets.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id="media-year"
            label="Year"
            value={year}
            onChange={(value) => applyFilter(setYear, value)}
          >
            <option value="all">All years</option>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id="media-sort"
            label="Sort"
            value={sort}
            onChange={(value) => applyFilter(setSort, value as SortOption)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A–Z</option>
          </FilterSelect>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex items-center justify-center gap-2 border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:border-[#64748b] hover:text-[#0f172a] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset
          </button>
        </div>

        <p className="mt-4 text-xs text-[#64748b]" role="status" aria-live="polite">
          Showing {visibleItems.length} of {filtered.length} media items
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 border border-dashed border-[#cbd5e1] bg-white px-6 py-16 text-center">
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
            className="mt-5 inline-flex items-center gap-1.5 border border-[#0f172a] bg-[#0f172a] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1e293b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div id="media-results" className="mt-10 space-y-12">
            {grouped.map(([year, entries]) => (
              <section key={year} aria-labelledby={`media-year-${year}`}>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e2e8f0] pb-3">
                  <h3
                    id={`media-year-${year}`}
                    className="font-serif text-2xl font-bold tracking-tight text-[#0f172a]"
                  >
                    {year}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
                    {entries.length} {entries.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <ul className="divide-y divide-[#e2e8f0]">
                  {entries.map((item) => {
                    const content = (
                      <div className="grid gap-2 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
                        <div className="text-xs leading-relaxed text-[#64748b]">
                          <p className="font-semibold text-[#475569]">{item.outlet}</p>
                          <p className="mt-1">{formatMediaDate(item)}</p>
                          <p className="mt-1 uppercase tracking-[0.1em] text-[#94a3b8]">
                            {getMediaTypeLabel(item)}
                          </p>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif text-lg font-bold leading-snug text-[#0f172a]">
                            {item.title}
                          </h4>
                          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#64748b]">
                            {item.summary}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">
                            {item.primaryTopic}
                            {item.url ? ` · ${getMediaLinkLabel(item)}` : ''}
                          </p>
                        </div>
                      </div>
                    )

                    return (
                      <li key={item.id} className="py-5">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-4"
                          >
                            {content}
                          </a>
                        ) : (
                          content
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>

          {remaining > 0 ? (
            <div className="mt-8 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
                aria-controls="media-results"
                className="inline-flex items-center gap-2 border border-[#e2e8f0] bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#94a3b8] hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94a3b8]/50 focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                Load more contributions
              </button>
              <p className="text-[11px] text-[#94a3b8]">{remaining} remaining</p>
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
