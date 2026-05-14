import { Users, GraduationCap } from 'lucide-react';
import membersData from '@/content/members.json';

export default function GroupMembers() {
  const currentMembers = membersData.filter((member) => member.status === 'member');
  const alumni = membersData.filter((member) => member.status === 'alumni');

  return (
    <main className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Team</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">Group Members</h1>
            <p className="text-[#64748b]">Current researchers and students in the atmospheric chemistry research group</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {currentMembers.map((member) => (
              <div key={member.id} className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-[#475569]" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#0f172a]">{member.name}</h3>
                    <p className="text-xs font-medium text-[#64748b]">{member.role}</p>
                  </div>
                </div>
                <p className="text-xs text-[#64748b] mb-3">{member.affiliation}</p>
                <p className="text-sm text-[#475569] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="pt-16 border-t border-[#e2e8f0]">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl font-serif font-bold text-[#0f172a] tracking-tight mb-2">Alumni</h2>
              <p className="text-[#64748b]">Former group members and their current positions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((alum) => (
                <div key={alum.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={20} className="text-[#94a3b8]" />
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#0f172a]">{alum.name}</h3>
                      <p className="text-xs text-[#64748b]">{alum.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748b] mb-3">{alum.affiliation}</p>
                  <p className="text-sm text-[#475569] leading-relaxed">{alum.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
