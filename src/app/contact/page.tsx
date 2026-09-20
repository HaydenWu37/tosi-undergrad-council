import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail } from "lucide-react";
import { PlaceholderTag } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Container";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the TOSI Undergraduate Council.",
};

const row =
  "group flex items-center gap-4 rounded-2xl border border-paper-300 bg-white p-5 transition-[border-color,box-shadow] hover:border-brand-300 hover:shadow-soft";
const iconBox =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Say hello." seed={52}>
        Questions, ideas, or want to get involved? Send us a message.
      </PageHero>
      <Section labelledBy="contact-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div id="form">
              <h2 id="contact-heading" className="text-3xl text-ink-950">Send a message</h2>
              <div className="mt-8">
                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
            <aside aria-label="Other ways to reach us">
              <h2 className="text-3xl text-ink-950">Elsewhere</h2>
              <ul className="mt-8 space-y-4">
                <li>
                  <a href={`mailto:${site.email}`} className={row}>
                    <span className={iconBox}><Mail className="h-5 w-5" aria-hidden="true" /></span>
                    <span className="min-w-0">
                      <span className="eyebrow flex items-center gap-2 text-[0.68rem] text-ink-600">
                        Email {site.showPlaceholderNotices && <PlaceholderTag />}
                      </span>
                      <span className="block break-all font-medium text-ink-950">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={row}>
                    <span className={iconBox}><InstagramIcon className="h-5 w-5" /></span>
                    <span>
                      <span className="eyebrow block text-[0.68rem] text-ink-600">Instagram</span>
                      <span className="font-medium text-ink-950">
                        {site.instagram.handle}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </span>
                  </a>
                </li>
                {site.otherSocials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={row}>
                      <span className={iconBox}>
                        {s.icon === "linkedin" ? <LinkedInIcon className="h-5 w-5" /> : <Mail className="h-5 w-5" aria-hidden="true" />}
                      </span>
                      <span className="font-medium text-ink-950">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
