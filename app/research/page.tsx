import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import PlaceholderFigure from '@/components/ui/PlaceholderFigure'
import ResearchSubnav from '@/components/research/ResearchSubnav'
import SectionHeader from '@/components/ui/SectionHeader'
import {
  formatProjectAmount,
  getProjectsByScope,
  getResearchContent,
  type ResearchProject,
} from '@/lib/research'

const pageTitle = 'Research'
const pageDescription =
  'Research themes, funded projects and scientific impact of Prof. Dr. Mohd Talib Latif: atmospheric aerosols, surface ozone and VOCs, indoor and outdoor air quality, regional haze and persistent organic pollutants.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://talib-latif.com/research',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: 'https://talib-latif.com/research',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'website',
  },
}

function ProjectRow({ project }: { project: ResearchProject }) {
  return (
    <article className="grid gap-3 border-b border-[#e2e8f0] py-5 last:border-b-0 md:grid-cols-[7rem_minmax(0,1fr)_9rem] md:gap-8">
      <div className="text-xs leading-relaxed text-[#64748b]">
        <p className="font-semibold text-[#475569]">{project.period}</p>
        <p className="mt-1">{project.scope}</p>
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-lg font-bold leading-snug text-[#0f172a]">
          {project.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-[#64748b]">{project.funder}</p>
      </div>
      <p className="text-sm font-medium text-[#0f172a] md:text-right">
        {formatProjectAmount(project)}
      </p>
    </article>
  )
}

export default function ResearchPage() {
  const { intro, themes, projects, impact, collaborations } = getResearchContent()
  const international = getProjectsByScope('International')
  const national = getProjectsByScope('National')
  const internal = getProjectsByScope('Internal')
  const featured = [
    ...projects.filter((project) => project.scope === 'International').slice(0, 2),
    ...projects.filter((project) => project.scope === 'National').slice(0, 1),
  ]

  return (
    <main>
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.heading}
        description={intro.description}
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
            <p>{themes.length} research themes</p>
          </div>
        }
      />

      <ResearchSubnav active="research" />

      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Research themes"
            title="Questions that connect the atmosphere to society"
            description="Each theme combines field measurements, laboratory analysis and modelling, with a consistent focus on policy-relevant evidence in Malaysia and Southeast Asia."
          />

          <div className="mt-4">
            {themes.map((theme, index) => (
              <article
                key={theme.slug}
                id={theme.slug}
                className="section-anchor grid gap-6 border-b border-[#e2e8f0] py-10 last:border-b-0 md:grid-cols-2 md:items-center md:gap-12"
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <PlaceholderFigure
                    src={theme.image}
                    alt={`Illustrative placeholder for ${theme.title}`}
                    className="aspect-[16/10]"
                    sizes="(min-width: 768px) 45vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                    Theme {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl">
                    {theme.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#475569]">
                    {theme.description}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-[#64748b]">
                    {theme.keywords.join(' · ')}
                  </p>
                  <Link
                    href="/research/projects"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f172a] transition-colors hover:text-[#0f766e]"
                  >
                    Related projects
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e2e8f0] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Selected projects"
            title="Research with regional reach"
            description={`${projects.length} funded projects as project leader: ${international.length} international, ${national.length} national and ${internal.length} internal.`}
            action={
              <Link
                href="/research/projects"
                className="inline-flex items-center gap-1.5 border-b border-[#cbd5e1] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569] transition-colors hover:border-[#0f172a] hover:text-[#0f172a]"
              >
                All projects
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            }
          />

          <div className="mt-8 border-y border-[#e2e8f0]">
            {featured.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>

          <Link
            href="/research/projects"
            className="mt-6 inline-flex items-center gap-2 bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
          >
            Project directory
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Impact"
            title="Research that informs policy and practice"
            description="The research programme connects atmospheric measurements and modelling to environmental management, public health and international climate assessment."
          />
          <ol className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {impact.map((item, index) => (
              <li key={item.title} className="border-t border-[#e2e8f0] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-[#0f172a]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#64748b]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Collaboration"
            title="Institutions and networks"
            description="Research is delivered through long-standing collaborations with Malaysian agencies, regional partners and international scientific networks."
          />
          <ul className="mt-8 grid gap-x-10 border-t border-[#e2e8f0] sm:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((item) => (
              <li
                key={item}
                className="border-b border-[#e2e8f0] py-3 text-sm leading-relaxed text-[#475569]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
