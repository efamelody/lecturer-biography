export interface TimelineItem {
  period: string
  title: string
  subtitle?: string
  current?: boolean
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-[#e2e8f0] pl-6 md:pl-8">
      {items.map((item) => (
        <li key={`${item.period}-${item.title}`} className="relative pb-8 last:pb-0">
          <span
            aria-hidden="true"
            className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 md:-left-[39px] ${
              item.current
                ? 'border-[#0f766e] bg-[#0f766e]'
                : 'border-[#cbd5e1] bg-white'
            }`}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
            {item.period}
          </p>
          <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-[#0f172a]">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#64748b]">
              {item.subtitle}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}
