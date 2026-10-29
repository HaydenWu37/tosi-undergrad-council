import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found" };

/** Custom 404 — Next.js's bare default left a first-time visitor who hits a
 *  dead or mistyped link with nothing but the nav bar and no way forward. */
export default function NotFound() {
  return (
    <Section labelledBy="not-found-heading" className="bg-paper-50">
      <Container className="text-center">
        <p className="eyebrow text-signal-500">404</p>
        <h1 id="not-found-heading" className="mt-4 text-5xl text-ink-950 sm:text-6xl">
          This page wandered off.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg normal-case text-ink-600">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or it moved. Here&rsquo;s where you
          probably meant to go.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg" arrow>
            Go home
          </Button>
          <Button href="/events" variant="secondary" size="lg">
            See our events
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
