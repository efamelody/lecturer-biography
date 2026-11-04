import type { NewsItem } from '@/lib/news'
import NewsCard from './NewsCard'

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="h-full">
          <NewsCard item={item} />
        </li>
      ))}
    </ul>
  )
}
