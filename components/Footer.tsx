import { Mail, GraduationCap, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="py-16 bg-gradient-to-br from-teal-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl mb-4">Contact</h3>
            <div className="flex items-center gap-3 text-teal-100">
              <Mail size={20} />
              <span>talib@ukm.edu.my</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl mb-4">Institution</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <GraduationCap size={24} className="text-teal-700" />
              </div>
              <div className="text-teal-100">
                <div>Universiti Kebangsaan</div>
                <div>Malaysia (UKM)</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl mb-4">Connect</h3>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-teal-700 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin size={20} />
              </button>
              <button className="w-10 h-10 bg-teal-700 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors">
                <GraduationCap size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-teal-700 pt-8 text-center text-teal-200 text-sm">
          <p>© 2026 Prof. Dr. Mohd Talib Latif. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
