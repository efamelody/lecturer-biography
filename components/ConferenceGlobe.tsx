'use client'

import {
  Component,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { ComponentType } from 'react'
import {
  X,
  MapPin,
  Globe2,
  MousePointerClick,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
} from 'lucide-react'

const GlobeLazy = () => import('react-globe.gl').then((mod) => mod.default)

interface GlobeTalk {
  id: string
  conference: string
  presentation: string
  dates: string
  venue: string
  badge?: string
  chip: string
  links?: { label: string; url: string }[]
}

interface GlobeLocation {
  key: string
  name: string
  folder: string
  lat: number
  lng: number
  talks: GlobeTalk[]
}

interface ConferenceGlobeProps {
  locations: GlobeLocation[]
  photos: Record<string, string[]>
}

function supportsWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

class GlobeErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function FallbackMap({
  locations,
  selected,
  onSelect,
  onRetry,
}: {
  locations: GlobeLocation[]
  selected: GlobeLocation | null
  onSelect: (location: GlobeLocation) => void
  onRetry: () => void
}) {
  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#eef2f7]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/globe/earth-blue-marble.jpg"
        alt="World map of conference locations"
        className="h-full w-full object-cover"
      />
      {locations.map((loc) => {
        const x = ((loc.lng + 180) / 360) * 100
        const y = ((90 - loc.lat) / 180) * 100
        const active = selected?.key === loc.key
        return (
          <button
            key={loc.key}
            type="button"
            onClick={() => onSelect(loc)}
            aria-label={`Show ${loc.name} conferences`}
            aria-pressed={active}
            className="group absolute -translate-x-1/2 -translate-y-1/2 p-1"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="relative block h-4 w-4">
              <span className="absolute inset-0 animate-ping rounded-full bg-teal-500/50" />
              <span
                className={`relative block h-4 w-4 rounded-full border-2 border-white shadow transition-transform group-hover:scale-125 ${
                  active ? 'bg-[#0f766e]' : 'bg-teal-600'
                }`}
              />
            </span>
            <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-white/95 px-1.5 py-0.5 text-[10px] font-semibold text-[#0f172a] shadow opacity-0 transition-opacity group-hover:opacity-100">
              {loc.name}
            </span>
          </button>
        )
      })}
      <div className="absolute bottom-3 left-3">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-medium text-[#334155] shadow backdrop-blur transition-colors hover:bg-white hover:text-[#0f172a]"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: string[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}) {
  const go = (delta: number) => {
    onNavigate((index + delta + photos.length) % photos.length)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${index + 1} of ${photos.length} photos`}
    >
      <button
        type="button"
        aria-label="Close photo"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        onClick={onClose}
      >
        <X size={22} aria-hidden="true" />
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
          >
            <ChevronRight size={26} aria-hidden="true" />
          </button>
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photos[index]}
        alt={`Conference photo ${index + 1}`}
        className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
        {index + 1} / {photos.length}
      </p>
    </div>
  )
}

function PhotoCollage({
  photos,
  onOpen,
}: {
  photos: string[]
  onOpen: (index: number) => void
}) {
  const shown = photos.slice(0, 3)
  const extra = photos.length - shown.length

  const tile =
    'group relative overflow-hidden bg-[#e2e8f0] transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2'

  return (
    <div className="relative grid aspect-[4/3] w-full grid-cols-2 grid-rows-2 overflow-hidden sm:aspect-[16/9]">
      {shown.map((photo, index) => {
        const layout =
          shown.length === 1
            ? 'col-span-2 row-span-2'
            : shown.length === 2
              ? 'row-span-2'
              : index === 0
                ? 'row-span-2'
                : ''
        return (
          <button
            key={photo}
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`View conference photo ${index + 1}`}
            className={`${tile} ${layout}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={`Conference in — photo ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        )
      })}
      {extra > 0 && (
        <button
          type="button"
          onClick={() => onOpen(shown.length - 1)}
          aria-label={`View ${extra} more photos`}
          className={`${tile} absolute bottom-0 right-0 flex h-1/2 w-1/2 items-center justify-center bg-[#0f172a]/70`}
        >
          <span className="flex items-center gap-1.5 text-2xl font-semibold text-white">
            <Plus size={20} aria-hidden="true" />
            {extra}
          </span>
        </button>
      )}
    </div>
  )
}

function TalkEntry({ talk }: { talk: GlobeTalk }) {
  return (
    <article className="py-4 first:pt-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="border border-[#cbd5e1] bg-white px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0f172a]">
          {talk.chip}
        </span>
        {talk.badge && (
          <span className="rounded-sm bg-[#f0fdfa] px-2 py-0.5 text-[11px] font-semibold text-[#0f766e]">
            {talk.badge}
          </span>
        )}
      </div>
      <h5 className="mt-2 font-serif text-base font-semibold leading-snug text-[#0f172a]">
        {talk.presentation}
      </h5>
      <p className="mt-1 text-sm font-medium text-[#334155]">{talk.conference}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748b]">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={13} aria-hidden="true" className="text-[#94a3b8]" />
          {talk.dates}
        </span>
        <span className="inline-flex items-start gap-1.5">
          <MapPin size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-[#94a3b8]" />
          {talk.venue}
        </span>
      </div>
      {talk.links && talk.links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {talk.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f766e] transition-colors hover:text-[#115e59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
            >
              {link.label}
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

function LocationPost({
  location,
  photos,
  onClose,
}: {
  location: GlobeLocation
  photos: string[]
  onClose: () => void
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [photoSrcs] = useState<string[]>(() =>
    photos.map((file) => `/conference/${location.folder}/${file}`),
  )

  const talks = location.talks

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 md:px-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-blue-600 text-white shadow-sm">
          <Globe2 size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-lg font-bold leading-tight text-[#0f172a]">
            {location.name}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-[#64748b]">
            <MapPin size={12} aria-hidden="true" className="text-[#0f766e]" />
            {location.talks[0]?.venue ?? 'Conference presentations'}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close location details"
          className="rounded-md p-2 text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      {photoSrcs.length > 0 && (
        <PhotoCollage
          photos={photoSrcs}
          onOpen={(index) => setLightboxIndex(index)}
        />
      )}

      <div className="px-5 py-4 md:px-6">
        <div className="border-b border-[#f1f5f9] pb-4">
          {talks.map((talk) => (
            <TalkEntry key={talk.id} talk={talk} />
          ))}
        </div>
        <p className="pt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
          Conference travels · {location.name}
        </p>
      </div>

      {lightboxIndex !== null && photoSrcs.length > 0 && (
        <PhotoLightbox
          photos={photoSrcs}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}

export default function ConferenceGlobe({ locations, photos }: ConferenceGlobeProps) {
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [ready, setReady] = useState(false)
  const [selected, setSelected] = useState<GlobeLocation | null>(null)
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [glError, setGlError] = useState(false)
  const [Globe, setGlobe] = useState<ComponentType<any> | null>(null)

  const height = Math.max(360, Math.min(560, Math.round(width * 0.85)))

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setWidth(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    setWebglSupported(supportsWebGL())
    let cancelled = false
    GlobeLazy()
      .then((Comp) => {
        if (!cancelled) setGlobe(() => Comp)
      })
      .catch(() => {
        if (!cancelled) setGlError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (selected && ready) {
      globeRef.current?.pointOfView(
        { lat: selected.lat * 0.6, lng: selected.lng, altitude: 1.9 },
        900,
      )
    }
  }, [selected, ready])

  const retryGlobe = () => {
    setReady(false)
    setGlError(false)
    setWebglSupported(supportsWebGL())
    GlobeLazy()
      .then((Comp) => setGlobe(() => Comp))
      .catch(() => setGlError(true))
  }

  const selectedPhotos = selected ? photos[selected.folder] || [] : []
  const useFallback = glError || webglSupported === false

  const handleSelect = (loc: GlobeLocation) => {
    setSelected(loc)
    if (!useFallback) {
      try {
        const controls = globeRef.current?.controls?.()
        if (controls) controls.autoRotate = false
      } catch {}
    }
  }

  const deselect = () => {
    setSelected(null)
    try {
      const controls = globeRef.current?.controls?.()
      if (controls) controls.autoRotate = true
    } catch {}
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="min-w-0">
        <div className="lg:sticky lg:top-24">
          {useFallback ? (
            <FallbackMap
              locations={locations}
              selected={selected}
              onSelect={handleSelect}
              onRetry={retryGlobe}
            />
          ) : (
            <div
              ref={containerRef}
              className="relative min-h-[420px] w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-gradient-to-b from-[#f8fafc] to-[#eef2f7]"
            >
              {webglSupported === true && Globe && width > 0 && (
                <GlobeErrorBoundary onError={() => setGlError(true)}>
                  <Globe
                    ref={globeRef}
                    width={width}
                    height={height}
                    globeImageUrl="/globe/earth-blue-marble.jpg"
                    backgroundColor="rgba(0,0,0,0)"
                    showAtmosphere
                    atmosphereColor="#0f766e"
                    atmosphereAltitude={0.2}
                    pointsData={locations}
                    pointLat={(d: GlobeLocation) => d.lat}
                    pointLng={(d: GlobeLocation) => d.lng}
                    pointColor={() => '#14b8a6'}
                    pointAltitude={0.04}
                    pointRadius={0.7}
                    pointResolution={16}
                    onPointClick={(d: GlobeLocation) => handleSelect(d)}
                    onPointHover={(d: GlobeLocation | null) => {
                      if (containerRef.current) {
                        containerRef.current.style.cursor = d ? 'pointer' : 'grab'
                      }
                    }}
                    ringsData={locations}
                    ringLat={(d: GlobeLocation) => d.lat}
                    ringLng={(d: GlobeLocation) => d.lng}
                    ringColor={() => (t: number) => `rgba(13, 148, 136, ${1 - t})`}
                    ringMaxRadius={3.2}
                    ringPropagationSpeed={1.1}
                    ringRepeatPeriod={1300}
                    ringAltitude={0.01}
                    labelsData={locations}
                    labelLat={(d: GlobeLocation) => d.lat}
                    labelLng={(d: GlobeLocation) => d.lng}
                    labelText={(d: GlobeLocation) => d.name}
                    labelSize={0.55}
                    labelDotRadius={0.3}
                    labelColor={() => '#0f172a'}
                    labelAltitude={0.02}
                    labelResolution={2}
                    onGlobeReady={() => {
                      const controls = globeRef.current?.controls()
                      if (controls) {
                        controls.autoRotate = !selected
                        controls.autoRotateSpeed = 0.45
                      }
                      setReady(true)
                    }}
                  />
                </GlobeErrorBoundary>
              )}

              <div
                aria-hidden={ready}
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] transition-opacity duration-500 ${
                  ready ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              >
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border-[3px] border-[#e2e8f0]" />
                  <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#0f766e]" />
                  <Globe2 className="h-6 w-6 text-[#0f766e]" />
                </div>
                <p className="text-sm font-medium text-[#64748b]">
                  Gathering conference locations…
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc.key}
                type="button"
                onClick={() => (selected?.key === loc.key ? deselect() : handleSelect(loc))}
                aria-pressed={selected?.key === loc.key}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selected?.key === loc.key
                    ? 'border-[#0f766e] bg-[#0f766e] text-white'
                    : 'border-[#cbd5e1] bg-white text-[#334155] hover:border-[#0f766e] hover:text-[#0f766e]'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0">
        {selected ? (
          <LocationPost
            key={selected.key}
            location={selected}
            photos={selectedPhotos}
            onClose={deselect}
          />
        ) : (
          <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-[#cbd5e1] bg-white/60 p-8">
            <div className="max-w-sm text-center">
              <MousePointerClick size={28} aria-hidden="true" className="mx-auto text-[#94a3b8]" />
              <h3 className="mt-4 font-serif text-lg font-semibold text-[#0f172a]">
                Select a location
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                Click a pin on the globe or choose a country to open a field report of the
                presentations and photos from there.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
