import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  children,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  action,
  id,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  action?: ReactNode;
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "items-center text-center sm:flex-col sm:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow mb-3 ${dark ? "text-brand-200" : "text-brand-700"}`}>
            {eyebrow}
          </p>
        )}
        <Heading
          id={id}
          className={`text-3xl sm:text-4xl lg:text-[2.7rem] ${dark ? "text-white" : "text-ink-950"}`}
        >
          {title}
        </Heading>
        {children && (
          <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-ink-400" : "text-ink-600"}`}>
            {children}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
