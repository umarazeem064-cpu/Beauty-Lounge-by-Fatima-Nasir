export type CurrencyCode = 'PKR' | 'USD' | 'GBP';

export interface SalonService {
  id: string;
  category:
    | 'Bridal & Party Makeup'
    | 'Hair Styling & Cuts'
    | 'Skincare & Facials'
    | 'Manicure & Pedicure'
    | 'Grooming & Spa Rituals';
  name: string;
  description: string;
  duration: string;
  pricePKR: number;
  featuredNote?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
  imageAlt: string;
  instagram: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bridal Artistry' | 'Hair Transformations' | 'Skin & Nails' | 'Salon Ambiance';
  caption: string;
  image: string;
  alt: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  quote: string;
  image: string;
  alt: string;
}

export const SALON_INFO = {
  brandName: 'Beauty Lounge',
  founderTag: 'by Fatima Nasir',
  fullTitle: 'Beauty Lounge by Fatima Nasir — Multan Branch',
  branch: 'Multan Branch',
  addressShort: '61/A, Gulgasht Colony, Multan',
  addressFull:
    '61/A, Sheikh Abdul Hameed Road, Block A, Gulgasht Colony (Opposite Saba Khan Gym, near Gloria Jeans), Multan, Pakistan',
  phonePrimary: '+92 324 8650251',
  phonePrimaryHref: 'tel:+923248650251',
  phoneSecondary: '+92 325 7422773',
  phoneSecondaryHref: 'tel:+923257422773',
  whatsappNumber: '923248650251',
  whatsappLink:
    'https://wa.me/923248650251?text=Assalam%20o%20Alaikum%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Beauty%20Lounge%20by%20Fatima%20Nasir%20-%20Multan%20Branch.',
  googleMapsUrl: 'https://maps.app.goo.gl/m3WXoA5qz6yYgpfc9',
  coordinates: '30.2199° N, 71.4713° E',
  email: 'appointments@fatimanasir.com',
  website: 'https://fatimanasir.com',
  hoursSummary: 'Mon, Wed – Sun: 11:00 AM – 8:00 PM · Tuesday Closed',
  openingHours: [
    { day: 'Monday', hours: '11:00 AM – 8:00 PM', open: true },
    { day: 'Tuesday', hours: 'Closed', open: false },
    { day: 'Wednesday', hours: '11:00 AM – 8:00 PM', open: true },
    { day: 'Thursday', hours: '11:00 AM – 8:00 PM', open: true },
    { day: 'Friday', hours: '11:00 AM – 8:00 PM', open: true },
    { day: 'Saturday', hours: '11:00 AM – 8:00 PM', open: true },
    { day: 'Sunday', hours: '11:00 AM – 8:00 PM', open: true },
  ],
  socials: {
    instagram: 'https://www.instagram.com/fatimanasirofficial',
    facebook: 'https://www.facebook.com/fatimanasirofficial',
    tiktok: 'https://www.tiktok.com/@fatimanasirofficial',
    whatsapp: 'https://wa.me/923248650251',
  },
  images: {
    hero: '/src/assets/images/hero_luxury_salon_1794927686496.jpg',
    about: '/src/assets/images/about_salon_craft_1794927687182.jpg',
  },
} as const;

export const SERVICE_CATEGORIES = [
  'Bridal & Party Makeup',
  'Hair Styling & Cuts',
  'Skincare & Facials',
  'Manicure & Pedicure',
  'Grooming & Spa Rituals',
] as const;

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rateFromPKR: number }> = {
  PKR: { symbol: 'PKR', rateFromPKR: 1 },
  USD: { symbol: '$', rateFromPKR: 1 / 278 },
  GBP: { symbol: '£', rateFromPKR: 1 / 355 },
};

export function formatServicePrice(pricePKR: number, currency: CurrencyCode): string {
  if (currency === 'PKR') {
    return `PKR ${pricePKR.toLocaleString('en-PK')}`;
  }
  const converted = Math.max(10, Math.round(pricePKR * CURRENCY_RATES[currency].rateFromPKR));
  return `${CURRENCY_RATES[currency].symbol}${converted.toLocaleString('en-US')}`;
}

