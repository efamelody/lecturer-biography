import Link from 'next/link'
import {
  BookOpen,
  Download,
  ExternalLink,
  Mail,
  Users,
} from 'lucide-react'
import AboutNav from '@/components/about/AboutNav'
import AboutSubnav from '@/components/about/AboutSubnav'
import Timeline, { type TimelineItem } from '@/components/ui/Timeline'
import { getContent } from '@/lib/content'
import { getCareerContent } from '@/lib/career'
import { getServiceContent } from '@/lib/service'
import { getTeachingCourses } from '@/lib/teaching'

interface ProfileData {
  name: string
  title: string
  email: string
  metrics: Array<{ source: string; hIndex: number; date: string; identifier: string }>
  profiles: Array<{ label: string; url: string }>
}

interface AwardItem {
  year: string
  title: string
  organization: string
  category: string
}

interface AffiliationItem {
  name: string
  fullName: string
  role: string
  period?: string
  category?: string
}

interface ContactData {
  email: string
}

const sections = [
  { id: 'career', label: 'Academic career' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'awards', label: 'Awards' },
  { id: 'reputation', label: 'Metrics & profiles' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'service', label: 'Service' },
  { id: 'download', label: 'Curriculum vitae' },
]

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-8 border-b border-[#e2e8f0] pb-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0f172a]">
        {title}
      </h2>
    </div>
  )
}

