'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Maximize2, X } from 'lucide-react'
import {
  formatPressClippingDate,
  getPressClippingKindLabel,
  getPressClippings,
  type PressClipping,
} from '@/lib/media'

const clippings = getPressClippings()

function getActionLabel(clipping: PressClipping): string {
  return clipping.kind === 'photograph' ? 'View photograph' : 'View clipping'
}

export default function PressClippings() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<PressClipping | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active && !dialog.open) dialog.showModal()
    if (!active && dialog.open) dialog.close()
  }, [active])

  useEffect(() => {
    if (!active) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [active])

  if (clippings.length === 0) return null

  const activeDate = active ? formatPressClippingDate(active) : ''
  const activeDateTime = active
    ? (active.publishedOn ?? active.publishedIn ?? active.publishedYear)
    : undefined

  return (
    <section
      aria-labelledby="clippings-heading"
      className="border-y border-[#e2e8f0] bg-white py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
            In Print
          </p>
          <h2
            id="clippings-heading"
            className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
          >
            Press Clippings
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
            Original cuttings, newspaper pages and press photographs from the archive. Select an
            item to read its description and view the full scan.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clippings.map((clipping) => {
            const date = formatPressClippingDate(clipping)
            const dateTime =
              clipping.publishedOn ?? clipping.publishedIn ?? clipping.publishedYear

            return (
              <li key={clipping.id} className="h-full">
                <button
                  type="button"
                  onClick={() => setActive(clipping)}
                  aria-haspopup="dialog"
                  className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white text-left transition-colors hover:border-[#cbd5e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-[#f1f5f9] sm:h-80">
                    <Image
                      src={clipping.image}
                      alt={clipping.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col border-t border-[#e2e8f0] p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3b82f6]">
                        {clipping.outlet ?? 'From the archive'}
                      </span>
                      <span className="shrink-0 rounded-sm border border-[#e2e8f0] bg-[#f8fafc] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#64748b]">
                        {getPressClippingKindLabel(clipping.kind)}
                      </span>
                    </div>

                    <h3 className="mt-2 font-serif text-base font-bold leading-snug tracking-tight text-[#0f172a]">
                      {clipping.headline}
                    </h3>

                    {date && (
                      <time dateTime={dateTime} className="mt-1.5 text-[11px] text-[#94a3b8]">
                        {date}
                      </time>
                    )}

                    <p className="mt-2 text-xs leading-relaxed text-[#64748b]">
                      {clipping.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-[#475569] transition-colors group-hover:text-[#0f172a] motion-reduce:transition-none">
                      {getActionLabel(clipping)}
                      <Maximize2 size={11} aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="clipping-dialog-title"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="m-auto max-h-[92vh] w-[min(94vw,68rem)] max-w-none rounded-lg border border-[#e2e8f0] bg-white p-0 text-left shadow-2xl backdrop:bg-[#0f172a]/75"
      >
        {active && (
          <div className="flex max-h-[92vh] flex-col">
            <header className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] px-5 py-4 sm:px-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em]">
                  <span className="font-semibold text-[#3b82f6]">
                    {active.outlet ?? 'From the archive'}
                  </span>
                  <span className="rounded-sm border border-[#e2e8f0] bg-[#f8fafc] px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] text-[#64748b]">
                    {getPressClippingKindLabel(active.kind)}
                  </span>
                </div>
                <h3
                  id="clipping-dialog-title"
                  className="mt-1.5 font-serif text-lg font-bold leading-snug tracking-tight text-[#0f172a] sm:text-xl"
                >
                  {active.headline}
                </h3>
                {activeDate && (
                  <time
                    dateTime={activeDateTime}
                    className="mt-1 block text-[11px] text-[#94a3b8]"
                  >
                    {activeDate}
                  </time>
                )}
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close clipping"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded border border-[#e2e8f0] bg-white text-[#475569] transition-colors hover:border-[#cbd5e1] hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="relative h-[52vh] min-h-[260px] bg-[#f1f5f9] lg:h-[60vh] lg:min-h-[440px]">
                <Image
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1024px) 70vw, 94vw"
                  className="object-contain p-3 sm:p-5"
                />
              </div>

              <div className="border-t border-[#e2e8f0] p-5 sm:p-6 lg:border-l lg:border-t-0">
                <p className="text-sm leading-relaxed text-[#475569]">{active.description}</p>

                {active.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#475569] transition-colors hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748b] focus-visible:ring-offset-2 motion-reduce:transition-none"
                  >
                    Read the article
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
