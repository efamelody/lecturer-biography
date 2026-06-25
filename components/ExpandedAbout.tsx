'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GraduationCap, Mail, MapPin } from 'lucide-react';

const educationData = [
  {
    degree: "Ph.D.",
    year: "2006",
    field: "Atmospheric Chemistry",
    institution: "University of East Anglia, UK",
  },
  {
    degree: "M.Sc.",
    year: "1999",
    field: "Environmental Science",
    institution: "Universiti Kebangsaan Malaysia",
  },
  {
    degree: "B.Sc.",
    year: "1995",
    field: "Chemistry",
    institution: "Universiti Kebangsaan Malaysia",
  },
];

const researchInterests = [
  "Atmospheric Aerosols", "Surface Ozone & VOCs",
  "Source Apportionment", "Sea-Surface Microlayer",
  "Urban Air Quality", 
];

const awards = [
  { year: "2022 – 2025", title: "World's Top 2% Scientist", organization: "Stanford University & Elsevier"},
  { year: '2020', title: 'Excellence in Environmental Research', organization: 'Malaysian Institute of Chemistry' },
  { year: '2019', title: 'UKM Bitara Award', organization: 'Universiti Kebangsaan Malaysia' },
  { year: '2018', title: 'Top Research Scientist Malaysia', organization: 'Academy of Sciences Malaysia' },
];

const affiliations = [
  { name: 'IPCC', fullName: 'Intergovernmental Panel on Climate Change', role: 'Member of Task Force Bureau (TFB)' },
  { name: 'MAAQR', fullName: 'Malaysian Association for Aerosol and Air Quality Research', role: 'President' },
  { name: 'IGAC-MANGO', fullName: 'International Global Atmospheric Chemistry – Marine Aerosol Network', role: 'Member' },
];

const sections = [
  { id: 'background', label: 'Background' },
  { id: 'affiliations', label: 'Affiliations' },
  { id: 'research', label: 'Research' },
];

