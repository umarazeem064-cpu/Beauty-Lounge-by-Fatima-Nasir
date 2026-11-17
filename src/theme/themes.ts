export interface SalonTheme {
  id: string;
  name: string;
  shortLabel: string;
  category: 'light' | 'dark';
  swatchPrimary: string;
  swatchAccent: string;
  vars: {
    '--bg-canvas': string;
    '--bg-surface': string;
    '--bg-elevated': string;
    '--bg-subtle': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--text-muted': string;
    '--border-subtle': string;
    '--border-strong': string;
    '--accent': string;
    '--accent-hover': string;
    '--accent-contrast': string;
    '--accent-soft': string;
    '--shadow-card': string;
  };
}

export const SALON_THEMES: SalonTheme[] = [
  {
    id: 'white',
    name: 'Pure White',
    shortLabel: 'White',
    category: 'light',
    swatchPrimary: '#FFFFFF',
    swatchAccent: '#9A7228',
    vars: {
      '--bg-canvas': '#FFFFFF',
      '--bg-surface': '#F7F5F2',
      '--bg-elevated': '#FFFFFF',
      '--bg-subtle': '#EFECE6',
      '--text-primary': '#161412',
      '--text-secondary': '#4D463F',
      '--text-muted': '#70675E',
      '--border-subtle': '#E6E0D7',
      '--border-strong': '#CFC6B8',
      '--accent': '#9A7228',
      '--accent-hover': '#7D5A1C',
      '--accent-contrast': '#FFFFFF',
      '--accent-soft': 'rgba(154, 114, 40, 0.10)',
      '--shadow-card': '0 1px 2px rgba(20, 16, 12, 0.04), 0 8px 24px rgba(20, 16, 12, 0.04)',
    },
  },
  {
    id: 'dark',
    name: 'Obsidian Dark',
    shortLabel: 'Dark',
    category: 'dark',
    swatchPrimary: '#0D0C0B',
    swatchAccent: '#D4AF6A',
    vars: {
      '--bg-canvas': '#0D0C0B',
      '--bg-surface': '#161412',
      '--bg-elevated': '#1D1A17',
      '--bg-subtle': '#25211D',
      '--text-primary': '#F6F2EB',
      '--text-secondary': '#C5BDB2',
      '--text-muted': '#9A9186',
      '--border-subtle': '#2B2621',
      '--border-strong': '#3E372F',
      '--accent': '#D4AF6A',
      '--accent-hover': '#E3C382',
      '--accent-contrast': '#14110D',
      '--accent-soft': 'rgba(212, 175, 106, 0.14)',
      '--shadow-card': '0 2px 6px rgba(0, 0, 0, 0.32), 0 12px 28px rgba(0, 0, 0, 0.25)',
    },
  },
  {
    id: 'champagne',
    name: 'Champagne Travertine',
    shortLabel: 'Champagne',
    category: 'light',
    swatchPrimary: '#FAF6F0',
    swatchAccent: '#865B2B',
    vars: {
      '--bg-canvas': '#FAF6F0',
      '--bg-surface': '#F2EBE0',
      '--bg-elevated': '#FFFDF9',
      '--bg-subtle': '#E9DFCF',
      '--text-primary': '#211A14',
      '--text-secondary': '#534538',
      '--text-muted': '#746353',
      '--border-subtle': '#E1D5C4',
      '--border-strong': '#CBB9A0',
      '--accent': '#865B2B',
      '--accent-hover': '#6B471F',
      '--accent-contrast': '#FFFFFF',
      '--accent-soft': 'rgba(134, 91, 43, 0.10)',
      '--shadow-card': '0 1px 2px rgba(45, 32, 18, 0.05), 0 10px 24px rgba(45, 32, 18, 0.05)',
    },
  },
  {
    id: 'rose',
    name: 'Rose Velvet',
    shortLabel: 'Rose',
    category: 'light',
    swatchPrimary: '#FDF6F7',
    swatchAccent: '#9B2C4E',
    vars: {
      '--bg-canvas': '#FDF6F7',
      '--bg-surface': '#F7EAEF',
      '--bg-elevated': '#FFFFFF',
      '--bg-subtle': '#EEDBE2',
      '--text-primary': '#231319',
      '--text-secondary': '#5A3A46',
      '--text-muted': '#7A5764',
      '--border-subtle': '#E7D1D9',
      '--border-strong': '#D4B2BF',
      '--accent': '#9B2C4E',
      '--accent-hover': '#7E213D',
      '--accent-contrast': '#FFFFFF',
      '--accent-soft': 'rgba(155, 44, 78, 0.10)',
      '--shadow-card': '0 1px 2px rgba(56, 18, 32, 0.05), 0 10px 24px rgba(56, 18, 32, 0.05)',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald Sanctuary',
    shortLabel: 'Emerald',
    category: 'dark',
    swatchPrimary: '#081814',
    swatchAccent: '#D8B467',
    vars: {
      '--bg-canvas': '#081814',
      '--bg-surface': '#0F241E',
      '--bg-elevated': '#152E27',
      '--bg-subtle': '#1C3931',
      '--text-primary': '#F2F6F3',
      '--text-secondary': '#BDD0C8',
      '--text-muted': '#8FA89E',
      '--border-subtle': '#213D35',
      '--border-strong': '#31574B',
      '--accent': '#D8B467',
      '--accent-hover': '#E7C882',
      '--accent-contrast': '#0B1713',
      '--accent-soft': 'rgba(216, 180, 103, 0.15)',
      '--shadow-card': '0 2px 6px rgba(0, 0, 0, 0.35), 0 12px 28px rgba(0, 0, 0, 0.28)',
    },
  },
  {
    id: 'sapphire',
    name: 'Sapphire Midnight',
    shortLabel: 'Sapphire',
    category: 'dark',
    swatchPrimary: '#09111F',
    swatchAccent: '#D5B274',
    vars: {
      '--bg-canvas': '#09111F',
      '--bg-surface': '#101B2E',
      '--bg-elevated': '#16243B',
      '--bg-subtle': '#1D2E4A',
      '--text-primary': '#F1F5FA',
      '--text-secondary': '#BAC6D9',
      '--text-muted': '#8D9EB8',
      '--border-subtle': '#20314E',
      '--border-strong': '#314970',
      '--accent': '#D5B274',
      '--accent-hover': '#E5C68E',
      '--accent-contrast': '#0A1220',
      '--accent-soft': 'rgba(213, 178, 116, 0.15)',
      '--shadow-card': '0 2px 6px rgba(0, 0, 0, 0.38), 0 12px 28px rgba(0, 0, 0, 0.28)',
    },
  },
  {
    id: 'plum',
    name: 'Plum Couture',
    shortLabel: 'Plum',
    category: 'dark',
    swatchPrimary: '#160D19',
    swatchAccent: '#E2A6B5',
    vars: {
      '--bg-canvas': '#160D19',
      '--bg-surface': '#211426',
      '--bg-elevated': '#2B1B31',
      '--bg-subtle': '#36223D',
      '--text-primary': '#F7F1F8',
      '--text-secondary': '#CEBCD3',
      '--text-muted': '#A38DA9',
      '--border-subtle': '#382540',
      '--border-strong': '#50365B',
      '--accent': '#E2A6B5',
      '--accent-hover': '#EEBDC9',
      '--accent-contrast': '#1A0E1D',
      '--accent-soft': 'rgba(226, 166, 181, 0.15)',
      '--shadow-card': '0 2px 6px rgba(0, 0, 0, 0.36), 0 12px 28px rgba(0, 0, 0, 0.26)',
    },
  },
  {
    id: 'sage',
    name: 'Botanical Sage',
    shortLabel: 'Sage',
    category: 'light',
    swatchPrimary: '#F4F7F4',
    swatchAccent: '#285A43',
    vars: {
      '--bg-canvas': '#F4F7F4',
      '--bg-surface': '#E9EFEA',
      '--bg-elevated': '#FFFFFF',
      '--bg-subtle': '#DCE5DE',
      '--text-primary': '#121E18',
      '--text-secondary': '#3B5046',
      '--text-muted': '#5C7267',
      '--border-subtle': '#D3DFD6',
      '--border-strong': '#B5C8BA',
      '--accent': '#285A43',
      '--accent-hover': '#1D4533',
      '--accent-contrast': '#FFFFFF',
      '--accent-soft': 'rgba(40, 90, 67, 0.10)',
      '--shadow-card': '0 1px 2px rgba(18, 36, 28, 0.04), 0 8px 24px rgba(18, 36, 28, 0.04)',
    },
  },
];

export const QUICK_CUSTOM_COLORS = [
  { name: 'Antique Gold', hex: '#9A7228' },
  { name: 'Crimson Velvet', hex: '#9E2A47' },
  { name: 'Royal Cobalt', hex: '#1D4ED8' },
  { name: 'Deep Emerald', hex: '#0F6B50' },
  { name: 'Amethyst Plum', hex: '#7E22CE' },
  { name: 'Burnished Copper', hex: '#B45309' },
  { name: 'Ocean Teal', hex: '#0E7490' },
  { name: 'Coral Rose', hex: '#C2415C' },
];

/**
 * Computes relative luminance of a hex color for WCAG contrast selection.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned.padEnd(6, '0').slice(0, 6);
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const transform = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function adjustHexBrightness(hex: string, factor: number): string {
  const { r, g, b } = hexToRgb(hex);
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const nr = clamp(factor > 1 ? r + (255 - r) * (factor - 1) : r * factor);
  const ng = clamp(factor > 1 ? g + (255 - g) * (factor - 1) : g * factor);
  const nb = clamp(factor > 1 ? b + (255 - b) * (factor - 1) : b * factor);
  return `#${((1 << 24) + (nr << 16) + (ng << 8) + nb).toString(16).slice(1)}`;
}

/**
 * Ensures any arbitrary custom accent color maintains crisp contrast on both
 * White (light) and Obsidian (dark) bases.
 */
export function applyThemeToDocument(
  themeId: string,
  customAccentHex: string | null,
  customBase: 'light' | 'dark'
): void {
  const root = document.documentElement;
  const preset = SALON_THEMES.find((t) => t.id === themeId) ?? SALON_THEMES[0];

  const effectiveBase: 'light' | 'dark' =
    themeId === 'custom' ? customBase : preset.category;

  const baseTheme =
    themeId === 'custom'
      ? SALON_THEMES.find((t) => t.id === (customBase === 'dark' ? 'dark' : 'white'))!
      : preset;

  // Toggle Tailwind v4 `.dark` class cleanly
  if (effectiveBase === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Apply base CSS custom properties
  Object.entries(baseTheme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Override accent palette when user activates custom All-Color Mode
  if (themeId === 'custom' && customAccentHex) {
    let safeAccent = customAccentHex;
    const lum = getRelativeLuminance(safeAccent);

    // Ensure readable accent against light or dark background
    if (effectiveBase === 'light' && lum > 0.48) {
      safeAccent = adjustHexBrightness(safeAccent, 0.62);
    } else if (effectiveBase === 'dark' && lum < 0.18) {
      safeAccent = adjustHexBrightness(safeAccent, 1.45);
    }

    const finalLum = getRelativeLuminance(safeAccent);
    const contrastInk = finalLum > 0.36 ? '#141210' : '#FFFFFF';
    const hoverShade =
      effectiveBase === 'dark'
        ? adjustHexBrightness(safeAccent, 1.15)
        : adjustHexBrightness(safeAccent, 0.85);
    const { r, g, b } = hexToRgb(safeAccent);

    root.style.setProperty('--accent', safeAccent);
    root.style.setProperty('--accent-hover', hoverShade);
    root.style.setProperty('--accent-contrast', contrastInk);
    root.style.setProperty(
      '--accent-soft',
      `rgba(${r}, ${g}, ${b}, ${effectiveBase === 'dark' ? 0.16 : 0.10})`
    );
  }
}
