import type { EventItem } from "@/lib/types";

/**
 * ────────────────────────────────────────────────────────────────
 *  EVENTS  —  the only file you need to touch to update events.
 *
 *  To add an event, copy any block below, paste it into the array,
 *  and change the fields. Remove `placeholder: true` from real events.
 *  Past events move to "Past events" automatically once their date passes.
 *
 *  PAST EVENTS WITH PHOTOS: add `past: true`, drop the images into
 *  /public/events/<id>/ (JPEG, about 1600px wide is plenty) and list the
 *  file names in `photos` (the first is the cover). Add `date` when known.
 *
 *  category: "Journal Club" | "Research Talk" | "Workshop" | "Social" | "Other"
 *  date:     "YYYY-MM-DD"  (omit while the date is still to be announced)
 * ────────────────────────────────────────────────────────────────
 */
export const events: EventItem[] = [
  {
    id: "journal-club-sample",
    title: "Journal Club Session",
    category: "Journal Club",
    // date: "2026-10-15",
    time: "Time to be announced",
    location: "Location to be announced",
    description:
      "A speaker presents their research and open science practices, then we open the floor for questions. Everyone is welcome, no experience needed.",
    // registrationUrl: "https://forms.gle/your-form",
    featured: true,
    placeholder: true,
  },
  {
    id: "research-talk-sample",
    title: "Undergraduate Research Talk",
    category: "Research Talk",
    time: "Time to be announced",
    location: "Location to be announced",
    description:
      "A researcher shares their work and answers undergraduate questions about how they got started.",
    placeholder: true,
  },
  {
    id: "workshop-sample",
    title: "Research Skills Workshop",
    category: "Workshop",
    time: "Time to be announced",
    location: "Location to be announced",
    description:
      "A hands-on session on a practical research skill, such as reading papers, finding labs, or open science tools.",
    placeholder: true,
  },
  {
    id: "social-sample",
    title: "Community Social",
    category: "Social",
    time: "Time to be announced",
    location: "Location to be announced",
    description:
      "Meet other neuroscience-curious undergraduates and TOSI trainees in a relaxed setting.",
    placeholder: true,
  },
  {
    id: "other-sample",
    title: "Info Session: Getting Involved",
    category: "Other",
    time: "Time to be announced",
    location: "Location to be announced",
    description:
      "Learn how to join the Undergraduate Council, present at Journal Club, and find research opportunities.",
    placeholder: true,
  },

  // ── Past events ─────────────────────────────────────────────
  {
    id: "os-research-fair",
    title: "OS Research Fair",
    category: "Other",
    past: true,
    // date: "YYYY-MM-DD",
    description: "A research fair with posters, project tables, and conversations with researchers.",
    photoAlt: "Students browsing posters and talking with presenters at the OS Research Fair",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg"],
  },
  {
    id: "journal-club",
    title: "Journal Club",
    category: "Journal Club",
    past: true,
    // date: "YYYY-MM-DD",
    description: "Speakers presenting their research and open science practices at past Journal Club sessions.",
    photoAlt: "Presentations and discussion at Journal Club meetings",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"],
  },
  {
    id: "lab-tours",
    title: "Lab Tours",
    category: "Other",
    past: true,
    // date: "YYYY-MM-DD",
    description: "Undergraduates stepped inside research labs to see how neuroscience is done.",
    photoAlt: "Undergraduates touring research labs",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"],
  },
  {
    id: "research-panel",
    title: "So You Want to Get Into Research II",
    category: "Research Talk",
    past: true,
    // date: "YYYY-MM-DD",
    description: "A panel conversation about getting into research, over lunch.",
    photoAlt: "Panelists and students at So You Want to Get Into Research II",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"],
  },
  {
    id: "research-intro",
    title: "So You Want to Get Into Research I",
    category: "Research Talk",
    past: true,
    // date: "YYYY-MM-DD",
    description: "Short talks about finding research positions, followed by food and conversation.",
    photoAlt: "Speakers and students at So You Want to Get Into Research I",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"],
  },
  {
    id: "intro-to-os",
    title: "Intro to OS Night",
    category: "Workshop",
    past: true,
    // date: "YYYY-MM-DD",
    description: "An evening of short talks and discussion introducing open science.",
    photoAlt: "Speakers presenting at Intro to OS Night",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    id: "research-brunch",
    title: "Research Brunch",
    category: "Social",
    past: true,
    // date: "YYYY-MM-DD",
    description: "A relaxed brunch to meet the community over food.",
    photoAlt: "Students gathered at the Research Brunch",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    id: "bonding",
    title: "Council Bonding",
    category: "Social",
    past: true,
    // date: "YYYY-MM-DD",
    description: "Council outings over good food.",
    photoAlt: "Council members sharing meals together",
    photos: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  },
  {
    id: "activities-night",
    title: "Activities Night",
    category: "Other",
    past: true,
    // date: "YYYY-MM-DD",
    description: "Meeting new students at an activities night.",
    photoAlt: "The TOSI table at an activities night",
    photos: ["01.jpg"],
  },
];
