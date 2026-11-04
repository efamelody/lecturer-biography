export default function MetricCard({
  label,
  value,
  note,
}: {
  label: string
  value: string | number
  note?: string
}) {
  return (
    <div className="border border-[#e2e8f0] bg-white px-5 py-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
        {label}
      </p>
      <p className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a]">
        {value}
      </p>
      {note && <p className="mt-1 text-[11px] leading-relaxed text-[#64748b]">{note}</p>}
    </div>
  )
}
