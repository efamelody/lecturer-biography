import { Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 bg-[#0f172a] border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-4">Contact</h3>
            <div className="flex items-center gap-3 text-[#cbd5e1] text-sm">
              <Mail size={16} className="text-[#64748b]" />
              <span>talib@ukm.edu.my</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-4">Institution</h3>
            <div className="text-[#cbd5e1] text-sm leading-relaxed">
              <div>Faculty of Science and Technology</div>
              <div>Universiti Kebangsaan Malaysia</div>
              <div>43600 Bangi, Selangor</div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-[#1e293b] hover:bg-[#334155] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin size={16} className="text-[#94a3b8]" />
              </a>
              <a href="#" className="w-9 h-9 bg-[#1e293b] hover:bg-[#334155] rounded-lg flex items-center justify-center transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1e293b] pt-8 text-center text-[#475569] text-xs">
          <p>&copy; 2026 Prof. Dr. Mohd Talib Latif. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
