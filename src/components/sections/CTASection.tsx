import { NeuralField } from "@/components/graphics/NeuralField";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTASection({
  title = "Ready to get involved?",
  text = "Join a journal club, come to an event, or help run one. There is a place for every undergraduate curious about the brain.",
  primary = { label: "See ways to get involved", href: "/get-involved" },
  secondary = { label: "Contact the council", href: "/contact" },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="cta-heading" className="px-5 py-16 sm:px-8 sm:py-24">
      <Container className="!px-0">
        <div className="on-dark relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-14 text-center sm:px-14 sm:py-20">
          <NeuralField className="text-brand-200 opacity-25" seed={3} cols={12} rows={6} />
          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow text-brand-200">Join the community</p>
            <h2 id="cta-heading" className="mt-4 text-4xl text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-lg text-brand-100">{text}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primary.href} variant="inverse" size="lg" arrow>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="outlineInverse" size="lg">
                {secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
