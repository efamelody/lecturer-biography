interface MediaHeroProps {
  newsCount: number
  broadcastCount: number
  eventCount: number
  reportCount: number
}

export default function MediaHero({
  newsCount,
  broadcastCount,
  eventCount,
  reportCount,
}: MediaHeroProps) {
  const counts = [
    newsCount > 0 ? `${newsCount} news contributions` : null,
    // broadcastCount > 0 ? `${broadcastCount} broadcasts & interviews` : null,
    eventCount > 0 ? `${eventCount} Highlighted Conferences & Events` : null,
    reportCount > 0 ? `${reportCount} policy resource${reportCount === 1 ? '' : 's'}` : null,
  ].filter((entry): entry is string => entry !== null)

  return (
    <section className="bg-[#f8fafc] pt-28 pb-12 md:pt-32 md:pb-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]">
              Public engagement &amp; science communication
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#0f172a] sm:text-5xl md:text-[3.5rem]">
              Science Beyond the Laboratory
            </h1>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-[#e2e8f0] lg:pl-8">
            <p className="max-w-xl text-[15px] leading-relaxed text-[#475569]">
              Professor Dr. Mohd Talib Latif shares scientific insights on air quality, atmospheric
              chemistry, transboundary haze, and climate change through media interviews, public
              lectures, and policy engagement. This archive brings together his contributions to
              public understanding of environmental science.
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[#94a3b8]">
              Media commentary &middot; Broadcasts &middot; Public engagement
            </p>
          </div>
        </div>

        {counts.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#e2e8f0] pt-5 text-[11px] uppercase tracking-[0.14em] text-[#64748b]">
            {counts.map((count, index) => (
              <span key={count} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[#cbd5e1]">
                    /
                  </span>
                )}
                <span>{count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
