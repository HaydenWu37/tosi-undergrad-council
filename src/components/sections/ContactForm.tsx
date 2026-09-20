"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

const topics = [
  { value: "general", label: "General question" },
  { value: "join", label: "Joining TOSI" },
  { value: "present", label: "Presenting at Journal Club" },
  { value: "volunteer", label: "Volunteering" },
  { value: "apply", label: "Applying to the Undergraduate Council" },
  { value: "collaborate", label: "Collaboration or partnership" },
  { value: "speaker", label: "Speaking at a TOSI event" },
];

const field =
  "mt-2 w-full rounded-xl border border-paper-300 bg-white px-4 py-3 text-ink-950 placeholder:text-ink-400 transition-colors hover:border-ink-400 focus:border-brand-600";

export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = topics.some((t) => t.value === params.get("topic"))
    ? (params.get("topic") as string)
    : "general";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "mailto">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot

    if (!site.formEndpoint) {
      const topic = topics.find((t) => t.value === data.get("topic"))?.label ?? "General";
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `[TOSI Undergrad] ${topic}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink-900">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink-900">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="topic" className="text-sm font-medium text-ink-900">
          Topic
        </label>
        <select id="topic" name="topic" defaultValue={initialTopic} className={field}>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink-900">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={field} />
      </div>
      {/* Honeypot field: hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p id="form-status" role="status" aria-live="polite" className="text-sm text-ink-700">
          {status === "sent" && "Thanks. Your message was sent and we will reply soon."}
          {status === "error" && "Something went wrong. Please try again or email us directly."}
          {status === "mailto" && "Your email app should open with the message ready to send."}
        </p>
      </div>
    </form>
  );
}
