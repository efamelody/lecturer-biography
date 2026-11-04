import type { ReactNode } from 'react'

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className = '',
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-5 border-b border-[#e2e8f0] pb-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b] md:text-[15px]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
