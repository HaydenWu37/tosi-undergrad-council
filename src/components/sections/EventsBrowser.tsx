"use client";

import { useState } from "react";
import { EventCard } from "@/components/cards/EventCard";
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

export function EventsBrowser({ upcoming, past }: { upcoming: EventItem[]; past: EventItem[] }) {
  const [filter, setFilter] = useState<EventCategory | "All">("All");
  const match = (e: EventItem) => filter === "All" || e.category === filter;
  const shown = upcoming.filter(match);
  const shownPast = past.filter(match);

  return (
    <div>
      <div role="group" aria-label="Filter events by category" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === c
                ? "border-ink-950 bg-ink-950 text-white"
                : "border-paper-300 bg-white text-ink-700 hover:border-ink-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} upcoming {shown.length === 1 ? "event" : "events"}
        {filter !== "All" ? ` in ${filter}` : ""}.
      </p>

      {shown.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.id}>
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-2xl border border-dashed border-paper-300 p-8 text-center text-ink-600">
          No upcoming {filter === "All" ? "" : `${filter.toLowerCase()} `}events right now. Follow us on
          Instagram to hear first when new ones are announced.
        </p>
      )}

      {shownPast.length > 0 && (
        <div id="past" className="mt-20 scroll-mt-28">
          <p className="eyebrow text-brand-700">Look back</p>
          <h3 className="mt-2 text-3xl text-ink-950 sm:text-4xl">Past events</h3>
          <p className="mt-3 max-w-xl text-ink-600">Select an event to browse its photos.</p>
          <ul className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {shownPast
              .filter((e) => e.photos?.length)
              .map((e) => (
                <li key={e.id}>
                  <PastEventCard event={e} />
                </li>
              ))}
          </ul>
          {shownPast.some((e) => !e.photos?.length) && (
            <ul className="mt-10 divide-y divide-paper-300 border-y border-paper-300">
              {shownPast
                .filter((e) => !e.photos?.length)
                .map((e) => (
                  <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                    <span className="font-display text-lg text-ink-950">{e.title}</span>
                    <span className="text-sm text-ink-600">
                      {e.category}
                      {e.date ? ` · ${e.date}` : ""}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
