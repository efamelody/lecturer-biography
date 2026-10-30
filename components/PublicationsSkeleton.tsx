const PULSE = "animate-pulse rounded bg-[#e2e8f0] motion-reduce:animate-none";
const CHIP = "h-8 shrink-0 rounded border border-[#e2e8f0] bg-[#f8fafc] lg:w-full";

function SkeletonRow() {
  return (
    <div className="flex flex-wrap items-start gap-x-3 gap-y-2 border-b border-[#e2e8f0] py-4 last:border-b-0 sm:flex-nowrap sm:gap-x-4 sm:py-5">
      <div className="mt-1.5 shrink-0">
        <div className="h-1.5 w-1.5 rounded-full bg-[#cbd5e1]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-baseline gap-2">
          <div className={`${PULSE} h-3 w-8 shrink-0`} />
          <div className={`${PULSE} h-3.5 w-full max-w-md`} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className={`${PULSE} h-2.5 w-20`} />
          <div className={`${PULSE} h-2.5 w-28`} />
        </div>
      </div>
      <div className="flex basis-full items-center gap-2 pl-[1.125rem] sm:basis-auto sm:shrink-0 sm:pl-0">
        <div className={`${PULSE} h-5 w-12`} />
        <div className={`${PULSE} h-5 w-5`} />
      </div>
    </div>
  );
}

export function PublicationsListSkeleton() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
      <aside className="w-full lg:w-44 lg:shrink-0">
        <div
          aria-hidden="true"
          className="-mx-4 flex gap-2 overflow-hidden px-4 pb-2 lg:mx-0 lg:block lg:space-y-0.5 lg:px-0 lg:pb-0"
        >
          <div className={`${CHIP} w-24`} />
          <div className={`${CHIP} w-16`} />
          <div className={`${CHIP} w-16`} />
          <div className={`${CHIP} w-16`} />
          <div className={`${CHIP} w-16`} />
          <div className={`${CHIP} w-16`} />
          <div className={`${CHIP} w-16`} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div aria-hidden="true" className="mb-6">
          <div className={`${PULSE} h-7 w-40`} />
          <div className={`${PULSE} mt-2 h-3 w-64 max-w-full`} />
        </div>

        <div aria-busy="true" role="status" aria-live="polite">
          <span className="sr-only">Loading publications…</span>
          <div aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="mt-8 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 sm:mt-12 sm:p-6">
          <div className={`${PULSE} mx-auto h-3 w-56 max-w-full`} />
          <div className="mt-3 flex flex-wrap justify-center gap-4">
            <div className={`${PULSE} h-3 w-14`} />
            <div className={`${PULSE} h-3 w-14`} />
            <div className={`${PULSE} h-3 w-20`} />
            <div className={`${PULSE} h-3 w-24`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PublicationsPageSkeleton() {
  return (
    <main className="pt-20">
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div aria-hidden="true" className="mb-10 max-w-3xl md:mb-16">
            <div className={`${PULSE} h-3 w-36`} />
            <div className={`${PULSE} mt-4 h-10 w-64 max-w-full sm:h-12`} />
            <div className={`${PULSE} mt-4 h-3 w-full max-w-lg`} />
          </div>
          <PublicationsListSkeleton />
        </div>
      </section>
    </main>
  );
}
