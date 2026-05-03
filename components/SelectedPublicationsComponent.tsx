import { FileText, ExternalLink } from 'lucide-react';
import publicationsData from '@/content/selected-publications.json';

export default function SelectedPublications() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl mb-4 text-gray-900 font-bold">Selected Publications</h1>
            <p className="text-lg text-gray-600">A curated collection of notable research works</p>
          </div>

          <div className="space-y-6">
            {publicationsData.map((pub, index) => (
              <div key={pub.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <FileText size={24} className="text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-2 text-gray-900 font-semibold">{pub.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="italic">{pub.journal}</span>
                      <span>•</span>
                      <span>{pub.year}</span>
                    </div>
                    <p className="text-sm text-gray-500">{pub.authors}</p>
                  </div>
                  <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ExternalLink size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-600">
            <p>For a complete list of publications, please visit:</p>
            <p className="font-semibold text-gray-900 mt-2">ResearchGate • ORCID • Google Scholar</p>
          </div>
        </div>
      </section>
    </main>
  );
}
