import { Users, GraduationCap } from 'lucide-react';
import membersData from '@/content/members.json';

export default function GroupMembers() {
  const currentMembers = membersData.filter((member) => member.status === 'member');
  const alumni = membersData.filter((member) => member.status === 'alumni');

  return (
    <main className="pt-20">
      {/* Current Members */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl mb-4 text-gray-900 font-bold">Group Members</h1>
            <p className="text-lg text-gray-600">Current researchers and students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-teal-700">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{member.affiliation}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Alumni Section */}
          <div className="mt-20 pt-16 border-t-2 border-gray-200">
            <div className="mb-12">
              <h2 className="text-4xl mb-4 text-gray-900 font-bold">Alumni</h2>
              <p className="text-lg text-gray-600">Former group members</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {alumni.map((alum) => (
                <div key={alum.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{alum.name}</h3>
                      <p className="text-sm text-gray-600">{alum.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{alum.affiliation}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{alum.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
