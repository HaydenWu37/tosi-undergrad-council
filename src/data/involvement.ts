import type { Pathway } from "@/lib/types";

/**
 * ────────────────────────────────────────────────────────────────
 *  GET INVOLVED PATHWAYS
 *
 *  `href` can be an internal page ("/events"), a contact-form topic
 *  ("/contact?topic=volunteer"), or a full URL such as a Google Form
 *  ("https://forms.gle/…"). Swap in your real sign-up links when ready.
 *
 *  Contact-form topics: join | volunteer | apply | collaborate |
 *                       present | speaker | general
 * ────────────────────────────────────────────────────────────────
 */
export const pathways: Pathway[] = [
  {
    id: "join",
    title: "Join TOSI",
    description: "Say hello and get added to our announcements.",
    cta: "Join TOSI",
    href: "/contact?topic=join",
    icon: "door",
  },
  {
    id: "events",
    title: "Attend an event",
    description: "Talks, workshops, and socials. Drop in as often as you like.",
    cta: "Browse events",
    href: "/events",
    icon: "calendar",
  },
  {
    id: "journal-club",
    title: "Join Journal Club",
    description: "Hear speakers present their research and open science practices each month.",
    cta: "See Journal Club",
    href: "/events/journal-club",
    icon: "book",
  },
  {
    id: "present",
    title: "Present your research",
    description: "Share your research or open science practices at Journal Club.",
    cta: "Offer to present",
    href: "/events/journal-club#present",
    icon: "presentation",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Help run events and outreach, from a single evening to a full term.",
    cta: "Volunteer with us",
    href: "/contact?topic=volunteer",
    icon: "hand",
  },
  {
    id: "apply",
    title: "Apply to the Council",
    description: "Help shape TOSI's undergraduate programming as a council member.",
    cta: "Ask about applying",
    href: "/contact?topic=apply",
    icon: "badge",
  },
  {
    id: "collaborate",
    title: "Collaborate with us",
    description: "Researchers, speakers, and student groups: let's plan something together.",
    cta: "Get in touch",
    href: "/contact?topic=collaborate",
    icon: "handshake",
  },
];
