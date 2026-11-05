import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BookOpen, GraduationCap, Mail, Users } from 'lucide-react'
import { getContent } from '@/lib/content'
import { getTeachingContent, type ThesisEntry, type TaughtCourseGroup } from '@/lib/teaching'
import TeachingSidebar from '@/components/about/TeachingSidebar'

interface ContactData {
  email: string
  address: {
    line1: string
    line2: string
    line3: string
    line4: string
    line5: string
  }
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-[#64748b]">{description}</p>
      )}
    </div>
  )
}

function DegreeHeading({
  id,
  degree,
  description,
}: {
  id: string
  degree: string
  description: string
}) {
  return (
    <div id={id} className="mb-6 scroll-mt-24">
      <h3 className="font-serif text-xl font-bold tracking-tight text-[#0f172a] md:text-2xl">
        {degree}
      </h3>
      <p className="mt-1 text-sm text-[#64748b]">{description}</p>
    </div>
  )
}

function CategoryHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
      {children}
    </h4>
  )
}

function AwardList({ groups }: { groups: TaughtCourseGroup[] }) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.level}>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
            {group.level}
          </h3>
          <div className="border-y border-[#e2e8f0]">
            {group.courses.map((course) => (
              <div
                key={`${course.code}-${course.title}`}
                className="grid gap-2 border-b border-[#e2e8f0] py-4 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                  {course.period}
                </p>
                <div>
                  <h4 className="text-sm font-semibold leading-snug text-[#0f172a]">
                    {course.code}&ensp;{course.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ThesisTable({ entries }: { entries: ThesisEntry[] }) {
  return (
    <div className="border-y border-[#e2e8f0]">
      {entries.map((entry) => (
        <div
          key={entry.no}
          className="grid gap-2 border-b border-[#e2e8f0] py-4 last:border-b-0 sm:grid-cols-[2.5rem_1fr_12rem] sm:gap-6"
        >
          <p className="text-[11px] font-semibold text-[#94a3b8]">
            {String(entry.no).padStart(2, '0')}
          </p>
          <div>
            <h4 className="text-sm font-semibold leading-snug text-[#0f172a]">{entry.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{entry.student}</p>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b] sm:text-right">
            {entry.year}
          </p>
        </div>
      ))}
    </div>
  )
}

export default async function TeachingContent() {
  const teaching = getTeachingContent()
  const contact = (await getContent('contact')) as ContactData

  const totalCourses = teaching.taughtCourses.reduce((n, g) => n + g.courses.length, 0)
  const totalPhd =
    teaching.phdCompletedMain.length +
    teaching.phdCompletedCo.length +
    teaching.phdInProgress.length
  const totalMsc =
    teaching.mscCompletedMain.length +
    teaching.mscCompletedCo.length +
    teaching.mscInProgress.length

  const stats = [
    { icon: <BookOpen size={13} aria-hidden="true" />, value: `${totalCourses}`, label: 'Courses taught' },
    { icon: <GraduationCap size={13} aria-hidden="true" />, value: `${totalPhd}`, label: 'PhD candidates' },
    { icon: <Users size={13} aria-hidden="true" />, value: `${totalMsc}`, label: 'MSc candidates' },
  ]

  return (
    <main className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white pb-12 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]">
            About
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#0f172a] md:text-5xl">
            Teaching &amp; Education
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Courses taught and postgraduate supervision record of Prof. Dr. Mohd Talib Latif at
            Universiti Kebangsaan Malaysia, spanning undergraduate and postgraduate teaching
            together with the supervision of PhD and MSc candidates.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          <TeachingSidebar
            contact={{ email: contact.email, address: { line1: contact.address.line1, line4: contact.address.line4 } }}
            stats={stats}
          />

          <div className="min-w-0 flex-1">
            <figure className="mb-16 w-full max-w-md overflow-hidden border border-[#e2e8f0] bg-white">
              <div className="relative aspect-[4/3] bg-[#f1f5f9]">
                <Image
                  src="/teaching/teaching.jpg"
                  alt="Teaching and supervision at Universiti Kebangsaan Malaysia"
                  fill
                  priority
                  sizes="(min-width: 768px) 448px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-[#e2e8f0] px-4 py-3 text-[11px] leading-relaxed text-[#64748b]">
                Teaching and supervision · Universiti Kebangsaan Malaysia
              </figcaption>
            </figure>

            <div className="space-y-20">
              <section
                id="taught-courses"
                aria-labelledby="taught-courses-heading"
                className="scroll-mt-24"
              >
                <SectionHeading
                  id="taught-courses-heading"
                  eyebrow="Taught courses"
                  title="Taught courses"
                  description="Undergraduate and postgraduate teaching at the School of Environmental and Natural Resource Sciences, Faculty of Science and Technology, Universiti Kebangsaan Malaysia."
                />
                <div className="max-w-3xl">
                  <AwardList groups={teaching.taughtCourses} />
                </div>
              </section>

              <section
                id="supervision"
                aria-labelledby="supervision-heading"
                className="scroll-mt-24 border-t border-[#e2e8f0] pt-12"
              >
                <SectionHeading
                  id="supervision-heading"
                  eyebrow="Postgraduate supervision"
                  title="Supervision"
                  description="Supervision record for PhD and MSc candidates at Universiti Kebangsaan Malaysia, both completed and in progress."
                />

                <div className="max-w-3xl space-y-16">
                  <div>
                    <DegreeHeading
                      id="phd"
                      degree="PhD"
                      description="Doctor of Philosophy theses supervised as main supervisor and co-supervisor."
                    />
                    <div className="space-y-12">
                      <div id="phd-completed-main" className="scroll-mt-28">
                        <CategoryHeading>Completed (main supervisor · {teaching.phdCompletedMain.length})</CategoryHeading>
                        <ThesisTable entries={teaching.phdCompletedMain} />
                      </div>
                      <div id="phd-completed-co" className="scroll-mt-28">
                        <CategoryHeading>Completed (co-supervisor · {teaching.phdCompletedCo.length})</CategoryHeading>
                        <ThesisTable entries={teaching.phdCompletedCo} />
                      </div>
                      <div id="phd-in-progress" className="scroll-mt-28">
                        <CategoryHeading>In progress ({teaching.phdInProgress.length})</CategoryHeading>
                        <ThesisTable entries={teaching.phdInProgress} />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#e2e8f0] pt-12">
                    <DegreeHeading
                      id="msc"
                      degree="MSc"
                      description="Master theses by research supervised as main supervisor and co-supervisor."
                    />
                    <div className="space-y-12">
                      <div id="msc-completed-main" className="scroll-mt-28">
                        <CategoryHeading>Completed (main supervisor · {teaching.mscCompletedMain.length})</CategoryHeading>
                        <ThesisTable entries={teaching.mscCompletedMain} />
                      </div>
                      <div id="msc-completed-co" className="scroll-mt-28">
                        <CategoryHeading>Completed (co-supervisor · {teaching.mscCompletedCo.length})</CategoryHeading>
                        <ThesisTable entries={teaching.mscCompletedCo} />
                      </div>
                      <div id="msc-in-progress" className="scroll-mt-28">
                        <CategoryHeading>In progress ({teaching.mscInProgress.length})</CategoryHeading>
                        <ThesisTable entries={teaching.mscInProgress} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="border-t border-[#e2e8f0] pt-12">
                <div className="max-w-3xl border border-[#1e293b] bg-[#0f172a] p-8 text-white md:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
                    Profile
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
                    Continue to the academic profile
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#cbd5e1]">
                    Return to the profile page for the biography, affiliations and research
                    interests. A full curriculum vitae is available on request.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#e2e8f0]"
                    >
                      <ArrowLeft size={15} aria-hidden="true" />
                      Back to profile
                    </Link>
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-2 border border-[#475569] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#94a3b8]"
                    >
                      <Mail size={15} aria-hidden="true" />
                      Request CV
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
