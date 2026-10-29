"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { isExternal } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outlineInverse";

const base =
  "group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,box-shadow,filter,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:shadow-lift hover:brightness-105 active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-signal-500 text-white shadow-glow",
  secondary: "border border-ink-950/15 text-ink-950 hover:bg-paper-100",
  ghost: "text-signal-500 hover:text-signal-700",
  inverse: "bg-white text-signal-500 shadow-soft",
  outlineInverse: "border border-white/40 text-white hover:bg-white/10",
};

const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

/** A gentle "magnetic" pull toward the cursor, within the button's own
 *  bounds — not a dramatic effect, just enough to feel alive. Pill-shaped
 *  buttons are the site's one truly interactive object on most screens, so
 *  this is where that "delightful" budget is best spent, rather than
 *  sprinkled everywhere. Skipped on touch (no sustained hover to respond
 *  to) and under reduced-motion. Native `addEventListener` in an effect
 *  (not JSX handler props) so no ref is ever read during render. */
function useMagnetic(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px) scale(1.04)`;
    };
    const onMouseLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [ref]);
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  useMagnetic(ref);
  const cls = `${base} ${variants[variant]} ${variant === "ghost" ? "px-0 py-0" : sizes[size]} ${className}`;
  const external = href ? isExternal(href) : false;
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      {(arrow || external) && (
        <Arrow
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return external ? (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      disabled={rest.disabled}
      className={`${cls} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {content}
    </button>
  );
}
