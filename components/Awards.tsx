import { Award, Trophy, Star } from 'lucide-react';

export default function Awards() {
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

  return (
    <section id="awards" className="py-20 bg-white">
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
  );
}
