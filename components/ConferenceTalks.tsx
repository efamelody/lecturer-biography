import { CalendarDays, ExternalLink, MapPin } from 'lucide-react'
import ConferenceTalksSidebar from '@/components/ConferenceTalksSidebar';

interface Talk {
  id: string
  conference: string
  presentation: string
  dates: string
  venue: string
  badge?: string
  chip: string
  sortKey: string
  links?: { label: string; url: string }[]
}

const invitedTalks = [
  {
    id: 'cem-asia-2026',
    conference: 'CEM & AQUAMATE Asia 2026',
    presentation: 'Current Understanding and Future Direction of Ground-Level Air Quality Measurements in Malaysia',
    dates: '18 November 2026',
    venue: 'KLCC, Kuala Lumpur, Malaysia',
    badge: 'Keynote Presentation',
    chip: 'NOV 2026',
    sortKey: '2026-11-18',
    links: [
      {
        label: 'Official conference programme',
        url: 'https://www.ilmexhibitions.com/cemasia/conference-programme-2026/',
      },
    ],
  },
  {
    id: 'icccsd-nust-2025',
    conference: '1st International Conference on Climate Change and Sustainable Development',
    presentation:
      'Assessment of Dioxins-Furans and Polycyclic Aromatic Hydrocarbons in Ambient Air of the Kuala Lumpur Urban Environment',
    dates: '25–26 February 2025',
    venue: 'National University of Sciences and Technology (NUST), Islamabad, Pakistan',
    badge: 'Online Presentation',
    chip: 'FEB 2025',
    sortKey: '2025-02-25',
    links: [
      { label: 'ICCCSD 2025 official website', url: 'https://icccsd.nust.edu.pk/authors/' },
      { label: 'NUST conferences directory', url: 'https://nust.edu.pk/event-category/conferences/' },
    ],
  },
  {
    id: 'pmac-2025',
    conference: 'Prince Mahidol Awards Conference 2025 (PMAC 2025)',
    presentation: 'Agricultural peat burning and its impact to PM2.5 concentration in Malaysia',
    dates: '29 January 2025',
    venue: 'Bangkok, Thailand',
    chip: 'JAN 2025',
    sortKey: '2025-01-29',
    links: [
      { label: 'PMAC 2025 schedule', url: 'https://pmac-2025.com/schedule' },
      {
        label: 'Event details (DNDi)',
        url: 'https://dndi.org/events/2025/prince-mahidol-award-conference-2025/',
      },
    ],
  },
  {
    id: 'kosae-2024',
    conference: 'Korean Society for Atmospheric Environment (KOSAE) Annual Conference',
    presentation: 'Assessment of Major Air Pollutants in the Urban Environment of Kuala Lumpur',
    dates: '23 October 2024',
    venue: 'Seoul, Korea',
    badge: 'Online Presentation',
    chip: 'OCT 2024',
    sortKey: '2024-10-23',
    links: [
      {
        label: '67th KOSAE conference overview',
        url: 'https://mitrap-project.eu/mi-trap-participates-in-the-67th-annual-conference-of-the-korean-society-for-atmospheric-environment/',
      },
    ],
  },
  {
    id: 'indonesian-aerosol-2024',
    conference: 'The 10th Theory & Technique and the 1st Indonesian Aerosol Association Conference 2024',
    presentation:
      'Polychlorinated Dibenzo-p-Dioxins, Dibenzofurans and Polycyclic Aromatic Hydrocarbons in the Urban Air of Kuala Lumpur',
    dates: '2–4 August 2024',
    venue: 'Institute of Technology, Bandung, Indonesia',
    chip: 'AUG 2024',
    sortKey: '2024-08-02',
    links: [
      {
        label: 'T&T and 1st IAAC 2024 portal',
        url: 'https://2024-tat-iaac.taar.org.tw/',
      },
    ],
  },
  {
    id: '7raqm-2024',
    conference:
      'The 7th International Workshop on Regional Air Quality Management in Rapidly Developing Economic Regions and the 1st Greater Bay Area Climate Forum (7RAQM)',
    presentation: 'Biomass Burning in Southeast Asia and Its Potential Effects on Human Health and Climate Change',
    dates: '29–31 May 2024',
    venue: 'The Hong Kong University of Science and Technology (Guangzhou), China',
    chip: 'MAY 2024',
    sortKey: '2024-05-29',
    links: [
      { label: 'Official 7RAQM website', url: 'https://raqm.hkust.edu.hk/home' },
      { label: '7RAQM summary (HKIQEP)', url: 'https://hkiqep.org/7raqm-youthsummit/' },
    ],
  },
  {
    id: 'ttfose-2024',
    conference: 'Theory and Technique Taiwan Forum on Sustainable Environment (T&T TFOSE 2024)',
    presentation:
      'Atmospheric polychlorinated dibenzo-p-dioxins and dibenzofurans in Kuala Lumpur urban environment and their potential risk to human health',
    dates: '28–29 March 2024',
    venue: 'Taiwan Association for Aerosol Research, Taipei, Taiwan',
    chip: 'MAR 2024',
    sortKey: '2024-03-28',
    links: [
      {
        label: 'TAAR TFOSE event page',
        url: 'https://www.taar.org.tw/theory-and-technique-taiwan-forum-on-sustainable-environment',
      },
    ],
  },
  {
    id: 'biomass-cooking-2023',
    conference: 'International Forum on Biomass Cooking and Heating',
    presentation:
      'The concentration of particulate matter with different sizes (PM10, PM2.5, PM1) from cooking activities',
    dates: '20 October 2023',
    venue: 'Beijing University of Chemical Technology Malaysia',
    chip: 'OCT 2023',
    sortKey: '2023-10-20',
  },
  {
    id: 'mycot-2022',
    conference: 'The 4th Malaysian Congress of Toxicology 2022 (MyCOT2022)',
    presentation: 'Polycyclic Aromatic Hydrocarbon in Kuala Lumpur Urban Environment and Its Effect on Human Health',
    dates: '16–17 November 2022',
    venue: 'International Islamic University Malaysia, Kuantan, Pahang, Malaysia',
    chip: 'NOV 2022',
    sortKey: '2022-11-16',
  },
  {
    id: 'ifeh-wceh-2022',
    conference: '16th IFEH World Congress on Environmental Health (WCEH 2022)',
    presentation:
      'The concentration of Major Air Pollutants during the Different Phases of Movement Control Orders due to the COVID19 pandemic in Malaysia',
    dates: '25 August 2022',
    venue: 'World Trade Centre, Kuala Lumpur, Malaysia',
    chip: 'AUG 2022',
    sortKey: '2022-08-25',
  },
  {
    id: 'kosae-64-2021',
    conference: '64th Annual Meeting of the Korean Society of Atmospheric Environment 2021',
    presentation:
      'Concentration of Major Air Pollutants during the Movement Control Order due to the COVID-19 pandemic in Malaysia',
    dates: '20–22 October 2021',
    venue: 'Jeju Shinhwa World Landing Convention Centre, Jeju, Korea',
    chip: 'OCT 2021',
    sortKey: '2021-10-20',
  },
  {
    id: 'moisture-buildings-2021',
    conference: '1st International Conference on Moisture in Buildings',
    presentation: 'Study on the population of airborne bacteria and antibiotic resistance from a hospital environment',
    dates: '28–29 June 2021',
    venue: 'University College London, United Kingdom',
    chip: 'JUN 2021',
    sortKey: '2021-06-28',
  },
  {
    id: 'sri-congress-2021',
    conference: 'Sustainability Research & Innovation Congress 2021',
    presentation:
      'Characteristics and Spatial-Temporal Variability of PM10, PM2.5 and PM1 during a 2019-2020 Biomass Burning Event in Southeast Asia',
    dates: '12–16 June 2021',
    venue: 'Future Earth, Brisbane, Australia',
    chip: 'JUN 2021',
    sortKey: '2021-06-12',
  },
  {
    id: 'psu-kanazawa-2021',
    conference: 'Prince of Songkla University–Kanazawa University Joint Workshop',
    presentation:
      'Seasonal variation of water-soluble inorganic ions, carbonaceous components and polycyclic aromatic hydrocarbons of size-fractioned urban air particles in Kuala Lumpur, Malaysia',
    dates: '24–25 March 2021',
    venue: 'Prince of Songkla University, Thailand',
    chip: 'MAR 2021',
    sortKey: '2021-03-24',
  },
  {
    id: 'baq-2018',
    conference: 'Better Air Quality Conference 2018',
    presentation: 'Long-term Record of Air Quality in Malaysia',
    dates: '14–16 October 2018',
    venue: 'Borneo Convention Centre, Kuching, Sarawak, Malaysia',
    chip: 'OCT 2018',
    sortKey: '2018-10-14',
  },
  {
    id: 'esem-2018',
    conference: 'International Conference on Energy Systems and Environmental Management (ESEM 2018)',
    presentation: 'Impact of Regional Haze Episode towards Air Quality in Malaysia',
    dates: '22 June 2018',
    venue: 'Siam Oriental Hotel, Hat Yai, Songkhla, Thailand',
    chip: 'JUN 2018',
    sortKey: '2018-06-22',
  },
  {
    id: 'atmospheric-composition-ukm-2018',
    conference: 'International Conference on Atmospheric Composition and Climate Change in Asia',
    presentation:
      'Sources and health risk of PM2.5-bound polycyclic aromatic hydrocarbons and biomass burning tracers in Kuala Lumpur urban environment',
    dates: '27–28 March 2018',
    venue: 'Universiti Kebangsaan Malaysia, Bangi, Malaysia',
    chip: 'MAR 2018',
    sortKey: '2018-03-27',
  },
  {
    id: 'inchina-2017',
    conference: 'INCHINA Forum (ICF): Mutual Cooperation among Asian Cities on the Environment and Energy',
    presentation: 'Status of Air Quality in Kuala Lumpur Urban Environment',
    dates: '7–8 December 2017',
    venue: 'Incheon, Korea',
    chip: 'DEC 2017',
    sortKey: '2017-12-07',
  },
  {
    id: 'mycot-2017',
    conference: '3rd Malaysian Congress of Toxicology (MyCOT 2017)',
    presentation:
      'Source apportionment and health risk assessment of PM2.5 during haze and non-haze days in Kuala Lumpur urban environment',
    dates: '5–6 December 2017',
    venue: 'Pusat Siswazah, Universiti Kebangsaan Malaysia, Bangi',
    chip: 'DEC 2017',
    sortKey: '2017-12-05',
  },
  {
    id: 'regional-haze-chiangmai-2017',
    conference: 'Conference on Regional Haze and Climate Change Management',
    presentation: 'Impact of Regional Haze towards Air Quality in Malaysia',
    dates: '10 November 2017',
    venue: 'Chiang Mai, Thailand',
    chip: 'NOV 2017',
    sortKey: '2017-11-10',
  },
  {
    id: 'icert-2017',
    conference: '5th International Conference on Environmental Research and Technology (ICERT 2017)',
    presentation: 'The composition of air pollutants during haze and non-haze episodes in Southeast Asia',
    dates: '23–25 August 2017',
    venue: 'Jen Hotel, Penang, Malaysia',
    chip: 'AUG 2017',
    sortKey: '2017-08-23',
  },
  {
    id: 'staclim-2016',
    conference: '2016 International Conference on Science and Technology Applications in Climate Change (STACLIM 2016)',
    presentation: 'The composition of air pollutants during haze and non-haze episodes in Southeast Asia',
    dates: '11–12 August 2016',
    venue: 'The Pacific Sutera Hotel, Kota Kinabalu, Sabah, Malaysia',
    chip: 'AUG 2016',
    sortKey: '2016-08-11',
  },
  {
    id: 'env-occ-health-2016',
    conference: 'International Conference on Environment and Occupational Health 2016',
    presentation:
      'Seasonal Variability and Compositions of Particulate Matter during Haze and Non-Haze Episode in Malaysia',
    dates: '12 March 2016',
    venue: 'Putrajaya, Malaysia',
    chip: 'MAR 2016',
    sortKey: '2016-03-12',
  },
] satisfies Talk[];

