import { getGallery } from '@/sanity/lib'
import MediaContent from './MediaContent'

export default async function MediaComponent() {
  const rawGalleryData = await getGallery()

  return <MediaContent items={rawGalleryData} />
}
