import Link from 'next/link'

type AboutSection = 'profile' | 'career'

const SECTIONS: Array<{ id: AboutSection; label: string; href: string }> = [
  { id: 'profile', label: 'Profile', href: '/about' },
  { id: 'career', label: 'Career & Recognition', href: '/about/career' },
]

export default function AboutSubnav({ active }: { active: AboutSection }) {
  return (
    <div className="border-b border-[#e2e8f0] bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <nav aria-label="About sections" className="-mb-px flex gap-1 overflow-x-auto">
          {SECTIONS.map((section) => {
            const isActive = section.id === active
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 border-b-2 px-4 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-[#0f172a] text-[#0f172a]'
                    : 'border-transparent text-[#64748b] hover:border-[#cbd5e1] hover:text-[#0f172a]'
                }`}
              >
                {section.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
