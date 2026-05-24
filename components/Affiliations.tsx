import * as Icons from 'lucide-react';
import { getContent } from '@/lib/content';

export default async function Affiliations() {
  const affiliationsData = await getContent('affiliations')
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Organizations</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight">
            Affiliations & Collaborations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {affiliationsData.map((affiliation, index) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[affiliation.icon];
            return (
              <div key={index} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-lg flex items-center justify-center flex-shrink-0">
                    {Icon && <Icon size={18} className="text-[#475569]" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#0f172a] font-semibold text-sm mb-0.5">{affiliation.name}</div>
                    <div className="text-xs text-[#64748b] mb-1 leading-relaxed">{affiliation.fullName}</div>
                    <div className="text-xs font-medium text-[#475569]">{affiliation.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
