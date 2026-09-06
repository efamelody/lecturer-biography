import Image from 'next/image';
import { Users, GraduationCap, BookOpen, FileText } from 'lucide-react';
import { getGroupMembers } from '@/lib/content';

export default async function GroupMembers() {
  const membersData = await getGroupMembers();

  const currentMembers = membersData.filter((member) => member.status === 'member');
  const alumni = membersData.filter((member) => member.status === 'alumni');

  return (
    <main className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="max-w-3xl mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Team</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">
              Group Members
            </h1>
            <p className="text-[#64748b]">Current researchers and students in the atmospheric chemistry research group</p>
          </div>

          {currentMembers.length === 0 ? (
            <p className="text-sm text-[#94a3b8] text-center py-8 mb-20 border border-dashed border-[#e2e8f0] rounded-lg">No current members yet.</p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {currentMembers.map((member) => (
              <div key={member._id} className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
                <div>
                    <div className="flex items-start gap-4 mb-4">
                    {member.imageUrl ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#e2e8f0]">
                        <Image src={member.imageUrl} alt={member.name} width={48} height={48} className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={20} className="text-[#0f172a]" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#0f172a]">{member.name}</h3>
                      <p className="text-xs text-[#64748b] font-medium">{member.role}</p>
                    </div>
                  </div>

                  {member.researchTopic && (
                    <div className="mt-4 pt-4 border-t border-[#f1f5f9]">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#475569] flex items-center gap-1.5 mb-1.5">
                        <BookOpen size={13} /> Research Focus
                      </h4>
                      <p className="text-sm text-[#334155] leading-relaxed line-clamp-4">{member.researchTopic}</p>
                    </div>
                  )}

                  {member.biography && (
                    <div className="mt-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#475569] flex items-center gap-1.5 mb-1.5">
                        <FileText size={13} /> Brief Bio
                      </h4>
                      <p className="text-xs text-[#64748b] leading-relaxed">{member.biography}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          )}

          <div className="pt-16 border-t border-[#e2e8f0]">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl font-serif font-bold text-[#0f172a] tracking-tight mb-2">Alumni</h2>
              <p className="text-[#64748b]">Former postgraduate students who completed their research under his supervision</p>
            </div>

            {alumni.length === 0 ? (
              <p className="text-sm text-[#94a3b8] text-center py-6">No alumni records yet.</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((alum) => (
                <div key={alum._id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start gap-4 mb-3">
                    {alum.imageUrl ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#e2e8f0]">
                        <Image src={alum.imageUrl} alt={alum.name} width={48} height={48} className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users size={20} className="text-[#94a3b8]" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#0f172a]">{alum.name}</h3>
                      <p className="text-xs text-[#64748b]">{alum.role}</p>
                    </div>
                  </div>
                  {alum.researchTopic && (
                    <p className="text-xs text-[#64748b] italic mt-2 line-clamp-2">
                      Project: {alum.researchTopic}
                    </p>
                  )}
                </div>
              ))}
            </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
