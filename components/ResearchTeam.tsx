'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
  RotateCcw,
  Search,
  Users,
  X,
} from 'lucide-react'
import type { TeamCategory, TeamMember, TeamPageContent } from '@/lib/team-types'

type FilterCategory = 'all' | TeamCategory

const CATEGORY_OPTIONS: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'staff', label: 'Academic staff' },
  { value: 'postgraduate', label: 'Postgraduate' },
  { value: 'alumni', label: 'Alumni' },
]

const TITLE_WORDS = new Set([
  'prof.',
  'prof',
  'madya',
  'assoc.',
  'assoc',
  'dr.',
  'dr',
  'ts.',
  'ts',
])

function getInitials(name: string): string {
  const parts = name
    .replace(/\([^)]*\)/g, ' ')
    .split(/\s+/)
    .map((part) => part.replace(/[^\p{L}]/gu, ''))
    .filter((part) => part.length > 0 && !TITLE_WORDS.has(part.toLowerCase()))

  if (parts.length === 0) return 'UKM'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function MemberAvatar({
  member,
  size = 'small',
}: {
  member: TeamMember
  size?: 'small' | 'large'
}) {
  const sizeClasses =
    size === 'large' ? 'h-14 w-14 text-sm' : 'h-12 w-12 text-xs'

  if (member.image) {
    return (
      <div
        className={`${sizeClasses} shrink-0 overflow-hidden border border-[#e2e8f0] bg-[#f1f5f9]`}
      >
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          width={size === 'large' ? 112 : 96}
          height={size === 'large' ? 112 : 96}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`${sizeClasses} flex shrink-0 items-center justify-center border border-[#d6e8e5] bg-[#f0f7f6] font-semibold tracking-wide text-[#0f5f59]`}
    >
      {getInitials(member.name)}
    </div>
  )
}

function InterestTags({
  interests,
  className = '',
}: {
  interests: string[]
  className?: string
}) {
  if (interests.length === 0) return null

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {interests.map((interest) => (
        <li
          key={interest}
          className="border border-[#d6e8e5] bg-[#f0f7f6] px-2 py-1 text-[11px] font-medium leading-none text-[#0f5f59]"
        >
          {interest}
        </li>
      ))}
    </ul>
  )
}

function ExternalLinkNote() {
  return <span className="sr-only"> (opens in a new tab)</span>
}

