import { Container } from "@/components/ui/Container";
import type { SceneName } from "@/components/graphics/NeuralScene";

/**
 * Shared header for interior pages. `seed` doubles as a decorative page
 * index. Pass `scene` to give the page its own cinematic "void" opening —
 * the same dark, interactive-artwork treatment as the homepage hero, just
 * running a different procedural form so no two pages repeat the same
 * artwork. Omit `scene` to keep the plain light header.
 */
export function PageHero({
  eyebrow,
  title,
  children,
  seed = 1,
  scene,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  seed?: number;
  scene?: SceneName;
}) {
  if (scene) {
    return (
      <div className="on-dark relative" data-scene={scene} data-void="true">
        <Container className="relative py-20 sm:py-28">
          <p className="eyebrow flex items-center gap-2 border-t border-white/15 pt-3 text-signal-300">
            <span aria-hidden="true">{"//"}</span>
            {eyebrow}
          </p>
          <h1 className="glow-text mt-5 max-w-3xl text-5xl text-white sm:text-7xl">{title}</h1>
          {children && (
            <p className="mt-6 max-w-2xl text-lg normal-case leading-relaxed text-ink-400 sm:text-xl">{children}</p>
          )}
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-b border-paper-300 bg-paper-100">
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.05]" />
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-4 -top-10 select-none text-[9rem] font-semibold leading-none text-ink-950/[0.04] sm:text-[13rem]"
      >
        {String(seed).padStart(2, "0")}
      </span>
      <Container className="relative py-16 sm:py-24">
        <p className="eyebrow flex items-center gap-2 text-signal-500">
          <span aria-hidden="true">{"//"}</span>
          {eyebrow}
        </p>
        <h1 className="glow-text mt-5 max-w-3xl text-5xl sm:text-7xl">{title}</h1>
        {children && <p className="mt-6 max-w-2xl text-lg normal-case text-ink-600 sm:text-xl">{children}</p>}
      </Container>
    </div>
  );
}
