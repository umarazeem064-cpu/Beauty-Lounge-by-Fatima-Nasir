import { FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  CurrencyCode,
  formatServicePrice,
  SALON_INFO,
  SALON_SERVICES,
  SERVICE_CATEGORIES,
  TEAM_MEMBERS,
  TIME_SLOTS,
} from '../data/salonData';

interface BookingSectionProps {
  selectedServiceId: string;
  selectedStylistId: string;
  selectionNonce: number;
  currency: CurrencyCode;
  onChangeServiceId: (id: string) => void;
  onChangeStylistId: (id: string) => void;
}

interface BookingReceipt {
  referenceId: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  serviceName: string;
  servicePrice: string;
  stylistName: string;
  dateFormatted: string;
  time: string;
  notes: string;
}

function getNextOpenDateString(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  // Tuesday is day 2 (salon closed on Tuesdays)
  if (date.getDay() === 2) {
    date.setDate(date.getDate() + 1);
  }
  return date.toISOString().split('T')[0];
}

function isTuesdayDate(isoDate: string): boolean {
  if (!isoDate) return false;
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getDay() === 2;
}

function formatReadableDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-PK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function BookingSection({
  selectedServiceId,
  selectedStylistId,
  selectionNonce,
  currency,
  onChangeServiceId,
  onChangeStylistId,
}: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [date, setDate] = useState(getNextOpenDateString);
  const [time, setTime] = useState('12:00 PM');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  useEffect(() => {
    if (sameAsPhone) {
      setWhatsapp(phone);
    }
  }, [phone, sameAsPhone]);

  // Reset confirmation view whenever the guest clicks "Book This" or "Book with [Stylist]"
  useEffect(() => {
    if (selectionNonce > 0) {
      setReceipt(null);
      setError(null);
    }
  }, [selectionNonce]);

  const activeService =
    SALON_SERVICES.find((s) => s.id === selectedServiceId) ?? SALON_SERVICES[0];

  const todayMin = new Date().toISOString().split('T')[0];
  const tuesdaySelected = isTuesdayDate(date);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (fullName.trim().length < 2) {
      setError('Please enter your full name so our reception team can reserve your suite.');
      return;
    }

    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid mobile number (e.g., +92 300 1234567).');
      return;
    }

    const effectiveWhatsapp = (sameAsPhone ? phone : whatsapp).trim();
    if (effectiveWhatsapp.replace(/[^\d+]/g, '').length < 10) {
      setError('Please enter a valid WhatsApp number for appointment reminders.');
      return;
    }

    if (!date) {
      setError('Please choose your preferred appointment date.');
      return;
    }

    if (tuesdaySelected) {
      setError(
        'Our Multan branch is closed on Tuesdays. Please choose Monday or Wednesday through Sunday.'
      );
      return;
    }

    const stylistObj = TEAM_MEMBERS.find((t) => t.id === selectedStylistId);
    const stylistName = stylistObj ? `${stylistObj.name} (${stylistObj.role})` : 'First Available Senior Specialist';
    const refNumber = `BLFN-${Math.floor(100000 + Math.random() * 900000)}`;

    setReceipt({
      referenceId: refNumber,
      fullName: fullName.trim(),
      phone: phone.trim(),
      whatsapp: effectiveWhatsapp,
      serviceName: activeService.name,
      servicePrice: formatServicePrice(activeService.pricePKR, currency),
      stylistName,
      dateFormatted: formatReadableDate(date),
      time,
      notes: notes.trim(),
    });
  };

  const buildWhatsAppConfirmationHref = (r: BookingReceipt): string => {
    const text = [
      `Assalam o Alaikum Beauty Lounge by Fatima Nasir (Multan),`,
      `I just submitted an online appointment request:`,
      `Ref: ${r.referenceId}`,
      `Client: ${r.fullName}`,
      `Service: ${r.serviceName} (${r.servicePrice})`,
      `Specialist: ${r.stylistName}`,
      `Date & Time: ${r.dateFormatted} at ${r.time}`,
      `Phone / WhatsApp: ${r.phone}`,
      r.notes ? `Notes: ${r.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="booking"
      className="py-20 lg:py-28 bg-[var(--bg-canvas)] theme-surface"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Concierge & Booking Guide Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium tracking-wide text-[var(--accent)] mb-3">
                Private Appointment Desk
              </p>
              <h2 className="font-display headline-balance text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.12] text-[var(--text-primary)]">
                Reserve Your Suite at Our Multan Lounge
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
                We limit daily bookings to protect our calm, private salon atmosphere. Submit your
                preferred service, stylist, and time slot—our Multan reception desk confirms all
                requests promptly via phone or WhatsApp.
              </p>
            </div>

            {/* Selected Service Live Preview */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
              <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
                Currently Selected Treatment
              </p>
              <p className="text-base font-semibold text-[var(--text-primary)]">
                {activeService.name}
              </p>
              <div className="mt-2 flex items-center gap-3 text-sm text-[var(--text-secondary)] tabular-nums">
                <span className="font-semibold text-[var(--accent)]">
                  {formatServicePrice(activeService.pricePKR, currency)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {activeService.duration}
                </span>
              </div>
            </div>

            {/* Direct Multan Reception Details */}
            <div className="space-y-4 border-t border-[var(--border-subtle)] pt-6 text-sm text-[var(--text-secondary)]">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Multan Salon Location</p>
                  <p className="mt-0.5 leading-relaxed">{SALON_INFO.addressFull}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <div className="tabular-nums">
                  <p className="font-medium text-[var(--text-primary)]">Direct Booking Lines</p>
                  <p className="mt-0.5">
                    <a href={SALON_INFO.phonePrimaryHref} className="hover:text-[var(--accent)]">
                      {SALON_INFO.phonePrimary}
                    </a>{' '}
                    ·{' '}
                    <a href={SALON_INFO.phoneSecondaryHref} className="hover:text-[var(--accent)]">
                      {SALON_INFO.phoneSecondary}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <div className="tabular-nums">
                  <p className="font-medium text-[var(--text-primary)]">Visiting Hours</p>
                  <p className="mt-0.5">Monday &amp; Wednesday – Sunday: 11:00 AM – 8:00 PM</p>
                  <p className="text-xs text-[var(--text-muted)]">Closed every Tuesday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Booking Form / Receipt Card */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-8 theme-surface">
              {receipt ? (
                /* Instant Confirmation State */
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-3.5 border-b border-[var(--border-subtle)] pb-6">
                    <CheckCircle2
                      className="h-7 w-7 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        Appointment Request Received · Ref #{receipt.referenceId}
                      </p>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mt-1">
                        Thank You, {receipt.fullName}
                      </h3>
                      <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                        Your booking request for our Gulgasht Colony, Multan lounge has been logged.
                        Our desk will confirm your suite shortly via WhatsApp or call.
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                    <div className="rounded-lg bg-[var(--bg-surface)] p-4">
                      <dt className="text-xs text-[var(--text-muted)]">Selected Service</dt>
                      <dd className="mt-1 font-semibold text-[var(--text-primary)]">
                        {receipt.serviceName}
                      </dd>
                      <dd className="text-xs font-medium text-[var(--accent)] tabular-nums mt-0.5">
                        {receipt.servicePrice}
                      </dd>
                    </div>

                    <div className="rounded-lg bg-[var(--bg-surface)] p-4">
                      <dt className="text-xs text-[var(--text-muted)]">Preferred Specialist</dt>
                      <dd className="mt-1 font-semibold text-[var(--text-primary)]">
                        {receipt.stylistName}
                      </dd>
                    </div>

                    <div className="rounded-lg bg-[var(--bg-surface)] p-4">
                      <dt className="text-xs text-[var(--text-muted)]">Date &amp; Time Slot</dt>
                      <dd className="mt-1 font-semibold text-[var(--text-primary)] tabular-nums">
                        {receipt.dateFormatted}
                      </dd>
                      <dd className="text-xs text-[var(--text-secondary)] tabular-nums mt-0.5">
                        {receipt.time}
                      </dd>
                    </div>

                    <div className="rounded-lg bg-[var(--bg-surface)] p-4">
                      <dt className="text-xs text-[var(--text-muted)]">Contact Details</dt>
                      <dd className="mt-1 font-semibold text-[var(--text-primary)] tabular-nums">
                        {receipt.phone}
                      </dd>
                      <dd className="text-xs text-[var(--text-secondary)] tabular-nums mt-0.5">
                        WhatsApp: {receipt.whatsapp}
                      </dd>
                    </div>
                  </dl>

                  {receipt.notes && (
                    <div className="rounded-lg bg-[var(--bg-surface)] p-4 text-sm">
                      <p className="text-xs text-[var(--text-muted)] mb-1">Special Notes</p>
                      <p className="text-[var(--text-secondary)]">{receipt.notes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppConfirmationHref(receipt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Fast-Track via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setReceipt(null);
                        setNotes('');
                      }}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      <span>Book Another Appointment</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Appointment Booking Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-[var(--border-subtle)] pb-4">
                    <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                      Online Appointment Request
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Fields marked with * are required to confirm your reservation.
                    </p>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-200"
                    >
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Ayesha Khan"
                      className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  {/* Phone + WhatsApp */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] tabular-nums placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="booking-whatsapp"
                          className="text-xs font-semibold text-[var(--text-primary)]"
                        >
                          WhatsApp Number *
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={sameAsPhone}
                            onChange={(e) => {
                              setSameAsPhone(e.target.checked);
                              if (e.target.checked) setWhatsapp(phone);
                            }}
                            className="h-3.5 w-3.5 accent-[var(--accent)] rounded"
                          />
                          Same as phone
                        </label>
                      </div>
                      <input
                        id="booking-whatsapp"
                        type="tel"
                        required
                        disabled={sameAsPhone}
                        value={sameAsPhone ? phone : whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+92 324 8650251"
                        className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] tabular-nums placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none disabled:opacity-65"
                      />
                    </div>
                  </div>

                  {/* Select Service + Select Stylist */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-service"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Select Service *
                      </label>
                      <select
                        id="booking-service"
                        value={selectedServiceId}
                        onChange={(e) => onChangeServiceId(e.target.value)}
                        className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                      >
                        {SERVICE_CATEGORIES.map((category) => (
                          <optgroup key={category} label={category}>
                            {SALON_SERVICES.filter((s) => s.category === category).map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} — {formatServicePrice(service.pricePKR, currency)}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-stylist"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Select Specialist
                      </label>
                      <select
                        id="booking-stylist"
                        value={selectedStylistId}
                        onChange={(e) => onChangeStylistId(e.target.value)}
                        className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                      >
                        <option value="any">First Available Senior Specialist</option>
                        {TEAM_MEMBERS.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name} — {member.role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Picker */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Preferred Date *
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        min={todayMin}
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] tabular-nums focus:border-[var(--accent)] focus:outline-none"
                      />
                      {tuesdaySelected && (
                        <p className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                          Tuesday is our weekly rest day—please pick another day.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-time"
                        className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                      >
                        Preferred Time *
                      </label>
                      <select
                        id="booking-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] tabular-nums focus:border-[var(--accent)] focus:outline-none"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                    >
                      Special Notes / Event Requests
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share wedding function dates, hair length, skincare sensitivities, or reference look notes..."
                      className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer"
                    >
                      Confirm Appointment Request
                    </button>
                    <p className="mt-2.5 text-center text-xs text-[var(--text-muted)]">
                      No advance payment charged online. Bridal deposits are coordinated directly
                      with our Multan desk.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
