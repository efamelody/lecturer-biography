import 'server-only'
import extraData from '@/content/publications-extra.json'

export interface ConferenceProceeding {
  id: string
  year: number
  authors: string
  title: string
  venue: string
  volume: string
  pages: string
  doi: string | null
  url: string | null
}

export interface BookChapter {
  id: string
  type: 'Book chapter' | 'Book' | 'Guide'
  year: number
  authors: string
  title: string
  titleTranslation?: string
  bookTitle: string
  editors: string
  publisher: string
  pages: string
  doi: string | null
  url: string | null
  language: 'en' | 'ms'
}

interface PublicationsExtra {
  proceedings: ConferenceProceeding[]
  books: BookChapter[]
}

const extra = extraData as PublicationsExtra

export function getConferenceProceedings(): ConferenceProceeding[] {
  return [...extra.proceedings].sort((a, b) => b.year - a.year)
}

export function getBooksAndChapters(): BookChapter[] {
  return [...extra.books].sort((a, b) => b.year - a.year)
}
