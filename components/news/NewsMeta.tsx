import { formatNewsDate, getNewsPlatformLabel, type NewsItem } from '@/lib/news'
import { PLATFORM_ICONS } from './platform-icons'

export default function NewsMeta({
  item,
  compact = false,
}: {
  item: NewsItem
  compact?: boolean
}) {
  const Icon = PLATFORM_ICONS[item.platform]

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.12em]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#3b82f6]">
          <Icon size={11} aria-hidden="true" />
          {item.source}
          {compact && <span className="sr-only"> on {getNewsPlatformLabel(item.platform)}</span>}
        </span>
        {item.category !== item.source && (
          <>
            <span aria-hidden="true" className="text-[#cbd5e1]">
              &middot;
            </span>
            <span className="text-[#64748b]">{item.category}</span>
          </>
        )}
        {!compact && (
          <>
            <span aria-hidden="true" className="text-[#cbd5e1]">
              &middot;
            </span>
            <span className="text-[#64748b]">{getNewsPlatformLabel(item.platform)}</span>
          </>
        )}
        <span aria-hidden="true" className="text-[#cbd5e1]">
          &middot;
        </span>
        <time dateTime={item.date} className="text-[#94a3b8]">
          {formatNewsDate(item)}
        </time>
      </div>

      {item.accountLabel && (
        <p className="mt-1 text-[11px] text-[#94a3b8]">via {item.accountLabel}</p>
      )}
    </div>
  )
}
