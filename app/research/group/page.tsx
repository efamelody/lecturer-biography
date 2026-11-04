import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import ResearchSubnav from '@/components/research/ResearchSubnav'
import StaffDirectory from '@/components/research/StaffDirectory'
import { getTeamPageContent } from '@/lib/team'

const pageTitle = 'Research Group'
const pageDescription =
  'Academic and research staff in the atmospheric chemistry, air quality and climate research group led by Prof. Dr. Mohd Talib Latif at Universiti Kebangsaan Malaysia.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://talib-latif.com/research/group',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: 'https://talib-latif.com/research/group',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'website',
  },
}

export default async function ResearchGroupPage() {
  const team = await getTeamPageContent()

  return (
    <main>
      <PageHero
        eyebrow="Research Group"
        title="Academic and research staff"
        description="The research group brings together academic staff, research fellows and science officers working across atmospheric chemistry, air quality, climate modelling, environmental health and sustainability."
        aside={
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-[#64748b]">
              <span className="font-serif text-3xl font-bold text-[#0f172a]">{team.staff.length}</span>{' '}
              academic and research staff
            </p>
            <Link
              href="/research/supervision"
              className="inline-flex items-center gap-1.5 border-b border-[#cbd5e1] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569] transition-colors hover:border-[#0f172a] hover:text-[#0f172a]"
            >
              Supervision record
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        }
      />
      <ResearchSubnav active="group" />
      <section className="bg-[#f8fafc] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <StaffDirectory team={team} />
        </div>
      </section>
    </main>
  )
}
