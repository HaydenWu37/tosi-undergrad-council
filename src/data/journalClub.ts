import type { JournalSession, Presentation } from "@/lib/types";

/**
 * ────────────────────────────────────────────────────────────────
 *  JOURNAL CLUB  —  everything on the /events/journal-club page.
 *
 *  Journal Club is a monthly speaker series. Each month:
 *    1. add the next talk to `upcomingSessions`,
 *    2. update `featuredTalk`,
 *    3. move last month's talk to the top of `previousTalks`.
 * ────────────────────────────────────────────────────────────────
 */

export const journalClubInfo = {
  // CONFIRM: draft wording from the council's description of Journal Club.
  what: "Journal Club is a monthly event where speakers come to present their research and their open science practices to the McGill community, followed by questions and conversation.",
  schedule: "Monthly. Day and time to be announced",
  location: "Location to be announced",
  steps: [
    {
      title: "A speaker is invited",
      text: "Each month the Journal Clubs team contacts a speaker to present.",
    },
    {
      title: "The event is shared",
      text: "We book the room and promote the session to the McGill community.",
    },
    {
      title: "The talk",
      text: "The speaker presents their research and open science practices.",
    },
    {
      title: "Questions and conversation",
      text: "Everyone gets to ask questions and talk with the speaker.",
    },
  ],
};

/** What the Journal Clubs Directors do (shown in the "Behind the scenes" section). */
export const organizers = {
  intro: "Journal Club is run by the Journal Clubs Directors on the Undergraduate Council.",
  duties: [
    "Organize monthly journal clubs focused on open science and research.",
    "Contact speakers for each month, book rooms, and promote each event to the McGill community.",
    "Present their own research and open science practices at Journal Club and other TOSI events.",
  ],
  /** Team members shown here are the ones whose `group` is this value in src/data/team.ts. */
  teamGroup: "Journal Club",
};

export const upcomingSessions: JournalSession[] = [
  {
    id: "session-1",
    // date: "2026-10-15",
    time: "Time to be announced",
    location: "Location to be announced",
    title: "Talk title to be announced",
    speaker: "Speaker to be announced",
    // registrationUrl: "https://forms.gle/your-form",
    placeholder: true,
  },
  {
    id: "session-2",
    time: "Time to be announced",
    location: "Location to be announced",
    title: "Talk title to be announced",
    speaker: "Speaker to be announced",
    placeholder: true,
  },
];

export const featuredTalk: Presentation = {
  id: "featured",
  title: "Featured talk title to be announced",
  speaker: "Speaker to be announced",
  affiliation: "Lab or department",
  summary:
    "A two or three sentence summary of the talk goes here, in your own words: what the speaker studies, and which open science practices they will share.",
  topics: ["Research", "Open science"],
  placeholder: true,
};

export const previousTalks: Presentation[] = [
  {
    id: "prev-1",
    title: "Previous talk title to be added",
    speaker: "Speaker name",
    affiliation: "Lab or department",
    summary: "One-line summary of the talk.",
    placeholder: true,
  },
  {
    id: "prev-2",
    title: "Previous talk title to be added",
    speaker: "Speaker name",
    affiliation: "Lab or department",
    summary: "One-line summary of the talk.",
    placeholder: true,
  },
  {
    id: "prev-3",
    title: "Previous talk title to be added",
    speaker: "Speaker name",
    affiliation: "Lab or department",
    summary: "One-line summary of the talk.",
    placeholder: true,
  },
];

export const presentInfo = {
  // CONFIRM: draft wording.
  intro:
    "Journal Club is all about people coming to present. If you have research or an open science practice you would like to share, we would love to hear from you.",
  points: [
    "Tell us about your research or the open science practices you use.",
    "We arrange the date, book the room, and promote the session.",
    "You present, and the audience joins in with questions.",
  ],
  // Optional: link to a sign-up form. Falls back to the contact form when empty.
  signupUrl: "",
};
