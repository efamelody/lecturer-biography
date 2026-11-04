'use client'

import { useMemo, useState } from 'react'
import { Search, Users, X } from 'lucide-react'

export interface PersonRecord {
  id: string
  name: string
  degree: string
  thesisTitle?: string
  yearCompleted?: number
  yearStarted?: number
  role: string
  note?: string
}

export interface AlumniRecord {
  id: string
  name: string
  previousRole?: string
  previousDegree?: string
  researchTopic?: string
  graduationYear?: string
}

interface Stats {
  completedPhd: number
  currentPhd: number
  completedMsc: number
  currentMsc: number
  total: number
  additionalCurrent?: number
}

function groupByYear(records: PersonRecord[]) {
  const groups = new Map<string, PersonRecord[]>()

  for (const record of records) {
    const key = record.yearCompleted ? String(record.yearCompleted) : 'Undated'
    const existing = groups.get(key) ?? []
    existing.push(record)
    groups.set(key, existing)
  }

  return Array.from(groups.entries()).sort(([a], [b]) => {
    if (a === 'Undated') return 1
    if (b === 'Undated') return -1
    return Number(b) - Number(a)
  })
}

function groupByDegree(records: PersonRecord[]) {
  const order = ['PhD', 'MSc', 'Postgraduate']
  const groups = new Map<string, PersonRecord[]>()

  for (const record of records) {
    const existing = groups.get(record.degree) ?? []
    existing.push(record)
    groups.set(record.degree, existing)
  }

  return Array.from(groups.entries()).sort(
    ([a], [b]) => order.indexOf(a) - order.indexOf(b),
  )
}

function PersonRow({ person, showDegree = false }: { person: PersonRecord; showDegree?: boolean }) {
  const yearLabel = person.yearCompleted
    ? `Completed ${person.yearCompleted}`
    : person.yearStarted
      ? `Started ${person.yearStarted}`
      : ''

  return (
    <li className="grid gap-2 py-4 md:grid-cols-[minmax(0,1fr)_10rem] md:gap-8">
      <div className="min-w-0">
        <h4 className="font-serif text-lg font-bold leading-snug text-[#0f172a]">{person.name}</h4>
        {person.thesisTitle && (
          <p className="mt-1 text-sm leading-relaxed text-[#475569]">{person.thesisTitle}</p>
        )}
        {person.note && <p className="mt-2 text-xs leading-relaxed text-[#64748b]">{person.note}</p>}
      </div>
      <div className="text-xs leading-relaxed text-[#64748b] md:text-right">
        {showDegree && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
            {person.degree}
          </p>
        )}
        {yearLabel && <p className="mt-0.5">{yearLabel}</p>}
        <p className="mt-0.5">{person.role}</p>
      </div>
    </li>
  )
}

function SectionHeading({
  id,
  eyebrow,
  title,
  count,
}: {
  id: string
  eyebrow: string
  title: string
  count: number
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#e2e8f0] pb-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
          {eyebrow}
        </p>
        <h2 id={id} className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a]">
          {title}
        </h2>
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
        {count} {count === 1 ? 'researcher' : 'researchers'}
      </p>
    </div>
  )
}

