import { GraduationCap } from 'lucide-react';

const educationData = [
  {
    degree: "Ph.D.",
    year: "2008",
    field: "Atmospheric Chemistry",
    institution: "University of East Anglia, UK",
  },
  {
    degree: "M.Sc.",
    year: "2005",
    field: "Environmental Chemistry (Air Pollution)",
    institution: "Universiti Kebangsaan Malaysia",
  },
  {
    degree: "B.Sc.",
    year: "2003",
    field: "Chemistry",
    institution: "Universiti Kebangsaan Malaysia",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl mb-8 text-[var(--color-foreground)] font-bold">About</h2>

        <div className="space-y-4 text-[var(--color-muted-foreground)] leading-relaxed mb-12">
          <p>
            Prof. Dr. Mohd Talib Latif is a distinguished atmospheric scientist and Professor of
            Atmospheric Chemistry at Universiti Kebangsaan Malaysia (UKM). He earned his PhD from
            the University of East Anglia, United Kingdom, specializing in atmospheric chemistry and
            air pollution studies.
          </p>
          <p>
            Throughout his illustrious career, he has held numerous leadership positions including
            serving as a Lead Author for the Intergovernmental Panel on Climate Change (IPCC),
            President of the Malaysian Association for Aerosol and Air Quality Research (MAAQR),
            and key academic roles at UKM including Dean and Deputy Dean positions.
          </p>
          <p>
            His research has significantly contributed to understanding air quality dynamics,
            atmospheric processes, and environmental sustainability in Southeast Asia. He has
            published extensively in high-impact journals and continues to mentor the next
            generation of environmental scientists.
          </p>
        </div>

        {/* Small Education Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {educationData.map((edu, index) => (
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