import { Wind, FlaskConical, Droplets, Waves } from 'lucide-react';

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

export default function Research() {
  return (
    <section id="research" className="py-20 bg-gray-50">
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
  );
}
