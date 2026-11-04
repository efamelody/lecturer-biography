import Link from 'next/link'

type ResearchSection = 'research' | 'projects' | 'group' | 'supervision'

const SECTIONS: Array<{ id: ResearchSection; label: string; href: string }> = [
  { id: 'research', label: 'Research overview', href: '/research' },
  { id: 'projects', label: 'Projects', href: '/research/projects' },
  { id: 'group', label: 'Research Group', href: '/research/group' },
  { id: 'supervision', label: 'Supervision', href: '/research/supervision' },
]

export default function ResearchSubnav({ active }: { active: ResearchSection }) {
  return (
    <div className="border-b border-[#e2e8f0] bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <nav
          aria-label="Research sections"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-xs sm:text-sm"
        >
          {SECTIONS.map((section, index) => {
            const isActive = section.id === active
            return (
              <span key={section.id} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[#cbd5e1]">
                    /
                  </span>
                )}
                <Link
                  href={section.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'font-medium text-[#0f172a]'
                      : 'text-[#64748b] transition-colors hover:text-[#0f172a]'
                  }
                >
                  {section.label}
                </Link>
              </span>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
