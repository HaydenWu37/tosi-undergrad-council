"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ────────────────────────────────────────────────────────────────
 *  NEURAL SCENE — tweakable config
 *  Everything about color, density, and speed lives here. Nothing
 *  below this block should need touching for a visual tweak.
 * ────────────────────────────────────────────────────────────────
 */
const CONFIG = {
  /** Node count. Lower on narrow screens for performance. */
  nodeCount: { desktop: 480, mobile: 220 },
  /** Seconds for one scene to morph into the next. */
  morphDuration: 1.2,
  /** Max device pixel ratio the renderer will use — caps GPU cost on retina/4K. */
  maxPixelRatio: 2,
  /** Point size in CSS pixels, before pixel-ratio scaling. */
  pointSize: 5.2,
  /** Overall spread of the point cloud (world units). */
  radius: 2.6,
  /** Camera distance from the origin. */
  cameraDistance: 5.2,
  /** How far (world units) the cursor's glow/brighten effect reaches. */
  mouseInfluence: 1.1,
  /** Max rotation (radians) the whole scene additionally tilts toward the cursor / auto-drift. */
  maxTilt: 0.22,
  /** Constant per-scene tilt (radians) so DNA/molecule read as 3D from frame one,
   *  not just once the cursor happens to move. */
  baseTiltX: { neuron: 0.04, dna: 0.08, molecule: 0.3, cluster: 0.18 },
  /** Continuous idle spin (radians/sec) — this is what makes "rotating double
   *  helix" actually rotate, and gives every scene presence even with no input. */
  rotationSpeed: { neuron: 0.045, dna: 0.18, molecule: 0.13, cluster: 0.07 },
  /** Base opacity per scene (brief's "reduce opacity behind text-heavy areas" —
   *  override per-section via the `data-scene-intensity="0.4"` attribute).
   *  Present and legible as a signature visual, but tuned toward the
   *  editorial "delicate, low-contrast" register rather than maximum
   *  boldness — it should feel like atmosphere, not a loud effect. */
  sceneOpacity: { neuron: 0.68, dna: 0.62, molecule: 0.52, cluster: 0.64 },
  lineOpacity: 0.2,
  /** How many of the neuron scene's edges carry a traveling "signal" spark —
   *  the one deliberate "wow" flourish, kept rare on purpose so it reads as a
   *  signature detail, not noise. */
  pulseCount: 34,
  pulseSpeed: 0.5, // fraction of the edge traveled per second
  pulseSize: 9,
  /** Cheap "fake bloom": a second, bigger/fainter additive draw of the same
   *  points, behind the crisp ones — a soft, glowing halo with none of the
   *  cost or transparent-canvas risk of real post-process bloom. Large and
   *  soft on purpose — this is what makes the effect read as luminous mist
   *  rather than a flat point cloud. */
  glowSizeMul: 3.2,
  glowOpacity: 0.32,
  /** How far (world units) the cursor pushes nearby nodes away, on top of
   *  the brighten effect — a gentle shimmer, not a scatter. */
  repelStrength: 0.28,
  /** Morph points don't all move in lockstep — each starts within this
   *  fraction of the morph window (by its own fixed random seed), so the
   *  shape reorganizes as a ripple rather than a uniform snap. */
  staggerSpread: 0.45,
  /** Slow per-node brightness shimmer, independent of everything else. */
  breatheSpeed: 1.4,
  breatheAmount: 0.18,
  /** Molecule scene: how many orbital rings ("electron shells") fan out
   *  around the nucleus, each the same size but rotated to a different
   *  angle through the centre — the overlapping-ellipse "flower" look of a
   *  classic atom diagram, one electron riding each ring. */
  moleculeRings: 8,
  moleculeRingA: 0.78, // ellipse semi-major axis, × CONFIG.radius
  moleculeRingB: 0.3, // ellipse semi-minor axis, × CONFIG.radius
  moleculeTiltX: 0.4, // shared tilt so the flower reads as 3D, not flat-on
  /** How fast each ring's electron travels its orbit (radians/sec), scaled
   *  per-ring below so shells don't all tick in lockstep. */
  electronOrbitSpeed: 0.5,
  /** DNA scene: resolution of the smooth backbone curves drawn alongside the
   *  discrete node chain — purely decorative, independent of node count. */
  dnaCurveSegments: 160,
  dnaTurns: 3.5,
  dnaHeightMul: 1.9,
  dnaHelixRMul: 0.55,
  colors: {
    /** The site's hero accent (reuses --color-signal-500, not a new hex). */
    azure: new THREE.Color("#2563eb"),
    /** Pale mist blue, used for most nodes so azure stays an accent, not a wash. */
    mist: new THREE.Color("#bcd2f0"),
    /** Faint periwinkle highlight, echoes the page's indigo spectral accent. */
    lavender: new THREE.Color("#a5abf7"),
    white: new THREE.Color("#ffffff"),
    /** A sparse warm ember, reused from --color-gold-400 — the one deliberate
     *  warm note against the cool azure/mist field, for the same warm-against-
     *  cool glow the reference imagery (DNA/atom renders on deep navy) has. */
    amber: new THREE.Color("#f59e0b"),
    /** Iridescent accents — mother-of-pearl, muted rose, soft teal. Blended
     *  in only at each point's rim, and only faintly (see uIridAmount), so
     *  it reads as a shimmer on glass rather than a rainbow. */
    pearl: new THREE.Color("#f3f1ff"),
    roseShimmer: new THREE.Color("#f0d6e4"),
    tealShimmer: new THREE.Color("#c9ece6"),
  },
  /** Roughly what fraction of nodes lean azure vs. lavender vs. mist. */
  colorMix: { azure: 0.22, lavender: 0.18 },
  /** Tiny, slow positional drift — "fine branches sway almost
   *  imperceptibly," not a jitter. World units. */
  swayAmount: 0.02,
  /** How much of each point's rim blends toward the iridescent accents, and
   *  how fast that shimmer drifts. Deliberately small. */
  iridescence: { amount: 0.3, speed: 0.1 },
  /** The "magic moment": a wave of light that ripples outward from one
   *  origin node through the connected network when triggered. Delay is
   *  seconds-per-graph-hop (so it visibly travels, not flashes at once). */
  cascade: { hopDelay: 0.065, rise: 0.4, fade: 1.1 },
};

