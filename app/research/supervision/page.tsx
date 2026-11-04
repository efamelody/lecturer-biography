import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import ResearchSubnav from '@/components/research/ResearchSubnav'
import ResearchGroupDirectory, {
  type AlumniRecord,
  type PersonRecord,
} from '@/components/research-group/ResearchGroupDirectory'
import { getContent } from '@/lib/content'
import { getSupervisionContent, getSupervisionStats } from '@/lib/supervision'
import { getTeamPageContent } from '@/lib/team'

const pageTitle = 'Supervision'
const pageDescription =
  'Current and completed PhD and MSc researchers supervised by Prof. Dr. Mohd Talib Latif, including the full supervision record transcribed from the CV.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://talib-latif.com/research/supervision',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: 'https://talib-latif.com/research/supervision',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'website',
  },
}

function normalizeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export default async function SupervisionPage() {
  const supervision = getSupervisionContent()
  const stats = getSupervisionStats()
  const team = await getTeamPageContent()
  const contact = (await getContent('contact')) as { email: string }

  const completedPhdRecords = [...supervision.completedPhdMain, ...supervision.completedPhdCo]
  const completedMscRecords = [...supervision.completedMscMain, ...supervision.completedMscCo]
  const completedNames = new Set(
    [...completedPhdRecords, ...completedMscRecords].map((record) => normalizeName(record.name)),
  )
  const currentNames = new Set(
    [...supervision.currentPhd, ...supervision.currentMsc].map((record) => normalizeName(record.name)),
  )

  const extraCurrent = team.postgraduates.filter((member) => {
    const key = normalizeName(member.name)
    return !currentNames.has(key) && !completedNames.has(key)
  })

  const current: PersonRecord[] = [
    ...supervision.currentPhd.map((record) => ({
      id: record.id,
      name: record.name,
      degree: 'PhD',
      thesisTitle: record.thesisTitle,
      yearStarted: record.yearStarted,
      role: record.role,
    })),
    ...supervision.currentMsc.map((record) => ({
      id: record.id,
      name: record.name,
      degree: 'MSc',
      thesisTitle: record.thesisTitle,
      yearStarted: record.yearStarted,
      role: record.role,
    })),
    ...extraCurrent.map((member) => ({
      id: member.id,
      name: member.name,
      degree: 'Postgraduate',
      thesisTitle: member.researchTitle,
      role: member.supervisor ?? member.role ?? 'Research group member',
      note: member.description,
    })),
  ]

  const completedPhd: PersonRecord[] = completedPhdRecords.map((record) => ({
    id: record.id,
    name: record.name,
    degree: 'PhD',
    thesisTitle: record.thesisTitle,
    yearCompleted: record.yearCompleted,
    yearStarted: record.yearStarted,
    role: record.role,
    note: record.note,
  }))

  const completedMsc: PersonRecord[] = completedMscRecords.map((record) => ({
    id: record.id,
    name: record.name,
    degree: 'MSc',
    thesisTitle: record.thesisTitle,
    yearCompleted: record.yearCompleted,
    role: record.role,
    note: record.note,
  }))

  const extraAlumni: AlumniRecord[] = team.alumni
    .filter((member) => !completedNames.has(normalizeName(member.name)))
    .map((member) => ({
      id: member.id,
      name: member.name,
      previousRole: member.previousRole,
      previousDegree: member.previousDegree,
      researchTopic: member.researchTopic,
      graduationYear: member.graduationYear,
    }))

  const displayStats = {
    ...stats,
    total: stats.total + extraCurrent.length,
    additionalCurrent: extraCurrent.length,
  }

  return (
    <main>
      <PageHero
        eyebrow={supervision.intro.eyebrow}
        title="Supervision"
        description={supervision.intro.description}
      />

      <ResearchSubnav active="supervision" />

      <section className="bg-[#f8fafc] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-5 text-xs leading-relaxed text-[#64748b]">
            {extraCurrent.length > 0
              ? `${displayStats.total} researchers are listed: ${stats.total} from the supervision record and ${extraCurrent.length} additional current group researchers from the team directory.`
              : `${stats.total} unique researchers are listed from the supervision record.`}{' '}
            The CV contains 43 supervision entries because one researcher appears in both the
            in-progress and completed lists; the records have been merged here.
          </p>
          <ResearchGroupDirectory
            current={current}
            completedPhd={completedPhd}
            completedMsc={completedMsc}
            alumni={extraAlumni}
            stats={displayStats}
          />
        </div>
      </section>

      <section className="border-t border-[#e2e8f0] bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 border border-[#e2e8f0] bg-[#f8fafc] p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
                Prospective researchers
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0f172a]">
                Research training and collaboration
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
                The group welcomes enquiries from prospective postgraduate researchers and
                collaborators working on atmospheric chemistry, air quality, climate and
                environmental health. Please include a short research proposal and your academic
                background in your enquiry.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
              >
                <Mail size={15} aria-hidden="true" />
                Email the group
              </a>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 border border-[#cbd5e1] bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#64748b]"
              >
                Research themes
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
