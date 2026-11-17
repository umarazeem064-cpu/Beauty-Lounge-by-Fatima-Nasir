import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/salonData';
import { SalonImage } from './SalonImage';

const GALLERY_FILTERS = [
  'All',
  'Bridal Artistry',
  'Hair Transformations',
  'Skin & Nails',
  'Salon Ambiance',
] as const;

export function GallerySection() {
  const [filter, setFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems: GalleryItem[] =
    filter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const activeItem = lightboxIndex !== null ? visibleItems[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((idx) => (idx === null ? null : (idx + 1) % visibleItems.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((idx) =>
          idx === null ? null : (idx - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, visibleItems.length]);

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] theme-surface"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[var(--accent)] mb-3">
              Editorial Portfolio
            </p>
            <h2 className="font-display headline-balance text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.12] text-[var(--text-primary)]">
              Signature Looks &amp; Salon Sanctuary
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
              Explore bridal transformations, dimensional color work, bespoke skin suites, and our
              quiet-luxury Multan space. Click any photograph to inspect full detail.
            </p>
          </div>

          {/* Interactive Gallery Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap">
            {GALLERY_FILTERS.map((tab) => {
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setFilter(tab);
                    setLightboxIndex(null);
                  }}
                  className={`min-h-[38px] rounded-md border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Editorial Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, idx) => (
            <figure
              key={item.id}
              className="group overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] theme-surface"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`View ${item.title} in fullscreen gallery`}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-[var(--bg-subtle)] cursor-pointer text-left"
              >
                <SalonImage
                  src={item.image}
                  alt={item.alt}
                  fallbackTitle={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-end justify-end p-4"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/55 text-white backdrop-blur-xs">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
              </button>

              <figcaption className="p-5">
                <p className="text-xs font-medium text-[var(--accent)]">{item.category}</p>
                <h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#141210] text-white"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-xs text-[#D4AF6A]">{activeItem.category}</p>
                <h3 className="text-sm sm:text-base font-semibold truncate">{activeItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close gallery lightbox"
                className="flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <SalonImage
                src={activeItem.image}
                alt={activeItem.alt}
                fallbackTitle={activeItem.title}
                className="max-h-[65vh] w-full object-contain"
              />

              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visibleItems.length) % visibleItems.length
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % visibleItems.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4 text-xs sm:text-sm text-[#D6CFC6]">
              <p>{activeItem.caption}</p>
              <span className="shrink-0 tabular-nums text-white/60">
                {lightboxIndex + 1} / {visibleItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