export type SceneName = "neuron" | "dna" | "molecule" | "cluster";

/* ──────────────────────────────────────────────────────────────
 *  Shape generators. Each returns `nodeCount` positions (so the
 *  point cloud can morph between them without changing geometry
 *  size) plus an edge list — pairs of point indices to draw lines
 *  between, shaped appropriately for that form.
 * ────────────────────────────────────────────────────────────── */

function buildNeuron(n: number, r: number): { positions: Float32Array; edges: [number, number][] } {
  const positions = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    // A loose, slightly-flattened cloud — reads as a network, not a sphere.
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const rr = r * (0.35 + 0.65 * Math.cbrt(Math.random()));
    positions[i * 3] = rr * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = rr * Math.sin(phi) * Math.sin(theta) * 0.7;
    positions[i * 3 + 2] = rr * Math.cos(phi) * 0.6;
  }
  // Connect each point to its ~2 nearest neighbors — brute force, but this
  // only runs once per scene build (a few hundred points), not per frame.
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < n; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      dists.push({ j, d: dx * dx + dy * dy + dz * dz });
    }
    dists.sort((a, b) => a.d - b.d);
    for (const { j } of dists.slice(0, 2)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }
  return { positions, edges };
}

/** Several tight sub-clusters, densely wired within themselves and linked to
 *  their neighbors by a few sparse bridges — distinct teams, each close-knit,
 *  joined into one whole. The Team page's "collaboration and
 *  interconnectedness" scene, visually distinct from the single loose cloud
 *  (neuron), the helix (dna), and the nucleus-and-rings (molecule). */
function buildCluster(n: number, r: number): { positions: Float32Array; edges: [number, number][] } {
  const positions = new Float32Array(n * 3);
  const numClusters = 5;
  const centers: [number, number, number][] = [];
  for (let c = 0; c < numClusters; c++) {
    const theta = (c / numClusters) * Math.PI * 2;
    const phi = Math.acos(1 - 2 * ((c + 0.5) / numClusters));
    const cr = r * 0.55;
    centers.push([cr * Math.sin(phi) * Math.cos(theta), cr * Math.sin(phi) * Math.sin(theta) * 0.8, cr * Math.cos(phi) * 0.8]);
  }

  const clusterOf = new Int32Array(n);
  const perCluster = Math.floor(n / numClusters);
  for (let i = 0; i < n; i++) {
    const c = Math.min(numClusters - 1, Math.floor(i / perCluster));
    clusterOf[i] = c;
    const [cx, cy, cz] = centers[c];
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const rr = r * 0.2 * Math.cbrt(Math.random());
    positions[i * 3] = cx + rr * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = cy + rr * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = cz + rr * Math.cos(phi);
  }

  // Within each cluster, connect each point to its ~2 nearest neighbors in
  // the same cluster — brute force, but scoped per cluster and only run
  // once per scene build, not per frame.
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let c = 0; c < numClusters; c++) {
    const members: number[] = [];
    for (let i = 0; i < n; i++) if (clusterOf[i] === c) members.push(i);
    for (const i of members) {
      const dists: { j: number; d: number }[] = [];
      for (const j of members) {
        if (j === i) continue;
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        dists.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      dists.sort((a, b) => a.d - b.d);
      for (const { j } of dists.slice(0, 2)) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      }
    }
  }
  // A few sparse bridges between each cluster and the next, closing the
  // loop — the "teams joined into one whole" that separates this from a
  // handful of disconnected blobs.
  for (let c = 0; c < numClusters; c++) {
    const next = (c + 1) % numClusters;
    let bestA = -1, bestB = -1, bestD = Infinity;
    for (let i = 0; i < n; i++) {
      if (clusterOf[i] !== c) continue;
      for (let j = 0; j < n; j++) {
        if (clusterOf[j] !== next) continue;
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = dx * dx + dy * dy + dz * dz;
        if (d < bestD) { bestD = d; bestA = i; bestB = j; }
      }
    }
    if (bestA >= 0) edges.push([bestA, bestB]);
  }
  return { positions, edges };
}

/** A point on a ring that's been laid out exactly like `buildMoleculeOrbitCurve`
 *  lays out its line geometry: an ellipse in the XY plane, rotated `zRot`
 *  around Z (spreads the rings into a flower), then tilted `tiltX` around X
 *  (so the whole flower reads as 3D). Reused for the electron that rides
 *  each ring, so it's always exactly on the curve drawn for it. */
function ringPoint(radiusA: number, radiusB: number, zRot: number, tiltX: number, angle: number): [number, number, number] {
  const ex = radiusA * Math.cos(angle);
  const ey = radiusB * Math.sin(angle);
  const rx = ex * Math.cos(zRot) - ey * Math.sin(zRot);
  const ry = ex * Math.sin(zRot) + ey * Math.cos(zRot);
  const fy = ry * Math.cos(tiltX);
  const fz = ry * Math.sin(tiltX);
  return [rx, fy, fz];
}

/** Smooth-curve geometry (independent of the morphing node system) for one
 *  molecule orbit ring — a continuous ellipse rather than a sparse polygon. */
function buildMoleculeOrbitCurve(radiusA: number, radiusB: number, zRot: number, tiltX: number, segments = 64): Float32Array {
  const points = new Float32Array((segments + 1) * 3);
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const [x, y, z] = ringPoint(radiusA, radiusB, zRot, tiltX, angle);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

/** Smooth-curve geometry for one DNA backbone strand (`phase` 0 or π), at
 *  much finer resolution than the discrete node chain — a continuous
 *  flowing ribbon layered behind the points, instead of a straight-segment
 *  polygon between them. Uses the exact same parametric formula as
 *  `buildDNA` so it lines up with the node chain precisely. */
function buildDNABackboneCurve(r: number, phase: number, segments: number): Float32Array {
  const turns = CONFIG.dnaTurns;
  const height = r * CONFIG.dnaHeightMul;
  const helixR = r * CONFIG.dnaHelixRMul;
  const points = new Float32Array((segments + 1) * 3);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * turns * Math.PI * 2 + phase;
    const y = (t - 0.5) * height;
    points[i * 3] = helixR * Math.cos(angle);
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = helixR * Math.sin(angle);
  }
  return points;
}

