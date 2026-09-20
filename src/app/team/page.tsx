import type { Metadata } from "next";
import { TeamCard } from "@/components/cards/TeamCard";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import Image from "next/image";
import { HeadshotCredit } from "@/components/ui/PhotoCredit";
import { groupPhotos, team } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the undergraduates on the TOSI Undergraduate Council.",
};

export default function TeamPage() {
  // Group members under their heading, keeping the order they are listed in.
  const slug = (n: string) => `grp-${n.toLowerCase().replace(/\s+/g, "-")}`;
  const groups: { name: string; members: typeof team }[] = [];
  for (const m of team) {
    const name = m.group ?? "Council";
    const g = groups.find((x) => x.name === name);
    if (g) g.members.push(m);
    else groups.push({ name, members: [m] });
  }

  return (
    <>
      <PageHero eyebrow="The Council" title="Meet the team." seed={25}>
        The undergraduates who organize events, run Journal Club, and welcome new members.
      </PageHero>
      <Section labelledBy="team-list" className="!pt-10 sm:!pt-14">
        <Container>
          <Reveal>
            <figure className="relative mb-14 overflow-hidden rounded-3xl bg-ink-900 shadow-soft">
              <div className="relative aspect-[16/9] sm:aspect-[2.4/1]">
                <Image
                  src={groupPhotos.stairs.src}
                  alt={groupPhotos.stairs.alt}
                  fill
                  priority
                  sizes="(min-width: 1152px) 1100px, 94vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </figure>
          </Reveal>
          <h2 id="team-list" className="sr-only">Council members</h2>
          <div className="space-y-14">
            {groups.map((g) => (
              <section key={g.name} aria-labelledby={slug(g.name)}>
                <h3
                  id={slug(g.name)}
                  className="font-hand border-b border-paper-300 pb-2 text-4xl text-brand-500 sm:text-5xl"
                >
                  {g.name}
                </h3>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {g.members.map((m) => (
                    <Reveal as="li" key={m.id}>
                      <TeamCard member={m} index={team.indexOf(m)} />
                    </Reveal>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <HeadshotCredit className="mt-10" />
        </Container>
      </Section>
      <CTASection
        title="Join the Council"
        text="We welcome new members with fresh ideas. Tell us what you would like to help with."
        primary={{ label: "Ask about applying", href: "/contact?topic=apply" }}
        secondary={{ label: "Other ways to help", href: "/get-involved" }}
      />
    </>
  );
}
