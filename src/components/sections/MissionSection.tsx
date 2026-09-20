import { NeuralField } from "@/components/graphics/NeuralField";
import { PlaceholderTag } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { mission, pillars } from "@/data/about";
import { site } from "@/data/site";

export function MissionSection() {
  return (
    <Section labelledBy="mission-heading" className="on-dark relative overflow-hidden bg-ink-950">
      <NeuralField className="text-brand-300 opacity-[0.18]" seed={5} cols={14} rows={8} />
      <Container className="relative">
        <Reveal>
          <p className="eyebrow text-brand-200">Our mission</p>
          <h2 id="mission-heading" className="sr-only">
            Our Mission
          </h2>
          <blockquote className="mt-5 max-w-4xl font-display text-3xl leading-[1.2] text-white sm:text-5xl">
            <span className="text-signal-400" aria-hidden="true">
              “
            </span>
            {mission.statement}
            <span className="text-signal-400" aria-hidden="true">
              ”
            </span>
          </blockquote>
          {site.showPlaceholderNotices && (
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-400">
              <PlaceholderTag className="!border-ink-500 !text-ink-400" /> {mission.note}
            </p>
          )}
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 80} className="bg-ink-950/90 p-7 backdrop-blur-sm">
              <div className="flex items-center justify-between text-brand-300">
                <Icon name={p.icon} className="h-7 w-7" />
                <span className="font-mono text-xs text-ink-500">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
