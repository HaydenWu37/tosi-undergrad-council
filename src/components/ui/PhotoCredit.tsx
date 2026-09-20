import { site } from "@/data/site";

/** Photographer credit required for the council headshots. */
export function HeadshotCredit({ className = "" }: { className?: string }) {
  const c = site.photoCredits.headshots;
  return (
    <p className={`text-sm text-ink-600 ${className}`}>
      Headshots by {c.photographer}, {c.group} (
      <a
        href={c.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-700 underline underline-offset-4 hover:text-brand-900"
      >
        {c.handle}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      ).
    </p>
  );
}
