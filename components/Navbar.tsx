'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const aboutLinks = [
  {
    href: '/about',
    label: 'Profile',
    description: 'Biography, affiliations and research interests',
  },
  {
    href: '/about/career',
    label: 'Career & Recognition',
    description: 'Academic timeline, leadership and awards',
  },
  {
    href: '/about/teaching',
    label: 'Teaching & Education',
    description: 'Courses taught and postgraduate supervision',
  },
];

const researchLinks = [
  {
    href: '/members',
    label: 'Research Team',
    description: 'Meet the researchers and students in the group',
  },
  {
    href: '/research/grants',
    label: 'Research Grants',
    description: 'Research funding led by Prof. Dr. Mohd Talib Latif',
  },
];

const navLinks = [
  { href: '/publications', label: 'Publications' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setAboutOpen(false);
    setMobileAboutOpen(false);
    setResearchOpen(false);
    setMobileResearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
      if (researchRef.current && !researchRef.current.contains(event.target as Node)) {
        setResearchOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAboutOpen(false);
        setResearchOpen(false);
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const aboutActive = pathname === '/about' || pathname.startsWith('/about/');
  const researchActive = pathname === '/members' || pathname.startsWith('/research/');

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#f8fafc]/90 backdrop-blur-md z-50 border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#0f172a] hover:text-[#475569] transition-colors tracking-tight"
          >
            Prof. Dr. Mohd Talib Latif
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-[#64748b] hover:text-[#0f172a] transition-colors"
            >
              Home
            </Link>

            <div ref={aboutRef} className="relative">
              <button
                type="button"
                onClick={() => setAboutOpen((value) => !value)}
                aria-haspopup="true"
                aria-expanded={aboutOpen}
                className={`inline-flex items-center gap-1 text-sm transition-colors ${
                  aboutActive
                    ? 'font-medium text-[#0f172a]'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                About
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {aboutOpen && (
                <div className="absolute left-0 top-full pt-3" role="menu">
                  <div className="w-80 border border-[#e2e8f0] bg-white shadow-xl">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setAboutOpen(false)}
                        className="block border-b border-[#f1f5f9] px-4 py-3 transition-colors last:border-b-0 hover:bg-[#f8fafc]"
                      >
                        <span className="block text-sm font-medium text-[#0f172a]">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-[#64748b]">
                          {link.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div ref={researchRef} className="relative">
              <button
                type="button"
                onClick={() => setResearchOpen((value) => !value)}
                aria-haspopup="true"
                aria-expanded={researchOpen}
                className={`inline-flex items-center gap-1 text-sm transition-colors ${
                  researchActive
                    ? 'font-medium text-[#0f172a]'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Research
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform ${researchOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {researchOpen && (
                <div className="absolute left-0 top-full pt-3" role="menu">
                  <div className="w-80 border border-[#e2e8f0] bg-white shadow-xl">
                    {researchLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setResearchOpen(false)}
                        className="block border-b border-[#f1f5f9] px-4 py-3 transition-colors last:border-b-0 hover:bg-[#f8fafc]"
                      >
                        <span className="block text-sm font-medium text-[#0f172a]">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-[#64748b]">
                          {link.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded hover:bg-[#e2e8f0] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
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
          <div className="md:hidden mt-4 space-y-1">
            <Link
              href="/"
              className="block w-full text-left px-4 py-3 text-sm text-[#64748b] hover:bg-[#f1f5f9] rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setMobileAboutOpen((value) => !value)}
              aria-expanded={mobileAboutOpen}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[#64748b] hover:bg-[#f1f5f9] rounded transition"
            >
              About
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {mobileAboutOpen && (
              <div className="space-y-1 bg-[#f8fafc] py-1">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-8 py-2.5 text-sm text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileResearchOpen((value) => !value)}
              aria-expanded={mobileResearchOpen}
              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-[#f1f5f9] rounded transition ${
                researchActive ? 'font-medium text-[#0f172a]' : 'text-[#64748b]'
              }`}
            >
              Research
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform ${mobileResearchOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {mobileResearchOpen && (
              <div className="space-y-1 bg-[#f8fafc] py-1">
                {researchLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-8 py-2.5 text-sm text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block w-full text-left px-4 py-3 text-sm text-[#64748b] hover:bg-[#f1f5f9] rounded transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
