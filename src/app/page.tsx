import { AtomMark, Sparkle, Squiggle } from "@/components/graphics/Decor";
import { NeuralField } from "@/components/graphics/NeuralField";
import { EventCard } from "@/components/cards/EventCard";
import { FeaturedTalk } from "@/components/cards/JournalCards";
import { TeamCard } from "@/components/cards/TeamCard";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { intro, whatWeDo } from "@/data/about";
import { events } from "@/data/events";
import { featuredTalk, journalClubInfo } from "@/data/journalClub";
import { resources } from "@/data/resources";
import { site } from "@/data/site";
import { groupPhotos, team } from "@/data/team";
import { eventPhotoSrc, splitEvents } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { HeadshotCredit } from "@/components/ui/PhotoCredit";

// Re-evaluate hourly so events roll from "upcoming" to "past" without a redeploy.
export const revalidate = 3600;

const glance = [
  { label: "What is TOSI?", text: "A trainee community for open, collaborative neuroscience.", href: "#about" },
  { label: "What do we do?", text: "Events, Journal Club talks, and pathways into research.", href: "#what-we-do" },
  { label: "What is on offer?", text: "Talks, workshops, Journal Club, and research resources.", href: "#opportunities" },
  { label: "How do I join?", text: "Come to anything. No sign-up barrier.", href: "#get-involved" },
];