export default function ExpandedAbout() {
  const [activeSection, setActiveSection] = useState('background');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-20">
      {/* Profile Banner */}
      <section className="py-16 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="shrink-0">
              <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-[#e2e8f0] p-1.5 bg-white shadow-lg">
                <Image
                  src="/profile.jpg"
                  alt="Prof. Dr. Mohd Talib Latif"
                  width={176}
                  height={176}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#64748b] mb-2">About</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] mb-2 tracking-tight">Prof. Dr. Mohd Talib Latif</h1>
              <p className="text-lg text-[#475569] font-medium mb-4">Professor of Atmospheric Chemistry</p>
              <p className="text-[#64748b] leading-relaxed max-w-2xl">
                Distinguished atmospheric scientist specializing in atmospheric chemistry and air pollution studies. Dedicated to advancing environmental sustainability and mentoring the next generation of scientists.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569]">IPCC Member of Task Force Bureau (TFB)</span>
                <span className="px-3 py-1.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569]">Environmental Research</span>
                <span className="px-3 py-1.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569]">Southeast Asia Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dossier: Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* ===== Sidebar ===== */}
          <aside className="w-full lg:w-[280px] shrink-0 order-first">
            <div className="lg:sticky lg:top-24 space-y-10">
              {/* In-Page Navigation */}
              <nav className="hidden lg:block">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8] mb-4">On this page</p>
                <div className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block text-sm py-1.5 border-l-2 pl-4 transition-all ${
                        activeSection === s.id
                          ? 'text-[#0f172a] border-[#0f172a] font-medium'
                          : 'text-[#94a3b8] border-transparent hover:text-[#64748b] hover:border-[#cbd5e1]'
                      }`}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </nav>

              {/* Education */}
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8] mb-4">Education</h3>
                <div className="space-y-4">
                  {educationData.map((edu, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#f1f5f9] rounded flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap size={14} className="text-[#64748b]" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold text-[#0f172a]">{edu.degree}</span>
                          <span className="text-[10px] font-medium text-[#94a3b8] bg-[#f1f5f9] px-1.5 py-0.5 rounded">{edu.year}</span>
                        </div>
                        <p className="text-xs text-[#64748b] leading-relaxed mt-0.5">{edu.field}</p>
                        <p className="text-xs text-[#94a3b8]">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8] mb-4">Recognition</h3>
                <div className="space-y-3">
                  {awards.map((award, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-[10px] font-semibold text-[#94a3b8] bg-[#f1f5f9] px-1.5 py-0.5 rounded mt-0.5 shrink-0">{award.year}</span>
                      <div>
                        <p className="text-xs font-medium text-[#0f172a] leading-snug">{award.title}</p>
                        <p className="text-[10px] text-[#94a3b8]">{award.organization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="pt-4 border-t border-[#e2e8f0]">
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8] mb-4">Contact</h3>
                <div className="space-y-2">
                  <a href="mailto:talib@ukm.edu.my" className="flex items-center gap-2 text-xs text-[#64748b] hover:text-[#0f172a] transition-colors">
                    <Mail size={12} className="shrink-0" />
                    <span>talib@ukm.edu.my</span>
                  </a>
                  <div className="flex items-center gap-2 text-xs text-[#64748b]">
                    <MapPin size={12} className="shrink-0" />
                    <span>Bangi, Selangor, Malaysia</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ===== Main Column ===== */}
          <div className="flex-1 min-w-0 space-y-20">
            {/* Professional Background */}
            <section id="background" className="scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-[#0f172a] mb-8 tracking-tight">Biography</h2>
              <div className="space-y-5 text-[#475569] leading-relaxed max-w-4xl">
                <p>
                  Mohd Talib Latif is a professor of atmospheric chemistry and air pollution at the Department of Earth Sciences and Environment, Faculty of Science and Technology, Universiti Kebangsaan Malaysia, and a fellow of the Malaysian Academy of Science (FASc). He completed his BSc in Chemistry and MSc in Environmental Chemistry (Air Pollution) at Universiti Kebangsaan Malaysia and his PhD at the School of Environmental Science, University of East Anglia, United Kingdom. Currently, he serves as the President of the Malaysian Association for Aerosol and Air Quality Research (MAAQR). His main research work involves the composition of atmospheric aerosols from various sources, including the sea surface microlayer (SML). He also works on the composition of gases, primarily focusing on surface ozone and volatile organic compounds (VOCs) in the atmosphere. His research group collaborates closely with government agencies in Malaysia, including the Malaysian Department of Environment (DOE) and the Malaysian Meteorological Department (MetMalaysia). At the international level, he is actively involved with the research community within the Asian continent through the International Global Atmospheric Chemistry-Monsoon Asia (IGAC-MANGO) project. From 2018 to 2023, he was appointed to one of the scientific steering committees for the Surface Ocean Lower Atmosphere Study (SOLAS). He is currently a member of the Task Force Bureau (TFB) on the National Greenhouse Gas Inventories (TFI), the Intergovernmental Panel on Climate Change (IPCC). In 2018, he received the Top Research Scientist Award from the Academy of Sciences Malaysia for his research and publications.
                </p>
              </div>
            </section>

            {/* Affiliations & Collaborations */}
            <section id="affiliations" className="scroll-mt-24 border-t border-[#e2e8f0] pt-12">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#64748b] font-bold mb-8">
                Affiliations & Collaborations
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                {affiliations.map((aff, index) => (
                  <div key={index}>
                    <div className="text-sm font-semibold text-[#0f172a] mb-0.5">{aff.name}</div>
                    <div className="text-xs text-[#64748b] leading-relaxed mb-0.5">{aff.fullName}</div>
                    <div className="text-xs font-medium text-[#475569]">{aff.role}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Research Interests */}
            <section id="research" className="scroll-mt-24 border-t border-[#e2e8f0] pt-12">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#64748b] font-bold mb-8">
                Primary Research Interests
              </h2>
              <div className="flex flex-wrap gap-3">
                {researchInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] text-sm font-medium rounded-full shadow-sm hover:border-[#94a3b8] transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
