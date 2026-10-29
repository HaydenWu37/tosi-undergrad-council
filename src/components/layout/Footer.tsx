import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/Icon";
import { footerLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink-950 text-ink-400">
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl font-semibold italic leading-none text-white">TOSI</span>
            <p className="eyebrow mt-2 text-signal-300">Undergraduate Council</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">{site.tagline}</p>
            <p className="mt-2 text-sm">
              {site.fullName}. {site.affiliationLine}.
            </p>
            <ul className="mt-6 flex gap-3" aria-label="Social links">
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-signal-400 hover:bg-signal-400"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">TOSI on Instagram (opens in a new tab)</span>
                </a>
              </li>
              {site.otherSocials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-signal-400 hover:bg-signal-400"
                  >
                    {s.icon === "linkedin" ? (
                      <LinkedInIcon className="h-4 w-4" />
                    ) : (
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    )}
                    <span className="sr-only">{s.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="eyebrow text-white">{heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm transition-colors hover:text-signal-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}.
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
