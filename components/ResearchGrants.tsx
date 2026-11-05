import ResearchGrantsSidebar from '@/components/ResearchGrantsSidebar'

interface Grant {
  name: string
  code?: string
  title: string
  duration: string
  amount: string
}

const grantGroups = [
  {
    id: 'international',
    index: 'C.1.1',
    title: 'Research Grant (International)',
    grants: [
      {
        name: 'Foreign, Commonwealth & Development Office (FCDO), United Kingdom',
        code: 'ST-2024-015',
        title: 'Feasibility study for a high resolution Southeast Asian air pollution forecasting system',
        duration: '2023–2024',
        amount: '83,122.60',
      },
      {
        name: 'Environmental Defense Fund',
        code: 'ST-2023-015',
        title: 'Concentration and Emission of Methane in Malaysia',
        duration: '2023–2024',
        amount: '89,000.00',
      },
      {
        name: 'Asia-Pacific Network for Global Change Research (APN)',
        code: 'ST-2021-013',
        title:
          'Impacts of the COVID-19 pandemic on air quality of the Monsoon Asia region: Cross-country assessment and facilitating policy',
        duration: '2021–2024',
        amount: '373,373.00',
      },
      {
        name: 'ASEAN-India Collaborative R&D',
        code: 'ST-2019-007',
        title:
          'Understanding South and Southeast Asian Haze in 3-Dimension: Aerosol source, climatology, transport and health impacts',
        duration: '2019–2020',
        amount: '203,916.59',
      },
      {
        name: 'Advanced Institute Seed Grant Programme',
        code: 'ST-2018-010',
        title: 'The influence of biomass burning on high concentration of PM2.5 in selected areas in Southeast Asia',
        duration: '2018–2020',
        amount: '59,136.00',
      },
      {
        name: 'Royal Thai Embassy (UKM-Thai Window)',
        code: 'ST-2016-008',
        title: 'Evaluation of fine and nano particles concentration in several cities in Malaysia and Thailand',
        duration: '2016–2017',
        amount: '20,000.00',
      },
    ] satisfies Grant[],
  },
  {
    id: 'national',
    index: 'C.1.2',
    title: 'Research Grant (National)',
    grants: [
      {
        name: 'Fundamental Research Grant Scheme',
        code: 'FRGS/1/2024/WAS02/UKM/01/1',
        title:
          'Concentrations and Potential Sources of Persistent Organic Pollutants Around Selected Landfills and Their Potential Impacts on Human Health',
        duration: '2024–2026',
        amount: '158,484.00',
      },
      {
        name: 'Fundamental Research Grant Scheme',
        code: 'FRGS/1/2020/WAB02/UKM/02/3',
        title: 'Assessing the impact of global temperatures on surface ozone climate change penalty in Malaysia',
        duration: '2020–2023',
        amount: '81,000.00',
      },
      {
        name: 'Technology Development Fund 1 (TeD 1)',
        code: 'TDF04211364',
        title:
          'Optimization of Airboxsense System for Fine Particulate Matter and Dioxins/Furans Composition in Ambient Air with Their Application in Health Risk Assessment',
        duration: '2021–2023',
        amount: '337,000.00',
      },
      {
        name: 'Fundamental Research Grant Scheme',
        code: 'FRGS/1/2018/WAB05/UKM/01/1',
        title: 'Environmental impact and health risk assessment from vehicle emission in Kuala Lumpur urban environment',
        duration: '2019–2022',
        amount: '105,000.00',
      },
      {
        name: 'Fundamental Research Grant Scheme',
        code: 'FRGS/1/2015/WAB03/UKM/01/1',
        title:
          'Characterization, Source Apportionment and Health Risk Assessment of Fine Particulate Matter and Indoor Dust in School Environment',
        duration: '2015–2018',
        amount: '88,200.00',
      },
      {
        name: 'ScienceFund MOSTI',
        code: '04-01-02-SF1259',
        title: 'Composition of volatile organic compounds from sea-surface microlayer around coastal areas in Peninsular Malaysia',
        duration: '2015–2017',
        amount: '342,240.00',
      },
    ] satisfies Grant[],
  },
  {
    id: 'internal',
    index: 'C.1.3',
    title: 'Research Grant (Internal/University Grant)',
    grants: [
      {
        name: 'Dana Impak Perdana 2.0 (DIP 2.0)',
        code: 'DIP-2022-001',
        title: 'Variation and characteristics of atmospheric microplastic in the coastal environment of Peninsular Malaysia',
        duration: '2022–2023',
        amount: '100,000.00',
      },
      {
        name: 'Faculty Grant',
        code: 'ST-2020-008',
        title: 'Indoor Air Quality Assessment in Faculty of Science and Technology (FST), Universiti Kebangsaan Malaysia',
        duration: '2020–2021',
        amount: '20,000.00',
      },
      {
        name: 'Dana Impak Perdana',
        code: 'DIP-2019-006',
        title: 'Variation of Volatile Organic Compounds (VOCs) in Ambient Air and Its Effect on the Environment and Human Health',
        duration: '2019–2022',
        amount: '100,000.00',
      },
      {
        name: 'Research University Grant',
        code: 'GUP-2018-109',
        title:
          'Spatio-Temporal variation of PM2.5 concentration across Malaysia based on station observation, satellite estimation, and model simulation',
        duration: '2018–2021',
        amount: '60,000.00',
      },
      {
        name: 'Dana Impak Perdana',
        code: 'DIP-2016-001',
        title: 'The influence of seasonal climatic variations on the composition of fine particulate matter and atmospheric gases',
        duration: '2016–2019',
        amount: '100,000.00',
      },
    ] satisfies Grant[],
  },
];