const presenterTalks = [
  {
    id: 'tt-iac-2025',
    conference: 'The 11th 2025 Theory and Technique International Aerosol Conference (11th 2025 T&T IAC)',
    presentation:
      'Investigating Polychlorinated Naphthalenes (PCNs) in Asia Pacific regions: A Review of Sources, Occurrences and Health Impacts',
    dates: '2025',
    venue: 'Universiti Kebangsaan Malaysia, Bangi, Malaysia',
    badge: 'Poster Presentation',
    chip: '2025',
    sortKey: '2025',
    links: [{ label: 'TAAR conference portal', url: 'https://www.taar.org.tw/' }],
  },
  {
    id: 'solas-2022',
    conference: '8th hybrid SOLAS Open Science Conference',
    presentation: 'Ocean Biogeochemical Control on Atmospheric Chemistry',
    dates: '26–29 September 2022',
    venue: 'Surface Ocean Lower Atmosphere Study (SOLAS), South Africa',
    chip: 'SEP 2022',
    sortKey: '2022-09-26',
  },
  {
    id: 'icacgp-igac-2022',
    conference: 'iCACGP/IGAC joint International Atmospheric Chemistry Conference',
    presentation:
      'Seasonal variations and compositions of size-fractioned urban atmospheric particulate matter in Kuala Lumpur, Malaysia',
    dates: '10–19 September 2022',
    venue: 'Manchester, United Kingdom',
    chip: 'SEP 2022',
    sortKey: '2022-09-10',
  },
] satisfies Talk[];

function sortTalks(talks: Talk[]): Talk[] {
  return [...talks].sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

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

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          <ConferenceTalksSidebar />
          <div className="min-w-0 flex-1 space-y-14 md:space-y-16">
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
                    <h2
                      id={`${group.id}-heading`}
                      className="font-serif text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl"
                    >
                      {group.title}
                    </h2>
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
      </div>
    </main>
  );
}
