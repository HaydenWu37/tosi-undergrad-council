import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Pathway } from "@/lib/types";

export function PathwayCard({ pathway, number }: { pathway: Pathway; number: number }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-paper-300 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
          <Icon name={pathway.icon} className="h-5 w-5" />
        </span>
        <span className="font-mono text-xs text-ink-400" aria-hidden="true">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-xl text-ink-950">{pathway.title}</h3>
      <p className="mt-2 text-[0.95rem] text-ink-600">{pathway.description}</p>
      <div className="mt-auto pt-6">
        <Button href={pathway.href} variant="secondary" arrow>
          {pathway.cta}
        </Button>
      </div>
    </article>
  );
}
