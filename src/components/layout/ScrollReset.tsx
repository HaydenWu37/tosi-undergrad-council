"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * `scroll-behavior: smooth` (globals.css — there for same-page anchor
 * links like the hero's "at a glance" rail) fights with Next.js's own
 * scroll-to-top-on-navigate: the reset becomes an animated scroll instead
 * of an instant one, and if anything shifts page height while it's still
 * in flight (images loading, client components like EventsBrowser
 * mounting), it can land mid-page instead of at the top — confirmed via
 * playtest: clicking a nav link landed scrolled ~500px down the new page
 * instead of at its hero. Forcing an instant jump on every route change
 * fixes that while leaving in-page anchors smooth.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      // Don't fight the browser's own scroll-position restoration on the
      // very first load (e.g. landing on a hash link or using back/forward).
      first.current = false;
      return;
    }
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // A second, slightly delayed correction catches pages with content that
    // streams in after the initial commit (e.g. a <Suspense> boundary) and
    // shifts the page height just after the first jump — observed on
    // /contact landing ~50px down instead of 0 without this.
    const t = window.setTimeout(() => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prev;
    }, 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
