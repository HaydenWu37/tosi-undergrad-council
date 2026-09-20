export type EventCategory =
  | "Journal Club"
  | "Research Talk"
  | "Workshop"
  | "Social"
  | "Other";

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  /** ISO date, "YYYY-MM-DD". Leave out while the date is still to be announced. */
  date?: string;
  /** Free text, e.g. "5:30 – 7:00 PM". */
  time?: string;
  location?: string;
  description: string;
  /** Registration / RSVP link. If omitted, the card links to the contact page instead. */
  registrationUrl?: string;
  /** Show in the "Featured" slot. Only the first featured upcoming event is used. */
  featured?: boolean;
  /** Marks sample content; shows a "Placeholder" tag until you remove this line. */
  placeholder?: boolean;
  /** Set true for events that already happened (needed when there is no date). */
  past?: boolean;
  /** Photo file names inside /public/events/<id>/. The first one is the cover. */
  photos?: string[];
  /** Describes the photos for screen readers, e.g. "Students touring a research lab". */
  photoAlt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  /** e.g. "Winter 2026". Shown next to the position. */
  term?: string;
  /** Heading the member is listed under on the Team page (members with the same group sit together). */
  group?: string;
  pronouns?: string;
  program?: string;
  hometown?: string;
  funFact?: string;
  /** Optional longer bio, shown instead of the details above when there are none. */
  bio?: string;
  /** Path under /public, e.g. "/team/jane-doe.jpg". Optional; a neuron avatar is shown without it. */
  photo?: string;
  /** CSS object-position for cropping the photo, e.g. "40% 30%". Defaults to centre. */
  photoPosition?: string;
  linkedin?: string;
  email?: string;
  placeholder?: boolean;
}

/** One Journal Club presentation (a speaker sharing their research or open science practice). */
export interface Presentation {
  id: string;
  title: string;
  speaker: string;
  /** Lab, department, or program. */
  affiliation?: string;
  /** ISO date of the talk. */
  date?: string;
  /** Two or three sentences in your own words. */
  summary: string;
  topics?: string[];
  /** Optional link to a related paper, slides, or recording. */
  link?: string;
  linkLabel?: string;
  placeholder?: boolean;
}

export interface JournalSession {
  id: string;
  date?: string;
  time?: string;
  location?: string;
  title: string;
  speaker?: string;
  registrationUrl?: string;
  placeholder?: boolean;
}

export type IconName =
  | "brain"
  | "flask"
  | "book"
  | "graduation"
  | "briefcase"
  | "microscope"
  | "compass"
  | "users"
  | "calendar"
  | "presentation"
  | "hand"
  | "badge"
  | "handshake"
  | "door";

export interface ResourceLink {
  label: string;
  /** Leave out until you have the link; the row shows "Link coming soon". */
  url?: string;
  description?: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  links: ResourceLink[];
}

export interface Pathway {
  id: string;
  title: string;
  description: string;
  cta: string;
  /** Internal path ("/contact?topic=volunteer") or full external URL. */
  href: string;
  icon: IconName;
}
