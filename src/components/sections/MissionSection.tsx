import { PlaceholderTag } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { mission, pillars } from "@/data/about";
import { site } from "@/data/site";

export function MissionSection() {
  return (
    <Section labelledBy="mission-heading" className="on-dark relative overflow-hidden bg-ink-950">
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.06]" />
      <Container className="relative">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-signal-300">
            <span aria-hidden="true">{"//"}</span>
            Our mission
          </p>
          <h2 id="mission-heading" className="sr-only">
            Our Mission
          </h2>
          <blockquote className="font-display mt-5 max-w-4xl text-3xl normal-case leading-[1.2] text-white sm:text-5xl">
            <em>“{mission.statement}”</em>
          </blockquote>
          {site.showPlaceholderNotices && (
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-400">
              <PlaceholderTag className="!border-ink-500 !text-ink-400" /> {mission.note}
            </p>
          )}
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 80} className="glass rounded-3xl border border-white/10 p-7">
              <div className="flex items-center justify-between text-signal-300">
                <Icon name={p.icon} className="h-7 w-7" />
                <span className="font-mono text-xs text-ink-500">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl text-white">{p.title}</h3>
              <p className="mt-2 text-sm normal-case leading-relaxed text-ink-400">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
