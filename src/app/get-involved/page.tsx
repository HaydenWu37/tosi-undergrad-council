import type { Metadata } from "next";
import { PathwayCard } from "@/components/cards/PathwayCard";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { pathways } from "@/data/involvement";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Seven ways to join TOSI's undergraduate community, from attending an event to joining the Council.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero eyebrow="Get involved" title="Find your way in." seed={31}>
        Whether you have five minutes or a full term, there is a way to take part. Pick a starting
        point below.
      </PageHero>
      <Section labelledBy="pathways-heading">
        <Container>
          <h2 id="pathways-heading" className="sr-only">Ways to get involved</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pathways.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
                <PathwayCard pathway={p} number={i + 1} />
              </Reveal>
            ))}
            <Reveal as="li" delay={160}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-brand-800 p-6 text-white">
                <h3 className="text-2xl">Not sure where to start?</h3>
                <p className="mt-2 text-brand-100">
                  Message us, or follow along on Instagram and drop in when something looks
                  interesting.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href="/contact" variant="inverse">Contact us</Button>
                  <Button href={site.instagram.url} variant="outlineInverse">Instagram</Button>
                </div>
              </div>
            </Reveal>
          </ul>
        </Container>
      </Section>
    </>
  );
}
