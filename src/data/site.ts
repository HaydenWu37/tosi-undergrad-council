/**
 * Sitewide settings. Edit this file to change contact details, social links,
 * navigation, and the site's headline copy.
 */
export const site = {
  name: "TOSI Undergraduate Council",
  shortName: "TOSI",

  /**
   * Taken from the public @tosi_trainees Instagram bio. Please confirm the
   * wording and affiliation before launch.
   */
  fullName: "Tanenbaum Open Science Institute",
  affiliationLine: "Open science at The Neuro and across McGill",

  tagline:
    "Connecting undergraduate students through neuroscience, research, and community.",
  description:
    "The TOSI Undergraduate Council brings undergraduates into the TOSI trainee community through journal clubs, research talks, workshops, and open science.",

  /** Your public domain, used for sitemap and social previews. */
  url: "https://tosi-undergrad.example",

  /**
   * PLACEHOLDER. Replace with the council's real address.
   * Contact form fallback and the footer both read this value.
   */
  email: "council@your-domain.example",

  /**
   * Set to false once you have replaced placeholder content everywhere; this
   * hides every "Placeholder" tag and note on the site in one go.
   */
  showPlaceholderNotices: true,

  /**
   * Optional: paste a Formspree / Getform / Basin endpoint URL to make the
   * contact form submit directly. When empty, the form opens the visitor's
   * email app addressed to `email` above.
   */
  formEndpoint: "",

  /**
   * Required by the photographers. Shown wherever the headshots appear
   * (Team page and homepage). Keep this text if you keep the photos.
   */
  photoCredits: {
    headshots: {
      photographer: "Elise",
      group: "PPU Photographers, Engineering Undergraduate Society of McGill University",
      handle: "@eus_ppu",
      url: "https://www.instagram.com/eus_ppu/",
    },
  },

  instagram: {
    handle: "@tosi_trainees",
    url: "https://www.instagram.com/tosi_trainees/",
  },

  /**
   * Additional social links. Entries appear on the Contact page and footer.
   * Add one only when you have a real URL, for example:
   *   { label: "LinkedIn", url: "https://www.linkedin.com/company/…", icon: "linkedin" }
   */
  otherSocials: [] as { label: string; url: string; icon: "linkedin" | "mail" }[],
};

export interface NavItem {
  href: string;
  label: string;
  /** Sub-pages shown in a dropdown under this item. */
  children?: { href: string; label: string; description?: string }[];
}

export const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/events",
    label: "Events",
    children: [
      { href: "/events", label: "All events", description: "Talks, workshops, and socials" },
      { href: "/events/journal-club", label: "Journal Club", description: "Monthly research talks" },
    ],
  },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
];

export const footerLinks = {
  Explore: [
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/events/journal-club", label: "Journal Club" },
    { href: "/team", label: "Team" },
  ],
  Participate: [
    { href: "/get-involved", label: "Get Involved" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ],
};
