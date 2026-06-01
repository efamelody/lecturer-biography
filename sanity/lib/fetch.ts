import 'server-only'
import { groq } from 'next-sanity'
import { client } from './client'

export const galleryQuery = groq`*[_type == "gallery"] | order(eventDate desc) {
  _id,
  title,
  type,
  outlet,
  eventDate,
  externalUrl,
  description,
  image,
  "imageUrl": image.asset->url
}`

export const memberQuery = groq`*[_type == "member"] | order(order asc, name asc) {
  _id,
  name,
  role,
  status,
  researchTopic,
  biography,
  order
}`

export async function getMembers() {
  const isConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id'

  if (!isConfigured) {
    return []
  }

  try {
    return await client.fetch(memberQuery)
  } catch (error) {
    console.error('Failed to fetch members:', error)
    return []
  }
}

export async function getGallery() {
  const isConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id'

  if (!isConfigured) {
    console.warn('[Sanity] Not configured — skipping gallery fetch')
    return []
  }

  try {
    return await client.fetch(galleryQuery)
  } catch (error) {
    console.error('Failed to fetch gallery:', error)
    return []
  }
}
