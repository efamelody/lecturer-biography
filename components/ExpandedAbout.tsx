'use client';

import Image from 'next/image';
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
    },
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
    <main className="pt-20 pb-0">
      {/* Hero Section with Profile */}
      <section className="py-16 bg-linear-to-br from-teal-50 to-blue-50 border-b border-teal-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="shrink-0">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-teal-600 shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="/profile.jpg"
                  alt="Prof. Dr. Mohd Talib Latif"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-2">Prof. Dr. Mohd Talib Latif</h1>
              <p className="text-xl text-teal-600 font-semibold mb-4">Professor of Atmospheric Chemistry</p>
              <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl">
                Distinguished atmospheric scientist specializing in atmospheric chemistry and air pollution studies. Dedicated to advancing environmental sustainability and mentoring the next generation of scientists.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">IPCC Lead Author</span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Environmental Research</span>
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Southeast Asia Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Professional Background</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
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
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Education & Qualifications</h2>
          <div className="space-y-5">
            {educationData.map((edu, index) => (
              <div key={index} className="flex gap-6 bg-white border-l-4 border-teal-500 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-linear-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                    <GraduationCap size={28} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-xl font-bold text-teal-700">{edu.degree}</span>
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded">{edu.year}</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{edu.field}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Research Interests</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            Focused on understanding atmospheric processes and environmental challenges in the tropics and subtropics
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100">
                  <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{interest.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{interest.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="flex items-start gap-6 bg-white rounded-xl p-8 hover:shadow-lg transition-shadow border-l-4 border-teal-500">
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-linear-to-br from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                    {index === 0 ? <Trophy size={32} className="text-white" /> :
                     index === 1 ? <Star size={32} className="text-white" /> :
                     index === 2 ? <Award size={32} className="text-white" /> :
                     <Trophy size={32} className="text-white" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{award.title}</h3>
                    <span className="text-sm font-semibold text-white bg-teal-600 px-3 py-1 rounded-full shrink-0">{award.year}</span>
                  </div>
                  <p className="text-gray-600">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations & Collaborations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Affiliations & Collaborations</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            Active member of leading national and international organizations in atmospheric science and environmental research
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliations.map((affiliation, index) => {
              const Icon = affiliation.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 border-2 border-teal-100 rounded-xl p-6 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={28} className="text-teal-700" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 mb-1">{affiliation.name}</div>
                      <div className="text-sm text-gray-600 mb-2 font-semibold">{affiliation.fullName}</div>
                      <div className="text-sm text-teal-700 font-semibold">{affiliation.role}</div>
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
