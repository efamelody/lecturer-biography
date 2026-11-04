import type { ReactNode } from 'react'

export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl space-y-5 text-[15px] leading-[1.85] text-[#475569]">
      {children}
    </div>
  )
}
