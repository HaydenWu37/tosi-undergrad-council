import type { EventCategory } from "@/lib/types";
import { site } from "@/data/site";

/** Each category gets one spectral color — restrained, not a rainbow of fills.
 *  Reused for the dot here and for card top-accent rails (e.g. EventCard). */
export const categoryAccent: Record<EventCategory, { dot: string; rail: string }> = {
  "Journal Club": { dot: "bg-rose-700", rail: "border-t-rose-700" },
  "Research Talk": { dot: "bg-brand-600", rail: "border-t-brand-600" },
  Workshop: { dot: "bg-gold-400", rail: "border-t-gold-400" },
  Social: { dot: "bg-signal-400", rail: "border-t-signal-400" },
  Other: { dot: "bg-ink-400", rail: "border-t-ink-400" },
};

export function CategoryBadge({ category }: { category: EventCategory }) {
  return (
    <span className="eyebrow inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-white/70 px-3 py-1 text-ink-700">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${categoryAccent[category].dot}`} />
      {category}
    </span>
  );
}

/** Shown on sample content. Quiet by design — a note to the editor, not a
 *  second call-to-action. Hidden globally via site.showPlaceholderNotices. */
export function PlaceholderTag({ className = "" }: { className?: string }) {
  if (!site.showPlaceholderNotices) return null;
  return (
    <span
      className={`eyebrow inline-flex items-center rounded-full border border-dashed border-ink-400/70 px-3 py-1 text-ink-600 ${className}`}
    >
      Placeholder
    </span>
  );
}
