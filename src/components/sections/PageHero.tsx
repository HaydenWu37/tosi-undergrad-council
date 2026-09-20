import { NeuralField } from "@/components/graphics/NeuralField";
import { AtomMark, Sparkle } from "@/components/graphics/Decor";
import { Container } from "@/components/ui/Container";

/** Shared header for interior pages. */
export function PageHero({
  eyebrow,
  title,
  children,
  seed = 11,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  seed?: number;
}) {
  return (
    <div className="relative overflow-hidden border-b border-paper-300 bg-paper-100">
      <div className="bg-dots absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <NeuralField className="text-brand-600 opacity-[0.14] [mask-image:linear-gradient(to_left,black,transparent_70%)]" seed={seed} cols={14} rows={6} />
      <div aria-hidden="true" className="absolute -right-10 -top-14 hidden h-56 w-56 items-center justify-center rounded-full bg-mint-100 text-mint-300 sm:flex">
        <AtomMark className="h-40 w-40" />
      </div>
      <div aria-hidden="true" className="absolute right-40 top-24 hidden h-6 w-6 rounded-full bg-brand-200 md:block" />
      <Sparkle className="absolute right-24 top-40 hidden h-12 w-12 lg:block" />
      <Container className="relative py-16 sm:py-24">
        <p className="eyebrow text-brand-700">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl text-ink-950 sm:text-6xl">{title}</h1>
        {children && <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">{children}</p>}
      </Container>
    </div>
  );
}
