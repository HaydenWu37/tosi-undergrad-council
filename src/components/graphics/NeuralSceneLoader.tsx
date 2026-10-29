"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SceneName } from "./NeuralScene";

/**
 * Mounts NeuralScene (lazily, after first paint, client-only) and drives
 * which of its three forms is active by watching the page for elements
 * carrying both `data-scene="neuron" | "dna" | "molecule"` AND `data-void`
 * — see `Section`'s `scene`/`voidMode` props in `Container.tsx`. The
 * network is a deliberate feature of navy "void" sections only — white
 * sections must have a completely static background, so the moment the
 * centered section isn't also a void one, opacity fades to 0 rather than
 * leaving whatever scene was last active visible.
 *
 * Optional `data-scene-intensity="0.4"` on the same element dims the
 * background further behind text-heavy sections (brief's own ask).
 *
 * If the browser has no WebGL, NeuralScene itself returns null internally
 * (nothing is rendered) and the page's existing CSS gradient background
 * (AmbientField) is the only backdrop — zero layout shift either way,
 * since this is always a `position: fixed` overlay with no box in flow.
 */
const NeuralScene = dynamic(() => import("./NeuralScene").then((m) => m.NeuralScene), { ssr: false });

export function NeuralSceneLoader() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [activeScene, setActiveScene] = useState<SceneName>("neuron");
  const [activeOpacity, setActiveOpacity] = useState<number | undefined>(undefined);

  // Defer mounting until the browser is idle after first paint, so the WebGL
  // setup never competes with LCP-critical work.
  useEffect(() => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback;
    if (ric) {
      const id = ric(() => setReady(true), { timeout: 2000 });
      return () => (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  // Re-scan for [data-scene] sections whenever the route changes (App Router
  // swaps page content without a full reload, so this can't be a one-time
  // effect). Driven by scroll position directly (getBoundingClientRect),
  // not IntersectionObserver — its rootMargin-percentage intersection
  // computation proved unreliable right at mount (see VoidBackdrop, which
  // hit the same bug visibly: the very first automatic callback could
  // report the wrong state and nothing ever corrected it until the user
  // scrolled), so a plain, predictable geometry check replaces it here too.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scene][data-void]"));

    let raf = 0;
    if (targets.length === 0) {
      raf = requestAnimationFrame(() => setActiveOpacity(0));
      return () => cancelAnimationFrame(raf);
    }

    const check = () => {
      raf = 0;
      const bandTop = window.innerHeight * 0.45;
      const bandBottom = window.innerHeight * 0.55;
      const centered = targets.find((el) => {
        const r = el.getBoundingClientRect();
        return r.top < bandBottom && r.bottom > bandTop;
      });
      if (!centered) {
        setActiveOpacity(0); // no void section in view — stay fully invisible, not just dim
        return;
      }
      const scene = centered.dataset.scene as SceneName | undefined;
      const intensity = centered.dataset.sceneIntensity ? Number(centered.dataset.sceneIntensity) : undefined;
      if (scene) {
        setActiveScene(scene);
        setActiveOpacity(intensity);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  if (!ready) return null;
  return <NeuralScene activeScene={activeScene} activeOpacity={activeOpacity} />;
}
