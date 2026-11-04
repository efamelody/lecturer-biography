import SectionHeader from '@/components/ui/SectionHeader'
import {
  getConferencePresentations,
  getEngagementCounts,
  getInvitedTalks,
  type EngagementItem,
} from '@/lib/engagements'

function groupByYear(items: EngagementItem[]) {
  const groups = new Map<number, EngagementItem[]>()
  for (const item of items) {
    const existing = groups.get(item.year) ?? []
    existing.push(item)
    groups.set(item.year, existing)
  }
  return Array.from(groups.entries()).sort((a, b) => b[0] - a[0])
}

function TalkList({ items }: { items: EngagementItem[] }) {
  return (
    <div className="space-y-8">
      {groupByYear(items).map(([year, talks]) => (
        <div key={year}>
          <h3 className="border-b border-[#e2e8f0] pb-2 font-serif text-xl font-bold text-[#0f172a]">
            {year}
          </h3>
          <div className="divide-y divide-[#f1f5f9]">
            {talks.map((talk) => (
              <article key={talk.id} className="grid gap-2 py-4 md:grid-cols-[8rem_1fr] md:gap-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                    {talk.date || talk.format}
                  </p>
                  <span className="mt-1 inline-block border border-[#d6e8e5] bg-[#f0f7f6] px-2 py-1 text-[10px] font-medium text-[#0f5f59]">
                    {talk.type}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold leading-relaxed text-[#0f172a]">
                    {talk.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{talk.event}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#94a3b8]">
                    {talk.location}
                    {talk.format && talk.date ? ` · ${talk.format}` : ''}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TalksSection() {
  const invited = getInvitedTalks()
  const presentations = getConferencePresentations()
  const counts = getEngagementCounts()

  return (
    <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Engagement"
          title="Invited talks and conference presentations"
          description={`${counts.invited} invited or plenary talks and ${counts.presentations} conference presentations, transcribed from the CV.`}
        />

        <div className="mt-8 space-y-14">
          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#e2e8f0] pb-3">
              <h2 className="font-serif text-2xl font-bold text-[#0f172a]">
                Invited and plenary talks
              </h2>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
                {invited.length} entries
              </p>
            </div>
            <TalkList items={invited} />
          </div>

          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#e2e8f0] pb-3">
              <h2 className="font-serif text-2xl font-bold text-[#0f172a]">
                Conference presentations
              </h2>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
                {presentations.length} entries
              </p>
            </div>
            <TalkList items={presentations} />
          </div>
        </div>
      </div>
    </section>
  )
}
