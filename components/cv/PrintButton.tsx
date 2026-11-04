'use client'

import { Printer } from 'lucide-react'

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#64748b]"
    >
      <Printer size={15} aria-hidden="true" />
      Print / Save as PDF
    </button>
  )
}
