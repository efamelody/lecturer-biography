import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { getContent } from '@/lib/content'

interface Affiliation {
  name: string
  fullName: string
  role: string
  period?: string
}

const PREFERRED_NAMES = ['IPCC', 'ASM', 'MAAQR', 'IGAC-MANGO', 'SOLAS', 'IPI UKM']

export default async function RecognitionStrip() {
  const affiliations = (await getContent('affiliations')) as Affiliation[]
  const selected = PREFERRED_NAMES.map((name) =>
    affiliations.find((item) => item.name === name)
  ).filter((item): item is Affiliation => Boolean(item))

  return (
    <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Leadership & recognition"
          title="National and international scientific service"
          description="Roles that connect the research programme to national policy, regional networks and international climate assessment."
          action={
            <Link
              href="/about/career#service"
              className="inline-flex items-center gap-1.5 border-b border-[#cbd5e1] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569] transition-colors hover:border-[#0f172a] hover:text-[#0f172a]"
            >
              Full service record
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-px overflow-hidden border border-[#e2e8f0] bg-[#e2e8f0] sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((item) => (
            <div key={item.name} className="bg-white p-6">
              <p className="font-serif text-2xl font-bold tracking-tight text-[#0f172a]">
                {item.name}
              </p>
              <p className="mt-1 text-sm font-medium text-[#0f766e]">{item.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#64748b]">{item.fullName}</p>
              {item.period && (
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#94a3b8]">
                  {item.period}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
