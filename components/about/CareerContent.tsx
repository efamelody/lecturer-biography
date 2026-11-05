import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { getContent } from '@/lib/content'
import { getCareerContent } from '@/lib/career'
import { getServiceContent, type CommitteeRole, type EditorialRole } from '@/lib/service'
import CareerSidebar from '@/components/about/CareerSidebar'
import CareerTimeline from '@/components/about/CareerTimeline'

interface AwardItem {
  year: string
  title: string
  organization: string
  category?: string
}

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

function AwardList({ awards }: { awards: AwardItem[] }) {
  return (
    <div className="border-y border-[#e2e8f0]">
      {awards.map((award) => (
        <div
          key={`${award.year}-${award.title}`}
          className="grid gap-2 border-b border-[#e2e8f0] py-4 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
              {award.year}
            </p>
            {award.category && (
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#94a3b8]">
                {award.category}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-snug text-[#0f172a]">{award.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{award.organization}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CommitteeList({ items }: { items: CommitteeRole[] }) {
  return (
    <div className="border-y border-[#e2e8f0]">
      {items.map((item) => (
        <div
          key={`${item.organisation}-${item.role}`}
          className="grid gap-2 border-b border-[#e2e8f0] py-4 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
            {item.period || '—'}
          </p>
          <div>
            <h4 className="text-sm font-semibold leading-snug text-[#0f172a]">{item.role}</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{item.organisation}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function EditorialList({ items }: { items: EditorialRole[] }) {
  return (
    <div className="border-y border-[#e2e8f0]">
      {items.map((item) => (
        <div
          key={`${item.publication}-${item.role}`}
          className="grid gap-2 border-b border-[#e2e8f0] py-4 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
            {item.period}
          </p>
          <div>
            <h4 className="text-sm font-semibold leading-snug text-[#0f172a]">{item.role}</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{item.publication}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-[#94a3b8]">
              {item.publisher}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function CareerContent() {
  const career = getCareerContent()
  const service = getServiceContent()
  const awards = (await getContent('awards')) as AwardItem[]
  const contact = (await getContent('contact')) as ContactData

  return (
    <main className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white pb-12 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]">
            About
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#0f172a] md:text-5xl">
            Career &amp; Recognition
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            A complete record of Prof. Dr. Mohd Talib Latif&apos;s academic career,
            administrative leadership, other appointments and awards at Universiti Kebangsaan
            Malaysia and internationally.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row">
          <CareerSidebar contact={contact} />

          <div className="min-w-0 flex-1 space-y-20">
            <section
              id="academic-career"
              aria-labelledby="academic-career-heading"
              className="scroll-mt-24"
            >
              <SectionHeading
                id="academic-career-heading"
                eyebrow="Academic appointments"
                title="Academic career"
                description="A continuous career at Universiti Kebangsaan Malaysia, progressing from tutor to professor."
              />
              <CareerTimeline entries={career.academic} />
            </section>

            <section
              id="administrative"
              aria-labelledby="administrative-heading"
              className="scroll-mt-24 border-t border-[#e2e8f0] pt-12"
            >
              <SectionHeading
                id="administrative-heading"
                eyebrow="University leadership"
                title="Administrative and management roles"
                description="Leadership across departments, research centres and university-wide initiatives, including the Institute of Climate Change and the Faculty of Science and Technology."
              />
              <figure className="mb-8 w-full max-w-[15rem] overflow-hidden border border-[#e2e8f0] bg-white">
                <div className="relative aspect-[4/5] bg-[#f1f5f9]">
                  <Image
                    src="/career/career.jpg"
                    alt="Congratulatory poster for Prof. Dr. Mohd Talib Latif's appointment as Director of the Institute of Climate Change, Universiti Kebangsaan Malaysia"
                    fill
                    sizes="240px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="border-t border-[#e2e8f0] px-3 py-2 text-[11px] leading-relaxed text-[#64748b]">
                  Appointment as Director, Institute of Climate Change · 2026
                </figcaption>
              </figure>
              <CareerTimeline entries={career.administrative} />
            </section>

            <section
              id="other-appointments"
              aria-labelledby="other-appointments-heading"
              className="scroll-mt-24 border-t border-[#e2e8f0] pt-12"
            >
              <SectionHeading
                id="other-appointments-heading"
                eyebrow="External appointments"
                title="Other academic appointments"
                description="Visiting and collaborative appointments beyond the core academic career."
              />
              <CareerTimeline entries={career.otherAppointments} />
            </section>

            <section
              id="service"
              aria-labelledby="service-heading"
              className="scroll-mt-24 border-t border-[#e2e8f0] pt-12"
            >
              <SectionHeading
                id="service-heading"
                eyebrow="National and international roles"
                title="Professional service"
                description="Memberships, committee roles and editorial appointments in scientific organisations."
              />

              <div className="max-w-3xl">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                      National committees
                    </h3>
                    <CommitteeList items={service.national} />
                  </div>
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                      International committees
                    </h3>
                    <CommitteeList items={service.international} />
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                    Editorial and advisory boards
                  </h3>
                  <EditorialList items={service.editorial} />
                </div>
              </div>
            </section>

            <section
              id="awards"
              aria-labelledby="awards-heading"
              className="scroll-mt-24 border-t border-[#e2e8f0] pt-12"
            >
              <SectionHeading
                id="awards-heading"
                eyebrow="Recognition"
                title="Awards"
                description="National and international recognition for research, publications, teaching and student innovation."
              />

              <div className="mb-8 max-w-3xl">
                <figure className="overflow-hidden border border-[#e2e8f0] bg-white">
                  <div className="relative aspect-video bg-[#f1f5f9]">
                    <Image
                      src="/career/30yrs.jpg"
                      alt="30 years of service recognition at Universiti Kebangsaan Malaysia"
                      fill
                      sizes="(min-width: 1024px) 768px, (min-width: 640px) 80vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-[#e2e8f0] px-4 py-3 text-[11px] leading-relaxed text-[#64748b]">
                    30 years of service · Universiti Kebangsaan Malaysia
                  </figcaption>
                </figure>
              </div>

              <div className="max-w-3xl">
                <AwardList awards={awards} />
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
    </main>
  )
}
