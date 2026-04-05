import { FileText, ExternalLink } from 'lucide-react';

const publications = [
  {
    title: 'Chemical characterization and source apportionment of PM2.5 during Southeast Asian haze episodes',
    journal: 'Atmospheric Environment',
    year: '2025',
    authors: 'Latif, M.T., et al.',
  },
  {
    title: 'Temporal variations of surface ozone and its precursors in urban and rural areas of Malaysia',
    journal: 'Science of the Total Environment',
    year: '2025',
    authors: 'Latif, M.T., Baharudin, N.H., et al.',
  },
  {
    title: 'Air quality assessment during COVID-19 lockdown: implications for future environmental policies',
    journal: 'Environmental Research',
    year: '2025',
    authors: 'Khan, M.F., Latif, M.T., et al.',
  },
  {
    title: 'Marine aerosol properties in the sea-surface microlayer of tropical waters',
    journal: 'Atmospheric Chemistry and Physics',
    year: '2024',
    authors: 'Latif, M.T., Mahmud, M., et al.',
  },
  {
    title: 'Long-term trends in air quality and meteorological parameters in Southeast Asia',
    journal: 'Environmental Pollution',
    year: '2024',
    authors: 'Latif, M.T., et al.',
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl mb-12 text-gray-900 text-center">Recent Publications</h2>
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FileText size={24} className="text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2 text-gray-900">{pub.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="italic">{pub.journal}</span>
                    <span>•</span>
                    <span>{pub.year}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{pub.authors}</p>
                </div>
                <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow">
            View All Publications
          </button>
        </div>
      </div>
    </section>
  );
}
