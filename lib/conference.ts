import 'server-only'

export interface TalkLink {
  label: string
  url: string
}

export interface Talk {
  id: string
  conference: string
  presentation: string
  dates: string
  venue: string
  country: string
  badge?: string
  chip: string
  sortKey: string
  links?: TalkLink[]
}

export interface Country {
  key: string
  name: string
  folder: string
  lat: number
  lng: number
}

export const countries: Country[] = [
  { key: 'malaysia', name: 'Malaysia', folder: 'malaysia', lat: 3.139, lng: 101.6869 },
  { key: 'korea', name: 'South Korea', folder: 'korea', lat: 37.5665, lng: 126.978 },
  { key: 'pakistan', name: 'Pakistan', folder: 'pakistan', lat: 33.6844, lng: 73.0479 },
  { key: 'thailand', name: 'Thailand', folder: 'thailand', lat: 13.7563, lng: 100.5018 },
  { key: 'indonesia', name: 'Indonesia', folder: 'indonesia', lat: -6.9175, lng: 107.6191 },
  { key: 'china', name: 'China', folder: 'china', lat: 23.1291, lng: 113.2644 },
  { key: 'taiwan', name: 'Taiwan', folder: 'taiwan', lat: 25.033, lng: 121.5654 },
  { key: 'united-kingdom', name: 'United Kingdom', folder: 'united-kingdom', lat: 51.5074, lng: -0.1278 },
  { key: 'australia', name: 'Australia', folder: 'australia', lat: -27.4698, lng: 153.0251 },
  { key: 'south-africa', name: 'South Africa', folder: 'south-africa', lat: -26.2041, lng: 28.0473 },
]

export const invitedTalks: Talk[] = [
  {
    id: 'cem-asia-2026',
    conference: 'CEM & AQUAMATE Asia 2026',
    presentation: 'Current Understanding and Future Direction of Ground-Level Air Quality Measurements in Malaysia',
    dates: '18 November 2026',
    venue: 'KLCC, Kuala Lumpur, Malaysia',
    country: 'malaysia',
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
    country: 'pakistan',
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
    country: 'thailand',
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
    country: 'korea',
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
    country: 'indonesia',
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
    country: 'china',
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
    country: 'taiwan',
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
    country: 'malaysia',
    chip: 'OCT 2023',
    sortKey: '2023-10-20',
  },
  {
    id: 'mycot-2022',
    conference: 'The 4th Malaysian Congress of Toxicology 2022 (MyCOT2022)',
    presentation: 'Polycyclic Aromatic Hydrocarbon in Kuala Lumpur Urban Environment and Its Effect on Human Health',
    dates: '16–17 November 2022',
    venue: 'International Islamic University Malaysia, Kuantan, Pahang, Malaysia',
    country: 'malaysia',
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
    country: 'malaysia',
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
    country: 'korea',
    chip: 'OCT 2021',
    sortKey: '2021-10-20',
  },
  {
    id: 'moisture-buildings-2021',
    conference: '1st International Conference on Moisture in Buildings',
    presentation: 'Study on the population of airborne bacteria and antibiotic resistance from a hospital environment',
    dates: '28–29 June 2021',
    venue: 'University College London, United Kingdom',
    country: 'united-kingdom',
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
    country: 'australia',
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
    country: 'thailand',
    chip: 'MAR 2021',
    sortKey: '2021-03-24',
  },
  {
    id: 'baq-2018',
    conference: 'Better Air Quality Conference 2018',
    presentation: 'Long-term Record of Air Quality in Malaysia',
    dates: '14–16 October 2018',
    venue: 'Borneo Convention Centre, Kuching, Sarawak, Malaysia',
    country: 'malaysia',
    chip: 'OCT 2018',
    sortKey: '2018-10-14',
  },
  {
    id: 'esem-2018',
    conference: 'International Conference on Energy Systems and Environmental Management (ESEM 2018)',
    presentation: 'Impact of Regional Haze Episode towards Air Quality in Malaysia',
    dates: '22 June 2018',
    venue: 'Siam Oriental Hotel, Hat Yai, Songkhla, Thailand',
    country: 'thailand',
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
    country: 'malaysia',
    chip: 'MAR 2018',
    sortKey: '2018-03-27',
  },
  {
    id: 'inchina-2017',
    conference: 'INCHINA Forum (ICF): Mutual Cooperation among Asian Cities on the Environment and Energy',
    presentation: 'Status of Air Quality in Kuala Lumpur Urban Environment',
    dates: '7–8 December 2017',
    venue: 'Incheon, Korea',
    country: 'korea',
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
    country: 'malaysia',
    chip: 'DEC 2017',
    sortKey: '2017-12-05',
  },
  {
    id: 'regional-haze-chiangmai-2017',
    conference: 'Conference on Regional Haze and Climate Change Management',
    presentation: 'Impact of Regional Haze towards Air Quality in Malaysia',
    dates: '10 November 2017',
    venue: 'Chiang Mai, Thailand',
    country: 'thailand',
    chip: 'NOV 2017',
    sortKey: '2017-11-10',
  },
  {
    id: 'icert-2017',
    conference: '5th International Conference on Environmental Research and Technology (ICERT 2017)',
    presentation: 'The composition of air pollutants during haze and non-haze episodes in Southeast Asia',
    dates: '23–25 August 2017',
    venue: 'Jen Hotel, Penang, Malaysia',
    country: 'malaysia',
    chip: 'AUG 2017',
    sortKey: '2017-08-23',
  },
  {
    id: 'staclim-2016',
    conference: '2016 International Conference on Science and Technology Applications in Climate Change (STACLIM 2016)',
    presentation: 'The composition of air pollutants during haze and non-haze episodes in Southeast Asia',
    dates: '11–12 August 2016',
    venue: 'The Pacific Sutera Hotel, Kota Kinabalu, Sabah, Malaysia',
    country: 'malaysia',
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
    country: 'malaysia',
    chip: 'MAR 2016',
    sortKey: '2016-03-12',
  },
]

export const presenterTalks: Talk[] = [
  {
    id: 'tt-iac-2025',
    conference: 'The 11th 2025 Theory and Technique International Aerosol Conference (11th 2025 T&T IAC)',
    presentation:
      'Investigating Polychlorinated Naphthalenes (PCNs) in Asia Pacific regions: A Review of Sources, Occurrences and Health Impacts',
    dates: '2025',
    venue: 'Universiti Kebangsaan Malaysia, Bangi, Malaysia',
    country: 'malaysia',
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
    country: 'south-africa',
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
    country: 'united-kingdom',
    chip: 'SEP 2022',
    sortKey: '2022-09-10',
  },
]

export function sortTalks(talks: Talk[]): Talk[] {
  return [...talks].sort((a, b) => b.sortKey.localeCompare(a.sortKey))
}
