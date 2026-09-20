import type { EventItem } from "./types";

/** Parses "YYYY-MM-DD" as a local date (avoids UTC off-by-one bugs). */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatLongDate(iso?: string): string {
  if (!iso) return "Date to be announced";
  return parseISODate(iso).toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function dateParts(iso?: string): { month: string; day: string } | null {
  if (!iso) return null;
  const d = parseISODate(iso);
  return {
    month: d.toLocaleDateString("en-CA", { month: "short" }),
    day: String(d.getDate()),
  };
}

/** Events with no date count as upcoming ("to be announced"). Dated ones sort first. */
export function splitEvents(events: EventItem[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = (e: EventItem) =>
    !!e.past || (!!e.date && parseISODate(e.date) < today);
  const byDate = (a: EventItem, b: EventItem) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
  };
  return {
    upcoming: events.filter((e) => !isPast(e)).sort(byDate),
    // Dated events newest-first; undated past events keep the order they are listed in.
    past: events.filter(isPast).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
  };
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Public URL of a past-event photo (files live in /public/events/<event id>/). */
export const eventPhotoSrc = (event: EventItem, file: string) => `/events/${event.id}/${file}`;
