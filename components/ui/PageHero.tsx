import type { ReactNode } from 'react'

export default function PageHero({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string
  title: string
  description: string
  aside?: ReactNode
}) {
  return (
    <section className="border-b border-[#e2e8f0] bg-white pb-14 pt-28 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#0f172a] md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
              {description}
            </p>
          </div>
          {aside && <div className="lg:pb-1">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
