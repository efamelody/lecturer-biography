---
name: tailwind-patterns
description: Tailwind CSS conventions and color/typography system for this lecturer biography site
license: MIT
metadata:
  scope: frontend
  framework: nextjs
---

## Brand colors

- Primary gradient: `from-teal-600 to-blue-600` (used in Hero, Navbar, backgrounds)
- Text on dark: `text-teal-100`, `text-teal-50`
- Accent: `text-teal-600`
- Body text: `text-gray-600`
- Headings: `text-gray-900` or white on dark sections
- Border: `border-gray-200` or `border-gray-100`

## Layout patterns

- Section wrapper: `<section className="py-16 bg-white">` (use `bg-gray-50` for alt sections)
- Inner container: `<div className="max-w-7xl mx-auto px-6">`
- Main content: `<div className="max-w-5xl mx-auto px-6">`
- Section heading: `<h2 className="text-3xl font-bold text-gray-900 mb-8">Title</h2>`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`

## Component spacing

- Hero top: `pt-32 pb-20`
- Section top: `py-16`
- Card/row gap: `gap-6` or `gap-8`
- List spacing: `space-y-3` or `space-y-4`

## Typography

- Font: system-ui stack (no custom fonts)
- Hero heading: `text-5xl md:text-6xl font-bold leading-tight`
- Subtitle: `text-xl text-gray-500`
- Body: `text-base` (default) or `text-sm` for secondary
- Small label: `text-sm font-semibold tracking-wider uppercase`

## Images

- Profile picture: `w-56 h-56 rounded-2xl overflow-hidden border-4 border-white shadow-2xl`
- Icons use `lucide-react` (import from `lucide-react`)
- Next.js Image component with `className="object-cover"`

## Content files

- JSON data goes in `content/` directory
- Use `.map()` pattern: `{data.map((item, i) => (<div key={i}>...</div>))}`
