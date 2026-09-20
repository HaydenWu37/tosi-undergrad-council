import type { Metadata } from "next";
import { CommunityDiagram } from "@/components/graphics/CommunityDiagram";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { MissionSection } from "@/components/sections/MissionSection";
import { PageHero } from "@/components/sections/PageHero";
import { goals, intro, whatWeDo } from "@/data/about";
import { site } from "@/data/site";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "What TOSI is, and how the Undergraduate Council brings students into its community.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Neuroscience, research, and community, together." seed={4}>
        {site.affiliationLine}. The Undergraduate Council makes that community open to students.
      </PageHero>

      <Section labelledBy="what-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="space-y-12">
              <div>
                <h2 id="what-heading" className="text-3xl text-ink-950 sm:text-4xl">What is TOSI?</h2>
                <p className="mt-4 text-lg text-ink-700">{intro.what}</p>
                <p className="mt-3 text-sm text-ink-600">
                  {site.fullName}. Focus areas: neuroscience, research, education, and community.
                </p>
              </div>
              <div>
                <h2 className="text-3xl text-ink-950 sm:text-4xl">The Undergraduate Council</h2>
                <p className="mt-4 text-lg text-ink-700">{intro.council}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <CommunityDiagram />
            </Reveal>
          </div>
        </Container>
      </Section>

      <MissionSection />

      <Section labelledBy="goals-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <SectionHeader id="goals-heading" eyebrow="Goals" title="What we are working toward" />
            </Reveal>
            <ul className="divide-y divide-paper-300 border-y border-paper-300">
              {goals.map((g, i) => (
                <Reveal as="li" key={g} delay={i * 60} className="flex gap-4 py-5">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-lg text-ink-800">{g}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section labelledBy="role-heading" className="border-t border-paper-300 bg-paper-100">
        <Container>
          <Reveal>
            <SectionHeader id="role-heading" eyebrow="Our role" title="How the Council helps students">
              The Council turns TOSI&rsquo;s community into concrete opportunities for undergraduates.
            </SectionHeader>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {whatWeDo.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 70} className="rounded-2xl border border-paper-300 bg-white p-6">
                <h3 className="text-xl text-ink-950">{w.title}</h3>
                <p className="mt-2 text-ink-600">{w.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
