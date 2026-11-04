import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import MetricCard from '@/components/ui/MetricCard'
import PlaceholderFigure from '@/components/ui/PlaceholderFigure'
import { getSupervisionStats } from '@/lib/supervision'

export default function GroupSnapshot() {
  const stats = getSupervisionStats()

  return (
    <section className="border-t border-[#e2e8f0] bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <PlaceholderFigure
            src="/placeholders/research-group.svg"
            alt="Illustrative placeholder for the research group and supervision record"
            className="aspect-[16/10]"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
              Research group
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">
              A record of research training
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#64748b] md:text-[15px]">
              Supervision is a central part of the academic contribution: {stats.total} postgraduate
              researchers across PhD and MSc programmes, working on atmospheric chemistry, air
              quality, climate and environmental health.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <MetricCard label="Completed PhDs" value={stats.completedPhd} note="Main and co-supervision" />
              <MetricCard label="Current PhD" value={stats.currentPhd} note="In progress" />
              <MetricCard label="Completed MSc" value={stats.completedMsc} note="Main and co-supervision" />
              <MetricCard label="Current MSc" value={stats.currentMsc} note="In progress" />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/research/supervision"
                className="inline-flex items-center gap-2 bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
              >
                Supervision record
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/research/group"
                className="inline-flex items-center gap-1.5 border-b border-[#cbd5e1] px-1 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#475569] transition-colors hover:border-[#0f172a] hover:text-[#0f172a]"
              >
                Research group
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
