import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedTalk, SessionCard, TalkReference } from "@/components/cards/JournalCards";
import { TeamCard } from "@/components/cards/TeamCard";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/sections/PageHero";
import {
  featuredTalk,
  journalClubInfo,
  organizers,
  presentInfo,
  previousTalks,
  upcomingSessions,
} from "@/data/journalClub";
import { team } from "@/data/team";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Journal Club",
  description:
    "A monthly speaker series where researchers and students present their research and open science practices.",
};

export default function JournalClubPage() {
  const directors = team.filter((m) => m.group === organizers.teamGroup);
  return (
    <>
      <PageHero eyebrow="Events · Journal Club" title="Monthly talks on research and open science." seed={18}>
        {journalClubInfo.what}
      </PageHero>

      <div className="border-b border-paper-300 bg-white">
        <Container className="py-3 text-sm text-ink-600">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/events" className="hover:text-brand-700 hover:underline">
                  Events
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-ink-900">
                Journal Club
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      <Section labelledBy="how-heading">
        <Container>
          <Reveal>
            <SectionHeader id="how-heading" eyebrow="How it works" title="One speaker, once a month" />
          </Reveal>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journalClubInfo.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="border-t border-ink-950 pt-4">
                <span className="font-mono text-sm text-signal-700">Step {i + 1}</span>
                <h3 className="mt-2 text-xl text-ink-950">{s.title}</h3>
                <p className="mt-2 text-ink-600">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 text-sm text-ink-600">
            {journalClubInfo.schedule}. {journalClubInfo.location}.
          </p>
        </Container>
      </Section>

      <Section labelledBy="upcoming-heading" className="border-y border-paper-300 bg-paper-100">
        <Container>
          <Reveal>
            <SectionHeader id="upcoming-heading" eyebrow="Upcoming" title="Next sessions" />
          </Reveal>
          <div className="mt-8 space-y-4">
            {upcomingSessions.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <SessionCard session={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="featured-heading">
        <Container>
          <Reveal>
            <SectionHeader id="featured-heading" eyebrow="This month" title="Featured talk" />
          </Reveal>
          <Reveal className="mt-8" delay={80}>
            <FeaturedTalk talk={featuredTalk} />
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="previous-heading" className="border-t border-paper-300 bg-paper-100">
        <Container narrow>
          <Reveal>
            <SectionHeader id="previous-heading" eyebrow="Archive" title="Previous talks" />
          </Reveal>
          <ol className="mt-8 rounded-sm border border-paper-300 bg-white px-5 shadow-soft sm:px-8">
            {previousTalks.map((t, i) => (
              <TalkReference key={t.id} talk={t} index={i} />
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="present" labelledBy="present-heading">
        <Container>
          <div className="on-dark grid gap-10 rounded-3xl bg-ink-950 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal>
              <SectionHeader id="present-heading" eyebrow="Present at Journal Club" title="Share your research" tone="dark">
                {presentInfo.intro}
              </SectionHeader>
              <div className="mt-8">
                <Button
                  href={presentInfo.signupUrl || "/contact?topic=present"}
                  variant="inverse"
                  size="lg"
                  arrow
                >
                  Offer to present
                </Button>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow text-brand-200">How it goes</p>
              <ol className="mt-4 space-y-5">
                {presentInfo.points.map((p, i) => (
                  <li key={p} className="flex gap-4 text-ink-400">
                    <span className="font-mono text-signal-300">0{i + 1}</span>
                    <span className="text-white">{p}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section labelledBy="behind-heading" className="!pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <SectionHeader id="behind-heading" eyebrow="Behind the scenes" title="Who runs Journal Club">
                {organizers.intro}
              </SectionHeader>
              <ul className="mt-8 space-y-4">
                {organizers.duties.map((d) => (
                  <li key={d} className="flex gap-3 text-ink-800">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            {directors.length > 0 && (
              <ul className="grid gap-5 sm:grid-cols-2">
                {directors.map((m, i) => (
                  <Reveal as="li" key={m.id} delay={i * 80}>
                    <TeamCard member={m} index={team.indexOf(m)} compact />
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
