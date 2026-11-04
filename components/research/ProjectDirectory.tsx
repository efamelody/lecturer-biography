'use client'

import { useMemo, useState } from 'react'
import { RotateCcw, Search, X } from 'lucide-react'

interface Project {
  id: string
  title: string
  funder: string
  scheme: string
  period: string
  startYear: number
  endYear: number
  scope: 'International' | 'National' | 'Internal'
  role: string
  amount: number
  currency: string
  status: string
  themes: string[]
  summary: string
}

interface Theme {
  slug: string
  title: string
}

const SCOPES = ['all', 'International', 'National', 'Internal'] as const
const SCOPE_ORDER: Project['scope'][] = ['International', 'National', 'Internal']

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function ProjectDirectory({
  projects,
  themes,
}: {
  projects: Project[]
  themes: Theme[]
}) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<(typeof SCOPES)[number]>('all')
  const [theme, setTheme] = useState('all')

  const themeLookup = useMemo(
    () => new Map(themes.map((item) => [item.slug, item.title])),
    [themes],
  )

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = useMemo(
    () =>
      [...projects]
        .filter((project) => {
          const matchesQuery =
            normalizedQuery.length === 0 ||
            [project.title, project.funder, project.scheme, project.summary]
              .join(' ')
              .toLowerCase()
              .includes(normalizedQuery)
          const matchesScope = scope === 'all' || project.scope === scope
          const matchesTheme = theme === 'all' || project.themes.includes(theme)
          return matchesQuery && matchesScope && matchesTheme
        })
        .sort((a, b) => b.startYear - a.startYear || a.title.localeCompare(b.title)),
    [projects, normalizedQuery, scope, theme],
  )

  const grouped = useMemo(
    () =>
      SCOPE_ORDER.map((item) => ({
        scope: item,
        projects: filtered.filter((project) => project.scope === item),
      })).filter((group) => group.projects.length > 0),
    [filtered],
  )

  const hasFilters = normalizedQuery.length > 0 || scope !== 'all' || theme !== 'all'

  function resetFilters() {
    setQuery('')
    setScope('all')
    setTheme('all')
  }

  return (
    <div>
      <div className="border border-[#e2e8f0] bg-[#f8fafc] p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="project-search"
              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#475569]"
            >
              Search projects
            </label>
            <div className="relative">
              <Search
                size={15}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
              />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, funder or scheme"
                className="w-full border border-[#cbd5e1] bg-white py-2.5 pl-9 pr-9 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#94a3b8] hover:text-[#0f172a]"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="project-scope"
              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#475569]"
            >
              Scope
            </label>
            <select
              id="project-scope"
              value={scope}
              onChange={(event) => setScope(event.target.value as (typeof SCOPES)[number])}
              className="w-full border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm text-[#0f172a] focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20"
            >
              {SCOPES.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All scopes' : option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="project-theme"
              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#475569]"
            >
              Research theme
            </label>
            <select
              id="project-theme"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              className="w-full border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm text-[#0f172a] focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20"
            >
              <option value="all">All themes</option>
              {themes.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="inline-flex items-center justify-center gap-2 border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:border-[#64748b] hover:text-[#0f172a] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset
          </button>
        </div>

        <p className="mt-4 text-xs text-[#64748b]" role="status" aria-live="polite">
          Showing {filtered.length} of {projects.length} funded projects
        </p>
      </div>

      {grouped.length > 0 ? (
        <div className="mt-10 space-y-12">
          {grouped.map((group) => (
            <section key={group.scope} aria-labelledby={`scope-${group.scope}`}>
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e2e8f0] pb-3">
                <h2
                  id={`scope-${group.scope}`}
                  className="font-serif text-2xl font-bold tracking-tight text-[#0f172a]"
                >
                  {group.scope} projects
                </h2>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
                  {group.projects.length} {group.projects.length === 1 ? 'project' : 'projects'}
                </p>
              </div>

              <div className="divide-y divide-[#e2e8f0]">
                {group.projects.map((project) => (
                  <article
                    key={project.id}
                    className="grid gap-4 py-6 md:grid-cols-[7rem_minmax(0,1fr)_10rem] md:gap-8"
                  >
                    <div className="text-xs leading-relaxed text-[#64748b]">
                      <p className="font-semibold text-[#475569]">{project.period}</p>
                      <p className="mt-1">{project.role}</p>
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-serif text-xl font-bold leading-snug tracking-tight text-[#0f172a]">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748b]">
                        {project.summary}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-[#475569]">
                        {project.funder}
                        {project.scheme ? ` · ${project.scheme}` : ''}
                      </p>
                      {project.themes.length > 0 && (
                        <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">
                          {project.themes
                            .map((slug) => themeLookup.get(slug) ?? slug)
                            .join(' · ')}
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-[#0f172a] md:text-right">
                      <p className="font-medium">{formatAmount(project.amount, project.currency)}</p>
                      <p className="mt-1 text-xs text-[#94a3b8]">{project.status}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-6 py-12 text-center">
          <p className="text-sm text-[#64748b]">No projects match these filters.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-2 bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}
