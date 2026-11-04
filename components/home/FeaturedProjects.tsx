import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PlaceholderFigure from '@/components/ui/PlaceholderFigure'
import { formatProjectAmount, getFeaturedProjects, getResearchTheme } from '@/lib/research'

const PROJECT_IMAGES: Record<string, string> = {
  'fcdo-forecasting-2023': '/placeholders/project-forecasting.svg',
  'apn-covid-2021': '/placeholders/project-covid.svg',
  'asean-india-haze-2019': '/placeholders/project-haze.svg',
}

export default function FeaturedProjects() {
  const projects = getFeaturedProjects(3)

  return (
    <section className="border-t border-[#e2e8f0] bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Selected projects"
          title="Research with regional reach"
          description="Funded work spanning regional forecasting, pandemic-era air quality, transboundary haze, persistent pollutants and monitoring technology."
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

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => {
            const image =
              PROJECT_IMAGES[project.id] ??
              getResearchTheme(project.themes[0])?.image ??
              '/placeholders/project-forecasting.svg'

            return (
              <article
                key={project.id}
                className="flex h-full flex-col border border-[#e2e8f0] bg-[#f8fafc]"
              >
                <PlaceholderFigure
                  src={image}
                  alt={`Illustrative placeholder for ${project.title}`}
                  className="aspect-[16/9]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                    {project.scope} · {project.period}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a]">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748b]">
                    {project.summary}
                  </p>
                  <dl className="mt-4 space-y-1 border-t border-[#e2e8f0] pt-4 text-xs text-[#64748b]">
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-medium text-[#475569]">Funder</dt>
                      <dd>{project.funder}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-medium text-[#475569]">Award</dt>
                      <dd>{formatProjectAmount(project)}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
