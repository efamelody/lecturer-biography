import { getGallery } from '@/lib/gallery'
import MediaContent from './MediaContent'

export default async function MediaComponent() {
  try {
    const rawGalleryData = await getGallery()
    return <MediaContent items={rawGalleryData} />
  } catch (error) {
    console.error('[MediaComponent] Failed to load gallery:', error)
    return (
      <div className="py-12 text-center border border-dashed border-[#e2e8f0] rounded-xl bg-[#f8fafc]">
        <p className="text-sm text-[#64748b]">Unable to load media at the moment.</p>
        <p className="text-xs text-[#94a3b8] mt-1">Check /api/health for blob configuration.</p>
      </div>
    )
  }
}
