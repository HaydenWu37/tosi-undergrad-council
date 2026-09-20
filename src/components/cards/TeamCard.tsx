import Image from "next/image";
import { Mail } from "lucide-react";
import { NeuronAvatar } from "@/components/graphics/NeuronAvatar";
import { LinkedInIcon } from "@/components/ui/Icon";
import { PlaceholderTag } from "@/components/ui/Badge";
import type { TeamMember } from "@/lib/types";

export function TeamCard({
  member,
  index = 0,
  compact = false,
}: {
  member: TeamMember;
  index?: number;
  compact?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-paper-300 bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50 sm:aspect-[4/5]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: member.photoPosition }}
          />
        ) : (
          <NeuronAvatar variant={index} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[0.68rem] text-brand-700">
          {member.position}
          {member.term && <span className="text-ink-500"> · {member.term}</span>}
        </p>
        <h3 className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-xl text-ink-950">
          {member.name}
          {member.pronouns && (
            <span className="font-sans text-xs font-normal text-ink-500">{member.pronouns}</span>
          )}
          {member.placeholder && <PlaceholderTag />}
        </h3>
        {!compact && (member.program || member.hometown) && (
          <dl className="mt-3 space-y-1 text-sm">
            {member.program && (
              <div className="flex gap-2">
                <dt className="font-bold text-sky-700">Program</dt>
                <dd className="text-ink-700">{member.program}</dd>
              </div>
            )}
            {member.hometown && (
              <div className="flex gap-2">
                <dt className="font-bold text-sky-700">Hometown</dt>
                <dd className="text-ink-700">{member.hometown}</dd>
              </div>
            )}
          </dl>
        )}
        {!compact && member.funFact && (
          <p className="mt-3 rounded-xl bg-brand-50 px-3.5 py-2.5 text-sm leading-relaxed text-ink-700">
            <span className="font-bold text-brand-700">Fun fact: </span>
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-300 text-ink-700 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-300 text-ink-700 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
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
