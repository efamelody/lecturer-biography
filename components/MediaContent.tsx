'use client';

import { useState, useEffect, useCallback } from 'react';
import { Newspaper, Mic, Video, Award, ExternalLink, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const getCategoryIcon = (categoryType: string) => {
  switch (categoryType) {
    case 'news-interview': return <Video size={20} className="text-[#0f172a]" />;
    case 'newspaper': return <Newspaper size={20} className="text-[#0f172a]" />;
    case 'conference': return <Mic size={20} className="text-[#0f172a]" />;
    default: return <Award size={20} className="text-[#0f172a]" />;
  }
};

const getCategoryLabel = (categoryType: string) => {
  switch (categoryType) {
    case 'news-interview': return 'News & TV Interviews';
    case 'newspaper': return 'Newspaper Columns & Op-Eds';
    case 'conference': return 'Conferences & Keynote Addresses';
    default: return 'Media Features & Activities';
  }
};

type GalleryItem = {
  _id: string;
  title: string;
  type: string;
  outlet: string;
  eventDate: string;
  externalUrl?: string;
  description?: string;
  imageUrl?: string;
};

function Lightbox({ items, index, onClose }: { items: GalleryItem[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);

  useEffect(() => { setCurrent(index) }, [index])

  const goPrev = useCallback(() => setCurrent((c) => (c > 0 ? c - 1 : items.length - 1)), [items.length])
  const goNext = useCallback(() => setCurrent((c) => (c < items.length - 1 ? c + 1 : 0)), [items.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, goPrev, goNext]);

  const item = items[current];
  if (!item) return null;
  if (!item.imageUrl) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white z-10" aria-label="Close"><X size={28} /></button>
        <div className="text-white text-center" onClick={(e) => e.stopPropagation()}><p>No image available</p></div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white z-10" aria-label="Close">
        <X size={28} />
      </button>
      {items.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); goPrev() }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full" aria-label="Previous"><ChevronLeft size={24} /></button>
          <button onClick={(e) => { e.stopPropagation(); goNext() }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full" aria-label="Next"><ChevronRight size={24} /></button>
        </>
      )}
      <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-h-[80vh]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>
        <div className="text-white text-center mt-4 max-w-2xl">
          <p className="text-lg font-medium">{item.title}</p>
          {item.description && <p className="text-sm text-white/70 mt-1">{item.description}</p>}
          <p className="text-xs text-white/50 mt-1">{item.outlet} &middot; {new Date(item.eventDate).getFullYear()} {items.length > 1 && `· ${current + 1}/${items.length}`}</p>
        </div>
      </div>
    </div>
  );
}

