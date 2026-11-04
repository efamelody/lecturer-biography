import { Facebook, Globe2, Linkedin, Newspaper, type LucideIcon } from 'lucide-react'
import type { NewsPlatform } from '@/lib/news'

export const PLATFORM_ICONS: Record<NewsPlatform, LucideIcon> = {
  linkedin: Linkedin,
  facebook: Facebook,
  external: Newspaper,
  website: Globe2,
}
