import { GraduationCap } from 'lucide-react';
import { getContent } from '@/lib/content';

export default async function About() {
  const profileData = await getContent('profile')
  return (
    <section id="about" className="py-20 bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl mb-8 text-[var(--color-foreground)] font-bold">About</h2>

        <div className="space-y-4 text-[var(--color-muted-foreground)] leading-relaxed mb-12">
          {profileData.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {profileData.education.map((edu, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-[var(--card)] rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <GraduationCap size={20} className="text-[var(--color-primary)]" />
              <div className="text-[var(--color-foreground)] text-sm">
                <p className="font-semibold">{edu.degree} ({edu.year})</p>
                <p className="text-[var(--color-muted-foreground)]">{edu.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}