/** Playful lab-notebook shapes taken from the Instagram posts. All decorative. */

export function AtomMark({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
      <ellipse cx="32" cy="32" rx="26" ry="10" />
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(120 32 32)" />
      <circle cx="32" cy="32" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Three yellow "ping" strokes. */
export function Sparkle({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-signal-400)" strokeWidth="5" strokeLinecap="round" aria-hidden="true" className={className}>
      <path d="M8 22 4 8M22 14 28 3M30 26l14-4" />
    </svg>
  );
}

/** Hand-drawn underline. Place it absolutely under a word. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" fill="none" stroke="var(--color-signal-400)" strokeWidth="5" strokeLinecap="round" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M3 9c22-8 38 6 60-1s38-6 60 0 46 5 74-3" />
    </svg>
  );
}
