import Image from 'next/image'
import { getGallery } from '@/sanity/lib'
import { urlFor } from '@/sanity/lib'

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {gallery.map((item) => (
          <div
            key={item._id}
            className="group bg-white border border-[#e2e8f0] rounded-lg overflow-hidden hover:border-[#94a3b8] hover:shadow-sm transition-all duration-200"
          >
            <div className="aspect-[16/9] bg-[#f1f5f9] relative overflow-hidden">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(600).height(338).url()}
                  alt={item.title || ''}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}
            </div>
            <div className="p-5">
              <h3 className="text-sm font-medium text-[#0f172a] leading-snug mb-1 line-clamp-2">
                {item.title}
              </h3>
              {item.eventDate && (
                <p className="text-xs text-[#64748b]">
                  {new Date(item.eventDate).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
