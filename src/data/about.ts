import type { IconName } from "@/lib/types";

/**
 * Copy for the About page and the homepage introduction.
 * Wording marked CONFIRM is a reasonable draft based on TOSI's public
 * Instagram bio, and should be checked by the council before launch.
 */

export const intro = {
  // CONFIRM
  what: "TOSI is a community of trainees working to develop, establish, and encourage open science practices, so that research is more transparent, accessible, and collaborative.",
  // CONFIRM
  council:
    "The Undergraduate Council is the part of TOSI run by and for undergraduate students. It brings undergraduates into the community through events, journal clubs, and pathways into research.",
};

export const mission = {
  statement:
    "To make neuroscience research welcoming, open, and within reach for every undergraduate who is curious about it.",
  note: "Draft mission statement. Replace with the council's official wording.",
};

export interface Pillar {
  id: string;
  title: string;
  icon: IconName;
  text: string;
}

export const pillars: Pillar[] = [
  {
    id: "neuroscience",
    title: "Neuroscience",
    icon: "brain",
    text: "Explore how the brain works, from cells and circuits to cognition and disease.",
  },
  {
    id: "research",
    title: "Research",
    icon: "microscope",
    text: "Learn how research is done and find your way into a lab.",
  },
  {
    id: "education",
    title: "Education",
    icon: "graduation",
    text: "Build skills through talks, workshops, and open discussion.",
  },
  {
    id: "community",
    title: "Community",
    icon: "users",
    text: "Meet peers, trainees, and mentors who share your interests.",
  },
];

/** Goals shown on the About page. Add, remove, or reorder freely. */
export const goals = [
  "Introduce undergraduates to neuroscience research and open science practices.",
  "Create regular, low-pressure spaces to hear about research and open science.",
  "Connect undergraduates with trainees, researchers, and speakers.",
  "Point students toward research, career, and graduate-school opportunities.",
  "Build a friendly, inclusive community around curiosity.",
];

/** "What the Undergraduate Council does" (homepage + About). */
export const whatWeDo: { title: string; text: string; icon: IconName; href: string }[] = [
  {
    title: "Host events",
    text: "Research talks, workshops, and socials designed for undergraduates.",
    icon: "calendar",
    href: "/events",
  },
  {
    title: "Run Journal Club",
    text: "A monthly talk where speakers share their research and open science practices.",
    icon: "book",
    href: "/events/journal-club",
  },
  {
    title: "Share opportunities",
    text: "Curated research, career, and graduate-school resources.",
    icon: "compass",
    href: "/resources",
  },
  {
    title: "Build community",
    text: "Bring undergraduates and TOSI trainees together.",
    icon: "users",
    href: "/get-involved",
  },
];
