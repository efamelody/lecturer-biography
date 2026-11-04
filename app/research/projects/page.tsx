import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import ProjectDirectory from '@/components/research/ProjectDirectory'
import ResearchSubnav from '@/components/research/ResearchSubnav'
import { getProjectsByScope, getResearchContent } from '@/lib/research'

const pageTitle = 'Research Projects'
const pageDescription =
  'Funded research projects led by Prof. Dr. Mohd Talib Latif across international, national and university grant schemes, including air-pollution forecasting, methane, COVID-19 air quality, transboundary haze and persistent organic pollutants.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://talib-latif.com/research/projects',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: 'https://talib-latif.com/research/projects',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'website',
  },
}

export default function ResearchProjectsPage() {
  const { themes, projects } = getResearchContent()
  const international = getProjectsByScope('International')
  const national = getProjectsByScope('National')
  const internal = getProjectsByScope('Internal')

  return (
    <main>
      <PageHero
        eyebrow="Research"
        title="Projects and funding"
        description="A complete directory of funded research projects recorded in the CV. Amounts are shown as recorded in the CV and are presented for transparency, not as headline measures of impact."
        aside={
          <div className="space-y-2 text-sm leading-relaxed text-[#64748b]">
            <p>
              <span className="font-serif text-3xl font-bold text-[#0f172a]">
                {projects.length}
              </span>{' '}
              funded projects
            </p>
            <p>
              {international.length} international · {national.length} national ·{' '}
              {internal.length} internal
            </p>
          </div>
        }
      />

      <ResearchSubnav active="projects" />

      <section className="bg-[#f8fafc] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ProjectDirectory
            projects={projects}
            themes={themes.map((theme) => ({ slug: theme.slug, title: theme.title }))}
          />
        </div>
      </section>
    </main>
  )
}
