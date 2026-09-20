import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { isExternal } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outlineInverse";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 " +
  "focus-visible:outline-offset-4 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white hover:bg-brand-800 shadow-soft hover:shadow-lift",
  secondary:
    "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-white",
  ghost: "text-brand-700 hover:text-brand-900 px-0",
  inverse: "bg-signal-400 text-ink-950 hover:bg-signal-300",
  outlineInverse:
    "border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink-950",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
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

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${variant === "ghost" ? "" : sizes[size]} ${className}`;
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
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      disabled={rest.disabled}
      className={`${cls} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {content}
    </button>
  );
}
