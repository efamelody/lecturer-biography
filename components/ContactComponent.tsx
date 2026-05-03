import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-5xl mb-4 text-gray-900 font-bold">Contact Information</h1>
            <p className="text-lg text-gray-600">Get in touch with Prof. Dr. Mohd Talib Latif</p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Email */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:mtlatif@ukm.edu.my" className="text-lg text-teal-700 hover:text-teal-800 break-all">
                mtlatif@ukm.edu.my
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+60389216450" className="text-lg text-teal-700 hover:text-teal-800">
                +603-8921-6450
              </a>
            </div>

            {/* Office Location */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <MapPin size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Office Location</h3>
              <p className="text-lg text-gray-700">
                Department of Chemistry<br />
                Faculty of Science<br />
                Universiti Kebangsaan Malaysia<br />
                43600 Bangi, Selangor<br />
                Malaysia
              </p>
            </div>

            {/* Web */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Globe size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Website</h3>
              <div className="space-y-2">
                <a href="https://ukm.edu.my" target="_blank" rel="noopener noreferrer" className="text-lg text-teal-700 hover:text-teal-800 block">
                  UKM Official Site
                </a>
                <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer" className="text-lg text-teal-700 hover:text-teal-800 block">
                  ResearchGate Profile
                </a>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-8 border border-teal-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Office Hours</h3>
            <p className="text-gray-700 mb-4">
              Prof. Dr. Mohd Talib Latif is generally available for meetings by appointment. 
              For inquiries regarding research collaborations, academic matters, or consultation, 
              please reach out via email or phone to schedule a meeting.
            </p>
            <p className="text-gray-600">
              <strong>Note:</strong> For urgent matters, it is recommended to contact via email with a clear subject line.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
