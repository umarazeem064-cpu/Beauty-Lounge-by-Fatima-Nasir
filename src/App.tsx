import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import {
  CurrencyCode,
  SALON_SERVICES,
  SalonService,
  TeamMember,
} from './data/salonData';
import { applyThemeToDocument } from './theme/themes';

const STORAGE_THEME_KEY = 'blfn_multan_theme_id';
const STORAGE_HEX_KEY = 'blfn_multan_custom_hex';
const STORAGE_BASE_KEY = 'blfn_multan_custom_base';

export default function App() {
  const [themeId, setThemeId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_THEME_KEY) || 'white';
    } catch {
      return 'white';
    }
  });

  const [customHex, setCustomHex] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_HEX_KEY) || '#9A7228';
    } catch {
      return '#9A7228';
    }
  });

  const [customBase, setCustomBase] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BASE_KEY);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SALON_SERVICES[0].id);
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectionNonce, setSelectionNonce] = useState<number>(0);

  useEffect(() => {
    applyThemeToDocument(themeId, themeId === 'custom' ? customHex : null, customBase);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, themeId);
      localStorage.setItem(STORAGE_HEX_KEY, customHex);
      localStorage.setItem(STORAGE_BASE_KEY, customBase);
    } catch {
      // Ignore storage failures in private browsing
    }
  }, [themeId, customHex, customBase]);

  const handleSelectTheme = (id: string) => {
    setThemeId(id);
  };

  const handleSelectCustomColor = (hex: string, base: 'light' | 'dark') => {
    setCustomHex(hex);
    setCustomBase(base);
    setThemeId('custom');
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookService = (service: SalonService) => {
    setSelectedServiceId(service.id);
    setSelectionNonce((n) => n + 1);
    scrollToBooking();
  };

  const handleBookStylist = (member: TeamMember) => {
    setSelectedStylistId(member.id);
    setSelectionNonce((n) => n + 1);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] theme-surface">
      <Header
        themeId={themeId}
        customHex={customHex}
        customBase={customBase}
        onSelectTheme={handleSelectTheme}
        onSelectCustomColor={handleSelectCustomColor}
      />

      <main>
        <Hero />

        <AboutSection />

        <ServicesSection
          currency={currency}
          onChangeCurrency={setCurrency}
          onBookService={handleBookService}
        />

        <BookingSection
          selectedServiceId={selectedServiceId}
          selectedStylistId={selectedStylistId}
          selectionNonce={selectionNonce}
          currency={currency}
          onChangeServiceId={setSelectedServiceId}
          onChangeStylistId={setSelectedStylistId}
        />

        <TeamSection onBookStylist={handleBookStylist} />

        <GallerySection />

        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
