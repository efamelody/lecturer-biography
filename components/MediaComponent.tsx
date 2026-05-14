'use client';

import { Newspaper, Mic, Globe, Users, ExternalLink } from 'lucide-react';

const mediaItems = [
  {
    category: "News Interviews",
    icon: Mic,
    items: [
      { title: "Discussing Southeast Asian Haze on BBC World News", outlet: "BBC World News", date: "2024", type: "TV Interview" },
      { title: "Air Quality in the Tropics — Expert Panel", outlet: "Channel NewsAsia", date: "2023", type: "Panel Discussion" },
      { title: "Climate Change and Urban Pollution", outlet: "Astro Awani", date: "2023", type: "Interview" },
      { title: "The State of Malaysia's Air", outlet: "BFM Radio", date: "2022", type: "Radio Interview" },
    ],
  },
  {
    category: "Newspaper Contributions",
    icon: Newspaper,
    items: [
      { title: "Haze crisis: What needs to be done", outlet: "The Star", date: "2024", type: "Op-Ed" },
      { title: "Understanding urban air pollution in Kuala Lumpur", outlet: "New Straits Times", date: "2023", type: "Feature" },
      { title: "Transboundary pollution and ASEAN cooperation", outlet: "The Star", date: "2022", type: "Commentary" },
      { title: "Climate adaptation strategies for Malaysia", outlet: "Berita Harian", date: "2021", type: "Feature" },
    ],
  },
  {
    category: "Key Activities & Events",
    icon: Globe,
    items: [
      { title: "IPCC Expert Meeting on Short-Lived Climate Forcers", outlet: "IPCC", date: "2022", type: "Expert Meeting" },
      { title: "SOLAS Scientific Steering Committee", outlet: "Surface Ocean-Lower Atmosphere Study", date: "2018–2023", type: "Committee" },
      { title: "IGAC-MANGO Regional Workshop", outlet: "IGAC", date: "2023", type: "Workshop" },
      { title: "ASEAN Air Quality Forum — Keynote Speaker", outlet: "ASEAN Secretariat", date: "2023", type: "Keynote" },
    ],
  },
  {
    category: "Media Coverage",
    icon: Users,
    items: [
      { title: "UKM Professor named in Top 2% Scientists Worldwide", outlet: "UKM News", date: "2024", type: "University News" },
      { title: "TRSM Award Feature — Academy of Sciences Malaysia", outlet: "ASM", date: "2018", type: "Award Feature" },
      { title: "Research on haze and health impacts covered nationally", outlet: "Various", date: "2023", type: "News Roundup" },
      { title: "Marine aerosol research featured in science digest", outlet: "UKM Research", date: "2022", type: "Research Highlight" },
    ],
  },
];

function MediaCard({ item }: { item: typeof mediaItems[0]["items"][0] }) {
  return (
    <div className="group bg-white border border-[#e2e8f0] rounded-lg overflow-hidden hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
      <div className="aspect-[16/9] bg-[#f1f5f9] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#e2e8f0] flex items-center justify-center">
          <svg className="w-8 h-8 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M4.5 3h15M3 6.75h18" />
          </svg>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded">{item.type}</span>
          <span className="text-[10px] text-[#94a3b8]">{item.date}</span>
        </div>
        <h3 className="text-sm font-medium text-[#0f172a] leading-snug mb-1">{item.title}</h3>
        <p className="text-xs text-[#64748b]">{item.outlet}</p>
      </div>
    </div>
  );
}

export default function MediaComponent() {
  return (
    <>
      {mediaItems.map((section) => {
        const Icon = section.icon;
        return (
          <section key={section.category}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center">
                <Icon size={20} className="text-[#475569]" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0f172a] tracking-tight">{section.category}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {section.items.map((item, i) => (
                <MediaCard key={i} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
