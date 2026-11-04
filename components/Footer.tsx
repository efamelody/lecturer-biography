import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#0f172a] py-16 print:hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif text-xl font-bold text-white">Prof. Dr. Mohd Talib Latif</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#94a3b8]">
              Professor of Atmospheric Chemistry and Air Pollution at Universiti Kebangsaan Malaysia.
              Research on atmospheric aerosols, air quality, haze and climate.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/mohd-talib-latif-18915073/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e293b] transition-colors hover:bg-[#334155]"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="text-[#94a3b8]" />
              </a>
              <a
                href="mailto:talib@ukm.edu.my"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e293b] transition-colors hover:bg-[#334155]"
                aria-label="Email"
              >
                <Mail size={16} className="text-[#94a3b8]" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
              Institution
            </h3>
            <div className="space-y-1 text-sm leading-relaxed text-[#cbd5e1]">
              <div>Faculty of Science and Technology</div>
              <div>Universiti Kebangsaan Malaysia</div>
              <div>43600 Bangi, Selangor</div>
              <div>Malaysia</div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
              Profiles
            </h3>
            <div className="space-y-2 text-sm text-[#cbd5e1]">
              <a href="/cv" className="block transition-colors hover:text-white">Curriculum vitae</a>
              <a href="/about/career" className="block transition-colors hover:text-white">Career &amp; Recognition</a>
              <Link href="/research" className="block transition-colors hover:text-white">Research</Link>
              <Link href="/research/group" className="block transition-colors hover:text-white">Research group</Link>
              <Link href="/research/supervision" className="block transition-colors hover:text-white">Supervision</Link>
              <a href="https://orcid.org/0000-0003-2339-3321" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">ORCID</a>
              <a href="https://www.scopus.com/authid/detail.uri?authorId=57218373467" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">Scopus</a>
              <a href="https://scholar.google.com/citations?user=dfDhReYAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">Google Scholar</a>
              <Link href="/publications" className="block transition-colors hover:text-white">Publications</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-[#1e293b] pt-8 text-xs text-[#475569] sm:flex-row">
          <p>&copy; 2026 Prof. Dr. Mohd Talib Latif. All rights reserved.</p>
          <p>Last updated November 2026</p>
        </div>
      </div>
    </footer>
  )
}
