import type { EventCategory } from "@/lib/types";
import { site } from "@/data/site";

const categoryStyles: Record<EventCategory, string> = {
  "Journal Club": "bg-mint-100 text-mint-800",
  "Research Talk": "bg-brand-100 text-brand-800",
  Workshop: "bg-signal-100 text-signal-700",
  Social: "bg-rose-100 text-rose-700",
  Other: "bg-sky-100 text-sky-700",
};

const dot: Record<EventCategory, string> = {
  "Journal Club": "bg-mint-600",
  "Research Talk": "bg-brand-600",
  Workshop: "bg-signal-500",
  Social: "bg-rose-700",
  Other: "bg-sky-500",
};

export function CategoryBadge({ category }: { category: EventCategory }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] ${categoryStyles[category]}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot[category]}`} />
      {category}
    </span>
  );
}

/** Shown on sample content. Hidden globally via site.showPlaceholderNotices. */
export function PlaceholderTag({ className = "" }: { className?: string }) {
  if (!site.showPlaceholderNotices) return null;
  return (
    <span
      className={`eyebrow inline-flex items-center rounded border border-dashed border-ink-400 px-2 py-0.5 text-[0.65rem] text-ink-600 ${className}`}
    >
      Placeholder
    </span>
  );
}
