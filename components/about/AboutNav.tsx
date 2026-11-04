'use client'

import { useEffect, useState } from 'react'

export interface AboutNavSection {
  id: string
  label: string
}

export default function AboutNav({ sections }: { sections: AboutNavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )

    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="About page sections" className="space-y-1">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(event) => {
            event.preventDefault()
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
            active === section.id
              ? 'border-[#0f172a] font-medium text-[#0f172a]'
              : 'border-transparent text-[#94a3b8] hover:border-[#cbd5e1] hover:text-[#64748b]'
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}
