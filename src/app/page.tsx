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
import { site } from "@/data/site";
import { groupPhotos, team } from "@/data/team";
import { eventPhotoSrc, splitEvents } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { HeadshotCredit } from "@/components/ui/PhotoCredit";
import { SignalButton } from "@/components/ui/SignalButton";

// Re-evaluate hourly so new past-event photos appear without a redeploy.
export const revalidate = 3600;

// "Who we are, what we do, what we've done, how to join" — the three
// things the brief asks visitors to understand, plus the door in.
const glance = [
  { n: "01", label: "Who we are", href: "#about" },
  { n: "02", label: "What we do", href: "#what-we-do" },
  { n: "03", label: "What we've done", href: "#recent" },
  { n: "04", label: "How to join", href: "#get-involved" },
];

export default function HomePage() {
  const { past } = splitEvents(events);
  const recent = past.filter((e) => e.photos?.length).slice(0, 5);

  return (
    <>
      {/* Hero — the first of the page's two WebGL "void" moments (the other
          is "What we do", running a different procedural scene — neuron
          here, DNA there — so neither navy section repeats the other's
          artwork). Its dark backdrop is VoidBackdrop (mounted in
          layout.tsx, fixed, between AmbientField and NeuralScene), not a
          background on this section itself — a plain opaque bg here would
          sit later in the DOM than the fixed particle canvas and occlude
          it; VoidBackdrop instead sits *behind* the canvas but in front of
          the light ambient field, so the network reads as glowing dust
          against navy. `data-void` is what tells VoidBackdrop (and
          NeuralSceneLoader — white sections get zero interactive
          background) to activate. Deliberately asymmetric otherwise: the
          portrait is offset and overlaps the text column's measure, and
          the "at a glance" points read as a single editorial rule rather
          than four boxed cards. */}
      <section aria-labelledby="hero-heading" className="on-dark relative" data-scene="neuron" data-void="true">
        <Container className="relative pb-14 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="grid gap-x-8 gap-y-16 lg:grid-cols-[1.15fr_1fr]">
            <div className="lg:pt-10">
              <p className="eyebrow border-t border-white/15 pt-3 text-signal-300">
                {site.fullName}
              </p>
              <h1
                id="hero-heading"
                className="glow-text mt-6 text-6xl leading-[1.04] text-white sm:text-7xl lg:text-[5.75rem]"
              >
                TOSI
                <br />
                <em>Undergrad</em> Council
              </h1>
              <p className="mt-8 max-w-md text-lg normal-case leading-relaxed text-ink-400 sm:text-xl">
                {site.tagline}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/get-involved" variant="inverse" size="lg" arrow>
                  Get Involved
                </Button>
                <Button href="/events" variant="outlineInverse" size="lg">
                  See Our Events
                </Button>
              </div>
              <div className="mt-6">
                <SignalButton tone="dark" />
              </div>
            </div>

            <div className="relative lg:mt-20 lg:pl-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 shadow-glow lg:-mr-10">
                <Image
                  src={groupPhotos.committee.src}
                  alt={groupPhotos.committee.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="object-cover"
                />
              </div>
              <p className="eyebrow-sm eyebrow mt-4 text-ink-400">— The Undergraduate Council, McGill&rsquo;s Arts Building</p>
            </div>
          </div>

          <ul className="mt-20 flex flex-col divide-y divide-white/10 border-t border-white/10 sm:flex-row sm:divide-x sm:divide-y-0 lg:mt-28">
            {glance.map((g) => (
              <li key={g.label} className="flex-1 py-5 sm:px-6 sm:py-6 first:sm:pl-0">
                <a href={g.href} className="group flex items-baseline justify-between gap-3 sm:block">
                  <span className="eyebrow text-ink-400">{g.n}</span>
                  <span className="font-display text-lg text-white transition-colors group-hover:text-signal-300 sm:mt-2 sm:block sm:text-xl">
                    {g.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Who we are — static white, editorial. No interactive background. */}
      <Section id="about" labelledBy="about-heading" className="border-y border-paper-300 bg-paper-100">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeader id="about-heading" eyebrow="Who we are" title="A community built around open science" />
              <div className="mt-4">
                <Button href="/about" variant="ghost" arrow>
                  More about us
                </Button>
              </div>
            </Reveal>
            <Reveal delay={100} className="space-y-6 text-lg normal-case text-ink-600">
              <p>{intro.what}</p>
              <p>{intro.council}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What we do — the second "deep space" moment, a different
          procedural scene (DNA) from the hero's (neuron). Plain text on
          the void (no cards), so there's nothing here that needs a
          light-background audit. */}
      <Section id="what-we-do" labelledBy="do-heading" scene="dna" voidMode className="on-dark relative">
        <Container className="relative">
          <Reveal>
            <SectionHeader id="do-heading" eyebrow="The Undergraduate Council" title="What we do" as="h2" tone="dark">
              We are the undergraduate arm of TOSI, organizing the ways students learn, connect, and
              get started in open science.
            </SectionHeader>
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 80}>
                <Link href={w.href} className="group block border-t-2 border-signal-400 pt-5">
                  <Icon name={w.icon} className="h-7 w-7 text-signal-300" />
                  <h3 className="mt-4 text-2xl text-white transition-colors group-hover:text-signal-300">
                    {w.title}
                  </h3>
                  <p className="mt-2 normal-case text-ink-400">{w.text}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Who's behind it — static white, editorial. Moved up from the foot
          of the page: the brief asks for the team to be easy to discover,
          not a detail you have to scroll past everything else to reach. */}
      <Section labelledBy="team-heading" className="border-b border-paper-300 bg-paper-100">
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

      {/* What we've done — the third "deep space" moment, a photographic
          record rather than a procedural scene: real event photography is
          the focal point here, so the network stays out of its way while
          the dark navy canvas (and its own grain texture) keeps the
          cinematic register going between the two WebGL moments. */}
      <Section id="recent" labelledBy="recent-heading" className="on-dark relative overflow-hidden bg-ink-950">
        <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.06]" />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              id="recent-heading"
              tone="dark"
              eyebrow="What we've done"
              title="Moments from past events"
              action={<Button href="/events" variant="outlineInverse" arrow>See all events</Button>}
            >
              A record of the talks, workshops, and socials our community has run — and the people who
              showed up for them.
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
                <Link href="/events#past" className="group relative block h-full overflow-hidden rounded-2xl">
                  <Image
                    src={eventPhotoSrc(e, e.photos![0])}
                    alt={e.photoAlt ?? e.title}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                  <span className="font-display absolute inset-x-3 bottom-3 text-base leading-tight text-white sm:text-lg">
                    {e.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Instagram — static white. We don't run a live event calendar;
          Instagram is the channel for what's coming up next. */}
      <InstagramSection />

      {/* Get involved — closing CTA. A boxed card design rather than a
          full-bleed section, so it stays dark-navy (on-brand) without
          trying to force the particle network into a shape it doesn't
          suit — the hero and "What we do" are the page's two WebGL
          moments; "What we've done" and this one are navy-but-content-led. */}
      <div id="get-involved">
        <CTASection />
      </div>
    </>
  );
}