function StaffCard({ member }: { member: TeamMember }) {
  const hasLinks = Boolean(member.profileUrl || member.scholarUrl)

  return (
    <article className="flex h-full flex-col border border-[#e2e8f0] bg-white p-5 transition-colors hover:border-[#94a3b8]">
      <div className="flex items-start gap-4">
        <MemberAvatar member={member} size="large" />
        <div className="min-w-0">
          <h3 className="break-words font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a]">
            {member.name}
          </h3>
          {member.role && (
            <p className="mt-1 text-xs font-medium leading-relaxed text-[#0f766e]">
              {member.role}
            </p>
          )}
        </div>
      </div>

      {member.description && (
        <p className="mt-4 text-sm leading-relaxed text-[#475569]">
          {member.description}
        </p>
      )}

      <InterestTags interests={member.interests} className="mt-4" />

      {hasLinks && (
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#f1f5f9] pt-4">
          {member.profileUrl && (
            <a
              href={member.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f172a] transition-colors hover:text-[#0f766e]"
            >
              View Profile
              <ArrowUpRight size={14} aria-hidden="true" />
              <ExternalLinkNote />
            </a>
          )}
          {member.scholarUrl && (
            <a
              href={member.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#475569] transition-colors hover:text-[#0f172a]"
            >
              Google Scholar
              <ExternalLink size={13} aria-hidden="true" />
              <ExternalLinkNote />
            </a>
          )}
        </div>
      )}
    </article>
  )
}

function PostgraduateCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col border border-[#e2e8f0] bg-white p-5 transition-colors hover:border-[#94a3b8]">
      <div className="flex items-start gap-3">
        <MemberAvatar member={member} />
        <div className="min-w-0">
          <h3 className="break-words font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a]">
            {member.name}
          </h3>
          {(member.role || member.degree) && (
            <p className="mt-1 text-xs font-medium leading-relaxed text-[#0f766e]">
              {member.role ?? member.degree}
            </p>
          )}
        </div>
      </div>

      {member.researchTitle && (
        <div className="mt-4 border-l-2 border-[#d6e8e5] pl-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
            Research title
          </p>
          <p className="mt-1 text-sm font-medium leading-relaxed text-[#0f172a]">
            {member.researchTitle}
          </p>
        </div>
      )}

      {member.description && (
        <p className="mt-3 text-sm leading-relaxed text-[#475569]">
          {member.description}
        </p>
      )}

      {member.supervisor && (
        <p className="mt-auto border-t border-[#f1f5f9] pt-4 text-xs leading-relaxed text-[#64748b]">
          {member.supervisor}
        </p>
      )}
    </article>
  )
}

function AlumniCard({ member }: { member: TeamMember }) {
  const previous = [member.previousRole, member.previousDegree]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="flex h-full flex-col border border-[#e2e8f0] bg-white p-5 transition-colors hover:border-[#94a3b8]">
      <div className="flex items-start gap-3">
        <MemberAvatar member={member} />
        <div className="min-w-0">
          <h3 className="break-words font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a]">
            {member.name}
          </h3>
          {previous && (
            <p className="mt-1 text-xs font-medium leading-relaxed text-[#0f766e]">
              {previous}
            </p>
          )}
          {member.graduationYear && (
            <p className="mt-1 text-xs text-[#64748b]">
              Graduated {member.graduationYear}
            </p>
          )}
        </div>
      </div>

      {member.researchTopic && (
        <p className="mt-4 text-sm leading-relaxed text-[#475569]">
          <span className="font-semibold text-[#0f172a]">Research topic:</span>{' '}
          {member.researchTopic}
        </p>
      )}
    </article>
  )
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  count,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  count: number
}) {
  return (
    <div className="mb-8 border-b border-[#e2e8f0] pb-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            {eyebrow}
          </p>
          <h2
            id={id}
            className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0f172a]"
          >
            {title}
          </h2>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
          {count} {count === 1 ? 'profile' : 'profiles'}
        </p>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
        {description}
      </p>
    </div>
  )
}

