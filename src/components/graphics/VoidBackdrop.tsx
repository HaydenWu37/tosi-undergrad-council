"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A fixed "deep space" backdrop that fades in only while a `[data-void]`
 * section is centered in view (currently just the home hero), so the
 * network's pale particles read as glowing dust against navy there, while
 * every other section keeps the light canvas. Mounted between AmbientField
 * (below it) and NeuralScene (above it) in layout.tsx on purpose: opaque
 * here occludes the light ambient field underneath, but the particle
 * network — mounted later in the DOM — still paints on top of it, the
 * same "later in the DOM paints over earlier fixed siblings" mechanism
 * AmbientField itself already relies on for every other dark panel on the
 * site. A no-op (stays invisible, costs nothing) on every page but home.
 *
 * Driven by scroll position directly (getBoundingClientRect), not
 * IntersectionObserver — its rootMargin-percentage intersection
 * computation proved unreliable at mount time here (the very first
 * automatic callback would sometimes report the wrong state and nothing
 * ever corrected it until the user scrolled), so a plain, predictable
 * geometry check replaces it.
 */
export function VoidBackdrop() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  // Re-scan for [data-void] sections whenever the route changes — App
  // Router swaps page content without a full reload, so without this the
  // effect only ever sees the page that was active on first mount, and the
  // backdrop silently stops working on every page after a client-side
  // navigation (only a hard refresh would bring it back).
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-void]"));
    if (targets.length === 0) {
      ref.current?.style.setProperty("opacity", "0");
      return;
    }

    let raf = 0;
    const check = () => {
      raf = 0;
      const bandTop = window.innerHeight * 0.45;
      const bandBottom = window.innerHeight * 0.55;
      const active = targets.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < bandBottom && r.bottom > bandTop;
      });
      ref.current?.style.setProperty("opacity", active ? "1" : "0");
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

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-void-950 opacity-0 transition-opacity duration-700 ease-out"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(1100px circle at 15% 10%, var(--color-void-800), transparent 60%)" }}
      />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.07]" />
      {/* Bokeh — small, numerous, varied-size soft circles mimicking
          out-of-focus point-lights, not one dominant gradient wash. */}
      <span className="absolute left-[8%] top-[10%] h-24 w-24 rounded-full bg-gold-400 opacity-[0.16] blur-2xl" />
      <span className="absolute right-[6%] top-[6%] h-36 w-36 rounded-full bg-signal-300 opacity-[0.18] blur-3xl" />
      <span className="absolute right-[24%] top-[38%] h-20 w-20 rounded-full bg-gold-400 opacity-[0.14] blur-2xl" />
      <span className="absolute right-[3%] bottom-[12%] h-28 w-28 rounded-full bg-brand-400 opacity-[0.18] blur-2xl" />
      <span className="absolute left-[42%] bottom-[6%] h-14 w-14 rounded-full bg-gold-400 opacity-[0.14] blur-xl" />
      <span className="absolute left-[55%] top-[18%] h-10 w-10 rounded-full bg-signal-300 opacity-[0.2] blur-lg" />
    </div>
  );
}
