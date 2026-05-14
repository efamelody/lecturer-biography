import { Globe, Users, Building2, Briefcase } from 'lucide-react';

const affiliations = [
  {
    icon: Globe,
    name: 'IPCC',
    fullName: 'Intergovernmental Panel on Climate Change',
    role: 'Lead Author',
  },
  {
    icon: Users,
    name: 'MAAQR',
    fullName: 'Malaysian Association for Aerosol and Air Quality Research',
    role: 'President',
  },
  {
    icon: Building2,
    name: 'DOE Malaysia',
    fullName: 'Department of Environment Malaysia',
    role: 'Scientific Advisor',
  },
  {
    icon: Briefcase,
    name: 'MetMalaysia',
    fullName: 'Malaysian Meteorological Department',
    role: 'Research Collaborator',
  },
  {
    icon: Globe,
    name: 'IGAC-MANGO',
    fullName: 'International Global Atmospheric Chemistry – Marine Aerosol Network as a Ground-based Observatory',
    role: 'Member',
  },
];

export default function Affiliations() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Organizations</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight">
            Affiliations & Collaborations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {affiliations.map((affiliation, index) => {
            const Icon = affiliation.icon;
            return (
              <div key={index} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#475569]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#0f172a] font-semibold text-sm mb-0.5">{affiliation.name}</div>
                    <div className="text-xs text-[#64748b] mb-1 leading-relaxed">{affiliation.fullName}</div>
                    <div className="text-xs font-medium text-[#475569]">{affiliation.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
