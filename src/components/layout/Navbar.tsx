"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NeuronMark } from "@/components/graphics/NeuronMark";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  // The menu is "open" only for the page it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAt(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  // Exact match for "All events"; prefix match for deeper pages such as Journal Club.
  const isChildActive = (href: string) =>
    href === "/events" ? pathname === "/events" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-paper-300 bg-paper-50/90 backdrop-blur-md"
          : "border-transparent bg-paper-50/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[var(--nav-height)] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-brand-700"
          aria-label={`${site.name}, home`}
        >
          <NeuronMark className="h-8 w-8" />
          <span className="font-display text-xl font-semibold tracking-tight text-ink-950">
            TOSI
          </span>
          <span className="eyebrow hidden border-l border-paper-300 pl-2.5 text-[0.65rem] leading-tight text-ink-600 sm:block">
            Undergraduate
            <br />
            Council
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href} className="group relative">
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href)
                    ? "text-brand-800 after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-signal-500"
                    : "text-ink-700 hover:text-ink-950"
                }`}
              >
                {l.label}
                {l.children && (
                  <ChevronDown
                    className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                    aria-hidden="true"
                  />
                )}
              </Link>
              {l.children && (
                <div className="invisible absolute left-0 top-full z-50 w-64 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-2xl border border-paper-300 bg-white p-2 shadow-lift">
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          aria-current={isChildActive(c.href) ? "page" : undefined}
                          className={`block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-brand-50 ${
                            isChildActive(c.href) ? "bg-brand-50" : ""
                          }`}
                        >
                          <span className="block text-sm font-semibold text-ink-950">{c.label}</span>
                          {c.description && (
                            <span className="block text-xs text-ink-600">{c.description}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          <li className="ml-3">
            <Button href="/get-involved" arrow>
              Get Involved
            </Button>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 rounded-full p-2 text-ink-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenAt(open ? null : pathname)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="page-enter fixed inset-x-0 top-[var(--nav-height)] bottom-0 overflow-y-auto border-t border-paper-300 bg-paper-50 px-5 pb-10 pt-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href} className="border-b border-paper-200">
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) && !l.children ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-display text-2xl ${
                    isActive(l.href) ? "text-brand-700" : "text-ink-950"
                  }`}
                >
                  {l.label}
                </Link>
                {l.children && (
                  <ul className="mb-3 space-y-1 border-l-2 border-brand-200 pl-4">
                    {l.children.slice(1).map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          aria-current={isChildActive(c.href) ? "page" : undefined}
                          className={`block py-2 text-lg ${
                            isChildActive(c.href) ? "font-semibold text-brand-700" : "text-ink-700"
                          }`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="border-b border-paper-200">
              <Link href="/contact" className="block py-4 font-display text-2xl text-ink-950">
                Contact
              </Link>
            </li>
          </ul>
          <Button href="/get-involved" size="lg" arrow className="mt-8 w-full">
            Get Involved
          </Button>
        </div>
      )}
    </header>
  );
}
