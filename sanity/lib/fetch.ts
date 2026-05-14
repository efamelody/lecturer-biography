import 'server-only'
import { groq } from 'next-sanity'
import { client } from './client'

export const galleryQuery = groq`*[_type == "gallery"] | order(eventDate desc) {
  _id,
  title,
  eventDate,
  image
}`

export async function getGallery() {
  const isConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id'

  if (!isConfigured) {
    return []
  }

  try {
    return await client.fetch(galleryQuery)
  } catch (error) {
    console.error('Failed to fetch gallery:', error)
    return []
  }
}
