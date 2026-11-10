'use client'

import { useEffect, useState } from 'react'

const navSections = [
  { id: 'international', label: 'International grants' },
  { id: 'national', label: 'National grants' },
  { id: 'internal', label: 'Internal / university grants' },
]

export default function ResearchGrantsSidebar() {
  const [activeSection, setActiveSection] = useState(navSections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    for (const section of navSections) {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <aside className="order-last w-full shrink-0 lg:order-first lg:w-[280px]">
      <div className="lg:sticky lg:top-24">
        <nav aria-label="On this page" className="hidden lg:block">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8]">
            On this page
          </p>
          <div className="space-y-1">
            {navSections.map((section) => {
              const active = activeSection === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={active ? 'location' : undefined}
                  className={`block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                    active
                      ? 'border-[#0f172a] font-medium text-[#0f172a]'
                      : 'border-transparent text-[#94a3b8] hover:border-[#cbd5e1] hover:text-[#64748b]'
                  }`}
                >
                  {section.label}
                </a>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
