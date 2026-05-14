export default function Awards() {
  const awards = [
    {
      year: '2021',
      title: 'Distinguished Scholar Award',
      organization: 'ASEAN Academy of Sciences'
    },
    {
      year: '2020',
      title: 'Excellence in Environmental Research',
      organization: 'Malaysian Institute of Chemistry'
    },
    {
      year: '2019',
      title: 'UKM Bitara Award',
      organization: 'Universiti Kebangsaan Malaysia'
    },
    {
      year: '2018',
      title: 'Top Research Scientist Malaysia',
      organization: 'Academy of Sciences Malaysia'
    }
  ];

  return (
    <section id="awards" className="py-20 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Recognition</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight">
            Awards & Recognition
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#e2e8f0]" />
          <div className="space-y-8">
            {awards.map((award, index) => (
              <div key={index} className="relative flex items-start gap-6 pl-12">
                <div className="absolute left-[11px] top-[6px] w-[17px] h-[17px] rounded-full bg-white border-2 border-[#94a3b8] z-10" />
                <div className="flex-1 bg-white border border-[#e2e8f0] rounded-lg p-5 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#0f172a]">{award.title}</h3>
                      <p className="text-sm text-[#64748b] mt-1">{award.organization}</p>
                    </div>
                    <span className="text-xs font-medium text-[#64748b] bg-[#f1f5f9] px-3 py-1 rounded-full whitespace-nowrap">{award.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