function GrantTable({ grants }: { grants: Grant[] }) {
  return (
    <div className="overflow-x-auto border border-[#e2e8f0] bg-white">
      <table className="w-full min-w-[850px] border-collapse text-left">
        <caption className="sr-only">Research grants as project leader</caption>
        <thead className="bg-[#f1f5f9]">
          <tr className="border-b border-[#e2e8f0]">
            <th scope="col" className="w-[24%] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#475569]">
              Name of Grant
            </th>
            <th scope="col" className="w-[48%] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#475569]">
              Title
            </th>
            <th scope="col" className="w-[13%] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#475569]">
              Duration
            </th>
            <th scope="col" className="w-[15%] px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-[#475569]">
              Amount (RM)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e2e8f0]">
          {grants.map((grant) => (
            <tr key={grant.code ?? grant.name} className="align-top even:bg-[#fbfdff]">
              <td className="px-5 py-4 text-sm font-medium leading-relaxed text-[#0f172a]">
                {grant.name}
                {grant.code && (
                  <span className="mt-1 block break-all font-mono text-xs font-normal text-[#64748b]">
                    {grant.code}
                  </span>
                )}
              </td>
              <td className="px-5 py-4 text-sm leading-relaxed text-[#334155]">{grant.title}</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-[#475569]">{grant.duration}</td>
              <td className="whitespace-nowrap px-5 py-4 text-right text-sm tabular-nums text-[#0f172a]">
                {grant.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ResearchGrants() {
  return (
    <main className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white pb-12 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]">
            Research and Publication
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#0f172a] md:text-5xl">
            Research Grants
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Research grants awarded to Prof. Dr. Mohd Talib Latif as project leader, across
            international, national and university funding programmes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          <ResearchGrantsSidebar />
          <div className="min-w-0 flex-1 space-y-14 md:space-y-16">
            {grantGroups.map((group) => (
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
                    <p className="mt-1 text-sm text-[#64748b]">As Project Leader</p>
                  </div>
                </div>
                <GrantTable grants={group.grants} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