export default async function CareerContent() {
  const profile = (await getContent('profile')) as ProfileData
  const awards = (await getContent('awards')) as AwardItem[]
  const affiliations = (await getContent('affiliations')) as AffiliationItem[]
  const contact = (await getContent('contact')) as ContactData
  const career = getCareerContent()
  const service = getServiceContent()
  const teaching = getTeachingCourses()

  const careerItems: TimelineItem[] = [
    ...career.academic.map((item) => ({
      period: item.period,
      title: item.role,
      subtitle: item.organisation,
      current: item.current,
    })),
    ...career.otherAppointments
      .filter((item) => item.role === 'Sabbatical leave')
      .map((item) => ({
        period: item.period,
        title: 'Sabbatical leave',
        subtitle: item.organisation,
      })),
  ]

  const leadershipItems: TimelineItem[] = [
    ...career.administrative.map((item) => ({
      period: item.period,
      title: item.role,
      subtitle: item.organisation,
      current: item.current,
    })),
    ...career.otherAppointments
      .filter((item) => item.role !== 'Sabbatical leave')
      .map((item) => ({
        period: item.period,
        title: item.role,
        subtitle: item.organisation,
      })),
  ]

  return (
    <main className="pt-20">
      <section className="border-b border-[#e2e8f0] bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
            About
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl font-bold tracking-tight text-[#0f172a] md:text-5xl">
            Career &amp; Recognition
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Academic appointments, leadership roles, awards, research metrics, teaching and
            professional service of {profile.name}.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[#cbd5e1] px-4 py-2.5 font-medium text-[#0f172a] transition-colors hover:border-[#64748b]"
            >
              Back to profile
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 px-1 py-2.5 font-medium text-[#475569] transition-colors hover:text-[#0f172a]"
            >
              <Mail size={15} aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </section>

      <AboutSubnav active="career" />

      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="order-first w-full shrink-0 lg:w-[240px]">
            <div className="lg:sticky lg:top-24">
              <p className="mb-4 hidden text-[11px] font-medium uppercase tracking-[0.16em] text-[#94a3b8] lg:block">
                On this page
              </p>
              <AboutNav sections={sections} />
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-16">
            <section id="career" className="section-anchor">
              <SectionHeading id="career-heading" eyebrow="Career" title="Academic career" />
              <Timeline items={careerItems} />
            </section>

            <section id="leadership" className="section-anchor">
              <SectionHeading
                id="leadership-heading"
                eyebrow="Leadership"
                title="Administrative and management roles"
              />
              <Timeline items={leadershipItems} />
            </section>

            <section id="awards" className="section-anchor">
              <SectionHeading id="awards-heading" eyebrow="Recognition" title="Awards and prizes" />
              <ol className="border-y border-[#e2e8f0]">
                {awards.map((award) => (
                  <li
                    key={`${award.year}-${award.title}`}
                    className="grid gap-3 border-b border-[#e2e8f0] py-5 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                        {award.year}
                      </p>
                      {award.category && (
                        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#94a3b8]">
                          {award.category}
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold leading-snug text-[#0f172a]">
                        {award.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748b]">
                        {award.organization}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="reputation" className="section-anchor">
              <SectionHeading
                id="reputation-heading"
                eyebrow="Academic reputation"
                title="Research metrics and identifiers"
              />
              <div className="border-y border-[#e2e8f0]">
                {profile.metrics.map((metric) => (
                  <div
                    key={metric.source}
                    className="grid gap-2 border-b border-[#e2e8f0] py-4 last:border-b-0 sm:grid-cols-[10rem_5rem_1fr] sm:items-baseline sm:gap-6"
                  >
                    <p className="text-sm font-semibold text-[#0f172a]">{metric.source}</p>
                    <p className="font-serif text-2xl font-bold text-[#0f172a]">{metric.hIndex}</p>
                    <p className="text-xs leading-relaxed text-[#64748b]">
                      h-index · {metric.date}
                      {metric.identifier ? ` · ${metric.identifier}` : ''}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 max-w-3xl text-xs leading-relaxed text-[#64748b]">
                Metrics are reported separately by each database and are not combined. The live
                Scopus profile is used where available; date labels indicate the CV snapshot.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {profile.profiles.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#0f172a] transition-colors hover:text-[#0f766e]"
                  >
                    {link.label}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            <section id="teaching" className="section-anchor">
              <SectionHeading id="teaching-heading" eyebrow="Teaching" title="Courses taught" />
              <div className="divide-y divide-[#e2e8f0] border-y border-[#e2e8f0] md:hidden">
                {teaching.map((course) => (
                  <div key={course.code} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-[#0f172a]">{course.code}</p>
                      <p className="text-xs uppercase tracking-[0.1em] text-[#64748b]">
                        {course.level}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#475569]">{course.title}</p>
                    <p className="mt-1 text-xs text-[#64748b]">{course.years}</p>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto border border-[#e2e8f0] bg-white md:block">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[#f8fafc] text-[10px] uppercase tracking-[0.14em] text-[#64748b]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Code</th>
                      <th className="px-4 py-3 font-semibold">Course</th>
                      <th className="px-4 py-3 font-semibold">Level</th>
                      <th className="px-4 py-3 font-semibold">Years</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {teaching.map((course) => (
                      <tr key={course.code}>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-[#0f172a]">
                          {course.code}
                        </td>
                        <td className="px-4 py-3 text-[#475569]">{course.title}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#64748b]">{course.level}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#64748b]">{course.years}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="service" className="section-anchor">
              <SectionHeading
                id="service-heading"
                eyebrow="Service"
                title="Memberships, committees and editorial boards"
              />

              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-[#0f172a]">
                    <Users size={17} className="text-[#0f766e]" aria-hidden="true" />
                    National
                  </h3>
                  <ul className="mt-4 space-y-5">
                    {service.national.map((item) => (
                      <li
                        key={`${item.organisation}-${item.role}`}
                        className="border-l-2 border-[#d6e8e5] pl-4"
                      >
                        <p className="text-sm font-semibold text-[#0f172a]">{item.role}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#64748b]">
                          {item.organisation}
                        </p>
                        {item.period && (
                          <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#94a3b8]">
                            {item.period}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-[#0f172a]">
                    <BookOpen size={17} className="text-[#0f766e]" aria-hidden="true" />
                    International
                  </h3>
                  <ul className="mt-4 space-y-5">
                    {service.international.map((item) => (
                      <li
                        key={`${item.organisation}-${item.role}`}
                        className="border-l-2 border-[#d6e8e5] pl-4"
                      >
                        <p className="text-sm font-semibold text-[#0f172a]">{item.role}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#64748b]">
                          {item.organisation}
                        </p>
                        {item.period && (
                          <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#94a3b8]">
                            {item.period}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="mt-12 font-serif text-xl font-bold text-[#0f172a]">
                Editorial and advisory boards
              </h3>
              <ol className="mt-4 border-y border-[#e2e8f0]">
                {service.editorial.map((item) => (
                  <li
                    key={`${item.publication}-${item.role}`}
                    className="border-b border-[#e2e8f0] py-4 last:border-b-0"
                  >
                    <p className="text-sm font-semibold text-[#0f172a]">{item.role}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#64748b]">
                      {item.publication}
                    </p>
                    <p className="mt-1 text-xs text-[#94a3b8]">
                      {item.publisher}
                      {item.period ? ` · ${item.period}` : ''}
                    </p>
                  </li>
                ))}
              </ol>

              <h3 className="mt-12 font-serif text-xl font-bold text-[#0f172a]">
                Affiliations and collaborations
              </h3>
              <div className="mt-4 grid gap-x-8 gap-y-5 border-t border-[#e2e8f0] pt-5 sm:grid-cols-2">
                {affiliations.map((item) => (
                  <div key={`${item.name}-${item.role}`}>
                    <p className="text-sm font-semibold text-[#0f172a]">
                      {item.name}
                      {item.category ? (
                        <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.12em] text-[#94a3b8]">
                          {item.category}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#64748b]">{item.fullName}</p>
                    <p className="mt-0.5 text-xs font-medium text-[#475569]">
                      {item.role}
                      {item.period ? ` · ${item.period}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="download" className="section-anchor">
              <div className="border border-[#e2e8f0] bg-[#0f172a] p-8 text-white md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#99f6e4]">
                  Curriculum vitae
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
                  Download the full academic record
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#cbd5e1]">
                  The print-ready CV brings together the full career history, qualifications,
                  awards, supervision, grants, publications and professional service.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/cv"
                    className="inline-flex items-center gap-2 bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#e2e8f0]"
                  >
                    <Download size={15} aria-hidden="true" />
                    Open CV
                  </Link>
                  <a
                    href="/cv/mohd-talib-latif-cv.pdf"
                    download
                    className="inline-flex items-center gap-2 border border-[#475569] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#94a3b8]"
                  >
                    <Download size={15} aria-hidden="true" />
                    Download PDF
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 border border-[#475569] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#94a3b8]"
                  >
                    <Mail size={15} aria-hidden="true" />
                    Contact
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
