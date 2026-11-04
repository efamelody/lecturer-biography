import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PrintButton from '@/components/cv/PrintButton'
import { getContent } from '@/lib/content'
import { getCareerContent } from '@/lib/career'
import { getTeachingCourses } from '@/lib/teaching'
import { getServiceContent } from '@/lib/service'
import { getSupervisionContent, getSupervisionStats } from '@/lib/supervision'
import { getResearchContent } from '@/lib/research'
import { getInvitedTalks, getConferencePresentations } from '@/lib/engagements'
import { getBooksAndChapters, getConferenceProceedings } from '@/lib/publications-extra'

export const metadata: Metadata = {
  title: 'Curriculum Vitae',
  description:
    'Print-ready curriculum vitae of Prof. Dr. Mohd Talib Latif: career, qualifications, awards, supervision, grants, publications and professional service.',
  alternates: {
    canonical: 'https://talib-latif.com/cv',
  },
}

interface Profile {
  name: string
  title: string
  email: string
  location: string
  bio: string[]
  education: Array<{ degree: string; year: string; field: string; institution: string }>
  fields: string[]
}

interface Contact {
  email: string
  phone?: string
  address: {
    line1: string
    line2: string
    line3: string
    line4: string
    line5: string
  }
}

interface Award {
  year: string
  title: string
  organization: string
  category: string
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-[#0f172a] pb-1 text-[13px] font-bold uppercase tracking-[0.18em] text-[#0f172a]">
      {children}
    </h2>
  )
}

