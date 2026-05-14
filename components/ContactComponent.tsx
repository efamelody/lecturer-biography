import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">Contact Information</h1>
            <p className="text-[#64748b]">Reach out to Prof. Dr. Mohd Talib Latif for research collaborations, academic inquiries, or consultation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center mb-4">
                <Mail size={20} className="text-[#475569]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#0f172a] mb-1">Email</h3>
              <a href="mailto:mtlatif@ukm.edu.my" className="text-sm text-[#475569] hover:text-[#0f172a] transition-colors">
                mtlatif@ukm.edu.my
              </a>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center mb-4">
                <Phone size={20} className="text-[#475569]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#0f172a] mb-1">Phone</h3>
              <a href="tel:+60389216450" className="text-sm text-[#475569] hover:text-[#0f172a] transition-colors">
                +603-8921-6450
              </a>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center mb-4">
                <MapPin size={20} className="text-[#475569]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#0f172a] mb-1">Office Location</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">
                Department of Chemistry<br />
                Faculty of Science<br />
                Universiti Kebangsaan Malaysia<br />
                43600 Bangi, Selangor<br />
                Malaysia
              </p>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center mb-4">
                <Globe size={20} className="text-[#475569]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#0f172a] mb-1">Online Profiles</h3>
              <div className="space-y-1">
                <a href="https://ukm.edu.my" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#475569] hover:text-[#0f172a] transition-colors">
                  UKM Official Site
                </a>
                <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#475569] hover:text-[#0f172a] transition-colors">
                  ResearchGate Profile
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
            <h3 className="text-base font-serif font-bold text-[#0f172a] mb-3">Office Hours</h3>
            <p className="text-sm text-[#64748b] leading-relaxed mb-3">
              Prof. Dr. Mohd Talib Latif is generally available for meetings by appointment. For inquiries regarding research collaborations, academic matters, or consultation, please reach out via email or phone to schedule a meeting.
            </p>
            <p className="text-xs text-[#94a3b8]">
              <strong>Note:</strong> For urgent matters, it is recommended to contact via email with a clear subject line.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
