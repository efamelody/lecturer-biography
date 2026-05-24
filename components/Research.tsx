import * as Icons from 'lucide-react';
import { getContent } from '@/lib/content';

export default async function Research() {
  const researchData = await getContent('research')
  return (
    <section id="research" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Research Focus</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight">
            Research Interests
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchData.map((interest, index) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[interest.icon];
            return (
              <div key={index} className="group bg-white rounded-lg border border-[#e2e8f0] p-6 hover:border-[#94a3b8] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#f1f5f9] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#e2e8f0] transition-colors">
                  {Icon && <Icon size={24} className="text-[#475569]" />}
                </div>
                <h3 className="text-lg font-serif font-bold text-[#0f172a] mb-3">{interest.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{interest.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
