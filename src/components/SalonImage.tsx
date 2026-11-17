import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SalonImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * Resilient editorial image component enforcing strict .jpg loading,
 * referrerPolicy="no-referrer", and an architectural fallback surface
 * so no broken image frame ever appears.
 */
export function SalonImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
}: SalonImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-[var(--bg-subtle)] text-[var(--text-muted)] p-6 text-center ${className}`}
      >
        <Sparkles className="w-5 h-5 opacity-60" aria-hidden="true" />
        <span className="font-display text-lg tracking-wide text-[var(--text-secondary)]">
          {fallbackTitle || 'Beauty Lounge by Fatima Nasir'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
