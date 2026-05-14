import Image from 'next/image';
import { Mail, MapPin, FileDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#f8fafc] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-slate-300 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#e2e8f0] p-2 bg-white shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Prof. Dr. Mohd Talib Latif"
                width={192}
                height={192}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b]">
                Professor of Atmospheric Chemistry
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0f172a] tracking-tight leading-tight">
                Prof. Dr. Mohd Talib Latif
              </h1>
            </div>
            <p className="text-xl text-[#64748b] font-light max-w-2xl mx-auto leading-relaxed">
              Advancing the understanding of atmospheric aerosols, air quality dynamics,
              and environmental sustainability in Southeast Asia
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-[#475569]">
              <span className="text-[#0f172a] font-semibold">IPCC Lead Author</span>
              <span className="hidden sm:inline text-[#cbd5e1]">|</span>
              <span>President of MAAQR</span>
              <span className="hidden sm:inline text-[#cbd5e1]">|</span>
              <span>Professor at UKM</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-[#e2e8f0] w-full max-w-lg">
            <a href="mailto:talib@ukm.edu.my" className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a] transition-colors text-sm">
              <Mail size={16} />
              <span>talib@ukm.edu.my</span>
            </a>
            <div className="flex items-center gap-2 text-[#64748b] text-sm">
              <MapPin size={16} />
              <span>Bangi, Selangor, Malaysia</span>
            </div>
            <a
              href="/cv.pdf"
              className="flex items-center gap-2 text-[#0f172a] hover:text-[#475569] transition-colors text-sm font-medium"
            >
              <FileDown size={16} />
              {/* <span>Download CV</span> */}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-4 py-1.5 bg-white border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569] shadow-sm">
              Atmospheric Aerosols
            </span>
            <span className="px-4 py-1.5 bg-white border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569] shadow-sm">
              Air Quality
            </span>
            <span className="px-4 py-1.5 bg-white border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569] shadow-sm">
              Environmental Chemistry
            </span>
            <span className="px-4 py-1.5 bg-white border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569] shadow-sm">
              Climate Change
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#e2e8f0] rounded-lg overflow-hidden shadow-sm">
          <div className="bg-white py-8 px-6 text-center">
            <div className="text-3xl font-serif font-bold text-[#0f172a]">25+</div>
            <p className="text-sm text-[#64748b] mt-1">Years of Research</p>
          </div>
          <div className="bg-white py-8 px-6 text-center">
            <div className="text-3xl font-serif font-bold text-[#0f172a]">500+</div>
            <p className="text-sm text-[#64748b] mt-1">Publications</p>
          </div>
          <div className="bg-white py-8 px-6 text-center">
            <div className="text-3xl font-serif font-bold text-[#0f172a]">12K+</div>
            <p className="text-sm text-[#64748b] mt-1">Citations</p>
          </div>
          <div className="bg-white py-8 px-6 text-center">
            <div className="text-3xl font-serif font-bold text-[#0f172a]">PhD</div>
            <p className="text-sm text-[#64748b] mt-1">Univ. of East Anglia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
