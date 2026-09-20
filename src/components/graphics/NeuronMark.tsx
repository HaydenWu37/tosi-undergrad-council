/** Simple neuron glyph used as the site mark and favicon motif (not TOSI's official logo). */
export function NeuronMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M16 16 8 7.5M16 16 6 18M16 16l3-11M16 16l10-5.5M16 16l9.5 8M16 16l-3.5 10" />
        <path d="M8 7.5 4.5 6M8 7.5 8.5 3.5M25.5 24l2.5 3M26 10.5l3-.5M19 5l2.5-2.5" opacity="0.7" />
      </g>
      <circle cx="16" cy="16" r="5.2" fill="currentColor" />
      <circle cx="16" cy="16" r="2" fill="var(--color-signal-400)" />
    </svg>
  );
}
