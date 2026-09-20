import { Clock, MapPin } from "lucide-react";
import { PlaceholderTag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dateParts, formatLongDate } from "@/lib/format";
import type { JournalSession, Presentation } from "@/lib/types";

/** An upcoming meeting, styled like a line in a conference programme. */
export function SessionCard({ session }: { session: JournalSession }) {
  const parts = dateParts(session.date);
  return (
    <article className="grid gap-4 rounded-xl border border-paper-300 bg-white p-5 transition-colors hover:border-brand-300 sm:grid-cols-[5.5rem_1fr_auto] sm:items-center sm:gap-6">
      <div className="eyebrow text-brand-700">
        {parts ? (
          <>
            <span className="block text-xs">{parts.month}</span>
            <span className="font-display text-4xl normal-case leading-none tracking-normal text-ink-950">
              {parts.day}
            </span>
          </>
        ) : (
          <span className="block text-xs text-ink-600">Date TBA</span>
        )}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl text-ink-950">{session.title}</h3>
          {session.placeholder && <PlaceholderTag />}
        </div>
        <p className="sr-only">{formatLongDate(session.date)}</p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-600">
          {session.speaker && <li>Speaker: {session.speaker}</li>}
          {session.time && (
            <li className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {session.time}
            </li>
          )}
          {session.location && (
            <li className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {session.location}
            </li>
          )}
        </ul>
      </div>
      {session.registrationUrl ? (
        <Button href={session.registrationUrl} variant="secondary">
          Register
        </Button>
      ) : (
        <Button href="/contact?topic=general" variant="secondary" arrow>
          Ask about it
        </Button>
      )}
    </article>
  );
}

/** The featured talk laid out like a manuscript first page. */
export function FeaturedTalk({ talk }: { talk: Presentation }) {
  return (
    <article className="relative overflow-hidden rounded-sm border border-paper-300 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-paper-300 bg-paper-100 px-6 py-2.5 sm:px-10">
        <span className="eyebrow text-[0.68rem] text-ink-600">Featured talk</span>
        <span className="flex items-center gap-2">
          {talk.placeholder && <PlaceholderTag />}
          {talk.date && (
            <span className="eyebrow text-[0.68rem] text-ink-600">{formatLongDate(talk.date)}</span>
          )}
        </span>
      </div>
      <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1fr_16rem]">
        <div>
          <h3 className="font-display text-3xl leading-tight text-ink-950 sm:text-4xl">
            {talk.title}
          </h3>
          <p className="mt-4 text-ink-700">
            {talk.speaker}
            {talk.affiliation && <span className="text-ink-500"> · {talk.affiliation}</span>}
          </p>
          <hr className="my-6 border-paper-300" />
          <p className="eyebrow mb-2 text-brand-700">About the talk</p>
          <p className="max-w-prose font-display text-lg leading-relaxed text-ink-800">
            {talk.summary}
          </p>
          {talk.topics && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {talk.topics.map((t) => (
                <li key={t} className="eyebrow rounded-full border border-paper-300 px-3 py-1 text-[0.65rem] text-ink-600">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {talk.link && (
            <div className="mt-6">
              <Button href={talk.link} variant="primary">
                {talk.linkLabel ?? "Related reading"}
              </Button>
            </div>
          )}
        </div>

        <aside aria-label="Talk details" className="border-paper-300 lg:border-l lg:pl-8">
          <p className="eyebrow text-[0.68rem] text-brand-700">Speaker</p>
          <p className="mt-1 text-sm text-ink-800">{talk.speaker}</p>
          <p className="eyebrow mt-5 text-[0.68rem] text-brand-700">Format</p>
          <p className="mt-1 text-sm text-ink-800">A talk on research and open science practices, followed by questions.</p>
          <p className="eyebrow mt-5 text-[0.68rem] text-brand-700">Open to</p>
          <p className="mt-1 text-sm text-ink-800">The McGill community. No experience needed.</p>
        </aside>
      </div>
    </article>
  );
}

/** Previous talks read like a numbered reference list. */
export function TalkReference({ talk, index }: { talk: Presentation; index: number }) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-paper-300 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr]">
      <span className="font-mono text-sm text-brand-700">[{index + 1}]</span>
      <div>
        <p className="flex flex-wrap items-center gap-2 font-display text-lg text-ink-950">
          {talk.link ? (
            <a href={talk.link} target="_blank" rel="noopener noreferrer" className="underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700">
              {talk.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            talk.title
          )}
          {talk.placeholder && <PlaceholderTag />}
        </p>
        <p className="mt-1 text-sm text-ink-600">
          {talk.speaker}
          {talk.affiliation ? `, ${talk.affiliation}` : ""}
          {talk.date ? `. ${formatLongDate(talk.date)}` : ""}.
        </p>
        <p className="mt-2 text-sm text-ink-700">{talk.summary}</p>
      </div>
    </li>
  );
}
