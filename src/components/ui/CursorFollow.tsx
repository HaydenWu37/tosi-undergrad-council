"use client";

import { useEffect, useRef } from "react";

/**
 * A delicate cursor-follow ring — not a replacement for the native cursor
 * (which stays visible throughout, so nothing about pointer affordance or
 * accessibility changes), just a soft trailing accent that grows and
 * softens over interactive elements. Desktop/fine-pointer only; does
 * nothing on touch, and nothing under reduced-motion.
 */
export function CursorFollow() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ring = ringRef.current;
    if (!ring) return;

    let raf = 0;
    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        ring.style.opacity = "1";
      }
    };
    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement | null)?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor-hover]',
      );
      ring.dataset.active = interactive ? "true" : "false";
    };
    const onLeaveWindow = () => {
      shown = false;
      ring.style.opacity = "0";
    };

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      ring.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-signal-400/60 opacity-0 mix-blend-multiply transition-[width,height,opacity,border-color] duration-300 ease-out data-[active=true]:h-14 data-[active=true]:w-14 data-[active=true]:border-signal-400"
    />
  );
}