export default function ResearchGroupDirectory({
  current,
  completedPhd,
  completedMsc,
  alumni,
  stats,
}: {
  current: PersonRecord[]
  completedPhd: PersonRecord[]
  completedMsc: PersonRecord[]
  alumni: AlumniRecord[]
  stats: Stats
}) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const matches = (values: Array<string | number | undefined>) =>
    normalizedQuery.length === 0 ||
    values.filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery)

  const filteredCurrent = useMemo(
    () => current.filter((person) => matches([person.name, person.thesisTitle, person.role])),
    [current, normalizedQuery],
  )

  const filteredPhd = useMemo(
    () => completedPhd.filter((person) => matches([person.name, person.thesisTitle, person.role])),
    [completedPhd, normalizedQuery],
  )

  const filteredMsc = useMemo(
    () => completedMsc.filter((person) => matches([person.name, person.thesisTitle, person.role])),
    [completedMsc, normalizedQuery],
  )

  const filteredAlumni = useMemo(
    () =>
      alumni.filter((person) =>
        matches([
          person.name,
          person.previousRole,
          person.previousDegree,
          person.researchTopic,
          person.graduationYear,
        ]),
      ),
    [alumni, normalizedQuery],
  )

  const totalVisible =
    filteredCurrent.length + filteredPhd.length + filteredMsc.length + filteredAlumni.length
  const hasQuery = normalizedQuery.length > 0

  return (
    <div>
      <dl
        className={`grid grid-cols-2 gap-4 border-y border-[#e2e8f0] py-5 sm:grid-cols-3 ${
          stats.additionalCurrent ? 'lg:grid-cols-6' : 'lg:grid-cols-5'
        }`}
      >
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
            Researchers
          </dt>
          <dd className="mt-1 font-serif text-2xl font-bold text-[#0f172a]">{stats.total}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
            Completed PhD
          </dt>
          <dd className="mt-1 font-serif text-2xl font-bold text-[#0f172a]">{stats.completedPhd}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
            Current PhD
          </dt>
          <dd className="mt-1 font-serif text-2xl font-bold text-[#0f172a]">{stats.currentPhd}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
            Completed MSc
          </dt>
          <dd className="mt-1 font-serif text-2xl font-bold text-[#0f172a]">{stats.completedMsc}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
            Current MSc
          </dt>
          <dd className="mt-1 font-serif text-2xl font-bold text-[#0f172a]">{stats.currentMsc}</dd>
        </div>
        {stats.additionalCurrent ? (
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
              Group researchers
            </dt>
            <dd className="mt-1 font-serif text-2xl font-bold text-[#0f172a]">
              {stats.additionalCurrent}
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6 flex flex-col gap-4 border-b border-[#e2e8f0] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <nav aria-label="Supervision sections" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href="#current-researchers" className="font-medium text-[#0f172a] hover:text-[#0f766e]">
            Current researchers
          </a>
          <a href="#completed-phd" className="text-[#64748b] hover:text-[#0f172a]">
            Completed PhD
          </a>
          <a href="#completed-msc" className="text-[#64748b] hover:text-[#0f172a]">
            Completed MSc
          </a>
          <a href="#alumni" className="text-[#64748b] hover:text-[#0f172a]">
            Alumni
          </a>
        </nav>

        <div className="w-full max-w-md">
          <label
            htmlFor="supervision-search"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#475569]"
          >
            Search all researchers
          </label>
          <div className="relative">
            <Search
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            />
            <input
              id="supervision-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, thesis or role"
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
      </div>

      <p className="mt-4 text-xs text-[#64748b]" role="status" aria-live="polite">
        {hasQuery
          ? `Showing ${totalVisible} matching ${totalVisible === 1 ? 'researcher' : 'researchers'}`
          : `${stats.total} researchers across current and completed records`}
      </p>

      {totalVisible === 0 ? (
        <div className="mt-8 border border-dashed border-[#cbd5e1] bg-white px-6 py-12 text-center">
          <Users size={24} aria-hidden="true" className="mx-auto text-[#94a3b8]" />
          <p className="mt-3 text-sm text-[#64748b]">No researchers match this search.</p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-4 text-sm font-medium text-[#0f172a] underline underline-offset-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {filteredCurrent.length > 0 && (
            <section id="current-researchers" className="section-anchor">
              <SectionHeading
                id="current-researchers-heading"
                eyebrow="In progress"
                title="Current researchers"
                count={filteredCurrent.length}
              />
              <div className="space-y-8">
                {groupByDegree(filteredCurrent).map(([degree, records]) => (
                  <div key={degree}>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                      {degree}
                    </h3>
                    <ul className="mt-2 divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
                      {records.map((person) => (
                        <PersonRow key={person.id} person={person} showDegree={false} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredPhd.length > 0 && (
            <section id="completed-phd" className="section-anchor">
              <SectionHeading
                id="completed-phd-heading"
                eyebrow="Completed"
                title="PhD researchers"
                count={filteredPhd.length}
              />
              <div className="space-y-8">
                {groupByYear(filteredPhd).map(([year, records]) => (
                  <div key={year}>
                    <h3 className="border-b border-[#e2e8f0] pb-2 font-serif text-xl font-bold text-[#0f172a]">
                      {year}
                    </h3>
                    <ul className="divide-y divide-[#e2e8f0]">
                      {records.map((person) => (
                        <PersonRow key={person.id} person={person} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredMsc.length > 0 && (
            <section id="completed-msc" className="section-anchor">
              <SectionHeading
                id="completed-msc-heading"
                eyebrow="Completed"
                title="MSc researchers"
                count={filteredMsc.length}
              />
              <div className="space-y-8">
                {groupByYear(filteredMsc).map(([year, records]) => (
                  <div key={year}>
                    <h3 className="border-b border-[#e2e8f0] pb-2 font-serif text-xl font-bold text-[#0f172a]">
                      {year}
                    </h3>
                    <ul className="divide-y divide-[#e2e8f0]">
                      {records.map((person) => (
                        <PersonRow key={person.id} person={person} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredAlumni.length > 0 && (
            <section id="alumni" className="section-anchor">
              <SectionHeading
                id="alumni-heading"
                eyebrow="Former researchers"
                title="Alumni"
                count={filteredAlumni.length}
              />
              <ul className="divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
                {filteredAlumni.map((person) => (
                  <li
                    key={person.id}
                    className="grid gap-2 py-4 md:grid-cols-[minmax(0,1fr)_12rem] md:gap-8"
                  >
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#0f172a]">{person.name}</h4>
                      {person.researchTopic && (
                        <p className="mt-1 text-sm leading-relaxed text-[#475569]">
                          {person.researchTopic}
                        </p>
                      )}
                    </div>
                    <div className="text-xs leading-relaxed text-[#64748b] md:text-right">
                      {(person.previousRole || person.previousDegree) && (
                        <p>{[person.previousRole, person.previousDegree].filter(Boolean).join(' · ')}</p>
                      )}
                      {person.graduationYear && <p className="mt-0.5">Graduated {person.graduationYear}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