function Entry({ period, title, subtitle }: { period: string; title: string; subtitle?: string }) {
  return (
    <div className="grid gap-0.5 py-1.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <p className="text-[11px] font-medium text-[#64748b]">{period}</p>
      <div>
        <p className="text-[13px] font-semibold leading-snug text-[#0f172a]">{title}</p>
        {subtitle && <p className="mt-0.5 text-[12px] leading-relaxed text-[#475569]">{subtitle}</p>}
      </div>
    </div>
  )
}

export default async function CvPage() {
  const profile = (await getContent('profile')) as Profile
  const contact = (await getContent('contact')) as Contact
  const awards = (await getContent('awards')) as Award[]
  const career = getCareerContent()
  const teaching = getTeachingCourses()
  const service = getServiceContent()
  const supervision = getSupervisionContent()
  const supervisionStats = getSupervisionStats()
  const research = getResearchContent()
  const invited = getInvitedTalks()
  const presentations = getConferencePresentations()
  const proceedings = getConferenceProceedings()
  const books = getBooksAndChapters()

  return (
    <main className="bg-[#f8fafc] pb-16 pt-24 print:bg-white print:pb-0 print:pt-0">
      <div className="mx-auto max-w-4xl px-6 print:max-w-none print:px-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#0f172a]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to profile
          </Link>
          <div className="flex flex-wrap gap-3">
            <a
              href="/cv/mohd-talib-latif-cv.pdf"
              download
              className="inline-flex items-center gap-2 bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
            >
              Download PDF
            </a>
            <PrintButton />
          </div>
        </div>

        <article className="border border-[#e2e8f0] bg-white p-8 shadow-sm print:border-0 print:p-0 print:shadow-none md:p-10">
          <header className="border-b border-[#0f172a] pb-5">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-[#475569]">{profile.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#64748b]">
              {contact.address.line1} · {contact.address.line3} · {contact.address.line4}
              <br />
              {profile.email}
              {contact.phone ? ` · ${contact.phone}` : ''} · {profile.location}
            </p>
          </header>

          <section className="mt-6">
            <SectionTitle>Profile</SectionTitle>
            <div className="space-y-2 text-[12.5px] leading-[1.7] text-[#334155]">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Qualifications</SectionTitle>
            <div className="space-y-1">
              {profile.education.map((item) => (
                <Entry
                  key={`${item.degree}-${item.year}`}
                  period={item.year}
                  title={`${item.degree} — ${item.field}`}
                  subtitle={item.institution}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Academic Career</SectionTitle>
            <div className="space-y-1">
              {career.academic.map((item) => (
                <Entry key={`${item.period}-${item.role}`} period={item.period} title={item.role} subtitle={item.organisation} />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Administrative and Management Roles</SectionTitle>
            <div className="space-y-1">
              {career.administrative.map((item) => (
                <Entry key={`${item.period}-${item.role}`} period={item.period} title={item.role} subtitle={item.organisation} />
              ))}
              {career.otherAppointments.map((item) => (
                <Entry key={`${item.period}-${item.role}`} period={item.period} title={item.role} subtitle={item.organisation} />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Awards and Prizes</SectionTitle>
            <div className="space-y-1">
              {awards.map((award) => (
                <Entry
                  key={`${award.year}-${award.title}`}
                  period={award.year}
                  title={award.title}
                  subtitle={`${award.organization}${award.category ? ` · ${award.category}` : ''}`}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Research Grants</SectionTitle>
            <div className="space-y-1">
              {research.projects.map((project) => (
                <Entry
                  key={project.id}
                  period={project.period}
                  title={project.title}
                  subtitle={`${project.funder} · ${project.scheme || '—'} · ${project.scope} · ${project.role} · ${new Intl.NumberFormat('en-MY', { style: 'currency', currency: project.currency, maximumFractionDigits: 0 }).format(project.amount)}`}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Postgraduate Supervision</SectionTitle>
            <p className="mb-2 text-[12px] leading-relaxed text-[#475569]">
              {supervisionStats.total} postgraduate researchers: {supervisionStats.completedPhd} completed PhDs,{' '}
              {supervisionStats.currentPhd} current PhD researchers, {supervisionStats.completedMsc} completed MSc
              researchers and {supervisionStats.currentMsc} current MSc researcher.
            </p>
            <div className="space-y-3 text-[12px] leading-relaxed text-[#334155]">
              {[
                ['Completed PhD — main supervisor', supervision.completedPhdMain],
                ['Completed PhD — co-supervisor', supervision.completedPhdCo],
                ['Current PhD researchers', supervision.currentPhd],
                ['Completed MSc — main supervisor', supervision.completedMscMain],
                ['Completed MSc — co-supervisor', supervision.completedMscCo],
                ['Current MSc researchers', supervision.currentMsc],
              ].map(([label, records]) => (
                <div key={String(label)}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                    {String(label)}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {(records as typeof supervision.completedPhdMain).map((record) => (
                      <li key={record.id}>
                        <span className="font-medium text-[#0f172a]">{record.name}</span>
                        {record.yearCompleted ? ` (${record.yearCompleted})` : record.yearStarted ? ` (started ${record.yearStarted})` : ''}
                        {' — '}
                        {record.thesisTitle}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Conference Proceedings</SectionTitle>
            <ul className="space-y-2 text-[12px] leading-relaxed text-[#334155]">
              {proceedings.map((item) => (
                <li key={item.id}>
                  {item.authors} ({item.year}). {item.title}. <em>{item.venue}</em>
                  {item.volume ? `, Vol. ${item.volume}` : ''}
                  {item.pages ? `, pp. ${item.pages}` : ''}.
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <SectionTitle>Books and Chapters</SectionTitle>
            <ul className="space-y-2 text-[12px] leading-relaxed text-[#334155]">
              {books.map((item) => (
                <li key={item.id}>
                  {item.authors} ({item.year}). {item.title}. In <em>{item.bookTitle}</em>
                  {item.editors ? `, edited by ${item.editors}` : ''}. {item.publisher}
                  {item.pages ? `, pp. ${item.pages}` : ''}.
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-[#64748b]">
              The full journal publication record is available in the{' '}
              <Link href="/publications" className="underline underline-offset-2">
                online publications explorer
              </Link>{' '}
              and through Scopus and ORCID.
            </p>
          </section>

          <section className="mt-6">
            <SectionTitle>Invited and Plenary Talks</SectionTitle>
            <div className="space-y-1">
              {invited.map((talk) => (
                <Entry
                  key={talk.id}
                  period={`${talk.year}${talk.date ? ` · ${talk.date}` : ''}`}
                  title={talk.title}
                  subtitle={`${talk.event} · ${talk.location}`}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Conference Presentations</SectionTitle>
            <div className="space-y-1">
              {presentations.map((talk) => (
                <Entry
                  key={talk.id}
                  period={`${talk.year}${talk.date ? ` · ${talk.date}` : ''}`}
                  title={talk.title}
                  subtitle={`${talk.event} · ${talk.location}`}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Teaching</SectionTitle>
            <div className="space-y-1">
              {teaching.map((course) => (
                <Entry
                  key={course.code}
                  period={course.years}
                  title={`${course.code} — ${course.title}`}
                  subtitle={course.level}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <SectionTitle>Professional Memberships and Service</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0f766e]">National</p>
                <ul className="mt-1 space-y-1 text-[12px] leading-relaxed text-[#334155]">
                  {service.national.map((item) => (
                    <li key={`${item.organisation}-${item.role}`}>
                      {item.role}, {item.organisation}
                      {item.period ? ` (${item.period})` : ''}.
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0f766e]">International</p>
                <ul className="mt-1 space-y-1 text-[12px] leading-relaxed text-[#334155]">
                  {service.international.map((item) => (
                    <li key={`${item.organisation}-${item.role}`}>
                      {item.role}, {item.organisation}
                      {item.period ? ` (${item.period})` : ''}.
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                Editorial and advisory boards
              </p>
              <ul className="mt-1 space-y-1 text-[12px] leading-relaxed text-[#334155]">
                {service.editorial.map((item) => (
                  <li key={`${item.publication}-${item.role}`}>
                    {item.role}, <em>{item.publication}</em>, {item.publisher}
                    {item.period ? ` (${item.period})` : ''}.
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
