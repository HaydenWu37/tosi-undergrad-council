"use client";

import { useState } from "react";
import { PastEventCard } from "@/components/cards/PastEventCard";
import type { EventCategory, EventItem } from "@/lib/types";

const categories: (EventCategory | "All")[] = [
  "All",
  "Journal Club",
  "Research Talk",
  "Workshop",
  "Social",
  "Other",
];

/** A browsable record of past events — photos first, filterable by the
 *  kind of activity. The site doesn't try to be a live event calendar
 *  (see InstagramSection for that), so this only ever shows what we've
 *  already done. `dark` swaps text/pill colors for a navy panel. */
export function EventsBrowser({ past, dark = false }: { past: EventItem[]; dark?: boolean }) {
  const [filter, setFilter] = useState<EventCategory | "All">("All");
  const shown = past.filter((e) => filter === "All" || e.category === filter);
  const withPhotos = shown.filter((e) => e.photos?.length);
  const withoutPhotos = shown.filter((e) => !e.photos?.length);

  return (
    <div>
      <div role="group" aria-label="Filter past events by category" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              filter === c
                ? "border-signal-500 bg-signal-500 text-white shadow-soft"
                : dark
                  ? "border-white/20 text-ink-400 hover:border-signal-300 hover:text-white"
                  : "glass border-white/70 text-ink-700 hover:border-signal-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} past {shown.length === 1 ? "event" : "events"}
        {filter !== "All" ? ` in ${filter}` : ""}.
      </p>

      {shown.length > 0 ? (
        <>
          <ul className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {withPhotos.map((e) => (
              <li key={e.id}>
                <PastEventCard event={e} dark={dark} />
              </li>
            ))}
          </ul>
          {withoutPhotos.length > 0 && (
            <ul className={`mt-10 divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-paper-300 border-paper-300"}`}>
              {withoutPhotos.map((e) => (
                <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                  <span className={`font-display text-lg ${dark ? "text-white" : "text-ink-950"}`}>{e.title}</span>
                  <span className={`text-sm ${dark ? "text-ink-400" : "text-ink-600"}`}>
                    {e.category}
                    {e.date ? ` · ${e.date}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p
          className={`mt-8 rounded-2xl border border-dashed p-8 text-center ${
            dark ? "border-white/20 text-ink-400" : "border-paper-300 text-ink-600"
          }`}
        >
          No {filter === "All" ? "" : `${filter.toLowerCase()} `}events here yet.
        </p>
      )}
    </div>
  );
}
