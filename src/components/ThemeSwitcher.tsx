import { useEffect, useRef, useState } from 'react';
import { Check, Moon, Palette, Sun, X } from 'lucide-react';
import { QUICK_CUSTOM_COLORS, SALON_THEMES } from '../theme/themes';

interface ThemeSwitcherProps {
  themeId: string;
  customHex: string;
  customBase: 'light' | 'dark';
  onSelectTheme: (id: string) => void;
  onSelectCustomColor: (hex: string, base: 'light' | 'dark') => void;
}

export function ThemeSwitcher({
  themeId,
  customHex,
  customBase,
  onSelectTheme,
  onSelectCustomColor,
}: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePreset = SALON_THEMES.find((t) => t.id === themeId);
  const isCurrentlyDark =
    themeId === 'custom' ? customBase === 'dark' : activePreset?.category === 'dark';

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const handleQuickLightDark = () => {
    if (isCurrentlyDark) {
      onSelectTheme('white');
    } else {
      onSelectTheme('dark');
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center gap-1.5">
      {/* Direct 1-click White / Dark Mode Toggle (sm+ screens; also inside popover for mobile) */}
      <button
        type="button"
        onClick={handleQuickLightDark}
        aria-label={isCurrentlyDark ? 'Switch to Pure White Mode' : 'Switch to Obsidian Dark Mode'}
        title={isCurrentlyDark ? 'Switch to White Mode' : 'Switch to Dark Mode'}
        className="hidden sm:flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer shrink-0"
      >
        {isCurrentlyDark ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {/* All-Color Modes Studio Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open White, Dark and All-Color Theme Modes"
        title="White, Dark & All-Color Modes"
        className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors cursor-pointer shrink-0 ${
          open
            ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
            : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
        }`}
      >
        <Palette className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Anchored Theme & All-Color Palette Popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Theme and Color Mode Selector"
          className="fixed inset-x-4 top-[68px] z-50 mx-auto max-w-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 text-[var(--text-primary)] shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:mx-0 sm:w-[340px]"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Display &amp; Color Modes
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                White, Dark, or any custom luxury palette
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close theme panel"
              className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Instant White / Dark Mode Bar */}
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelectTheme('white')}
              className={`flex min-h-[40px] items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                themeId === 'white'
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)]'
              }`}
            >
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              <span>White Mode</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme('dark')}
              className={`flex min-h-[40px] items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                themeId === 'dark'
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)]'
              }`}
            >
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Dark Mode</span>
            </button>
          </div>

          {/* Curated Light, Dark & Luxury Color Themes */}
          <div className="mt-4">
            <span className="block text-xs font-medium text-[var(--text-secondary)] mb-2.5">
              Curated Modes
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SALON_THEMES.map((theme) => {
                const selected = themeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onSelectTheme(theme.id)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selected
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black/15"
                        style={{ backgroundColor: theme.swatchPrimary }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: theme.swatchAccent }}
                        />
                      </span>
                      <span className="truncate">{theme.shortLabel}</span>
                    </span>
                    {selected && <Check className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* All-Color Custom Mode */}
          <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                All-Color Custom Mode
              </span>
              <div className="flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-0.5 text-[11px] font-medium">
                <button
                  type="button"
                  onClick={() => onSelectCustomColor(customHex, 'light')}
                  className={`rounded px-2 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                    themeId === 'custom' && customBase === 'light'
                      ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  White Base
                </button>
                <button
                  type="button"
                  onClick={() => onSelectCustomColor(customHex, 'dark')}
                  className={`rounded px-2 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                    themeId === 'custom' && customBase === 'dark'
                      ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Dark Base
                </button>
              </div>
            </div>

            {/* Quick Spectrum Swatches */}
            <div className="flex items-center justify-between gap-1.5 mb-3">
              {QUICK_CUSTOM_COLORS.map((swatch) => {
                const active =
                  themeId === 'custom' && customHex.toLowerCase() === swatch.hex.toLowerCase();
                return (
                  <button
                    key={swatch.hex}
                    type="button"
                    title={swatch.name}
                    aria-label={`Apply ${swatch.name} accent color`}
                    onClick={() => onSelectCustomColor(swatch.hex, customBase)}
                    className={`h-7 w-7 rounded-full border transition-transform hover:scale-110 cursor-pointer flex items-center justify-center ${
                      active
                        ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg-elevated)] border-white/60'
                        : 'border-black/15'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {active && <Check className="h-3.5 w-3.5 text-white drop-shadow-xs" />}
                  </button>
                );
              })}
            </div>

            {/* Full-Spectrum HTML5 Color Picker */}
            <label className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2 text-xs cursor-pointer hover:border-[var(--border-strong)] transition-colors">
              <span className="text-[var(--text-secondary)]">Pick any color spectrum</span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tabular-nums text-[var(--text-muted)]">
                  {customHex}
                </span>
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => onSelectCustomColor(e.target.value, customBase)}
                  aria-label="Choose custom accent color"
                  className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                />
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
