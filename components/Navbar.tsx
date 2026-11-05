'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/research/group', label: 'Research Group' },
  { href: '/publications', label: 'Publications' },
  { href: '/activities', label: 'Activities' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
]

const aboutLinks = [
  { href: '/about', label: 'Profile', description: 'Biography, expertise and qualifications' },
  {
    href: '/about/career',
    label: 'Career & Recognition',
    description: 'Appointments, awards, teaching and service',
  },
]

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href === '/research') return pathname === '/research' || pathname === '/research/projects'
  if (href === '/research/group') {
    return pathname === '/research/group' || pathname === '/research/supervision'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  const aboutActive = pathname === '/about' || pathname.startsWith('/about/')

  useEffect(() => {
    setIsOpen(false)
    setAboutOpen(false)
    setAboutMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAboutOpen(false)
        setAboutMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#e2e8f0] bg-[#f8fafc]/90 backdrop-blur-md print:hidden">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#0f172a] hover:text-[#475569] transition-colors tracking-tight"
          >
            Prof. Dr. Mohd Talib Latif
          </Link>

          <div className="hidden lg:flex gap-3 xl:gap-5 items-center">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActivePath(pathname, link.href) ? 'page' : undefined}
                className={`whitespace-nowrap text-[12px] transition-colors xl:text-[13px] ${
                  isActivePath(pathname, link.href)
                    ? 'font-medium text-[#0f172a]'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div ref={aboutRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={aboutOpen}
                onClick={() => setAboutOpen((value) => !value)}
                className={`inline-flex items-center gap-1 whitespace-nowrap text-[12px] transition-colors xl:text-[13px] ${
                  aboutActive ? 'font-medium text-[#0f172a]' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                About
                <ChevronDown
                  size={12}
                  aria-hidden="true"
                  className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {aboutOpen && (
                <div
                  role="menu"
                  aria-label="About"
                  className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 border border-[#e2e8f0] bg-white py-2 shadow-lg"
                >
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setAboutOpen(false)}
                      aria-current={pathname === link.href ? 'page' : undefined}
                      className={`block px-4 py-3 transition-colors hover:bg-[#f8fafc] ${
                        pathname === link.href ? 'bg-[#f8fafc]' : ''
                      }`}
                    >
                      <span className="block text-sm font-medium text-[#0f172a]">{link.label}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-[#64748b]">
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActivePath(pathname, link.href) ? 'page' : undefined}
                className={`whitespace-nowrap text-[12px] transition-colors xl:text-[13px] ${
                  isActivePath(pathname, link.href)
                    ? 'font-medium text-[#0f172a]'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="lg:hidden p-2 rounded hover:bg-[#e2e8f0] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="lg:hidden mt-4 space-y-1">
            <Link
              href="/"
              className="block w-full text-left px-4 py-3 text-sm text-[#64748b] hover:bg-[#f1f5f9] rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setAboutMobileOpen((value) => !value)}
                aria-expanded={aboutMobileOpen}
                className={`flex w-full items-center justify-between rounded px-4 py-3 text-left text-sm transition ${
                  aboutActive ? 'font-medium text-[#0f172a]' : 'text-[#64748b] hover:bg-[#f1f5f9]'
                }`}
              >
                About
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform ${aboutMobileOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {aboutMobileOpen && (
                <div className="ml-3 border-l border-[#e2e8f0] pl-3">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded px-4 py-3 text-sm transition ${
                        pathname === link.href
                          ? 'font-medium text-[#0f172a]'
                          : 'text-[#64748b] hover:bg-[#f1f5f9]'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block w-full text-left px-4 py-3 text-sm rounded transition ${
                  isActivePath(pathname, link.href)
                    ? 'font-medium text-[#0f172a]'
                    : 'text-[#64748b] hover:bg-[#f1f5f9]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
