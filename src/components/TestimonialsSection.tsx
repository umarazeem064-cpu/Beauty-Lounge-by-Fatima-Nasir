import { ExternalLink, Star } from 'lucide-react';
import { CLIENT_TESTIMONIALS, SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] theme-surface"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[var(--accent)] mb-3">
              Client Reflections
            </p>
            <h2 className="font-display headline-balance text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.12] text-[var(--text-primary)]">
              Trusted by Multan Brides &amp; Discerning Regulars
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
              Real experiences shared by brides and guests visiting Beauty Lounge by Fatima Nasir in
              Gulgasht Colony—praised for serene rooms, punctual schedules, and effortless glowing
              finishes.
            </p>
          </div>

          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors whitespace-nowrap self-start lg:self-auto"
          >
            <span>View Google Maps Reviews</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CLIENT_TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-7 theme-surface"
            >
              <div>
                {/* 5-Star Rating Row */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 text-[var(--accent)] fill-[var(--accent)]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-muted)] tabular-nums">
                    {review.rating}.0 / 5.0 · {review.date}
                  </span>
                </div>

                <blockquote className="text-[15px] leading-[1.7] text-[var(--text-primary)]">
                  “{review.quote}”
                </blockquote>
              </div>

              {/* Client Portrait (.jpg) & Attribution */}
              <div className="mt-7 flex items-center gap-3.5 border-t border-[var(--border-subtle)] pt-5">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
                  <SalonImage
                    src={review.image}
                    alt={review.alt}
                    fallbackTitle={review.clientName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {review.clientName}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    {review.service} · {review.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