export default function ResearchTeam({ content }: { content: TeamPageContent }) {
  const { intro,  staff, postgraduates, alumni, contact } = content
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<FilterCategory>('all')
  const [interest, setInterest] = useState('all')
  const searchRef = useRef<HTMLInputElement>(null)

  const interestOptions = useMemo(
    () =>
      Array.from(new Set(staff.flatMap((member) => member.interests))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [staff],
  )

  const normalizedQuery = query.trim().toLowerCase()
  const hasFilters =
    normalizedQuery.length > 0 || category !== 'all' || interest !== 'all'
  const interestIsDisabled =
    category === 'postgraduate' || category === 'alumni'

  const filteredStaff = useMemo(
    () =>
      staff.filter((member) => {
        const matchesName =
          normalizedQuery.length === 0 ||
          member.name.toLowerCase().includes(normalizedQuery)
        const matchesInterest =
          interest === 'all' || member.interests.includes(interest)
        return matchesName && matchesInterest
      }),
    [staff, normalizedQuery, interest],
  )

  const filteredPostgraduates = useMemo(
    () =>
      postgraduates.filter((member) => {
        const matchesName =
          normalizedQuery.length === 0 ||
          member.name.toLowerCase().includes(normalizedQuery)
        const matchesInterest =
          interest === 'all' || member.interests.includes(interest)
        return matchesName && matchesInterest
      }),
    [postgraduates, normalizedQuery, interest],
  )

  const filteredAlumni = useMemo(
    () =>
      alumni.filter((member) => {
        const matchesName =
          normalizedQuery.length === 0 ||
          member.name.toLowerCase().includes(normalizedQuery)
        const matchesInterest =
          interest === 'all' || member.interests.includes(interest)
        return matchesName && matchesInterest
      }),
    [alumni, normalizedQuery, interest],
  )

  const showStaff = category === 'all' || category === 'staff'
  const showPostgraduates =
    category === 'all' || category === 'postgraduate'
  const showAlumni = category === 'all' || category === 'alumni'

  const visibleStaff = showStaff ? filteredStaff : []
  const visiblePostgraduates = showPostgraduates ? filteredPostgraduates : []
  const visibleAlumni = showAlumni ? filteredAlumni : []

  const visibleTotal =
    visibleStaff.length + visiblePostgraduates.length + visibleAlumni.length
  const directoryTotal = staff.length + postgraduates.length + alumni.length

  function resetFilters() {
    setQuery('')
    setCategory('all')
    setInterest('all')
    searchRef.current?.focus()
  }

  function handleCategoryChange(next: FilterCategory) {
    setCategory(next)
    if (next === 'postgraduate' || next === 'alumni') {
      setInterest('all')
    }
  }

  const resultsText = hasFilters
    ? `Showing ${visibleTotal} of ${directoryTotal} profiles`
    : `${directoryTotal} profiles across the team`

  return (
    <main className="bg-white">
      <section className="border-b border-[#e2e8f0] bg-white pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
            {intro.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
            {intro.heading}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#475569] md:text-lg">
            {intro.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href="#team-directory"
              className="inline-flex items-center gap-2 font-semibold text-[#0f172a] transition-colors hover:text-[#0f766e]"
            >
              Explore the team
              <ArrowDown size={15} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-medium text-[#475569] transition-colors hover:text-[#0f172a]"
            >
              Contact the group
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

         
        </div>
      </section>

      {/* <section
        aria-labelledby="filters-heading"
        className="border-y border-[#e2e8f0] bg-[#f8fafc] py-10"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-7 lg:grid-cols-[1fr_1.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Directory
              </p>
              <h2
                id="filters-heading"
                className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
              >
                Research Interests and Expertise
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#64748b]">
                Search by name, filter by career stage, or explore a research
                interest across the team.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div>
                  <label
                    htmlFor="team-search"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#475569]"
                  >
                    Search by name
                  </label>
                  <div className="relative">
                    <Search
                      size={16}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                    />
                    <input
                      ref={searchRef}
                      id="team-search"
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="e.g. Liew, Murnira, Talib"
                      className="w-full border border-[#cbd5e1] bg-white py-2.5 pl-9 pr-10 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20"
                    />
                    {query.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('')
                          searchRef.current?.focus()
                        }}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#94a3b8] transition-colors hover:text-[#0f172a]"
                      >
                        <X size={15} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!hasFilters}
                  className="inline-flex items-center justify-center gap-2 self-end border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:border-[#64748b] hover:text-[#0f172a] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  Reset filters
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_1.25fr]">
                <div>
                  <label
                    htmlFor="team-interest"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#475569]"
                  >
                    Research interest
                  </label>
                  <select
                    id="team-interest"
                    value={interest}
                    onChange={(event) => setInterest(event.target.value)}
                    disabled={interestIsDisabled}
                    className="w-full border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm text-[#0f172a] focus:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 disabled:cursor-not-allowed disabled:bg-[#f1f5f9] disabled:text-[#94a3b8]"
                  >
                    <option value="all">All research interests</option>
                    {interestOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="mb-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569]">
                    Team category
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_OPTIONS.map((option) => {
                      const active = category === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => handleCategoryChange(option.value)}
                          className={`border px-3 py-2 text-xs font-medium transition-colors ${
                            active
                              ? 'border-[#0f172a] bg-[#0f172a] text-white'
                              : 'border-[#cbd5e1] bg-white text-[#475569] hover:border-[#64748b] hover:text-[#0f172a]'
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-[#64748b]">
                <p role="status" aria-live="polite">
                  {resultsText}
                </p>
                <p>Research interest filters apply to the academic staff directory.</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div id="team-directory" className="scroll-mt-24">
        {visibleTotal === 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-6 py-14 text-center">
              <Users
                size={28}
                aria-hidden="true"
                className="mx-auto text-[#94a3b8]"
              />
              <h2 className="mt-4 font-serif text-2xl font-bold text-[#0f172a]">
                No team members match these filters
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#64748b]">
                Try a different name or research interest, or reset the filters
                to view the full team directory.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex items-center gap-2 bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Reset filters
              </button>
            </div>
          </section>
        ) : (
          <>
            {visibleStaff.length > 0 && (
              <section
                aria-labelledby="staff-heading"
                className="border-b border-[#e2e8f0] py-14 md:py-16"
              >
                <div className="mx-auto max-w-6xl px-6">
                  <SectionHeading
                    id="staff-heading"
                    eyebrow="Faculty"
                    title="Academic and Research Staff"
                    description="Researchers and academics contributing expertise across atmospheric chemistry, air quality, climate modelling, environmental health and sustainability."
                    count={visibleStaff.length}
                  />
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {visibleStaff.map((member) => (
                      <StaffCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {visiblePostgraduates.length > 0 && (
              <section
                aria-labelledby="postgraduate-heading"
                className="border-b border-[#e2e8f0] py-14 md:py-16"
              >
                <div className="mx-auto max-w-6xl px-6">
                  <SectionHeading
                    id="postgraduate-heading"
                    eyebrow="Research training"
                    title="Current Postgraduate Researchers"
                    description="Postgraduate researchers developing new evidence on indoor and ambient air quality, atmospheric composition, emissions and climate processes."
                    count={visiblePostgraduates.length}
                  />
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {visiblePostgraduates.map((member) => (
                      <PostgraduateCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {visibleAlumni.length > 0 && (
              <section
                aria-labelledby="alumni-heading"
                className="border-b border-[#e2e8f0] py-14 md:py-16"
              >
                <div className="mx-auto max-w-6xl px-6">
                  <SectionHeading
                    id="alumni-heading"
                    eyebrow="Former members"
                    title="Alumni and Former Researchers"
                    description="Former postgraduate researchers who completed their research with the group and continue to contribute to atmospheric and environmental science."
                    count={visibleAlumni.length}
                  />
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {visibleAlumni.map((member) => (
                      <AlumniCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-24 bg-white py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 border-t border-[#e2e8f0] pt-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Collaboration
              </p>
              <h2
                id="contact-heading"
                className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl"
              >
                {contact.heading}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">
                {contact.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
                  >
                    <Mail size={15} aria-hidden="true" />
                    Email the group
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#cbd5e1] bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#64748b]"
                >
                  Contact page
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="border border-[#e2e8f0] bg-[#f8fafc] p-6">
              <h3 className="font-serif text-lg font-bold text-[#0f172a]">
                Group contact
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[#475569]">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-2.5 transition-colors hover:text-[#0f172a]"
                  >
                    <Mail
                      size={15}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#0f766e]"
                    />
                    <span className="break-all">{contact.email}</span>
                  </a>
                )}
                {contact.addressLines.length > 0 && (
                  <div className="flex items-start gap-2.5">
                    <MapPin
                      size={15}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#0f766e]"
                    />
                    <address className="not-italic leading-relaxed">
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                )}
              </div>
              {contact.note && (
                <p className="mt-5 border-t border-[#e2e8f0] pt-4 text-xs leading-relaxed text-[#64748b]">
                  {contact.note}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
