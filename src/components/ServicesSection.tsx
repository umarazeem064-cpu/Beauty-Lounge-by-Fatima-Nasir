import { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import {
  CurrencyCode,
  formatServicePrice,
  SALON_SERVICES,
  SalonService,
  SERVICE_CATEGORIES,
} from '../data/salonData';

interface ServicesSectionProps {
  currency: CurrencyCode;
  onChangeCurrency: (code: CurrencyCode) => void;
  onBookService: (service: SalonService) => void;
}

const CURRENCIES: CurrencyCode[] = ['PKR', 'USD', 'GBP'];

export function ServicesSection({
  currency,
  onChangeCurrency,
  onBookService,
}: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const visibleCategories =
    activeCategory === 'All'
      ? [...SERVICE_CATEGORIES]
      : SERVICE_CATEGORIES.filter((cat) => cat === activeCategory);

  return (
    <section
      id="services"
      className="py-20 lg:py-28 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] theme-surface"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header + Currency Selector */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[var(--accent)] mb-3">
              Services &amp; Transparent Pricing
            </p>
            <h2 className="font-display headline-balance text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.12] text-[var(--text-primary)]">
              Curated Beauty, Hair &amp; Clinical Skincare Menu
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
              Every appointment includes a personal consultation and authentic international
              products. Select any treatment below to reserve your exact time slot online.
            </p>
          </div>

          {/* Interactive Currency Switcher (PKR / USD / GBP) */}
          <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
            <span className="text-xs text-[var(--text-muted)]">Display Currency</span>
            <div
              role="group"
              aria-label="Select pricing currency"
              className="inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1"
            >
              {CURRENCIES.map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onChangeCurrency(code)}
                    className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                      active
                        ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Controls */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`min-h-[40px] rounded-md border px-4 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeCategory === 'All'
                ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Categories ({SALON_SERVICES.length})
          </button>

          {SERVICE_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            const count = SALON_SERVICES.filter((s) => s.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-[40px] rounded-md border px-4 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Categorized Service Lists */}
        <div className="mt-12 space-y-14">
          {visibleCategories.map((category, categoryIdx) => {
            const items = SALON_SERVICES.filter((s) => s.category === category);
            const categoryNum = String(
              SERVICE_CATEGORIES.indexOf(category) + 1
            ).padStart(2, '0');

            return (
              <div key={category} className="scroll-mt-28">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border-strong)] pb-3 mb-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]">
                    <span className="text-[var(--accent)] font-sans text-sm font-semibold mr-2.5 tabular-nums">
                      {categoryNum}.
                    </span>
                    {category}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] tabular-nums">
                    {items.length} Signature Treatments
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {items.map((service) => (
                    <article
                      key={service.id}
                      className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 transition-transform duration-200 hover:-translate-y-0.5 theme-surface"
                    >
                      <div>
                        {/* Quiet Unboxed Metadata Line */}
                        <div className="flex items-center justify-between gap-4 text-xs text-[var(--text-muted)] mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="inline-flex items-center gap-1 whitespace-nowrap tabular-nums">
                              <Clock className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                              {service.duration}
                            </span>
                            {service.featuredNote && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-medium text-[var(--accent)] truncate">
                                  {service.featuredNote}
                                </span>
                              </>
                            )}
                          </div>
                          <span className="text-base font-semibold text-[var(--text-primary)] whitespace-nowrap tabular-nums">
                            {formatServicePrice(service.pricePKR, currency)}
                          </span>
                        </div>

                        <h4 className="text-lg font-semibold text-[var(--text-primary)] leading-snug">
                          {service.name}
                        </h4>

                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                        <span className="text-xs text-[var(--text-muted)] tabular-nums">
                          {currency === 'PKR'
                            ? `Approx. ${formatServicePrice(service.pricePKR, 'USD')} · ${formatServicePrice(service.pricePKR, 'GBP')}`
                            : `Base rate: ${formatServicePrice(service.pricePKR, 'PKR')}`}
                        </span>

                        <button
                          type="button"
                          onClick={() => onBookService(service)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--accent)] bg-transparent px-4 py-2 text-xs font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>Book This</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {categoryIdx === 0 && (
                  <p className="mt-5 text-xs text-[var(--text-muted)]">
                    Note: Exclusive signature bridal bookings with Founder Fatima Nasir herself are
                    quoted individually by date availability. Contact our Multan concierge desk on
                    WhatsApp for private bridal trials and destination bookings.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
