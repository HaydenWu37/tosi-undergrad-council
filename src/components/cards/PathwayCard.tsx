import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Pathway } from "@/lib/types";

export function PathwayCard({ pathway, number }: { pathway: Pathway; number: number }) {
  return (
    <article className="glass group relative flex h-full flex-col rounded-3xl border border-white/70 p-6 shadow-soft transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-signal-400 group-hover:text-white">
          <Icon name={pathway.icon} className="h-5 w-5" />
        </span>
        <span className="eyebrow text-ink-600" aria-hidden="true">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-xl text-ink-950">{pathway.title}</h3>
      <p className="mt-2 text-sm text-ink-600">{pathway.description}</p>
      <div className="mt-auto pt-6">
        <Button href={pathway.href} variant="secondary" arrow>
          {pathway.cta}
        </Button>
      </div>
    </article>
  );
}
