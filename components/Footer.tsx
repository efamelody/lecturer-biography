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
              <a href="https://www.linkedin.com/in/mohd-talib-latif-18915073/" className="w-9 h-9 bg-[#1e293b] hover:bg-[#334155] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin size={16} className="text-[#94a3b8]" />
              </a>
              <a href="mailto:talib@ukm.edu.my" className="w-9 h-9 bg-[#1e293b] hover:bg-[#334155] rounded-lg flex items-center justify-center transition-colors">
                <Mail size={16} className="text-[#94a3b8]" />
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
