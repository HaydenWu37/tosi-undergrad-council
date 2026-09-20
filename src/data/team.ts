import type { TeamMember } from "@/lib/types";

/**
 * ────────────────────────────────────────────────────────────────
 *  UNDERGRADUATE COUNCIL  —  add, remove, or reorder members here.
 *
 *  Members appear in the order listed, grouped under their `group`
 *  heading (groups appear in the order they first show up). Photos live
 *  in /public/team/ (set  photo: "/team/first-last.jpg"). `photoPosition`
 *  nudges the crop so the face stays centred. Without a photo, a
 *  neuron-style avatar is shown.
 *
 *  Details come from the council's own Instagram introductions.
 *  Headshot credit is set in src/data/site.ts (photoCredits).
 * ────────────────────────────────────────────────────────────────
 */
export const team: TeamMember[] = [
  {
    id: "sophie-hoyer",
    name: "Sophie Hoyer",
    position: "Chair",
    term: "Fall 2025",
    group: "Chairs",
    pronouns: "She/Her",
    program: "U3 Biochemistry",
    hometown: "Calgary, AB",
    funFact: "I've shaken hands with Prince William twice!",
    photo: "/team/sophie-hoyer.jpg",
    photoPosition: "50% 20%",
  },
  {
    id: "gabriel-martino",
    name: "Gabriel Martino",
    position: "Co-Chair, Communications Director",
    term: "Winter 2026",
    group: "Chairs",
    pronouns: "He/Him",
    program: "U1 Neuroscience",
    hometown: "Chicago, IL",
    funFact: "Got my dog from a magic shop on Cinco de Mayo.",
    photo: "/team/gabriel-martino.jpg",
    photoPosition: "50% 25%",
  },
  {
    id: "karen-li",
    name: "Karen Li",
    position: "Co-Chair, Publicity Director",
    term: "Winter 2026",
    group: "Chairs",
    pronouns: "She/Her",
    program: "U2 Neuroscience",
    hometown: "Toronto, ON",
    funFact: "I've never graduated elementary school (long story).",
    photo: "/team/karen-li.jpg",
    photoPosition: "50% 20%",
  },
  {
    id: "cindy-zhao",
    name: "Cindy Zhao",
    position: "Events Director",
    group: "Events",
    pronouns: "She/Her",
    program: "U1 Anatomy & Cell Biology",
    hometown: "Ottawa, ON",
    funFact: "I compose electronic music!",
    photo: "/team/cindy-zhao.jpg",
    photoPosition: "50% 20%",
  },
  {
    id: "gala-mandic",
    name: "Gala Mandic",
    position: "Events Director",
    group: "Events",
    pronouns: "She/Her",
    program: "U0 Computer Science & Biology",
    hometown: "Toronto, ON",
    funFact: "When I was 10 I used to play violin and busk with my friends at street festivals.",
    photo: "/team/gala-mandic.jpg",
    photoPosition: "50% 25%",
  },
  {
    id: "cathy-fang",
    name: "Cathy Fang",
    position: "Journal Clubs Director",
    group: "Journal Club",
    pronouns: "She/Her",
    program: "U3 Psychology",
    hometown: "Xi'an, China",
    funFact: "I once held five jobs at the same time :D",
    photo: "/team/cathy-fang.jpg",
    photoPosition: "50% 20%",
  },
  {
    id: "hayden-wu",
    name: "Hayden Wu",
    position: "Journal Clubs Director",
    group: "Journal Club",
    pronouns: "He/Him",
    program: "U2 Neuroscience",
    hometown: "Richmond, BC",
    funFact: "I have an identical twin brother :)",
    photo: "/team/hayden-wu.jpg",
    photoPosition: "50% 20%",
  },
];

/** Group photos used on the Team page and homepage. */
export const groupPhotos = {
  stairs: {
    src: "/team/council-stairs.jpg",
    alt: "Members of the TOSI Undergraduate Council posed together on the steps outside McGill's Arts Building",
  },
  lawn: {
    src: "/team/council-group.jpg",
    alt: "The TOSI Undergraduate Council standing arm in arm on the path in front of McGill's Arts Building",
  },
};
