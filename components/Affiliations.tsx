import { Building2, Globe, Users, Briefcase } from 'lucide-react';

export default function Affiliations() {
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
      fullName: 'International Global Atmospheric Chemistry - Marine Aerosol Network as a Ground-based Observatory',
      role: 'Member',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl mb-12 text-gray-900 text-center">Affiliations & Collaborations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {affiliations.map((affiliation, index) => {
            const Icon = affiliation.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-teal-500 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-teal-700" />
                  </div>
                  <div>
                    <div className="text-lg text-gray-900 mb-1">{affiliation.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{affiliation.fullName}</div>
                    <div className="text-sm text-teal-700">{affiliation.role}</div>
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
