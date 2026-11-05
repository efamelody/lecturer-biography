'use client'

import { useEffect, useState } from 'react'
import { Mail, MapPin } from 'lucide-react'

interface ContactData {
  email: string
  address: {
    line1: string
    line4: string
  }
}

const sections = [
  { id: 'academic-career', label: 'Academic career' },
  { id: 'administrative', label: 'Administrative roles' },
  { id: 'other-appointments', label: 'Other appointments' },
  { id: 'service', label: 'Professional service' },
  { id: 'awards', label: 'Awards' },
]

export default function CareerSidebar({
  contact,
}: {
  contact: ContactData
}) {
  const [activeSection, setActiveSection] = useState(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <aside className="order-last w-full shrink-0 lg:order-first lg:w-[280px]">
      <div className="space-y-10 lg:sticky lg:top-24">
        <nav aria-label="On this page" className="hidden lg:block">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8]">
            On this page
          </p>
          <div className="space-y-1">
            {sections.map((section) => {
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

        <div className="border-t border-[#e2e8f0] pt-4">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8]">
            Contact
          </h2>
          <div className="space-y-2">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-xs text-[#64748b] transition-colors hover:text-[#0f172a]"
            >
              <Mail size={12} className="shrink-0" aria-hidden="true" />
              <span className="break-all">{contact.email}</span>
            </a>
            <div className="flex items-start gap-2 text-xs text-[#64748b]">
              <MapPin size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {contact.address.line1}
                <br />
                {contact.address.line4}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
