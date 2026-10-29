/**
 * Base canvas layer, mounted once in the root layout: a plain porcelain
 * background with a fine paper-grain texture over it, so flat sections
 * never read as sterile digital color. Deliberately *not* blurred color
 * blobs, glowing orbs, or floating stars — depth here comes from
 * typography, imagery, and section-to-section color, not decoration.
 * No JS, no client boundary needed. `position: fixed` with no z-index
 * keeps it in normal paint order (first in the DOM, so later content
 * simply paints over it) rather than risking a negative z-index
 * disappearing behind the body paint in some browsers. Sections with
 * their own opaque background (dark panels, tinted washes) sit above
 * this and carry their own local `.grain` layer instead, since this
 * fixed one can't show through them.
 */
export function AmbientField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-paper-50">
      <div className="grain absolute inset-0 opacity-[0.05]" />
    </div>
  );
}
