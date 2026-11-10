export interface CareerTimelineEntry {
  period: string
  role: string
  organisation: string
  current: boolean
}

function startYear(period: string): string {
  return period.match(/\d{4}/)?.[0] ?? ''
}

export default function CareerTimeline({ entries }: { entries: CareerTimelineEntry[] }) {
  return (
    <div className="relative max-w-3xl">
      <div
        className="absolute bottom-4 left-[27px] top-4 w-px bg-[#e2e8f0]"
        aria-hidden="true"
      />
      <ol className="space-y-8">
        {entries.map((entry) => (
          <li key={`${entry.period}-${entry.role}`} className="relative flex gap-5">
            <div className="relative z-10 shrink-0 pt-1">
              <span
                className={`inline-flex w-14 justify-center rounded-md border px-2 py-1 text-[11px] font-semibold shadow-sm ${
                  entry.current
                    ? 'border-[#0f172a] bg-[#0f172a] text-white'
                    : 'border-[#e2e8f0] bg-white text-[#475569]'
                }`}
              >
                {startYear(entry.period)}
              </span>
            </div>
            <div className="min-w-0 pb-2 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-[#0f172a]">{entry.role}</h3>
                {entry.current && (
                  <span className="rounded border border-[#e2e8f0] bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-medium text-[#475569]">
                    Present
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-[#64748b]">
                {entry.organisation}
              </p>
              <p className="mt-1 text-[11px] font-medium text-[#94a3b8]">{entry.period}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
