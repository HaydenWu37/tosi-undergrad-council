/**
 * Concentric "cell" diagram: the Undergraduate Council sits inside the wider
 * TOSI community. Labels are intentionally generic; edit them as needed.
 */
export function CommunityDiagram() {
  return (
    <figure className="mx-auto w-full max-w-md">
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-labelledby="community-diagram-title community-diagram-desc"
        className="h-auto w-full"
      >
        <title id="community-diagram-title">The Undergraduate Council within TOSI</title>
        <desc id="community-diagram-desc">
          Three nested circles. The outermost is the wider TOSI community, then TOSI trainees,
          and at the centre the Undergraduate Council.
        </desc>
        <g className="fill-none stroke-brand-200" strokeWidth="1">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * 150}
                y1={200 + Math.sin(a) * 150}
                x2={200 + Math.cos(a) * 190}
                y2={200 + Math.sin(a) * 190}
              />
            );
          })}
        </g>
        <circle cx="200" cy="200" r="150" className="fill-brand-50 stroke-brand-300" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="105" className="fill-brand-100 stroke-brand-400" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="58" className="fill-brand-700" />
        <circle cx="200" cy="200" r="6" className="fill-signal-400" />
        <g className="font-mono" fontSize="11" letterSpacing="1.4" textAnchor="middle">
          <text x="200" y="66" className="fill-ink-700">TOSI COMMUNITY</text>
          <text x="200" y="130" className="fill-brand-900">TRAINEES</text>
          <text x="200" y="228" className="fill-white" fontSize="10">UNDERGRAD</text>
          <text x="200" y="242" className="fill-white" fontSize="10">COUNCIL</text>
        </g>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-ink-600">
        The Council connects undergraduates to the wider TOSI community.
      </figcaption>
    </figure>
  );
}