function buildDNA(n: number, r: number): { positions: Float32Array; edges: [number, number][] } {
  const positions = new Float32Array(n * 3);
  const pairs = Math.floor(n / 2);
  const turns = CONFIG.dnaTurns;
  const height = r * CONFIG.dnaHeightMul;
  const helixR = r * CONFIG.dnaHelixRMul;
  // Real DNA reads as a ladder because its rungs are sparse (~10 base pairs
  // per turn) — drawing one for every point pair (here, dozens per turn)
  // turns the gaps between them into a dense crosshatch instead. The
  // backbone itself is carried by the smooth curve overlay
  // (buildDNABackboneCurve), so the discrete per-point edges below only
  // need to place the rungs, at a realistic spacing.
  const rungStep = Math.max(1, Math.round(pairs / (turns * 10)));
  const edges: [number, number][] = [];
  for (let i = 0; i < pairs; i++) {
    const t = i / Math.max(1, pairs - 1);
    const angle = t * turns * Math.PI * 2;
    const y = (t - 0.5) * height;
    const aIdx = i * 2;
    const bIdx = i * 2 + 1;
    positions[aIdx * 3] = helixR * Math.cos(angle);
    positions[aIdx * 3 + 1] = y;
    positions[aIdx * 3 + 2] = helixR * Math.sin(angle);
    positions[bIdx * 3] = helixR * Math.cos(angle + Math.PI);
    positions[bIdx * 3 + 1] = y;
    positions[bIdx * 3 + 2] = helixR * Math.sin(angle + Math.PI);
    if (i % rungStep === 0) edges.push([aIdx, bIdx]);
  }
  // Any odd leftover point just rests near the centre — never visible as an outlier
  // once lines settle, and keeps every scene's point count identical.
  for (let i = pairs * 2; i < n; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 1] = (Math.random() - 0.5) * height;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }
  return { positions, edges };
}

/** Atom-diagram layout, matching the classic reference: a dense packed
 *  nucleus plus a handful of same-size orbital rings fanned around it at
 *  different angles (not concentric shells of growing radius), one bright
 *  electron riding each ring. The rings themselves are drawn as smooth
 *  curves (see `buildMoleculeOrbitCurve`) — here we only place the discrete
 *  nucleus points and the one electron per ring. */
