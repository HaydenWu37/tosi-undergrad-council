/**
 * A quiet, decorative network of nodes and connections. Generated from a
 * fixed seed so server and client render identically. A handful of nodes
 * pulse slowly and a few edges carry a faint travelling "signal".
 * Colour comes from `currentColor`, so set it with a text-* class.
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1200;
const H = 640;

function build(seed: number, cols: number, rows: number) {
  const rand = mulberry32(seed);
  const cw = W / cols;
  const ch = H / rows;
  const nodes: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (rand() < 0.28) continue;
      nodes.push({
        x: Math.round((i + 0.2 + rand() * 0.6) * cw),
        y: Math.round((j + 0.2 + rand() * 0.6) * ch),
        r: Math.round((1.6 + rand() * 1.6) * 10) / 10,
      });
    }
  }
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    nodes
      .map((m, k) => ({ k, d: (n.x - m.x) ** 2 + (n.y - m.y) ** 2 }))
      .filter(({ k, d }) => k !== i && d < (cw * 1.9) ** 2)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ k }) => {
        const key = i < k ? `${i}-${k}` : `${k}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, k]);
        }
      });
  });
  return { nodes, edges };
}

export function NeuralField({
  className = "",
  seed = 7,
  cols = 14,
  rows = 8,
}: {
  className?: string;
  seed?: number;
  cols?: number;
  rows?: number;
}) {
  const { nodes, edges } = build(seed, cols, rows);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.28">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g stroke="var(--color-signal-400)" strokeWidth="1.6" fill="none" opacity="0.7">
        {edges
          .filter((_, i) => i % 9 === 0)
          .map(([a, b], i) => (
            <line
              key={i}
              className="edge-signal"
              pathLength={120}
              style={{ animationDelay: `${(i * 1.3) % 7}s` }}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
            />
          ))}
      </g>
      <g fill="currentColor">
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            opacity="0.55"
            className={i % 7 === 0 ? "node-pulse" : undefined}
            style={i % 7 === 0 ? { animationDelay: `${(i % 5) * 1.1}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
