import { InstagramIcon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

/**
 * No API or login required. Rather than embedding posts, this links out to the
 * account and describes what people typically find there.
 */
const topics = [
  "Journal club announcements",
  "Research fair highlights",
  "Open science office hours",
  "Trainee council recruitment",
  "Community takeovers and awards",
  "Event announcements and recaps",
];

export function InstagramSection() {
  return (
    <Section labelledBy="instagram-heading" className="bg-paper-100">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeader eyebrow="Stay connected" title="Follow TOSI on Instagram">
              Announcements, event recaps, and community highlights are shared first on our
              Instagram.
            </SectionHeader>
            <div className="mt-8">
              <Button href={site.instagram.url} size="lg">
                <InstagramIcon className="h-5 w-5" />
                {site.instagram.handle}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl border border-paper-300 bg-white p-6 shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8"
            >
              <span className="sr-only">Open {site.instagram.handle} on Instagram (opens in a new tab)</span>
              <div className="flex items-center gap-4" aria-hidden="true">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 text-brand-300">
                  <InstagramIcon className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-display text-xl text-ink-950">{site.instagram.handle}</p>
                  <p className="text-sm text-ink-600">{site.fullName}</p>
                </div>
              </div>
              <p className="eyebrow mt-7 text-[0.68rem] text-brand-700" aria-hidden="true">
                What you will find there
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2" aria-hidden="true">
                {topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-paper-200 bg-paper-50 px-3.5 py-2.5 text-sm text-ink-700 transition-colors group-hover:border-brand-200"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
