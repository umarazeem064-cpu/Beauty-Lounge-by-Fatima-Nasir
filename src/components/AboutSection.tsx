import { ShieldCheck, Sparkles, Award, HeartHandshake } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

const CRAFT_PILLARS = [
  {
    icon: Award,
    metric: '12+ Years',
    title: 'Editorial & Bridal Heritage',
    detail:
      'Founded by PIFD alumna and eight-time Best Hair & Makeup Artist nominee Fatima Nasir, trained internationally in modern skin-first techniques.',
  },
  {
    icon: ShieldCheck,
    metric: 'Medical-Grade',
    title: 'Hospital-Standard Hygiene',
    detail:
      'Single-use applicators, UV-sterilized metal implements, fresh Egyptian linens, and ProKit brushes sanitized meticulously between every guest.',
  },
  {
    icon: Sparkles,
    metric: '100% Authentic',
    title: 'Global Luxury Formulations',
    detail:
      'German Janssen Cosmeceuticals, bond-protecting European hair color, and authentic prestige cosmetics—never diluted or counterfeit.',
  },
  {
    icon: HeartHandshake,
    metric: 'Private Suites',
    title: 'Unhurried Appointment Slots',
    detail:
      'Structured time slots in serene travertine rooms eliminate chaotic parlor waits, giving every bride and guest calm, dedicated focus.',
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[var(--bg-canvas)] theme-surface"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
          {/* Left Editorial Image Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] min-h-[340px]">
              <SalonImage
                src={SALON_INFO.images.about}
                alt="Curated travertine vanity table with brushed gold ProKit makeup brushes and amber skincare serums at Beauty Lounge by Fatima Nasir"
                fallbackTitle="Quiet Luxury Craftsmanship"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              Private bridal vanity &amp; clinical skincare apothecary · Block A, Gulgasht Colony,
              Multan
            </p>
          </div>

          {/* Right Brand Story & Craftsmanship Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-[var(--accent)] mb-3">
                Our Story &amp; Philosophy
              </p>

              <h2 className="font-display headline-balance text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.12] text-[var(--text-primary)]">
                Where Editorial Restraint Meets Timeless Multan Hospitality
              </h2>

              <div className="mt-6 space-y-4 text-[15.5px] leading-[1.7] text-[var(--text-secondary)] max-w-2xl">
                <p>
                  Born from celebrity makeup artist <strong className="font-semibold text-[var(--text-primary)]">Fatima Nasir’s</strong>{' '}
                  twelve-year journey across Pakistan’s fashion houses, bridal runways, and her
                  flagship DHA Lahore studio, Beauty Lounge Multan brings an understated sanctuary
                  to South Punjab. Every architectural arch, warm lighting fixture, and acoustic
                  suite at 61/A Sheikh Abdul Hameed Road was planned to replace noisy, rushed
                  parlor experiences with genuine tranquility.
                </p>
                <p>
                  Our signature philosophy rejects heavy, mask-like layers. Whether preparing a
                  Valima bride, formulating seamless caramel balayage, or guiding a pre-wedding
                  Janssen skin regimen, our senior specialists enhance natural bone structure,
                  preserve hair and barrier health, and craft finishes that look luminous in both
                  daylight and high-resolution photography.
                </p>
              </div>
            </div>

            {/* 4 Concrete Salon Standards */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 border-t border-[var(--border-subtle)] pt-8">
              {CRAFT_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent)] tabular-nums">
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{pillar.metric}</span>
                    </div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {pillar.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
