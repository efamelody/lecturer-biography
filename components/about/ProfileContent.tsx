import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import AboutHashRedirect from '@/components/about/AboutHashRedirect'
import AboutSubnav from '@/components/about/AboutSubnav'
import { getContent } from '@/lib/content'

interface ProfileData {
  name: string
  title: string
  tagline: string
  email: string
  location: string
  image: string
  roles: string[]
  fields: string[]
  bio: string[]
  education: Array<{ degree: string; year: string; field: string; institution: string }>
}

interface ContactData {
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

export default async function ProfileContent() {
  const profile = (await getContent('profile')) as ProfileData
  const contact = (await getContent('contact')) as ContactData

  return (
    <main className="pt-20">
      <AboutHashRedirect />
      <section className="border-b border-[#e2e8f0] bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <div className="shrink-0">
              <div className="h-40 w-40 overflow-hidden rounded-full border-2 border-[#e2e8f0] bg-white p-1.5 shadow-lg md:h-44 md:w-44">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={176}
                  height={176}
                  className="h-full w-full rounded-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
                Profile
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#0f172a] md:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-[#475569]">{profile.title}</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748b]">
                {profile.tagline}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.roles.map((role) => (
                  <span
                    key={role}
                    className="border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5 text-[11px] font-medium text-[#475569]"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-2 bg-[#0f172a] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#1e293b]"
                >
                  <Download size={15} aria-hidden="true" />
                  Download CV
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 border border-[#cbd5e1] px-4 py-2.5 font-medium text-[#0f172a] transition-colors hover:border-[#64748b]"
                >
                  <Mail size={15} aria-hidden="true" />
                  Email
                </a>
                <Link
                  href="/about/career"
                  className="inline-flex items-center gap-2 px-1 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:text-[#0f172a]"
                >
                  Career &amp; Recognition
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSubnav active="profile" />

      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="min-w-0 space-y-14">
            <section id="biography" className="section-anchor">
              <SectionHeading id="biography-heading" eyebrow="Biography" title="About the professor" />
              <div className="max-w-3xl space-y-5 text-[15px] leading-[1.85] text-[#475569]">
                {profile.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="expertise" className="section-anchor">
              <SectionHeading id="expertise-heading" eyebrow="Expertise" title="Fields of expertise" />
              <ul className="grid gap-3 sm:grid-cols-2">
                {profile.fields.map((field) => (
                  <li
                    key={field}
                    className="border-l-2 border-[#d6e8e5] pl-4 text-sm leading-relaxed text-[#475569]"
                  >
                    {field}
                  </li>
                ))}
              </ul>
            </section>

            <section id="qualifications" className="section-anchor">
              <SectionHeading id="qualifications-heading" eyebrow="Education" title="Qualifications" />
              <ol className="border-y border-[#e2e8f0]">
                {profile.education.map((item) => (
                  <li
                    key={`${item.degree}-${item.year}`}
                    className="grid gap-2 border-b border-[#e2e8f0] py-5 last:border-b-0 sm:grid-cols-[6rem_1fr] sm:gap-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                      {item.year}
                    </p>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0f172a]">{item.degree}</h3>
                      <p className="mt-1 text-sm font-medium text-[#475569]">{item.field}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748b]">{item.institution}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="min-w-0">
            <div className="space-y-8 lg:sticky lg:top-24">
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
                  At a glance
                </h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                      Current position
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-[#0f172a]">
                      Professor, Department of Earth Sciences and Environment, UKM
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                      Director
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-[#0f172a]">
                      Institute of Climate Change, UKM
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                      Professional body
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-[#0f172a]">
                      President, Malaysian Association for Aerosol and Air Quality Research
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-[#e2e8f0] pt-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
                  Contact
                </h2>
                <div className="mt-4 space-y-3 text-sm text-[#64748b]">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-2 transition-colors hover:text-[#0f172a]"
                  >
                    <Mail size={14} className="mt-0.5 shrink-0 text-[#0f766e]" aria-hidden="true" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                      className="flex items-start gap-2 transition-colors hover:text-[#0f172a]"
                    >
                      <Phone size={14} className="mt-0.5 shrink-0 text-[#0f766e]" aria-hidden="true" />
                      <span>{contact.phone}</span>
                    </a>
                  )}
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-[#0f766e]" aria-hidden="true" />
                    <span>
                      {contact.address.line1}
                      <br />
                      {contact.address.line4}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e2e8f0] pt-6">
                <Link
                  href="/about/career"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f172a] transition-colors hover:text-[#0f766e]"
                >
                  Career &amp; Recognition
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <p className="mt-2 text-xs leading-relaxed text-[#64748b]">
                  Academic appointments, leadership, awards, metrics, teaching and service.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
