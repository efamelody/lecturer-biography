import { getGallery } from '@/sanity/lib'
import GalleryClient from './GalleryClient'

export default async function Gallery() {
  const gallery = await getGallery()

  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M4.5 3h15M3 6.75h18" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#0f172a] tracking-tight">Photo Gallery</h2>
      </div>

      <GalleryClient items={gallery} />
    </section>
  )
}
