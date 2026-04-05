import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-teal-600 shadow-lg">
              <Image
                src="/profile.jpg"
                alt="Prof. Dr. Mohd Talib Latif"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl mb-3 text-gray-900">Prof. Dr. Mohd Talib Latif</h1>
            <p className="text-2xl text-teal-700 mb-2">Atmospheric Chemistry & Air Pollution Researcher</p>
            <p className="text-lg text-gray-600">Faculty of Science and Technology, Universiti Kebangsaan Malaysia (UKM)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
