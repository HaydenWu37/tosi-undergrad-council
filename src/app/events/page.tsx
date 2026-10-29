import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { EventsBrowser } from "@/components/sections/EventsBrowser";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { events } from "@/data/events";
import { splitEvents } from "@/lib/format";

export const metadata: Metadata = {
  title: "Events",
  description: "A record of the journal clubs, research talks, workshops, and socials TOSI's Undergraduate Council has run.",
};

export const revalidate = 3600;

const activities = [
  { title: "Journal Club", icon: "book" as const, text: "A monthly talk where speakers share their research and open science practices." },
  { title: "Research Talks", icon: "presentation" as const, text: "Researchers and trainees share their work and how they got started." },
  { title: "Workshops", icon: "compass" as const, text: "Hands-on sessions on practical research and open science skills." },
  { title: "Socials", icon: "users" as const, text: "Relaxed, low-pressure ways to meet the community." },
];

export default function EventsPage() {
  const { past } = splitEvents(events);

  return (
    <>
      <PageHero eyebrow="What we do" title="Come learn something, meet someone." seed={14} scene="molecule">
        A record of the journal clubs, research talks, workshops, and socials we&rsquo;ve run — and
        where to hear about what&rsquo;s next.
      </PageHero>

      <Section labelledBy="activities-heading" className="border-b border-paper-300 bg-paper-100">
        <Container>
          <Reveal>
            <SectionHeader id="activities-heading" eyebrow="The kinds of events we run" title="Our activities" />
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((a) => (
              <li key={a.title} className="border-t-2 border-signal-400 pt-5">
                <Icon name={a.icon} className="h-7 w-7 text-signal-500" />
                <h3 className="mt-4 text-2xl text-ink-950">{a.title}</h3>
                <p className="mt-2 normal-case text-ink-600">{a.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* A second navy moment on this page — real event photography on
          deep navy, the same treatment the homepage's "Recent moments"
          uses, so the past-events archive itself feels like part of the
          cinematic world rather than a plain filtered list. */}
      <Section labelledBy="past-heading" id="past" className="on-dark relative overflow-hidden bg-ink-950">
        <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.06]" />
        <Container className="relative">
          <Reveal>
            <SectionHeader id="past-heading" eyebrow="What we've done" title="Past events" tone="dark" />
          </Reveal>
          <div className="mt-8">
            <EventsBrowser past={past} dark />
          </div>
        </Container>
      </Section>

      {/* We don't run a live event calendar here — Instagram is the
          channel for what's coming up next (see the brief: "Remove the
          emphasis on upcoming-event listings... visitors should follow
          Instagram to stay informed"). */}
      <InstagramSection />

      <CTASection
        title="Want to host or speak?"
        text="We welcome researchers, trainees, and student groups who would like to run a talk or workshop."
        primary={{ label: "Propose an event", href: "/contact?topic=speaker" }}
        secondary={{ label: "Other ways to get involved", href: "/get-involved" }}
      />
    </>
  );
}