export default function MediaContent({ items }: { items: GalleryItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['news-interview', 'newspaper', 'conference', 'media-coverage'] as const;

  if (!items || items.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-[#e2e8f0] rounded-xl bg-[#f8fafc]">
        <p className="text-sm text-[#64748b]">No media entries yet.</p>
        <p className="text-xs text-[#94a3b8] mt-1">Add entries from /admin → Media tab.</p>
      </div>
    )
  }

  const knownSet = new Set<string>(categories as unknown as string[])
  const uncategorized = items.filter((item) => !knownSet.has(item.type))

  return (
    <>
      <div className="space-y-24">
        {categories.map((categoryKey) => {
          const filteredItems = items.filter((item) => item.type === categoryKey);
          if (filteredItems.length === 0) return null;

          return (
            <section key={categoryKey}>
              <div className="flex items-center gap-3 border-b border-[#e2e8f0] pb-4 mb-8">
                <div className="w-10 h-10 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl flex items-center justify-center">
                  {getCategoryIcon(categoryKey)}
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#0f172a]">
                  {getCategoryLabel(categoryKey)}
                </h2>
                <span className="text-xs bg-[#f1f5f9] text-[#64748b] px-2 py-0.5 rounded-full font-medium">
                  {filteredItems.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => {
                  const globalIndex = items.findIndex((g) => g._id === item._id);
                  const CardWrapper = item.externalUrl ? 'a' : 'div';
                  const wrapperProps = item.externalUrl
                    ? { href: item.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
                    : {};

                  return (
                    <CardWrapper
                      key={item._id}
                      {...wrapperProps}
                      className={`bg-white border border-[#e2e8f0] rounded-xl overflow-hidden flex flex-col h-full transition-all duration-200 group ${
                        item.externalUrl ? 'hover:border-[#94a3b8] hover:shadow-md cursor-pointer' : ''
                      }`}
                    >
                      <button
                        type="button"
                        disabled={!item.imageUrl}
                        className="relative w-full h-48 bg-[#f8fafc] border-b border-[#e2e8f0] overflow-hidden block text-left cursor-pointer disabled:cursor-default"
                        onClick={(e) => {
                          if (!item.imageUrl) return;
                          e.stopPropagation();
                          e.preventDefault();
                          setLightboxIndex(globalIndex);
                        }}
                        aria-label={item.imageUrl ? `View ${item.title}` : undefined}
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            sizes="(max-width: 700px) 100vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#94a3b8]">
                            No Preview Image
                          </div>
                        )}
                      </button>

                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-xs font-semibold tracking-wide text-[#3b82f6] uppercase">
                              {item.outlet}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-[#64748b]">
                              <Calendar size={12} />
                              <span>{new Date(item.eventDate).getFullYear()}</span>
                            </div>
                          </div>

                          <h3 className="text-base font-serif font-bold text-[#0f172a] leading-snug tracking-tight mb-2 group-hover:text-[#3b82f6] transition-colors">
                            {item.title}
                          </h3>

                          {item.description && (
                            <p className="text-xs text-[#64748b] leading-relaxed line-clamp-3 mb-4">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {item.externalUrl && (
                          <div className="mt-4 pt-4 border-t border-[#f1f5f9] flex items-center gap-1 text-xs font-medium text-[#475569] group-hover:text-[#3b82f6] transition-colors">
                            <span>View original post</span>
                            <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        )}
                      </div>
                    </CardWrapper>
                  );
                })}
              </div>
            </section>
          );
        })}
        {uncategorized.length > 0 && (
          <section>
            <div className="flex items-center gap-3 border-b border-[#e2e8f0] pb-4 mb-8">
              <div className="w-10 h-10 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl flex items-center justify-center">
                <Award size={20} className="text-[#0f172a]" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0f172a]">Other Media</h2>
              <span className="text-xs bg-[#f1f5f9] text-[#64748b] px-2 py-0.5 rounded-full font-medium">{uncategorized.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uncategorized.map((item) => {
                const globalIndex = items.findIndex((g) => g._id === item._id);
                const CardWrapper = item.externalUrl ? 'a' : 'div';
                const wrapperProps = item.externalUrl ? { href: item.externalUrl, target: '_blank', rel: 'noopener noreferrer' } : {};
                return (
                  <CardWrapper key={item._id} {...wrapperProps} className={`bg-white border border-[#e2e8f0] rounded-xl overflow-hidden flex flex-col h-full transition-all duration-200 group ${item.externalUrl ? 'hover:border-[#94a3b8] hover:shadow-md cursor-pointer' : ''}`}>
                    <button type="button" disabled={!item.imageUrl} className="relative w-full h-48 bg-[#f8fafc] border-b border-[#e2e8f0] overflow-hidden block text-left cursor-pointer disabled:cursor-default" onClick={(e) => { if (!item.imageUrl) return; e.stopPropagation(); e.preventDefault(); setLightboxIndex(globalIndex); }} aria-label={item.imageUrl ? `View ${item.title}` : undefined}>
                      {item.imageUrl ? <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" /> : <div className="absolute inset-0 flex items-center justify-center text-[#94a3b8]">No Preview Image</div>}
                    </button>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-semibold tracking-wide text-[#3b82f6] uppercase">{item.outlet}</span>
                          <div className="flex items-center gap-1 text-xs text-[#64748b]"><Calendar size={12} /><span>{new Date(item.eventDate).getFullYear()}</span></div>
                        </div>
                        <h3 className="text-base font-serif font-bold text-[#0f172a] leading-snug tracking-tight mb-2 group-hover:text-[#3b82f6] transition-colors">{item.title}</h3>
                        {item.description && <p className="text-xs text-[#64748b] leading-relaxed line-clamp-3 mb-4">{item.description}</p>}
                      </div>
                      {item.externalUrl && <div className="mt-4 pt-4 border-t border-[#f1f5f9] flex items-center gap-1 text-xs font-medium text-[#475569] group-hover:text-[#3b82f6] transition-colors"><span>View original post</span><ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div>}
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
