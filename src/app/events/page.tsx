import type { Metadata } from "next";
import { EventCard } from "@/components/cards/EventCard";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { EventsBrowser } from "@/components/sections/EventsBrowser";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { events } from "@/data/events";
import { journalClubInfo } from "@/data/journalClub";
import { splitEvents } from "@/lib/format";

export const metadata: Metadata = {
  title: "Events",
  description: "Journal clubs, research talks, workshops, and socials for undergraduates.",
};

export const revalidate = 3600;

export default function EventsPage() {
  const { upcoming, past } = splitEvents(events);
  const featured = upcoming.find((e) => e.featured);
  const rest = upcoming.filter((e) => e.id !== featured?.id);

  return (
    <>
      <PageHero eyebrow="Events" title="Come learn something, meet someone." seed={14}>
        Journal clubs, research talks, workshops, and socials. Everything is designed with
        undergraduates in mind.
      </PageHero>

      {featured && (
        <Section labelledBy="featured-heading" className="!pb-0">
          <Container>
            <Reveal>
              <SectionHeader id="featured-heading" eyebrow="Featured" title="Next up" />
              <div className="mt-8">
                <EventCard event={featured} featured />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section labelledBy="jc-feature-heading" className="!pb-0">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-100 p-8 sm:p-12">
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-mint-100" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-soft">
                  <Icon name="presentation" className="h-8 w-8" />
                </span>
                <div>
                  <p className="eyebrow text-brand-800">Monthly series</p>
                  <h2 id="jc-feature-heading" className="mt-1 text-3xl text-ink-950 sm:text-4xl">
                    Journal Club
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-700">{journalClubInfo.what}</p>
                </div>
                <Button href="/events/journal-club" size="lg" arrow>
                  Explore Journal Club
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="all-heading">
        <Container>
          <SectionHeader id="all-heading" eyebrow="Calendar" title="All events" />
          <div className="mt-8">
            <EventsBrowser upcoming={rest} past={past} />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Want to host or speak?"
        text="We welcome researchers, trainees, and student groups who would like to run a talk or workshop."
        primary={{ label: "Propose an event", href: "/contact?topic=speaker" }}
        secondary={{ label: "Other ways to get involved", href: "/get-involved" }}
      />
    </>
  );
}
