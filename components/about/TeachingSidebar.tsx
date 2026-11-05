'use client'

import { useEffect, useState } from 'react'
import { BookOpen, GraduationCap, Mail, MapPin, Users } from 'lucide-react'

interface ContactData {
  email: string
  address: {
    line1: string
    line4: string
  }
}

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
}

interface NavSection {
  id: string
  label: string
  level: 0 | 1 | 2
}

const navSections: NavSection[] = [
  { id: 'taught-courses', label: 'Taught courses', level: 0 },
  { id: 'supervision', label: 'Supervision', level: 0 },
  { id: 'phd', label: 'PhD', level: 1 },
  { id: 'phd-completed-main', label: 'Completed (main supervisor)', level: 2 },
  { id: 'phd-completed-co', label: 'Completed (co-supervisor)', level: 2 },
  { id: 'phd-in-progress', label: 'In progress', level: 2 },
  { id: 'msc', label: 'MSc', level: 1 },
  { id: 'msc-completed-main', label: 'Completed (main supervisor)', level: 2 },
  { id: 'msc-completed-co', label: 'Completed (co-supervisor)', level: 2 },
  { id: 'msc-in-progress', label: 'In progress', level: 2 },
]

export default function TeachingSidebar({
  contact,
  stats,
}: {
  contact: ContactData
  stats: Stat[]
}) {
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
      <div className="space-y-10 lg:sticky lg:top-24">
        <nav aria-label="On this page" className="hidden lg:block">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8]">
            On this page
          </p>
          <div className="space-y-1">
            {navSections.map((section) => {
              const active = activeSection === section.id
              const indent =
                section.level === 0 ? 'pl-4' : section.level === 1 ? 'pl-7' : 'pl-10'
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={active ? 'location' : undefined}
                  className={`block border-l-2 py-1.5 transition-colors ${indent} ${
                    section.level === 2 ? 'text-xs' : 'text-sm'
                  } ${
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

        <div>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#94a3b8]">
            At a glance
          </h2>
          <div className="space-y-3">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded bg-[#f1f5f9] p-1.5 text-[#64748b]">
                  {stat.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#94a3b8]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
