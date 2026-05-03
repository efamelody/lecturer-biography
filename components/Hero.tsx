import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <section id="home" className="pt-32 pb-20 bg-linear-to-br from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="shrink-0">
              <div className="w-56 h-56 rounded-2xl overflow-hidden border-4 border-white shadow-2xl hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/profile.jpg"
                  alt="Prof. Dr. Mohd Talib Latif"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-teal-100 text-sm font-semibold tracking-widest uppercase mb-3">Welcome to my academic profile</p>
              <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">Prof. Dr. Mohd Talib Latif</h1>
              <p className="text-2xl text-teal-100 mb-4 font-light">Atmospheric Chemistry & Air Pollution Researcher</p>
              <p className="text-lg text-teal-50 mb-8">Faculty of Science and Technology<br />Universiti Kebangsaan Malaysia (UKM)</p>
              
              <div className="flex flex-col md:flex-row gap-6 text-sm text-teal-50">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-teal-200" />
                  <span>talib@ukm.edu.my</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-teal-200" />
                  <span>Bangi, Selangor, Malaysia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Summary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">25+</div>
              <p className="text-gray-600">Years of Research Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">150+</div>
              <p className="text-gray-600">Publications & Citations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">PhD</div>
              <p className="text-gray-600">University of East Anglia, UK</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
