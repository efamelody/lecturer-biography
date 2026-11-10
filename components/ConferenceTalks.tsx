import { CalendarDays, ExternalLink, MapPin } from 'lucide-react'
import ConferenceGlobe from '@/components/ConferenceGlobe';
import {
  invitedTalks,
  presenterTalks,
  sortTalks,
  countries,
  type Talk,
} from '@/lib/conference';
import conferencePhotosJson from '@/content/conference-photos.json';

const conferencePhotos = conferencePhotosJson as Record<string, string[]>;

const talkGroups = [
  {
    id: 'invited',
    index: 'C.3.1',
    title: 'Invited & Plenary Speaker',
    blurb: `${invitedTalks.length} presentations as plenary or invited speaker`,
    talks: sortTalks(invitedTalks),
  },
  {
    id: 'presenter',
    index: 'C.3.2',
    title: 'Conference Presenter',
    blurb: `${presenterTalks.length} presentations as conference presenter`,
    talks: sortTalks(presenterTalks),
  },
];

const globeLocations = countries.map((country) => ({
  key: country.key,
  name: country.name,
  folder: country.folder,
  lat: country.lat,
  lng: country.lng,
  talks: sortTalks(
    [...invitedTalks, ...presenterTalks].filter((talk) => talk.country === country.key),
  ),
}));

function TalkCard({ talk, hollowDot }: { talk: Talk; hollowDot: boolean }) {
  return (
    <li className="relative pl-9 sm:pl-10">
      <span
        aria-hidden
        className={`absolute -left-[5px] top-7 h-[11px] w-[11px] rounded-full border-2 border-white shadow-[0_0_0_1px_#cbd5e1] ${
          hollowDot ? 'border-white bg-white' : 'bg-[#0f172a]'
        }`}
      />
      <article className="rounded-md border border-[#e2e8f0] bg-white p-5 transition-[border-color,box-shadow] hover:border-[#94a3b8] hover:shadow-sm motion-reduce:transition-none md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="border border-[#cbd5e1] bg-[#f8fafc] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0f172a]">
            {talk.chip}
          </span>
          {talk.badge && (
            <span className="rounded-sm bg-[#f0fdfa] px-2.5 py-1 text-[11px] font-semibold text-[#0f766e]">
              {talk.badge}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-[#0f172a] md:text-xl">
          {talk.presentation}
        </h3>
        <p className="mt-2 text-sm font-semibold text-[#334155]">{talk.conference}</p>
        <div className="mt-4 grid gap-2 border-t border-[#f1f5f9] pt-4 text-[13px] leading-relaxed text-[#64748b] sm:grid-cols-2 sm:gap-4">
          <p className="flex items-start gap-2">
            <CalendarDays size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[#94a3b8]" />
            <span>{talk.dates}</span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[#94a3b8]" />
            <span>{talk.venue}</span>
          </p>
        </div>
        {talk.links && talk.links.length > 0 && (
          <nav aria-label={`${talk.conference} links`} className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#f1f5f9] pt-4">
            {talk.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] transition-colors hover:text-[#115e59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                {link.label}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}
      </article>
    </li>
  );
}

export default function ConferenceTalks() {
  return (
    <main className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white pb-12 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            <span aria-hidden="true" className="h-px w-7 bg-[#0f766e]" />
            Research &amp; academic presentations
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#0f172a] md:text-5xl">
            Conference Presentations
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Talks delivered at international and regional conferences by Prof. Dr. Mohd Talib Latif,
            as plenary or invited speaker and as presenting author.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
        <div className="mb-6 flex items-center gap-4">
          <span className="mt-1 shrink-0 border border-[#cbd5e1] px-2.5 py-1 font-mono text-xs font-medium text-[#64748b]">
            C.3.0
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl">
              Where we&apos;ve presented
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Rotate the globe and select a country to see the presentations delivered there.
            </p>
          </div>
        </div>
        <ConferenceGlobe locations={globeLocations} photos={conferencePhotos} />
      </section>

      <section className="mt-16 border-t border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            <span aria-hidden="true" className="h-px w-7 bg-[#0f766e]" />
            Complete list
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">
            All conference presentations
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#475569]">
            The full list of talks delivered by Prof. Dr. Mohd Talib Latif, as plenary or invited
            speaker and as presenting author.
          </p>

          <div className="mt-12 space-y-14 md:space-y-16">
            {talkGroups.map((group) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                className="scroll-mt-24"
              >
                <div className="mb-6 flex items-start gap-4">
                  <span className="mt-1 shrink-0 border border-[#cbd5e1] px-2.5 py-1 font-mono text-xs font-medium text-[#64748b]">
                    {group.index}
                  </span>
                  <div>
                    <h3
                      id={`${group.id}-heading`}
                      className="font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
                    >
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#64748b]">{group.blurb}</p>
                  </div>
                </div>
                <div className="relative">
                  <span aria-hidden="true" className="absolute bottom-3 left-0 top-3 w-px bg-[#e2e8f0]" />
                  <ol className="space-y-5">
                    {group.talks.map((talk) => (
                      <TalkCard key={talk.id} talk={talk} hollowDot={group.id === 'presenter'} />
                    ))}
                  </ol>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
