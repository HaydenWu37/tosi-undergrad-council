export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${narrow ? "max-w-4xl" : "max-w-6xl"} ${className}`}
    >
      {children}
    </div>
  );
}

/** Standard vertical rhythm for page sections. */
export function Section({
  children,
  className = "",
  id,
  labelledBy,
  scene,
  sceneIntensity,
  voidMode = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  /** Which NeuralScene background form to morph into while this section is centered in view. See NeuralSceneLoader. */
  scene?: "neuron" | "dna" | "molecule";
  /** Overrides NeuralScene's default opacity (0–1) for this scene — dial it down over text-dense sections. */
  sceneIntensity?: number;
  /** Fades in the fixed deep-space backdrop (see VoidBackdrop) while this
   *  section is centered in view — the cinematic "network glows against
   *  navy" treatment. Pair with dark text (e.g. SectionHeader tone="dark"). */
  voidMode?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-scene={scene}
      data-scene-intensity={sceneIntensity}
      data-void={voidMode || undefined}
      className={`py-16 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
