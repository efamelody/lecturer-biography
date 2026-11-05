import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Mail, MapPin } from 'lucide-react'
import type { TeamMember, TeamPageContent } from '@/lib/team-types'

const TITLE_WORDS = new Set(['prof.', 'prof', 'madya', 'assoc.', 'assoc', 'dr.', 'dr', 'ts.', 'ts'])

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

function Portrait({ member }: { member: TeamMember }) {
  if (member.image) {
    return (
      <div className="h-28 w-28 shrink-0 overflow-hidden border border-[#e2e8f0] bg-[#f1f5f9]">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          width={224}
          height={224}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-28 w-28 shrink-0 items-center justify-center border border-[#d6e8e5] bg-[#f0f7f6] text-sm font-semibold tracking-wide text-[#0f5f59]"
    >
      {getInitials(member.name)}
    </div>
  )
}

function StaffRow({ member }: { member: TeamMember }) {
  return (
    <li className="grid gap-5 py-7 sm:grid-cols-[7rem_1fr] sm:gap-7">
      <Portrait member={member} />
      <div className="min-w-0">
        <h3 className="font-serif text-xl font-bold leading-snug tracking-tight text-[#0f172a]">
          {member.name}
        </h3>
        {member.role && (
          <p className="mt-1 text-sm font-medium leading-relaxed text-[#0f766e]">{member.role}</p>
        )}
        {member.description && (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#475569]">
            {member.description}
          </p>
        )}
        {member.interests.length > 0 && (
          <p className="mt-3 text-xs leading-relaxed text-[#64748b]">
            {member.interests.join(' · ')}
          </p>
        )}
        {(member.profileUrl || member.scholarUrl) && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {member.profileUrl && (
              <a
                href={member.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0f172a] transition-colors hover:text-[#0f766e]"
              >
                Profile
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            )}
            {member.scholarUrl && (
              <a
                href={member.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#475569] transition-colors hover:text-[#0f172a]"
              >
                Google Scholar
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default function StaffDirectory({ team }: { team: TeamPageContent }) {
  return (
    <div>
      <section aria-labelledby="staff-heading">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e2e8f0] pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              People
            </p>
            <h2
              id="staff-heading"
              className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0f172a]"
            >
              Staff directory
            </h2>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
            {team.staff.length} profiles
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#64748b]">
          The group brings together academic staff, research fellows and science officers working
          across atmospheric chemistry, air quality, climate modelling, environmental health and
          sustainability.
        </p>

        <ul className="mt-6 divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
          {team.staff.map((member) => (
            <StaffRow key={member.id} member={member} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="group-contact-heading" className="mt-16 border-t border-[#e2e8f0] pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              Collaboration
            </p>
            <h2
              id="group-contact-heading"
              className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0f172a]"
            >
              {team.contact.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
              {team.contact.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {team.contact.email && (
                <a
                  href={`mailto:${team.contact.email}`}
                  className="inline-flex items-center gap-2 bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
                >
                  <Mail size={15} aria-hidden="true" />
                  Email the group
                </a>
              )}
              <Link
                href="/research/supervision"
                className="inline-flex items-center gap-2 border border-[#cbd5e1] bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#64748b]"
              >
                Supervision record
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="border-t border-[#e2e8f0] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3 className="font-serif text-lg font-bold text-[#0f172a]">Group contact</h3>
            <div className="mt-4 space-y-3 text-sm text-[#475569]">
              {team.contact.email && (
                <a
                  href={`mailto:${team.contact.email}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-[#0f172a]"
                >
                  <Mail size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[#0f766e]" />
                  <span className="break-all">{team.contact.email}</span>
                </a>
              )}
              {team.contact.addressLines.length > 0 && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[#0f766e]" />
                  <address className="not-italic leading-relaxed">
                    {team.contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              )}
            </div>
            {team.contact.note && (
              <p className="mt-5 border-t border-[#e2e8f0] pt-4 text-xs leading-relaxed text-[#64748b]">
                {team.contact.note}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