export const SALON_SERVICES: SalonService[] = [
  // Bridal & Party Makeup
  {
    id: 'bridal-signature-senior',
    category: 'Bridal & Party Makeup',
    name: 'Signature Bridal Makeup (Baraat / Valima)',
    description:
      'Luminous, skin-like airbrush bridal artistry with custom skin preparation, couture hairstyling, dupatta pinning, and luxury faux mink lashes.',
    duration: '3 hrs',
    pricePKR: 75000,
    featuredNote: 'Most Requested',
  },
  {
    id: 'bridal-nikkah-engagement',
    category: 'Bridal & Party Makeup',
    name: 'Nikkah & Engagement Look',
    description:
      'Soft-focus dewy complexion, diffused metallic eye depth, floral bun or sculpted waves, and veil setting tailored for daylight and photography.',
    duration: '2 hrs 15 mins',
    pricePKR: 52000,
  },
  {
    id: 'bridal-mehndi-mayoun',
    category: 'Bridal & Party Makeup',
    name: 'Mehndi & Festive Bridal Glam',
    description:
      'Fresh golden-hour radiance with fluttery lashes, custom textured braid or loose curls, and long-wear humidity-resistant setting.',
    duration: '2 hrs',
    pricePKR: 48000,
  },
  {
    id: 'party-airbrush-styling',
    category: 'Bridal & Party Makeup',
    name: 'Airbrush Party Makeup & Hairstyling',
    description:
      'Weightless HD airbrush base paired with soft glam eyes and signature blowout or sleek updo by our studio-trained artists.',
    duration: '90 mins',
    pricePKR: 22000,
  },
  {
    id: 'party-classic-glam',
    category: 'Bridal & Party Makeup',
    name: 'Signature Soft-Glam Party Styling',
    description:
      'Refined editorial makeup focused on seamless complexion work, soft contouring, and personalized occasion hairstyling.',
    duration: '75 mins',
    pricePKR: 16500,
  },

  // Hair Styling & Cuts
  {
    id: 'hair-precision-cut',
    category: 'Hair Styling & Cuts',
    name: 'Precision Haircut & Signature Restyle',
    description:
      'Detailed texture consultation, bespoke layered or structural cut tailored to face geometry, relaxing scalp cleanse, and smooth finish.',
    duration: '60 mins',
    pricePKR: 6500,
  },
  {
    id: 'hair-luxury-blowout',
    category: 'Hair Styling & Cuts',
    name: 'Luxury Silk Blowout & Waves',
    description:
      'Nourishing moisture wash followed by bouncy salon blowout, gloss serum sealing, and long-lasting soft Hollywood waves.',
    duration: '45 mins',
    pricePKR: 4500,
  },
  {
    id: 'hair-dimensional-balayage',
    category: 'Hair Styling & Cuts',
    name: 'Dimensional Balayage & Gloss Coloring',
    description:
      'Hand-painted seamless honey, caramel, or mocha ribbons with bond-building protection and high-shine ammonia-free tonal gloss.',
    duration: '3 hrs',
    pricePKR: 34000,
    featuredNote: 'Bond Protected',
  },
  {
    id: 'hair-sun-kissed-highlights',
    category: 'Hair Styling & Cuts',
    name: 'Full Babylights & Custom Highlights',
    description:
      'Ultra-fine multi-tonal foils calibrated to complement South Asian skin undertones without brassiness or dryness.',
    duration: '2 hrs 30 mins',
    pricePKR: 28000,
  },
  {
    id: 'hair-keratin-smoothing',
    category: 'Hair Styling & Cuts',
    name: 'Brazilian Keratin Smoothing Treatment',
    description:
      'Formaldehyde-free protein infusion that tames frizz, repairs cuticle porosity, and delivers mirror-like smoothness for up to 4 months.',
    duration: '2 hrs 45 mins',
    pricePKR: 32000,
  },
  {
    id: 'hair-sacred-oil-ritual',
    category: 'Hair Styling & Cuts',
    name: 'Sacred Oil Deep-Repair Hair Ritual',
    description:
      'Our signature warm botanical oil scalp therapy, micro-mist steam hydration, and intensive lipid mask for stressed or color-treated hair.',
    duration: '60 mins',
    pricePKR: 9500,
  },

  // Skincare & Facials
  {
    id: 'skin-janssen-deep-cleansing',
    category: 'Skincare & Facials',
    name: 'Janssen Bespoke Deep Cleansing Facial',
    description:
      'Authentic German Janssen Cosmeceuticals protocol combining ultrasonic pore decongestion, enzymatic resurfacing, and calming ampoule infusion.',
    duration: '75 mins',
    pricePKR: 12500,
    featuredNote: 'Signature Protocol',
  },
  {
    id: 'skin-hydrafacial-md',
    category: 'Skincare & Facials',
    name: 'Advanced HydraFacial Glass-Skin Glow',
    description:
      'Multi-step vortex hydro-dermabrasion, painless extraction, hyaluronic peptide infusion, and LED light therapy for immediate luminosity.',
    duration: '60 mins',
    pricePKR: 18500,
  },
  {
    id: 'skin-anti-aging-lift',
    category: 'Skincare & Facials',
    name: 'Collagen Sculpt Anti-Aging Treatment',
    description:
      'Firming peptide serums paired with lymphatic buccal-inspired lifting massage to restore elasticity, refine fine lines, and brighten tone.',
    duration: '80 mins',
    pricePKR: 16000,
  },
  {
    id: 'skin-gold-radiance',
    category: 'Skincare & Facials',
    name: '24K Gold Bridal Radiance Facial',
    description:
      'Pre-event luminosity ritual featuring micro-gold brightening mask, oxygenating massage, and barrier-plumping hydration ideal before weddings.',
    duration: '75 mins',
    pricePKR: 14500,
  },

  // Manicure & Pedicure
  {
    id: 'nails-classic-manipedi',
    category: 'Manicure & Pedicure',
    name: 'Classic Luxury Mani-Pedi Duo',
    description:
      'Precision cuticle grooming, botanical salt exfoliation, hydrating paraffin wrap, warm stone massage, and high-gloss nail polish.',
    duration: '75 mins',
    pricePKR: 7500,
  },
  {
    id: 'nails-gel-polish',
    category: 'Manicure & Pedicure',
    name: 'Russian Manicure & Soft Gel Polish',
    description:
      'Detailed dry cuticle refinement for an ultra-clean nail bed finished with chip-resistant milky neutral, micro-French, or custom nail art.',
    duration: '60 mins',
    pricePKR: 6000,
  },
  {
    id: 'nails-spa-foot-treatment',
    category: 'Manicure & Pedicure',
    name: 'Botanical Spa Foot Restoration',
    description:
      'Soothing eucalyptus mineral soak, callus resurfacing, cooling marine clay mask, and extended reflexology pressure-point foot massage.',
    duration: '55 mins',
    pricePKR: 5500,
  },
  {
    id: 'nails-gel-extensions',
    category: 'Manicure & Pedicure',
    name: 'Sculpted Gel-X & Bridal Nail Extensions',
    description:
      'Featherlight custom-shaped soft gel extensions designed for natural curvature and effortless durability through multi-day wedding events.',
    duration: '90 mins',
    pricePKR: 10500,
  },

  // Grooming & Spa Rituals
  {
    id: 'grooming-brow-architecture',
    category: 'Grooming & Spa Rituals',
    name: 'Brow Architecture, Threading & Tint',
    description:
      'Golden-ratio brow mapping, gentle precision threading, and custom undertone tinting for full, sculpted, naturally balanced brows.',
    duration: '30 mins',
    pricePKR: 2500,
  },
  {
    id: 'grooming-smooth-edit',
    category: 'Grooming & Spa Rituals',
    name: 'The Smooth Edit — Herbal Full-Body Wax',
    description:
      'Sensitive-skin herbal luxury wax ritual followed by soothing chamomile post-depilation oil in a private, sanitized treatment suite.',
    duration: '75 mins',
    pricePKR: 8500,
  },
  {
    id: 'grooming-hot-towel-massage',
    category: 'Grooming & Spa Rituals',
    name: 'Aromatherapy Hot Towel Relaxation Therapy',
    description:
      'Warm lavender-infused steamed towels paired with slow Swedish neck, shoulder, and full-body tension release for complete calm.',
    duration: '60 mins',
    pricePKR: 9000,
  },
  {
    id: 'grooming-grooms-private-suite',
    category: 'Grooming & Spa Rituals',
    name: 'Groom’s Private Suite — Classic Beard, Hot Towel & Cut',
    description:
      'Available strictly by advance wedding couple reservation: precision scissor haircut, classic beard sculpting, mustache detailing, and eucalyptus hot towel shave finish.',
    duration: '60 mins',
    pricePKR: 8000,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'fatima-nasir',
    name: 'Fatima Nasir',
    role: 'Founder & Creative Director',
    experience: '12+ Years Experience',
    specialty: 'Celebrity Bridal & Editorial Artistry',
    bio: 'PIFD alumna, eight-time Best Hair & Makeup Artist nominee, and creator of ProKit. Trained internationally, Fatima pioneered luminous, skin-first bridal artistry across Pakistan before bringing her quiet-luxury studio standards to Multan.',
    image: '/src/assets/images/team_fatima_nasir_1794927687903.jpg',
    imageAlt: 'Fatima Nasir, Founder and Creative Director of Beauty Lounge in Multan',
    instagram: 'https://www.instagram.com/fatimanasirofficial',
  },
  {
    id: 'amina-tariq',
    name: 'Amina Tariq',
    role: 'Lead Bridal & Airbrush Artist',
    experience: '9 Years Experience',
    specialty: 'Nikkah, Valima & HD Airbrush',
    bio: 'Mentored directly under Fatima Nasir’s DHA Lahore academy, Amina leads Multan’s bridal atelier—known for weightless complexions, delicate eye definition, and calm, punctual wedding mornings.',
    image: '/src/assets/images/team_amina_tariq_1794927688550.jpg',
    imageAlt: 'Amina Tariq, Lead Bridal and Airbrush Makeup Artist at Beauty Lounge Multan',
    instagram: 'https://www.instagram.com/fatimanasirofficial',
  },
  {
    id: 'zara-mehmood',
    name: 'Zara Mehmood',
    role: 'Master Hair Colorist & Director',
    experience: '11 Years Experience',
    specialty: 'Dimensional Balayage & Keratin Care',
    bio: 'Specialist in damage-free lightening, custom warm brunettes, and precision cutting. Zara integrates bond-rebuilding protocols into every color transformation for mirror-like movement and longevity.',
    image: '/src/assets/images/team_zara_mehmood_1794927690372.jpg',
    imageAlt: 'Zara Mehmood, Master Hair Colorist and Hair Texture Director',
    instagram: 'https://www.instagram.com/fatimanasirofficial',
  },
  {
    id: 'sana-qureshi',
    name: 'Sana Qureshi',
    role: 'Senior Clinical Aesthetician',
    experience: '8 Years Experience',
    specialty: 'Janssen Skincare & Bridal Skin Prep',
    bio: 'Certified Janssen Cosmeceuticals and HydraFacial specialist designing tailored 6-week pre-bridal skin journeys that strengthen the skin barrier and deliver effortless camera-ready radiance.',
    image: '/src/assets/images/team_sana_qureshi_1794927689526.jpg',
    imageAlt: 'Sana Qureshi, Senior Clinical Skincare Specialist and Aesthetician',
    instagram: 'https://www.instagram.com/fatimanasirofficial',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Champagne Couture Valima Bride',
    category: 'Bridal Artistry',
    caption:
      'Luminous skin-like airbrush finish with soft bronze eye depth and sculpted rosewood satin lip.',
    image: '/src/assets/images/gallery_bridal_glam_1794927691623.jpg',
    alt: 'Radiant Pakistani bride wearing champagne gold tissue dupatta with luminous dewy bridal makeup',
  },
  {
    id: 'gal-2',
    title: 'Ivory & Jasmine Nikkah Grace',
    category: 'Bridal Artistry',
    caption:
      'Weightless glass-skin bridal prep, feathery brows, and a classic textured bun woven with fresh motia.',
    image: '/src/assets/images/gallery_nikkah_look_1794927693470.jpg',
    alt: 'Serene Nikkah bride in ivory embroidered organza with fresh jasmine flowers and natural glowing makeup',
  },
  {
    id: 'gal-3',
    title: 'Honey-Caramel Dimensional Balayage',
    category: 'Hair Transformations',
    caption:
      'Hand-painted warm ribbons blended over natural espresso roots and sealed with our Sacred Oil blowout.',
    image: '/src/assets/images/gallery_hair_balayage_1794927692724.jpg',
    alt: 'Long dark brunette hair transformed with seamless honey-caramel balayage and glossy blowout waves',
  },
  {
    id: 'gal-4',
    title: 'Janssen Clinical Skin Sanctuary',
    category: 'Skin & Nails',
    caption:
      'Private, tranquil facial suites dedicated to personalized hydration, barrier restoration, and bridal glow.',
    image: '/src/assets/images/gallery_facial_ritual_1794927693060.jpg',
    alt: 'Serene clinical facial treatment in a calm warm travertine skincare suite with botanical serums',
  },
  {
    id: 'gal-5',
    title: 'Sheer Milky Micro-French Gel',
    category: 'Skin & Nails',
    caption:
      'Precision Russian cuticle care finished with ultra-refined glossy sheer pink and delicate white tips.',
    image: '/src/assets/images/gallery_nail_atelier_1794927693990.jpg',
    alt: 'Close-up of manicured hands featuring sheer milky-rose micro-French gel polish on travertine stone',
  },
  {
    id: 'gal-6',
    title: 'Gulgasht Quiet-Luxury Lounge',
    category: 'Salon Ambiance',
    caption:
      'Soft travertine plaster arches, warm brass sconces, and unhurried private seating in Block A, Gulgasht Colony.',
    image: '/src/assets/images/gallery_salon_lounge_1794927695420.jpg',
    alt: 'Quiet luxury beauty lounge waiting area with curved ivory bouclé sofa and arched neutral doorways',
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'rev-1',
    clientName: 'Maham Gillani',
    location: 'Gulgasht Colony, Multan',
    service: 'Signature Valima Bridal Makeup',
    rating: 5,
    date: 'Verified Client',
    quote:
      'I wanted to look unmistakably like myself—never caked or heavy. The base stayed luminous through ten hours of photographs and lights, and the quiet, uncrowded ambiance made my wedding morning completely peaceful.',
    image: '/src/assets/images/client_maham_1794927695990.jpg',
    alt: 'Portrait of Maham Gillani wearing champagne silk after her Valima bridal makeover',
  },
  {
    id: 'rev-2',
    clientName: 'Hira Gardezi',
    location: 'Model Town, Multan',
    service: 'Dimensional Balayage & Sacred Oil Ritual',
    rating: 5,
    date: 'Verified Client',
    quote:
      'Zara listened carefully to my hair history and mixed the softest warm caramel tone I have ever worn. Even weeks later my hair feels silkier than before coloring, and every appointment starts right on schedule.',
    image: '/src/assets/images/client_hira_1794927696924.jpg',
    alt: 'Portrait of Hira Gardezi showing glossy caramel-brunette blowout waves',
  },
  {
    id: 'rev-3',
    clientName: 'Ayesha Makhdoom',
    location: 'DHA Multan',
    service: 'Janssen Facial & Pre-Bridal Skincare',
    rating: 5,
    date: 'Verified Client',
    quote:
      'From the sterilized tools to the serene beige suites, this feels worlds apart from chaotic local parlors. Three sessions of Janssen hydration and HydraFacial completely cleared my dullness before my Nikkah.',
    image: '/src/assets/images/client_ayesha_1794927701346.jpg',
    alt: 'Portrait of Ayesha Makhdoom with radiant clear skin after her skincare ritual',
  },
];

export const TIME_SLOTS = [
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
];
