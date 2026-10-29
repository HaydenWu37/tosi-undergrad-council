import Image from "next/image";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/Icon";
import { PlaceholderTag } from "@/components/ui/Badge";
import type { TeamMember } from "@/lib/types";

export function TeamCard({
  member,
  compact = false,
}: {
  member: TeamMember;
  index?: number;
  compact?: boolean;
}) {
  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 shadow-soft transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-200 sm:aspect-[4/5]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ objectPosition: member.photoPosition }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="eyebrow text-ink-600">No photo</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-signal-500">
          {member.position}
          {member.term && <span className="text-ink-600"> · {member.term}</span>}
        </p>
        <h3 className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-xl text-ink-950">
          {member.name}
          {member.pronouns && (
            <span className="font-sans text-xs font-normal normal-case text-ink-600">{member.pronouns}</span>
          )}
          {member.placeholder && <PlaceholderTag />}
        </h3>
        {!compact && (member.program || member.hometown) && (
          <dl className="mt-3 space-y-1 text-sm">
            {member.program && (
              <div className="flex gap-2">
                <dt className="font-semibold text-ink-950">Program</dt>
                <dd className="text-ink-600">{member.program}</dd>
              </div>
            )}
            {member.hometown && (
              <div className="flex gap-2">
                <dt className="font-semibold text-ink-950">Hometown</dt>
                <dd className="text-ink-600">{member.hometown}</dd>
              </div>
            )}
          </dl>
        )}
        {!compact && member.funFact && (
          <p className="mt-3 rounded-xl bg-paper-100 px-3.5 py-2.5 text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-950">Fun fact: </span>
            {member.funFact}
          </p>
        )}
        {!compact && !member.program && !member.hometown && member.bio && (
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{member.bio}</p>
        )}
        {(member.linkedin || member.email) && (
          <ul className="mt-auto flex gap-2 pt-4">
            {member.linkedin && (
              <li>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/10 text-ink-700 transition-colors hover:border-signal-400 hover:bg-signal-400 hover:text-white"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  <span className="sr-only">{member.name} on LinkedIn (opens in a new tab)</span>
                </a>
              </li>
            )}
            {member.email && (
              <li>
                <a
                  href={`mailto:${member.email}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/10 text-ink-700 transition-colors hover:border-signal-400 hover:bg-signal-400 hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Email {member.name}</span>
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  );
}
