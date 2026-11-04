import Image from 'next/image'

export default function PlaceholderFigure({
  src,
  alt,
  label,
  className = 'aspect-[16/10]',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
}: {
  src: string
  alt: string
  label?: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const isSvg = src.endsWith('.svg')

  return (
    <div className={`relative overflow-hidden bg-[#f1f5f9] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isSvg}
        className="object-cover"
      />
      {label && (
        <span className="absolute bottom-3 left-3 border border-white/30 bg-[#0f172a]/75 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  )
}
