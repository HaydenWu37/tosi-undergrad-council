import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "A student hub for neuroscience, research, career, and graduate or medical school resources.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Tools for your next step." seed={40}>
        Starting points for reading, research, careers, and applications.
      </PageHero>
      <Section labelledBy="res-heading">
        <Container>
          <h2 id="res-heading" className="sr-only">Resource categories</h2>
          <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
            <nav aria-label="Resource categories" className="hidden lg:block">
              <ul className="sticky top-28 space-y-1 border-l border-paper-300">
                {resources.map((r) => (
                  <li key={r.id}>
                    <a
                      href={`#${r.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-ink-600 transition-colors hover:border-brand-600 hover:text-brand-800"
                    >
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-14">
              {resources.map((r) => (
                <Reveal as="section" key={r.id}>
                  <div id={r.id} aria-labelledby={`${r.id}-h`} className="scroll-mt-28">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Icon name={r.icon} className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 id={`${r.id}-h`} className="text-2xl text-ink-950">{r.title}</h3>
                        <p className="text-ink-600">{r.description}</p>
                      </div>
                    </div>
                    <ul className="mt-5 divide-y divide-paper-300 rounded-2xl border border-paper-300 bg-white">
                      {r.links.map((l) => (
                        <li key={l.label}>
                          {l.url ? (
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between gap-4 p-4 transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-brand-50 sm:px-6"
                            >
                              <span>
                                <span className="block font-medium text-ink-950">
                                  {l.label}
                                  <span className="sr-only"> (opens in a new tab)</span>
                                </span>
                                {l.description && <span className="block text-sm text-ink-600">{l.description}</span>}
                              </span>
                              <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                            </a>
                          ) : (
                            <div className="flex items-center justify-between gap-4 p-4 sm:px-6">
                              <span className="font-medium text-ink-700">{l.label}</span>
                              <span className="eyebrow shrink-0 text-[0.65rem] text-ink-500">Link coming soon</span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <CTASection
        title="Know a great resource?"
        text="Tell us what helped you and we will share it with the community."
        primary={{ label: "Suggest a resource", href: "/contact?topic=general" }}
        secondary={{ label: "Get involved", href: "/get-involved" }}
      />
    </>
  );
}
