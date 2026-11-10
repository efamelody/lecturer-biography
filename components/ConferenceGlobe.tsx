'use client'

import { Component, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import { X, MapPin, CalendarDays, Globe2, MousePointerClick, Image as ImageIcon } from 'lucide-react'

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
}) as ComponentType<any>

interface GlobeTalk {
  id: string
  conference: string
  presentation: string
  dates: string
  venue: string
  badge?: string
  chip: string
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
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
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
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 shadow backdrop-blur">
        <span className="text-xs text-[#64748b]">3D globe unavailable</span>
        <button
          type="button"
          onClick={onRetry}
          className="text-xs font-semibold text-[#0f766e] transition-colors hover:text-[#115e59]"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

function LocationDetails({
  location,
  photos,
  onClose,
}: {
  location: GlobeLocation
  photos: string[]
  onClose: () => void
}) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-start justify-between gap-4 border-b border-[#f1f5f9] pb-5">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            <MapPin size={13} aria-hidden="true" />
            Conference location
          </p>
          <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">
            {location.name}
          </h3>
          <p className="mt-1 text-sm text-[#64748b]">
            {location.talks.length} {location.talks.length === 1 ? 'presentation' : 'presentations'}
            {photos.length > 0 && ` · ${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`}
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

      {photos.length > 0 && (
        <div className="mt-6">
          <h4 className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
            <ImageIcon size={13} aria-hidden="true" />
            Photos
          </h4>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((file) => {
              const src = `/conference/${location.folder}/${file}`
              return (
                <button
                  key={file}
                  type="button"
                  onClick={() => setLightbox(src)}
                  aria-label={`View photo ${file}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f1f5f9]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${location.name} — ${file}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
          Presentations
        </h4>
        <div className="mt-4 space-y-4">
          {location.talks.map((talk) => (
            <article
              key={talk.id}
              className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 md:p-5"
            >
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
              <h5 className="mt-2 font-serif text-base font-semibold leading-snug text-[#0f172a] md:text-lg">
                {talk.presentation}
              </h5>
              <p className="mt-1 text-sm font-medium text-[#334155]">{talk.conference}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-[#64748b]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} aria-hidden="true" className="text-[#94a3b8]" />
                  {talk.dates}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden="true" className="text-[#94a3b8]" />
                  {talk.venue}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close photo"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X size={22} aria-hidden="true" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt={`${location.name} photo`}
            className="max-h-[90vh] max-w-full rounded-lg"
          />
        </div>
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
  }, [])

  const retryGlobe = () => {
    setReady(false)
    setGlError(false)
    setWebglSupported(supportsWebGL())
  }

  const selectedPhotos = selected ? (photos[selected.folder] ?? []) : []
  const useFallback = glError || webglSupported === false

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="min-w-0">
        <div className="lg:sticky lg:top-24">
          {useFallback ? (
            <FallbackMap
              locations={locations}
              selected={selected}
              onSelect={setSelected}
              onRetry={retryGlobe}
            />
          ) : (
            <div
              ref={containerRef}
              className="relative min-h-[420px] w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-gradient-to-b from-[#f8fafc] to-[#eef2f7]"
            >
              {webglSupported === true && width > 0 && (
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
                    onPointClick={(d: GlobeLocation) => setSelected(d)}
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
                        controls.autoRotate = true
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
                onClick={() => setSelected(loc)}
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
          <LocationDetails
            location={selected}
            photos={selectedPhotos}
            onClose={() => setSelected(null)}
          />
        ) : (
          <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-[#cbd5e1] bg-white/60 p-8">
            <div className="max-w-sm text-center">
              <MousePointerClick size={28} aria-hidden="true" className="mx-auto text-[#94a3b8]" />
              <h3 className="mt-4 font-serif text-lg font-semibold text-[#0f172a]">
                Select a country
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                Click a pin on the globe or choose a country below to see its conference
                presentations and photos.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
