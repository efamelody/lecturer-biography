import { getGallery } from '@/lib/gallery'
import MediaContent from './MediaContent'

export default async function MediaComponent() {
  const rawGalleryData = await getGallery()

  return <MediaContent items={rawGalleryData} />
}
