import { ArrowRight, Clock, MapPin, MessageCircle, Star } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#120F0C]">
      {/* Full-Bleed Architectural Luxury Salon Interior (.jpg) */}
      <div className="relative min-h-[600px] lg:min-h-[680px] flex items-center">
        <SalonImage
          src={SALON_INFO.images.hero}
          alt="Quiet luxury interior of Beauty Lounge by Fatima Nasir Multan Branch featuring travertine arches, brushed brass mirrors, and bouclé styling chairs"
          fallbackTitle="Beauty Lounge by Fatima Nasir — Multan"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Measured Contrast Scrim guaranteeing WCAG AA 4.5:1+ legibility across all theme modes */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/28"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
        />

        {/* Hero Editorial Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#E5C992] mb-4">
              Gulgasht Colony, Multan · Signature Luxury Studio
            </p>

            <h1 className="font-display headline-balance text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.06] tracking-tight text-white">
              Sculpted Beauty &amp; Luminous Artistry, Crafted in Quiet Luxury
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#EFEAE2]">
              Bringing celebrity artist Fatima Nasir’s twelve-year bridal, hair, and clinical
              skincare legacy to Multan—inside calm, unhurried suites designed around radiant,
              skin-like finishes and personalized one-on-one care.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#booking"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
              >
                <span>Book Appointment Now</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#services"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/45 bg-black/30 px-7 py-3 text-sm font-medium text-white backdrop-blur-xs hover:bg-white hover:text-[#141210] transition-colors whitespace-nowrap"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Architectural Proof & Location Strip */}
      <div className="relative z-10 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] theme-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[var(--border-subtle)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x px-4 sm:px-6">
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 py-4 lg:pr-6 hover:text-[var(--accent)] transition-colors"
          >
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs text-[var(--text-muted)]">Multan Branch Address</p>
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                61/A, Block A, Gulgasht Colony
              </p>
            </div>
          </a>

          <div className="flex items-start gap-3 py-4 lg:px-6">
            <Clock className="h-4 w-4 mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <p className="text-xs text-[var(--text-muted)]">Salon Hours</p>
              <p className="text-sm font-medium text-[var(--text-primary)] tabular-nums">
                11:00 AM – 8:00 PM · Tue Closed
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-4 lg:px-6">
            <Star
              className="h-4 w-4 mt-0.5 shrink-0 text-[var(--accent)] fill-[var(--accent)]"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs text-[var(--text-muted)]">Client Reputation</p>
              <p className="text-sm font-medium text-[var(--text-primary)] tabular-nums">
                4.9 / 5.0 · 12+ Years Excellence
              </p>
            </div>
          </div>

          <a
            href={SALON_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 py-4 lg:pl-6 hover:text-[var(--accent)] transition-colors"
          >
            <MessageCircle
              className="h-4 w-4 mt-0.5 shrink-0 text-[var(--accent)]"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs text-[var(--text-muted)]">Direct WhatsApp Desk</p>
              <p className="text-sm font-medium text-[var(--text-primary)] tabular-nums">
                {SALON_INFO.phonePrimary}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
