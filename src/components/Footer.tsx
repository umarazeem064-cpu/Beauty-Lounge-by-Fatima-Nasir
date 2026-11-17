import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      id="contact"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] theme-surface"
    >
      {/* Upper Contact, Hours & Newsletter Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Column 1: Brand Summary & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <a
                href="#home"
                className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]"
              >
                Beauty Lounge{' '}
                <span className="italic font-normal text-[var(--accent)]">by Fatima Nasir</span>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Quiet-luxury bridal atelier, hair color studio, and clinical skincare lounge in the
                heart of Gulgasht Colony, Multan.
              </p>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <p className="leading-relaxed text-[var(--text-primary)]">
                  {SALON_INFO.addressFull}
                </p>
              </div>

              <div className="flex items-center gap-2.5 tabular-nums">
                <Phone className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <div className="flex flex-wrap items-center gap-x-2">
                  <a
                    href={SALON_INFO.phonePrimaryHref}
                    className="font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {SALON_INFO.phonePrimary}
                  </a>
                  <span aria-hidden="true" className="text-[var(--text-muted)]">
                    ·
                  </span>
                  <a
                    href={SALON_INFO.phoneSecondaryHref}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {SALON_INFO.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Maps Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={SALON_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Support</span>
              </a>

              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-md border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Opening & Closing Hours */}
          <div className="lg:col-span-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-5">
              <Clock className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
              <span>Opening &amp; Closing Hours</span>
            </h3>

            <ul className="divide-y divide-[var(--border-subtle)] text-sm tabular-nums">
              {SALON_INFO.openingHours.map((row) => (
                <li key={row.day} className="flex items-center justify-between py-2.5">
                  <span className="text-[var(--text-secondary)]">{row.day}</span>
                  <span
                    className={
                      row.open
                        ? 'font-medium text-[var(--text-primary)]'
                        : 'font-medium text-[var(--accent)]'
                    }
                  >
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter & Socials */}
          <div className="lg:col-span-4 space-y-7">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Beauty Notes &amp; Seasonal Offers
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Receive pre-bridal skin timelines, seasonal care guides, and priority notification
                when Fatima Nasir’s Multan bridal slots open.
              </p>

              {subscribed ? (
                <div
                  role="status"
                  className="mt-4 flex items-center gap-2.5 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-200"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>You are subscribed to Beauty Lounge Multan updates.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} noValidate className="mt-4 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="min-h-[44px] flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-[var(--accent)] px-5 py-2.5 text-xs font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Subscribe</span>
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-xs text-red-600 dark:text-red-400">{emailError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Social Media Links */}
            <div className="border-t border-[var(--border-subtle)] pt-6">
              <p className="text-xs font-semibold text-[var(--text-primary)] mb-3">
                Connect With Us
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={SALON_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href={SALON_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
                >
                  <span>Facebook</span>
                </a>
                <a
                  href={SALON_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
                >
                  <span>TikTok</span>
                </a>
                <a
                  href={SALON_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Bottom Copyright & Developer Credit Bar */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:px-6 py-5 text-xs text-[var(--text-muted)] sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Beauty Lounge by Fatima Nasir — Multan Branch. All rights
            reserved.
          </p>
          <p className="text-center sm:text-right">
            Crafted with precision by{' '}
            <span className="font-medium text-[var(--text-primary)]">
              Studio Digital Web Architecture
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