function buildMolecule(n: number, r: number): { positions: Float32Array; edges: [number, number][] } {
  const positions = new Float32Array(n * 3);
  const edges: [number, number][] = [];
  const numRings = CONFIG.moleculeRings;
  const electronCount = numRings;
  const ringA = r * CONFIG.moleculeRingA;
  const ringB = r * CONFIG.moleculeRingB;
  const tiltX = CONFIG.moleculeTiltX;

  // Electrons: indices [0, electronCount) — one per ring, each starting at a
  // different point along its orbit. `tick()` advances them in real time
  // once the molecule scene has settled, so they actually orbit.
  for (let i = 0; i < electronCount; i++) {
    const zRot = (i / numRings) * Math.PI;
    const [x, y, z] = ringPoint(ringA, ringB, zRot, tiltX, (i * 2.4) % (Math.PI * 2));
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  // Nucleus: everything else, packed into a dense glowing ball — real nuclei
  // read as a tight cluster of spheres, not a sparse scatter, and no
  // internal wiring is needed to sell that (lines would just clutter it).
  for (let i = electronCount; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const rr = r * 0.24 * Math.cbrt(Math.random());
    positions[i * 3] = rr * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = rr * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = rr * Math.cos(phi);
  }
  // A faint bond from each electron back to the nucleus centre — the one
  // piece of wiring worth keeping, echoes electron/nucleus attraction.
  for (let i = 0; i < electronCount; i++) edges.push([i, electronCount]);
  return { positions, edges };
}

function buildScene(name: SceneName, n: number): { positions: Float32Array; edges: [number, number][] } {
  if (name === "dna") return buildDNA(n, CONFIG.radius);
  if (name === "molecule") return buildMolecule(n, CONFIG.radius);
  if (name === "cluster") return buildCluster(n, CONFIG.radius);
  return buildNeuron(n, CONFIG.radius);
}

/* ── Point shader: soft circular glow, depth fade, cursor brighten + repel,
 *    a slow per-node breathing shimmer, a tiny organic sway, rim
 *    iridescence, and a traveling "cascade" wave for the one deliberate
 *    click interaction. Kept deliberately simple (no lighting model) —
 *    this is background decoration, not a lit 3D object. */
const VERTEX_SHADER = /* glsl */ `
  uniform float uPixelRatio;
  uniform float uBaseSize;
  uniform float uRefDist; // camera distance a point renders at ~uBaseSize px — NOT an arbitrary constant
  uniform vec3 uMouseWorld;
  uniform float uMouseInfluence;
  uniform float uRepelStrength;
  uniform float uTime;
  uniform float uBreatheSpeed;
  uniform float uBreatheAmount;
  uniform float uSwayAmount;
  uniform float uIridSpeed;
  uniform float uCascadeStart;
  uniform float uCascadeActive;
  uniform float uCascadeRise;
  uniform float uCascadeFade;
  attribute float aRand;
  attribute float aSizeMul;
  attribute vec3 aColor;
  attribute float aCascadeDelay;
  varying float vAlpha;
  varying float vBrighten;
  varying vec3 vColor;
  varying float vIrid;
  varying float vCascade;

  void main() {
    vec3 pos = position;

    // Fine, slow organic drift — never enough to look like jitter.
    pos.x += sin(uTime * 0.55 + aRand * 6.2831853) * uSwayAmount;
    pos.y += cos(uTime * 0.47 + aRand * 6.2831853 * 1.3) * uSwayAmount;
    pos.z += sin(uTime * 0.6 + aRand * 6.2831853 * 0.7) * uSwayAmount * 0.6;

    float d = distance(pos, uMouseWorld);
    vBrighten = smoothstep(uMouseInfluence, 0.0, d);
    // Gently push nodes near the cursor away from it — a shimmer, not a scatter.
    vec3 away = pos - uMouseWorld;
    float awayLen = max(0.0001, length(away));
    pos += (away / awayLen) * vBrighten * uRepelStrength;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = max(0.001, -mvPosition.z);
    // Depth-aware response: nodes nearer the camera react a little more to
    // the cursor than far ones — a cheap but genuine sense of layered depth.
    float depthFactor = clamp(1.6 - dist / 6.0, 0.45, 1.35);
    vBrighten *= depthFactor;

    float breathe = 1.0 + sin(uTime * uBreatheSpeed + aRand * 6.2831853) * uBreatheAmount;
    vAlpha = clamp(1.4 - dist / 6.0, 0.08, 1.0) * breathe; // farther nodes fade out
    vColor = aColor;
    vIrid = fract(uTime * uIridSpeed + aRand + (pos.x + pos.y) * 0.08);

    // Cascade: a wave of light reaching this node aCascadeDelay seconds
    // after the trigger, rising then fading — travels outward through the
    // graph rather than flashing everywhere at once.
    float cascadeT = uTime - uCascadeStart - aCascadeDelay;
    float rise = smoothstep(0.0, uCascadeRise, cascadeT);
    float fall = 1.0 - smoothstep(uCascadeRise, uCascadeRise + uCascadeFade, cascadeT);
    vCascade = uCascadeActive * clamp(rise * fall, 0.0, 1.0) * step(0.0, cascadeT);

    gl_PointSize = (uBaseSize + aRand * 1.2) * aSizeMul * uPixelRatio * (uRefDist / dist) * breathe * (1.0 + vCascade * 0.9);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;
  uniform float uOpacity;
  uniform vec3 uIridA;
  uniform vec3 uIridB;
  uniform vec3 uIridC;
  uniform float uIridAmount;
  varying float vAlpha;
  varying float vBrighten;
  varying vec3 vColor;
  varying float vIrid;
  varying float vCascade;

  // A slow drift between three pearly accents — never a full rainbow, just
  // a faint shimmer like light on mother-of-pearl.
  vec3 iridescent(float t, vec3 a, vec3 b, vec3 c) {
    float p = fract(t);
    if (p < 0.5) return mix(a, b, p * 2.0);
    return mix(b, c, (p - 0.5) * 2.0);
  }

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    float soft = smoothstep(0.5, 0.05, r);
    if (soft <= 0.001) discard;
    // Glassy bead shading: a translucent tinted core, an offset specular
    // highlight, and a brighter rim where the "glass" catches the light —
    // reads as a small polished sphere instead of a flat soft dot.
    float highlight = smoothstep(0.22, 0.0, length(c - vec2(-0.15, 0.17)));
    float rim = smoothstep(0.36, 0.5, r);
    vec3 base = mix(vColor, vec3(1.0), 0.18 + vBrighten * 0.4);
    vec3 col = base + vec3(1.0) * highlight * 0.6 + vec3(1.0) * rim * 0.3;
    // Iridescence lives at the rim, where glass actually catches light —
    // the core stays true to the node's own color.
    vec3 shimmer = iridescent(vIrid, uIridA, uIridB, uIridC);
    col = mix(col, shimmer, uIridAmount * rim);
    // The cascade wave: a brief, bright pulse passing through.
    col = mix(col, vec3(1.0), vCascade * 0.75);
    float a = soft * vAlpha * uOpacity * (0.75 + vBrighten * 0.45 + vCascade * 0.7);
    gl_FragColor = vec4(col, a);
  }
`;

interface EngineHandle {
  setScene: (name: SceneName, opacityOverride?: number) => void;
  setMouse: (nx: number, ny: number) => void;
  /** The "magic moment": ripples a wave of light outward from a node
   *  through the currently-active graph. See CONFIG.cascade. */
  triggerCascade: () => void;
  dispose: () => void;
}

/** Builds and runs the WebGL scene on a given canvas. Pure Three.js, no React in here. */
function createEngine(canvas: HTMLCanvasElement, reducedMotion: boolean, isTouch: boolean): EngineHandle | null {
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  try {
    gl = (canvas.getContext("webgl2") as WebGL2RenderingContext | null) || canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return null; // No WebGL: caller leaves the canvas unmounted, CSS gradient remains.

  // Some environments (disabled GPU acceleration, certain VMs/remote desktops,
  // locked-down corporate machines) still hand back a *context* here, backed
  // by a software rasterizer (SwiftShader / llvmpipe / "Software Rasterizer").
  // That path creates fine but silently renders nothing useful for this
  // shader — rather than leave a broken invisible canvas, treat it the same
  // as "WebGL unavailable" and let the CSS gradient be the only background.
  try {
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    if (/swiftshader|llvmpipe|software rasterizer|software renderer/i.test(renderer)) {
      return null;
    }
  } catch {
    // If the debug extension itself isn't available, proceed as normal —
    // most real browsers with real GPUs don't block it.
  }

  const isMobile = window.innerWidth < 768;
  const n = isMobile ? CONFIG.nodeCount.mobile : CONFIG.nodeCount.desktop;

  const renderer = new THREE.WebGLRenderer({ canvas, context: gl as WebGLRenderingContext, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 20);
  camera.position.set(0, 0, CONFIG.cameraDistance);

  const group = new THREE.Group();
  scene.add(group);

  // Precompute all four forms once; morphing only interpolates between them.
  const shapes: Record<SceneName, { positions: Float32Array; edges: [number, number][] }> = {
    neuron: buildScene("neuron", n),
    dna: buildScene("dna", n),
    molecule: buildScene("molecule", n),
    cluster: buildScene("cluster", n),
  };
  const maxEdges = Math.max(...Object.values(shapes).map((s) => s.edges.length));

  // Per-point random seed + color, fixed for the lifetime of the scene. Color
  // is biased by index parity (not pure random) — harmless everywhere, but it
  // means the DNA shape's two strands (even/odd indices, see buildDNA) come
  // out as two distinctly-colored spirals instead of a uniform speckle, which
  // is most of what makes a double helix actually read as a double helix.
  const aRand = new Float32Array(n);
  const aColor = new Float32Array(n * 3);
  const aSizeMul = new Float32Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    aRand[i] = Math.random();
    const leansAzure = i % 2 === 0;
    const roll = Math.random();
    const warmRoll = Math.random();
    const c = warmRoll < 0.07
      ? CONFIG.colors.amber
      : leansAzure
        ? roll < 0.62
          ? CONFIG.colors.azure
          : CONFIG.colors.mist
        : roll < 0.58
          ? CONFIG.colors.lavender
          : CONFIG.colors.mist;
    aColor[i * 3] = c.r;
    aColor[i * 3 + 1] = c.g;
    aColor[i * 3 + 2] = c.b;
  }
  // The first few points double as the molecule scene's electrons (see
  // buildMolecule) — give them a little extra size so they stay easy to spot
  // riding their orbit rings, in every scene they appear in.
  const electronCount = CONFIG.moleculeRings;
  for (let i = 0; i < electronCount; i++) aSizeMul[i] = 1.7;

  const livePositions = new Float32Array(shapes.neuron.positions);
  const fromPositions = new Float32Array(livePositions);
  const toPositions = new Float32Array(livePositions);

  // Cascade ("magic moment"): per-node seconds-of-delay from whatever node
  // last triggered a light wave — recomputed by `triggerCascade()` via a
  // graph BFS. Starts at 0 everywhere; harmless until a trigger happens,
  // since uCascadeStart (see below) starts far enough in the past that the
  // wave has already fully decayed.
  const aCascadeDelay = new Float32Array(n);

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(livePositions, 3));
  pointsGeometry.setAttribute("aRand", new THREE.BufferAttribute(aRand, 1));
  pointsGeometry.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
  pointsGeometry.setAttribute("aSizeMul", new THREE.BufferAttribute(aSizeMul, 1));
  pointsGeometry.setAttribute("aCascadeDelay", new THREE.BufferAttribute(aCascadeDelay, 1));

  // Shared (by reference) across all three point layers below, so the sway,
  // shimmer, and cascade wave all move in perfect lockstep no matter which
  // layer is drawing a given node.
  const sharedUniforms = {
    uSwayAmount: { value: CONFIG.swayAmount },
    uIridSpeed: { value: CONFIG.iridescence.speed },
    uIridA: { value: CONFIG.colors.pearl },
    uIridB: { value: CONFIG.colors.roseShimmer },
    uIridC: { value: CONFIG.colors.tealShimmer },
    uIridAmount: { value: CONFIG.iridescence.amount },
    uCascadeStart: { value: -9999 },
    uCascadeActive: { value: 1 },
    uCascadeRise: { value: CONFIG.cascade.rise },
    uCascadeFade: { value: CONFIG.cascade.fade },
  };

  const pointsMaterial = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uPixelRatio: { value: renderer.getPixelRatio() },
      uBaseSize: { value: CONFIG.pointSize },
      uRefDist: { value: CONFIG.cameraDistance },
      uMouseWorld: { value: new THREE.Vector3(10, 10, 10) },
      uMouseInfluence: { value: CONFIG.mouseInfluence },
      uRepelStrength: { value: CONFIG.repelStrength },
      uTime: { value: 0 },
      uBreatheSpeed: { value: CONFIG.breatheSpeed },
      uBreatheAmount: { value: CONFIG.breatheAmount },
      uOpacity: { value: CONFIG.sceneOpacity.neuron },
      ...sharedUniforms,
    },
  });
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  group.add(points);

  // Cheap "fake bloom": the same points, drawn again bigger/fainter with
  // additive blending, behind the crisp layer. No EffectComposer, no
  // render-target alpha gotchas — just a second cheap draw call.
  const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uPixelRatio: { value: renderer.getPixelRatio() },
      uBaseSize: { value: CONFIG.pointSize * CONFIG.glowSizeMul },
      uRefDist: { value: CONFIG.cameraDistance },
      uMouseWorld: pointsMaterial.uniforms.uMouseWorld,
      uMouseInfluence: { value: CONFIG.mouseInfluence },
      uRepelStrength: { value: CONFIG.repelStrength },
      uTime: pointsMaterial.uniforms.uTime,
      uBreatheSpeed: { value: CONFIG.breatheSpeed },
      uBreatheAmount: { value: CONFIG.breatheAmount },
      uOpacity: { value: CONFIG.sceneOpacity.neuron * CONFIG.glowOpacity },
      ...sharedUniforms,
    },
  });
  const glow = new THREE.Points(pointsGeometry, glowMaterial);
  group.add(glow);

  // Traveling "signal" sparks — like an impulse firing across a synapse.
  // Re-sampled from whichever edges are active (see `pickPulseEdges`), so
  // every scene gets its own quiet points of traveling light, not just the
  // neuron graph. A small, separate point cloud so the main shader stays simple.
  function pickPulseEdges(edges: [number, number][]): number[] {
    const idx: number[] = [];
    const step = Math.max(1, Math.floor(edges.length / CONFIG.pulseCount));
    for (let i = 0; i < edges.length && idx.length < CONFIG.pulseCount; i += step) idx.push(i);
    return idx;
  }
  let pulseEdgeIdx = pickPulseEdges(shapes.neuron.edges);
  const pulseN = CONFIG.pulseCount;
  const pulsePositions = new Float32Array(pulseN * 3);
  const pulsePhase = new Float32Array(pulseN);
  const pulseColor = new Float32Array(pulseN * 3);
  const pulseSize = new Float32Array(pulseN).fill(1.5);
  const pulseCascadeDelay = new Float32Array(pulseN);
  for (let i = 0; i < pulseN; i++) {
    pulsePhase[i] = Math.random();
    pulseColor[i * 3] = CONFIG.colors.azure.r;
    pulseColor[i * 3 + 1] = CONFIG.colors.azure.g;
    pulseColor[i * 3 + 2] = CONFIG.colors.azure.b;
  }
  const pulseGeometry = new THREE.BufferGeometry();
  pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
  pulseGeometry.setAttribute("aRand", new THREE.BufferAttribute(pulsePhase, 1));
  pulseGeometry.setAttribute("aColor", new THREE.BufferAttribute(pulseColor, 3));
  pulseGeometry.setAttribute("aSizeMul", new THREE.BufferAttribute(pulseSize, 1));
  pulseGeometry.setAttribute("aCascadeDelay", new THREE.BufferAttribute(pulseCascadeDelay, 1));
  const pulseMaterial = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uPixelRatio: { value: renderer.getPixelRatio() },
      uBaseSize: { value: CONFIG.pulseSize },
      uRefDist: { value: CONFIG.cameraDistance },
      uMouseWorld: { value: new THREE.Vector3(10, 10, 10) },
      uMouseInfluence: { value: 0 }, // already bright — cursor brighten would just clip
      uRepelStrength: { value: 0 }, // sparks travel a fixed path — don't perturb them
      uTime: { value: 0 },
      uBreatheSpeed: { value: 0 },
      uBreatheAmount: { value: 0 },
      uOpacity: { value: 0 }, // eased in per-scene below
      uSwayAmount: { value: 0 }, // sparks stay exactly on their edge
      uIridSpeed: { value: 0 },
      uIridA: { value: CONFIG.colors.azure },
      uIridB: { value: CONFIG.colors.azure },
      uIridC: { value: CONFIG.colors.azure },
      uIridAmount: { value: 0 }, // sparks stay pure azure, no shimmer distraction
      uCascadeStart: { value: -9999 },
      uCascadeActive: { value: 0 },
      uCascadeRise: { value: CONFIG.cascade.rise },
      uCascadeFade: { value: CONFIG.cascade.fade },
    },
  });
  const pulses = new THREE.Points(pulseGeometry, pulseMaterial);
  group.add(pulses);
  let pulseTime = Math.random() * 10;

  // "Individual connections illuminate when explored": each line segment's
  // two vertex colors are recomputed every frame from its distance to the
  // cursor (world space), brightening toward azure/white as it's
  // approached — vertexColors on a LineBasicMaterial, no custom shader
  // needed for this one.
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(maxEdges * 2 * 3);
  const lineColors = new Float32Array(maxEdges * 2 * 3);
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: CONFIG.lineOpacity,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);
  const lineGlowColor = new THREE.Color();

  // Molecule orbit rings: smooth continuous ellipses (not a point-polygon
  // approximation) fanned around the nucleus at different angles — the
  // "flower of overlapping orbits" look of a classic atom diagram. One
  // shared material so fading them in/out with the scene is a single value.
  const moleculeRingMaterial = new THREE.LineBasicMaterial({
    color: CONFIG.colors.lavender,
    transparent: true,
    opacity: 0,
  });
  const moleculeRingGroup = new THREE.Group();
  const ringA = CONFIG.radius * CONFIG.moleculeRingA;
  const ringB = CONFIG.radius * CONFIG.moleculeRingB;
  const ringParams: { zRot: number }[] = [];
  for (let i = 0; i < CONFIG.moleculeRings; i++) {
    const zRot = (i / CONFIG.moleculeRings) * Math.PI;
    ringParams.push({ zRot });
    const curvePts = buildMoleculeOrbitCurve(ringA, ringB, zRot, CONFIG.moleculeTiltX);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(curvePts, 3));
    moleculeRingGroup.add(new THREE.Line(geo, moleculeRingMaterial));
  }
  group.add(moleculeRingGroup);
  // Per-electron orbit phase/speed, so the 8 don't tick in visible lockstep.
  const electronPhase = new Float32Array(CONFIG.moleculeRings);
  const electronSpeed = new Float32Array(CONFIG.moleculeRings);
  for (let i = 0; i < CONFIG.moleculeRings; i++) {
    electronPhase[i] = (i * 2.4) % (Math.PI * 2);
    electronSpeed[i] = CONFIG.electronOrbitSpeed * (0.7 + 0.6 * ((i * 0.37) % 1));
  }

  // DNA backbone: the same two smooth curves as the discrete node chain
  // approximates, at much finer resolution — reads as a flowing ribbon
  // rather than a straight-segment polygon.
  const dnaCurveMaterial = new THREE.LineBasicMaterial({
    color: CONFIG.colors.mist,
    transparent: true,
    opacity: 0,
  });
  const dnaCurveGroup = new THREE.Group();
  for (const phase of [0, Math.PI]) {
    const curvePts = buildDNABackboneCurve(CONFIG.radius, phase, CONFIG.dnaCurveSegments);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(curvePts, 3));
    dnaCurveGroup.add(new THREE.Line(geo, dnaCurveMaterial));
  }
  group.add(dnaCurveGroup);

  // Probe render, checked for GL errors, before any listeners are attached —
  // catches shader/driver failures that create a context but can't actually
  // draw with it (the renderer-name check above only covers the known case).
  // Checking before registering listeners means a failure here cleans up
  // with nothing left dangling.
  renderer.render(scene, camera);
  if (gl.getError() !== gl.NO_ERROR) {
    pointsGeometry.dispose();
    lineGeometry.dispose();
    pulseGeometry.dispose();
    pointsMaterial.dispose();
    lineMaterial.dispose();
    pulseMaterial.dispose();
    glowMaterial.dispose();
    moleculeRingGroup.children.forEach((c) => (c as THREE.Line).geometry.dispose());
    moleculeRingMaterial.dispose();
    dnaCurveGroup.children.forEach((c) => (c as THREE.Line).geometry.dispose());
    dnaCurveMaterial.dispose();
    renderer.dispose();
    return null;
  }

  let activeEdges = shapes.neuron.edges;
  let currentSceneName: SceneName = "neuron";
  let morphT = 1; // 1 = settled, 0 = just started a new morph
  let targetOpacity = CONFIG.sceneOpacity.neuron;

  function setScene(name: SceneName, opacityOverride?: number) {
    if (name === currentSceneName && morphT >= 1) {
      if (opacityOverride !== undefined) targetOpacity = opacityOverride;
      return;
    }
    fromPositions.set(livePositions);
    toPositions.set(shapes[name].positions);
    activeEdges = shapes[name].edges;
    pulseEdgeIdx = pickPulseEdges(activeEdges);
    currentSceneName = name;
    morphT = 0;
    targetOpacity = opacityOverride ?? CONFIG.sceneOpacity[name];
  }

  /** BFS outward from one node of the active graph, converting hop-distance
   *  into a per-node time delay — this is what makes the wave visibly
   *  *travel* through the network rather than flash everywhere at once. */
  function triggerCascade() {
    const adjacency = new Map<number, number[]>();
    for (const [a, b] of activeEdges) {
      (adjacency.get(a) ?? adjacency.set(a, []).get(a)!).push(b);
      (adjacency.get(b) ?? adjacency.set(b, []).get(b)!).push(a);
    }
    const reachable = [...adjacency.keys()];
    if (reachable.length === 0) return;
    const origin = reachable[Math.floor(Math.random() * reachable.length)];

    aCascadeDelay.fill(9999);
    const hop = new Map<number, number>([[origin, 0]]);
    const queue = [origin];
    while (queue.length) {
      const cur = queue.shift()!;
      const d = hop.get(cur)!;
      aCascadeDelay[cur] = d * CONFIG.cascade.hopDelay;
      for (const next of adjacency.get(cur) ?? []) {
        if (!hop.has(next)) {
          hop.set(next, d + 1);
          queue.push(next);
        }
      }
    }
    pointsGeometry.attributes.aCascadeDelay.needsUpdate = true;
    sharedUniforms.uCascadeStart.value = elapsedTime;
  }

  // ── Mouse / touch parallax ──
  const mouseNDC = new THREE.Vector2(10, 10);
  const mouseWorld = new THREE.Vector3(10, 10, 10);
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  let tiltX = 0;
  let tiltY = 0;
  let driftT = Math.random() * 100;
  let autoYaw = 0;
  let baseTiltX = CONFIG.baseTiltX.neuron;
  let elapsedTime = 0;

  function setMouse(nx: number, ny: number) {
    mouseNDC.set(nx, ny);
  }

  // ── Resize ──
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }
  window.addEventListener("resize", onResize);

  // ── Frame loop, paused while the tab is hidden ──
  const clock = new THREE.Clock();
  let raf = 0;
  let disposed = false;

  function onVisibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!disposed && raf === 0) {
      clock.getDelta(); // drop the paused-time gap so the next frame doesn't jump
      raf = requestAnimationFrame(tick);
    }
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  function tick() {
    if (disposed) return;
    const dt = Math.min(clock.getDelta(), 0.05);

    // Morph the live positions toward the target shape — staggered per point
    // (each starts at its own aRand-seeded delay within CONFIG.staggerSpread)
    // so the reorganization ripples across the shape instead of snapping
    // uniformly. Still fully settled by the end of CONFIG.morphDuration.
    if (morphT < 1) {
      morphT = Math.min(1, morphT + dt / CONFIG.morphDuration);
      const spread = CONFIG.staggerSpread;
      for (let i = 0; i < n; i++) {
        const delay = aRand[i] * spread;
        const local = Math.min(1, Math.max(0, (morphT - delay) / (1 - spread)));
        const eased = 1 - Math.pow(1 - local, 3); // ease-out cubic
        const i3 = i * 3;
        livePositions[i3] = fromPositions[i3] + (toPositions[i3] - fromPositions[i3]) * eased;
        livePositions[i3 + 1] = fromPositions[i3 + 1] + (toPositions[i3 + 1] - fromPositions[i3 + 1]) * eased;
        livePositions[i3 + 2] = fromPositions[i3 + 2] + (toPositions[i3 + 2] - fromPositions[i3 + 2]) * eased;
      }
    }

    // Electrons actively orbit their ring once the molecule scene has
    // settled — overrides their morph-target position with a live point on
    // the curve, so they visibly travel rather than sit frozen on the ring.
    if (currentSceneName === "molecule" && morphT >= 1) {
      for (let i = 0; i < CONFIG.moleculeRings; i++) {
        electronPhase[i] += electronSpeed[i] * dt;
        const [x, y, z] = ringPoint(ringA, ringB, ringParams[i].zRot, CONFIG.moleculeTiltX, electronPhase[i]);
        livePositions[i * 3] = x;
        livePositions[i * 3 + 1] = y;
        livePositions[i * 3 + 2] = z;
      }
    }
    pointsGeometry.attributes.position.needsUpdate = true;

    // Rebuild the line buffer from live (possibly still-morphing) point
    // positions, and each segment's color from its midpoint's distance to
    // the cursor — mouseWorld lags one frame behind (updated later below),
    // which at 60fps is imperceptible.
    const edgeCount = activeEdges.length;
    const mist = CONFIG.colors.mist;
    for (let e = 0; e < edgeCount; e++) {
      const [a, b] = activeEdges[e];
      const ax = livePositions[a * 3];
      const ay = livePositions[a * 3 + 1];
      const az = livePositions[a * 3 + 2];
      const bx = livePositions[b * 3];
      const by = livePositions[b * 3 + 1];
      const bz = livePositions[b * 3 + 2];
      linePositions[e * 6] = ax;
      linePositions[e * 6 + 1] = ay;
      linePositions[e * 6 + 2] = az;
      linePositions[e * 6 + 3] = bx;
      linePositions[e * 6 + 4] = by;
      linePositions[e * 6 + 5] = bz;

      const mx = (ax + bx) * 0.5 - mouseWorld.x;
      const my = (ay + by) * 0.5 - mouseWorld.y;
      const mz = (az + bz) * 0.5 - mouseWorld.z;
      const segDist = Math.sqrt(mx * mx + my * my + mz * mz);
      const proximity = isTouch ? 0 : 1 - THREE.MathUtils.smoothstep(segDist, 0, CONFIG.mouseInfluence * 1.4);
      lineGlowColor.copy(mist).lerp(CONFIG.colors.azure, proximity * 0.85);
      lineColors[e * 6] = lineGlowColor.r;
      lineColors[e * 6 + 1] = lineGlowColor.g;
      lineColors[e * 6 + 2] = lineGlowColor.b;
      lineColors[e * 6 + 3] = lineGlowColor.r;
      lineColors[e * 6 + 4] = lineGlowColor.g;
      lineColors[e * 6 + 5] = lineGlowColor.b;
    }
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
    lineGeometry.setDrawRange(0, edgeCount * 2);

    // Signal pulses: tiny traveling points of light along the active graph's
    // connections, in every scene (not just neuron) — "tiny points of
    // illumination along meaningful connections." Dimmer where the scene
    // already has its own light (DNA's curve glow, molecule's orbiting
    // electrons) so this stays a quiet accent, not a competing effect.
    // Scaled by the main point cloud's own current opacity (same ratio
    // lineMaterial below uses) — currentSceneName never resets to "none"
    // once settled, so without this, pulses would keep rendering at full
    // intensity even while scrolled onto a white section that faded
    // everything else to invisible.
    const pulseIntensity = { neuron: 0.95, dna: 0.55, molecule: 0.4, cluster: 0.5 }[currentSceneName];
    const pulseVisibility = Math.max(0, Math.min(1, pointsMaterial.uniforms.uOpacity.value / CONFIG.sceneOpacity[currentSceneName]));
    const targetPulseOpacity = morphT >= 1 ? pulseIntensity * pulseVisibility : 0;
    const curPulseOpacity = pulseMaterial.uniforms.uOpacity.value;
    pulseMaterial.uniforms.uOpacity.value = curPulseOpacity + (targetPulseOpacity - curPulseOpacity) * Math.min(1, dt * 2);
    if (pulseMaterial.uniforms.uOpacity.value > 0.01 && pulseEdgeIdx.length > 0) {
      pulseTime += dt * CONFIG.pulseSpeed;
      for (let i = 0; i < pulseN; i++) {
        const [a, b] = activeEdges[pulseEdgeIdx[i % pulseEdgeIdx.length]];
        const t = (pulseTime + pulsePhase[i]) % 1;
        pulsePositions[i * 3] = livePositions[a * 3] + (livePositions[b * 3] - livePositions[a * 3]) * t;
        pulsePositions[i * 3 + 1] = livePositions[a * 3 + 1] + (livePositions[b * 3 + 1] - livePositions[a * 3 + 1]) * t;
        pulsePositions[i * 3 + 2] = livePositions[a * 3 + 2] + (livePositions[b * 3 + 2] - livePositions[a * 3 + 2]) * t;
      }
      pulseGeometry.attributes.position.needsUpdate = true;
    }

    // Continuous idle spin — this is the actual "rotating" in "rotating double
    // helix": without it, the shape only ever moves if the cursor does.
    autoYaw += CONFIG.rotationSpeed[currentSceneName] * dt;
    // Ease the constant per-scene tilt in alongside the shape morph, so DNA
    // and molecule settle into a 3/4 view instead of snapping into it.
    baseTiltX += (CONFIG.baseTiltX[currentSceneName] - baseTiltX) * Math.min(1, dt * 2);

    // Parallax tilt: toward the cursor on desktop, a slow autonomous drift on touch.
    if (isTouch) {
      driftT += dt * 0.08;
      tiltX = Math.sin(driftT) * CONFIG.maxTilt * 0.5;
      tiltY = Math.cos(driftT * 0.7) * CONFIG.maxTilt * 0.5;
    } else {
      // mouseNDC starts as an off-screen sentinel (10, 10) so the raycasted
      // uMouseWorld position stays harmlessly far from every node until the
      // cursor actually moves — but used raw here, that same sentinel would
      // ease this tilt toward ~126°. Clamp to the valid NDC range first.
      const targetTiltX = THREE.MathUtils.clamp(mouseNDC.y, -1, 1) * CONFIG.maxTilt;
      const targetTiltY = THREE.MathUtils.clamp(mouseNDC.x, -1, 1) * CONFIG.maxTilt;
      tiltX += (targetTiltX - tiltX) * Math.min(1, dt * 2.2);
      tiltY += (targetTiltY - tiltY) * Math.min(1, dt * 2.2);
    }
    group.rotation.x = baseTiltX + tiltX;
    group.rotation.y = autoYaw + tiltY;

    // Project the cursor onto a plane through the origin for the brighten effect.
    if (!isTouch) {
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(plane, mouseWorld);
      pointsMaterial.uniforms.uMouseWorld.value.copy(mouseWorld);
    }

    // Ease overall opacity toward whatever the active section wants.
    const cur = pointsMaterial.uniforms.uOpacity.value;
    pointsMaterial.uniforms.uOpacity.value = cur + (targetOpacity - cur) * Math.min(1, dt * 2);
    lineMaterial.opacity = CONFIG.lineOpacity * (pointsMaterial.uniforms.uOpacity.value / CONFIG.sceneOpacity.neuron);
    const curGlow = glowMaterial.uniforms.uOpacity.value;
    const targetGlow = targetOpacity * CONFIG.glowOpacity;
    glowMaterial.uniforms.uOpacity.value = curGlow + (targetGlow - curGlow) * Math.min(1, dt * 2);

    // Smooth curve overlays only show for their own scene, fading with it.
    const targetRingOpacity = currentSceneName === "molecule" ? targetOpacity * 0.7 : 0;
    moleculeRingMaterial.opacity += (targetRingOpacity - moleculeRingMaterial.opacity) * Math.min(1, dt * 2);
    const targetDnaCurveOpacity = currentSceneName === "dna" ? targetOpacity * 0.95 : 0;
    dnaCurveMaterial.opacity += (targetDnaCurveOpacity - dnaCurveMaterial.opacity) * Math.min(1, dt * 2);

    // Breathing shimmer clock (shared uniform object — glowMaterial sees it too).
    elapsedTime += dt;
    pointsMaterial.uniforms.uTime.value = elapsedTime;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  // The probe render above already produced this scene's first frame — that's
  // the complete picture for reduced-motion (no loop, no listeners beyond
  // resize/visibility). Otherwise, hand off to the animated loop.
  if (!reducedMotion) {
    raf = requestAnimationFrame(tick);
  }

  function dispose() {
    disposed = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    pointsGeometry.dispose();
    lineGeometry.dispose();
    pulseGeometry.dispose();
    pointsMaterial.dispose();
    lineMaterial.dispose();
    pulseMaterial.dispose();
    glowMaterial.dispose();
    moleculeRingGroup.children.forEach((c) => (c as THREE.Line).geometry.dispose());
    moleculeRingMaterial.dispose();
    dnaCurveGroup.children.forEach((c) => (c as THREE.Line).geometry.dispose());
    dnaCurveMaterial.dispose();
    renderer.dispose();
  }

  return { setScene, setMouse, triggerCascade, dispose };
}

/**
 * Mounts a fixed, full-viewport canvas behind the page. Pure visual layer:
 * aria-hidden, pointer-events: none, never affects layout or interaction.
 * Scene selection and lazy-mount timing are handled by NeuralSceneLoader —
 * this component just runs whatever `activeScene` it's given.
 */
export function NeuralScene({
  activeScene,
  activeOpacity,
}: {
  activeScene: SceneName;
  activeOpacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<EngineHandle | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const engine = createEngine(canvas, reducedMotion, isTouch);
    engineRef.current = engine;
    if (!engine) return;

    // The "magic moment" trigger — a discoverable button elsewhere on the
    // page dispatches this rather than the engine being reached directly,
    // so the two stay decoupled. Works on touch too (only cursor parallax
    // is desktop-only).
    const onCascade = () => engine.triggerCascade();
    window.addEventListener("neural-cascade", onCascade);

    if (reducedMotion || isTouch) {
      return () => {
        window.removeEventListener("neural-cascade", onCascade);
        engine.dispose();
      };
    }

    const onPointerMove = (e: PointerEvent) => {
      engine.setMouse((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("neural-cascade", onCascade);
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setScene(activeScene, activeOpacity);
  }, [activeScene, activeOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  );
}
