import { useEffect, useState } from 'react';
import { MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  themeId: string;
  customHex: string;
  customBase: 'light' | 'dark';
  onSelectTheme: (id: string) => void;
  onSelectCustomColor: (hex: string, base: 'light' | 'dark') => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export function Header({
  themeId,
  customHex,
  customBase,
  onSelectTheme,
  onSelectCustomColor,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 w-full theme-surface">
      {/* Desktop Direct Contact Utility Strip (hidden on mobile to respect 15% sticky height cap) */}
      <div className="hidden lg:block border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2">
          <div className="flex items-center gap-5 min-w-0">
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors truncate"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <span className="truncate">{SALON_INFO.addressShort}</span>
            </a>
            <span aria-hidden="true" className="text-[var(--border-strong)]">
              ·
            </span>
            <span className="whitespace-nowrap shrink-0 tabular-nums">
              Mon, Wed–Sun: 11:00 AM – 8:00 PM
            </span>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <a
              href={SALON_INFO.phonePrimaryHref}
              className="flex items-center gap-1.5 font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors whitespace-nowrap tabular-nums"
            >
              <Phone className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              <span>{SALON_INFO.phonePrimary}</span>
            </a>
            <span aria-hidden="true" className="text-[var(--border-strong)]">
              ·
            </span>
            <a
              href={SALON_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-[var(--accent)] hover:underline whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Single-Row Navigation Bar */}
      <div
        className={`border-b border-[var(--border-subtle)] transition-colors ${
          scrolled
            ? 'bg-[var(--bg-canvas)]/95 backdrop-blur-md'
            : 'bg-[var(--bg-canvas)]'
        }`}
      >
        <div className="mx-auto flex h-[60px] lg:h-[72px] max-w-7xl items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="font-display text-lg sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
          >
            Beauty Lounge{' '}
            <span className="italic font-normal text-[var(--accent)]">by Fatima Nasir</span>
          </a>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-6 text-[13.5px] font-medium text-[var(--text-secondary)]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-[var(--text-primary)] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:scale-x-0 after:bg-[var(--accent)] after:transition-transform hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Theme Studio + Primary CTA + Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeSwitcher
              themeId={themeId}
              customHex={customHex}
              customBase={customBase}
              onSelectTheme={onSelectTheme}
              onSelectCustomColor={onSelectCustomColor}
            />

            <a
              href="#booking"
              className="hidden sm:inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-5 py-2.5 text-xs sm:text-sm font-medium text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0"
            >
              Book Now
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] xl:hidden cursor-pointer shrink-0"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[60px] bottom-0 z-50 overflow-y-auto bg-[var(--bg-canvas)] px-5 py-6 xl:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[var(--border-subtle)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-base font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors"
            >
              Book Appointment Now
            </a>

            <a
              href={SALON_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Direct Multan Contact Info inside Mobile Menu */}
          <div className="mt-8 space-y-3 border-t border-[var(--border-subtle)] pt-6 text-sm text-[var(--text-secondary)]">
            <a
              href={SALON_INFO.phonePrimaryHref}
              className="flex items-center gap-2.5 font-medium text-[var(--text-primary)] tabular-nums"
            >
              <Phone className="h-4 w-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
              <span>{SALON_INFO.phonePrimary}</span>
            </a>
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 leading-relaxed"
            >
              <MapPin className="h-4 w-4 mt-0.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
              <span>{SALON_INFO.addressFull}</span>
            </a>
            <p className="text-xs text-[var(--text-muted)] tabular-nums">
              {SALON_INFO.hoursSummary}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
