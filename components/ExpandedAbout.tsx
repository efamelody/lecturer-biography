import { GraduationCap, Award, Trophy, Star, Globe, Users, Building2, Briefcase, Wind, FlaskConical, Droplets, Waves } from 'lucide-react';

export default function ExpandedAbout() {
  const educationData = [
    {
      degree: "Ph.D.",
      year: "2008",
      field: "Atmospheric Chemistry",
      institution: "University of East Anglia, UK",
    },
    {
      degree: "M.Sc.",
      year: "2005",
      field: "Environmental Chemistry (Air Pollution)",
      institution: "Universiti Kebangsaan Malaysia",
    },
    {
      degree: "B.Sc.",
      year: "2003",
      field: "Chemistry",
      institution: "Universiti Kebangsaan Malaysia",
    },
  ];

  const interests = [
    {
      icon: Wind,
      title: 'Atmospheric Aerosols',
      description: 'Chemical composition and physical properties of atmospheric particles',
    },
    {
      icon: FlaskConical,
      title: 'Surface Ozone & VOCs',
      description: 'Ground-level ozone formation and volatile organic compound dynamics',
    },
    {
      icon: Droplets,
      title: 'Air Pollution Sources',
      description: 'Source apportionment and emission characterization studies',
    },
    {
      icon: Waves,
      title: 'Sea-Surface Microlayer',
      description: 'Marine atmospheric chemistry and ocean-atmosphere interactions',
    },
  ];

  const awards = [
    {
      year: '2018',
      title: 'Top Research Scientist Malaysia',
      organization: 'Academy of Sciences Malaysia'
    },
    {
      year: '2019',
      title: 'UKM Bitara Award',
      organization: 'Universiti Kebangsaan Malaysia'
    },
    {
      year: '2020',
      title: 'Excellence in Environmental Research',
      organization: 'Malaysian Institute of Chemistry'
    },
    {
      year: '2021',
      title: 'Distinguished Scholar Award',
      organization: 'ASEAN Academy of Sciences'
    }
  ];

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
    <main className="pt-20">
      {/* Biography Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl mb-8 text-gray-900 font-bold">About</h1>

          <div className="space-y-4 text-gray-700 leading-relaxed mb-12">
            <p>
              Prof. Dr. Mohd Talib Latif is a distinguished atmospheric scientist and Professor of
              Atmospheric Chemistry at Universiti Kebangsaan Malaysia (UKM). He earned his PhD from
              the University of East Anglia, United Kingdom, specializing in atmospheric chemistry and
              air pollution studies.
            </p>
            <p>
              Throughout his illustrious career, he has held numerous leadership positions including
              serving as a Lead Author for the Intergovernmental Panel on Climate Change (IPCC),
              President of the Malaysian Association for Aerosol and Air Quality Research (MAAQR),
              and key academic roles at UKM including Dean and Deputy Dean positions.
            </p>
            <p>
              His research has significantly contributed to understanding air quality dynamics,
              atmospheric processes, and environmental sustainability in Southeast Asia. He has
              published extensively in high-impact journals and continues to mentor the next
              generation of environmental scientists.
            </p>
          </div>

          {/* Education */}
          <h2 className="text-3xl mb-8 text-gray-900 font-bold">Education</h2>
          <div className="space-y-4 mb-16">
            {educationData.map((edu, index) => (
              <div key={index} className="flex gap-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-semibold text-teal-700">{edu.degree}</span>
                    <span className="text-sm text-gray-600">{edu.year}</span>
                  </div>
                  <p className="text-gray-900">{edu.field}</p>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl mb-12 text-gray-900 text-center">Research Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900">{interest.title}</h3>
                  <p className="text-gray-600">{interest.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl mb-12 text-gray-900 text-center">Awards & Recognition</h2>
          <div className="space-y-6">
            {awards.map((award, index) => (
              <div key={index} className="flex items-start gap-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                    {index === 0 ? <Trophy size={28} className="text-white" /> :
                     index === 1 ? <Award size={28} className="text-white" /> :
                     <Star size={28} className="text-white" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-2xl text-teal-700">{award.year}</span>
                    <h3 className="text-xl text-gray-900">{award.title}</h3>
                  </div>
                  <p className="text-gray-600">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations & Collaborations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl mb-12 text-gray-900 text-center">Affiliations & Collaborations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliations.map((affiliation, index) => {
              const Icon = affiliation.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-teal-500 transition-colors bg-white">
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
    </main>
  );
}