export default function HomePage() {
  const { upcoming, past } = splitEvents(events);
  const recent = past.filter((e) => e.photos?.length).slice(0, 5);
  const featured = upcoming.find((e) => e.featured) ?? upcoming[0];
  const listed = upcoming.filter((e) => e.id !== featured?.id).slice(0, 3);

  return (
    <>
      {/* 2. Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-paper-100">
        <NeuralField className="text-brand-500 opacity-[0.10]" seed={9} cols={16} rows={9} />
        <div aria-hidden="true" className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-100" />
        <div aria-hidden="true" className="absolute bottom-10 left-[38%] hidden h-40 w-40 rounded-full bg-sky-100 lg:block" />
        <Container className="relative pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="eyebrow text-brand-700">{site.fullName}</p>
              <p className="font-hand mt-3 text-3xl text-brand-500 sm:text-4xl">Curious about the brain?</p>
              <h1
                id="hero-heading"
                className="mt-2 text-5xl leading-[1.04] text-ink-950 sm:text-7xl lg:text-[5.25rem]"
              >
                TOSI
                <br />
                <span className="relative inline-block text-brand-600">
                  Undergraduate
                  <Squiggle className="absolute -bottom-3 left-0 h-3 w-full" />
                </span>{" "}
                Council
              </h1>
              <p className="mt-8 max-w-xl text-lg text-ink-700 sm:text-xl">{site.tagline}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/get-involved" size="lg" arrow>
                  Get Involved
                </Button>
                <Button href="/events" variant="secondary" size="lg">
                  Explore Events
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-8 z-10 flex h-28 w-28 items-center justify-center rounded-full bg-mint-100 text-mint-300 sm:-left-8 sm:h-36 sm:w-36"
              >
                <AtomMark className="h-24 w-24 sm:h-28 sm:w-28" />
              </div>
              <Sparkle className="absolute -right-2 -top-8 z-10 h-14 w-14 sm:-right-6" />
              <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-brand-300" />
              <div className="relative aspect-[3/2] overflow-hidden rounded-b-[2rem] rounded-t-[5rem] border-[6px] border-white bg-mint-100 shadow-lift">
                <Image
                  src={groupPhotos.stairs.src}
                  alt={groupPhotos.stairs.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {glance.map((g, i) => (
              <li key={g.label}>
                <a
                  href={g.href}
                  className="group block h-full rounded-2xl border border-paper-300 bg-white/80 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
                >
                  <span
                    className={`eyebrow inline-block rounded-full px-2.5 py-1 text-[0.65rem] ${
                      ["bg-brand-100 text-brand-800", "bg-mint-100 text-mint-800", "bg-sky-100 text-sky-700", "bg-signal-100 text-signal-700"][i]
                    }`}
                  >
                    {g.label}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-ink-700">{g.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. Upcoming events */}
      <Section labelledBy="events-heading">
        <Container>
          <Reveal>
            <SectionHeader id="events-heading"
              eyebrow="Upcoming"
              title="What is happening next"
              action={<Button href="/events" variant="secondary" arrow>All events</Button>}
            >
              Talks, workshops, and socials for undergraduates.
            </SectionHeader>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured && (
              <Reveal className="lg:col-span-3">
                <EventCard event={featured} featured />
              </Reveal>
            )}
            {listed.map((e, i) => (
              <Reveal key={e.id} delay={i * 80}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. About TOSI */}
      <Section id="about" labelledBy="about-heading" className="border-y border-paper-300 bg-paper-100">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeader id="about-heading" eyebrow="About TOSI" title="A community built around open neuroscience" />
              <div className="mt-4">
                <Button href="/about" variant="ghost" arrow>
                  More about us
                </Button>
              </div>
            </Reveal>
            <Reveal delay={100} className="space-y-6 text-lg text-ink-700">
              <p>{intro.what}</p>
              <p>{intro.council}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 5. What we do */}
      <Section id="what-we-do" labelledBy="do-heading">
        <Container>
          <Reveal>
            <SectionHeader id="do-heading" eyebrow="The Undergraduate Council" title="What we do" as="h2">
              We are the undergraduate arm of TOSI, organizing the ways students learn, connect, and
              get started in research.
            </SectionHeader>
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 80}>
                <Link href={w.href} className="group block border-t-2 border-ink-950 pt-5">
                  <Icon name={w.icon} className="h-7 w-7 text-brand-600" />
                  <h3 className="mt-4 text-2xl text-ink-950 transition-colors group-hover:text-brand-700">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-ink-600">{w.text}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Recent moments (past-event photos) */}
      <Section labelledBy="recent-heading" className="on-dark bg-ink-950">
        <Container>
          <Reveal>
            <SectionHeader
              id="recent-heading"
              tone="dark"
              eyebrow="Recently"
              title="Moments from past events"
              action={<Button href="/events#past" variant="outlineInverse" arrow>See all photos</Button>}
            >
              Lab tours, research fairs, journal clubs, and plenty of food along the way.
            </SectionHeader>
          </Reveal>
          <ul className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] lg:grid-cols-4">
            {recent.map((e, i) => (
              <Reveal
                as="li"
                key={e.id}
                delay={i * 70}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <Link
                  href="/events#past"
                  className="group relative block h-full overflow-hidden rounded-2xl bg-ink-900"
                >
                  <Image
                    src={eventPhotoSrc(e, e.photos![0])}
                    alt={e.photoAlt ?? e.title}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  <span className="absolute inset-x-3 bottom-3 font-display text-base leading-tight text-white sm:text-lg">
                    {e.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 6. Journal Club */}
      <Section labelledBy="jc-heading" className="bg-paper-100 border-y border-paper-300">
        <Container>
          <Reveal>
            <SectionHeader id="jc-heading"
              eyebrow="Journal Club"
              title="Hear the research. Join the conversation."
              action={<Button href="/events/journal-club" arrow>Explore Journal Club</Button>}
            >
              {journalClubInfo.what}
            </SectionHeader>
          </Reveal>
          <Reveal className="mt-10" delay={100}>
            <FeaturedTalk talk={featuredTalk} />
          </Reveal>
        </Container>
      </Section>

      {/* 7. Opportunities */}
      <Section id="opportunities" labelledBy="opp-heading">
        <Container>
          <Reveal>
            <SectionHeader id="opp-heading"
              eyebrow="Research & community"
              title="Find your next step"
              action={<Button href="/resources" variant="secondary" arrow>All resources</Button>}
            >
              A student-friendly hub for finding research, planning your career, and preparing for
              graduate or medical school.
            </SectionHeader>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources
              .filter((r) =>
                ["research-opportunities", "undergraduate-research", "graduate-medical"].includes(r.id),
              )
              .map((r, i) => (
                <Reveal as="li" key={r.id} delay={i * 80}>
                  <Link
                    href={`/resources#${r.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-paper-300 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-xl text-ink-950">{r.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-ink-600">{r.description}</p>
                  </Link>
                </Reveal>
              ))}
          </ul>
        </Container>
      </Section>

      {/* 8. Meet the council */}
      <Section labelledBy="team-heading" className="border-y border-paper-300 bg-paper-100">
        <Container>
          <Reveal>
            <SectionHeader id="team-heading"
              eyebrow="Meet the council"
              title="Undergraduates running for undergraduates"
              action={<Button href="/team" variant="secondary" arrow>Full team</Button>}
            />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(0, 4).map((m, i) => (
              <Reveal as="li" key={m.id} delay={i * 80}>
                <TeamCard member={m} index={i} compact />
              </Reveal>
            ))}
          </ul>
          <HeadshotCredit className="mt-8" />
        </Container>
      </Section>

      {/* 9. Get involved */}
      <div id="get-involved">
        <CTASection />
      </div>

      {/* 10. Instagram */}
      <InstagramSection />
    </>
  );
}
