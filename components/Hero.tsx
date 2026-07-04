import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import { getAuthorProfile, formatCitationCount } from '@/lib/academic';
import { getContent } from '@/lib/content';

export default async function Hero() {
  const profile = await getAuthorProfile();
  const profileData = await getContent('profile')

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
                src={profileData.image}
                alt={profileData.name}
                width={192}
                height={192}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b]">
                {profileData.title}
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0f172a] tracking-tight leading-tight">
                {profileData.name}
              </h1>
            </div>
            <p className="text-xl text-[#64748b] font-light max-w-2xl mx-auto leading-relaxed">
              {profileData.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-[#475569]">
              {profileData.roles.map((role, i) => (
                <span key={i}>
                  {i === 0 ? (
                    <span className="text-[#0f172a] font-semibold">{role}</span>
                  ) : (
                    <span>{role}</span>
                  )}
                  {i < profileData.roles.length - 1 && (
                    <span className="hidden sm:inline text-[#cbd5e1] ml-8">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-[#e2e8f0] w-full max-w-lg">
            <a href={`mailto:${profileData.email}`} className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a] transition-colors text-sm">
              <Mail size={16} />
              <span>{profileData.email}</span>
            </a>
            <div className="flex items-center gap-2 text-[#64748b] text-sm">
              <MapPin size={16} />
              <span>{profileData.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {profileData.tags.map((tag, i) => (
              <span key={i} className="px-4 py-1.5 bg-white border border-[#e2e8f0] rounded-full text-xs font-medium text-[#475569] shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Ribbon — combined sources (Scopus count, OpenAlex citations/h-index) */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#e2e8f0] rounded-lg overflow-hidden shadow-sm">
          <div className="bg-white py-8 px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#94a3b8] font-bold mb-1">Citations</p>
            <div className="text-3xl font-serif font-bold text-[#0f172a]">
              {formatCitationCount(profile.citedByCount)}<span className="text-[#475569]">+</span>
            </div>
          </div>
          <div className="bg-white py-8 px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#94a3b8] font-bold mb-1">h-index</p>
            <div className="text-3xl font-serif font-bold text-[#0f172a]">{profile.hIndex}</div>
          </div>
          <div className="bg-white py-8 px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#94a3b8] font-bold mb-1">Publications</p>
            <div className="text-3xl font-serif font-bold text-[#0f172a]">{profile.worksCount}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
