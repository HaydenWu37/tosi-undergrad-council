/** Fallback portrait: a soft cell-and-dendrite illustration, varied per member by index. */
export function NeuronAvatar({ variant = 0 }: { variant?: number }) {
  const rot = [0, 40, 80, 120, 160, 200][variant % 6];
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label="Portrait placeholder"
    >
      <rect width="200" height="200" className="fill-brand-50" />
      <g className="stroke-brand-300" strokeWidth="1" opacity="0.6" fill="none">
        <circle cx="100" cy="100" r="86" />
        <circle cx="100" cy="100" r="62" />
      </g>
      <g transform={`rotate(${rot} 100 100)`} className="stroke-brand-600" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M100 100 50 52M100 100 32 108M100 100l18-64M100 100l62-34M100 100l58 50M100 100l-22 66" />
        <path d="M50 52 30 40M50 52l4-26M162 66l18-6M158 150l14 16" opacity="0.6" strokeWidth="2.2" />
      </g>
      <circle cx="100" cy="100" r="22" className="fill-brand-700" />
      <circle cx="100" cy="100" r="8" className="fill-signal-400" />
    </svg>
  );
}
