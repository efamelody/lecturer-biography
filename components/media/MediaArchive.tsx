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
      <div className="rounded-lg border border-[#e2e8f0] bg-white p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
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
                type="text"
                value={query}
                onChange={(event) => applyFilter(setQuery, event.target.value)}
                placeholder="Headlines, outlets or topics"
                className={`${controlClass} pl-9 ${query ? 'pr-9' : 'pr-3'}`}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => applyFilter(setQuery, '')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#94a3b8] transition-colors hover:text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94a3b8] motion-reduce:transition-none"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <FilterSelect
              id="media-topic"
              label="Topic"
              value={topic}
              onChange={(value) => applyFilter(setTopic, value as 'all' | MediaTopic)}
            >
              <option value="all">All topics</option>
              {topics.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </FilterSelect>
          </div>

          <div className="lg:col-span-2">
            <FilterSelect
              id="media-outlet"
              label="Outlet"
              value={outlet}
              onChange={(value) => applyFilter(setOutlet, value)}
            >
              <option value="all">All outlets</option>
              {outlets.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </FilterSelect>
          </div>

          <div className="lg:col-span-2">
            <FilterSelect
              id="media-year"
              label="Year"
              value={year}
              onChange={(value) => applyFilter(setYear, value)}
            >
              <option value="all">All years</option>
              {years.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </FilterSelect>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-[#f1f5f9] pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="text-xs text-[#64748b]">
            {filtered.length === 0
              ? 'No contributions match the current filters'
              : `Showing ${visibleItems.length} of ${filtered.length} contribution${
                  filtered.length === 1 ? '' : 's'
                }`}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor="media-sort"
                className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#64748b]"
              >
                Sort
              </label>
              <div className="relative">
                <select
                  id="media-sort"
                  value={sort}
                  onChange={(event) => applyFilter(setSort, event.target.value as SortOption)}
                  className={`${controlClass} appearance-none py-1.5 pl-2.5 pr-8 text-xs`}
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Headline A-Z</option>
                </select>
                <ChevronDown
                  size={12}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:border-[#cbd5e1] hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94a3b8]/50 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
            >
              <RotateCcw size={12} aria-hidden="true" />
              Reset filters
            </button>
          </div>
        </div>
      </div>

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
