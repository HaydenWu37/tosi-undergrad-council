import { Clock, MapPin } from "lucide-react";
import { CategoryBadge, PlaceholderTag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dateParts, formatLongDate } from "@/lib/format";
import type { EventItem } from "@/lib/types";

function DateBlock({ date, large = false }: { date?: string; large?: boolean }) {
  const parts = dateParts(date);
  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center rounded-xl border border-paper-300 bg-paper-50 text-center ${
        large ? "h-20 w-20" : "h-16 w-16"
      }`}
      aria-hidden="true"
    >
      {parts ? (
        <>
          <span className="eyebrow text-[0.65rem] text-brand-700">{parts.month}</span>
          <span className={`font-display leading-none text-ink-950 ${large ? "text-3xl" : "text-2xl"}`}>
            {parts.day}
          </span>
        </>
      ) : (
        <>
          <span className="eyebrow text-[0.65rem] text-ink-600">Date</span>
          <span className="font-display text-lg leading-none text-ink-950">TBA</span>
        </>
      )}
    </div>
  );
}

export function EventCard({ event, featured = false }: { event: EventItem; featured?: boolean }) {
  const cta = event.registrationUrl ? (
    <Button href={event.registrationUrl} variant={featured ? "primary" : "secondary"}>
      Register
    </Button>
  ) : (
    <Button href="/contact?topic=general" variant={featured ? "primary" : "secondary"} arrow>
      Ask about this event
    </Button>
  );

  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-paper-300 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift ${
        featured ? "sm:p-9" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <DateBlock date={event.date} large={featured} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={event.category} />
            {event.placeholder && <PlaceholderTag />}
          </div>
          <h3 className={`mt-2.5 text-ink-950 ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}>
            {event.title}
          </h3>
        </div>
      </div>

      <dl className="mt-5 space-y-1.5 text-sm text-ink-700">
        <div className="flex items-start gap-2">
          <dt className="sr-only">Date</dt>
          <dd className="sr-only">{formatLongDate(event.date)}</dd>
        </div>
        {event.time && (
          <div className="flex items-center gap-2">
            <dt>
              <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span className="sr-only">Time</span>
            </dt>
            <dd>{event.time}</dd>
          </div>
        )}
        {event.location && (
          <div className="flex items-center gap-2">
            <dt>
              <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <span className="sr-only">Location</span>
            </dt>
            <dd>{event.location}</dd>
          </div>
        )}
      </dl>

      <p className={`mt-4 text-ink-600 ${featured ? "max-w-2xl text-lg" : "text-[0.95rem]"}`}>
        {event.description}
      </p>

      <div className="mt-auto pt-6">{cta}</div>
    </article>
  );
}
