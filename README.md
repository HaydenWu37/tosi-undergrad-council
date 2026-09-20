# TOSI Undergraduate Council website

Next.js (App Router) + TypeScript + Tailwind CSS v4. Content lives in `src/data/`; you should rarely need to edit components.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
src/
  data/            <- ALL editable content
    site.ts          contact email, Instagram, socials, nav, placeholder-notice switch, form endpoint
    events.ts        events
    team.ts          council members
    journalClub.ts   sessions, featured paper, previous papers, "present" info
    resources.ts     resource categories and links
    involvement.ts   Get Involved pathways
    about.ts         intro text, mission, goals, pillars
  app/             <- pages (home, about, events, journal-club, team, resources, get-involved, contact)
  components/
    ui/              Button, SectionHeader, Container/Section, Badge, Reveal (scroll animation), Icon
    cards/           EventCard, TeamCard, JournalCards, PathwayCard
    sections/        CTASection, PageHero, MissionSection, InstagramSection, EventsBrowser, ContactForm
    graphics/        NeuralField, NeuronMark, NeuronAvatar, CommunityDiagram
    layout/          Navbar, Footer
  lib/             types.ts, format.ts (date helpers)
  app/globals.css  design tokens (colors, fonts) and animations
public/team/       member photos
```

## Updating content

- **Events:** copy a block in `src/data/events.ts`, edit it, delete `placeholder: true`. Set `date: "YYYY-MM-DD"`. Past events move to "Past events" automatically (pages refresh hourly). Add `registrationUrl` for a Register button; without one the card links to the contact form. Set `featured: true` to pin one.
- **Past events with photos:** add an event with `past: true`, put JPEGs in `public/events/<event id>/`, and list the file names in `photos` (first = cover). Add `date` when known. Cards open a photo gallery.
- **Team:** edit `src/data/team.ts` (position, term, program, hometown, fun fact, and `group`, the heading they sit under on the Team page). Add or delete an object to add or remove a member. Put a photo in `public/team/` and set `photo: "/team/name.jpg"`. Optional `linkedin` and `email`.
- **Journal Club:** edit `src/data/journalClub.ts`. Each round: update `upcomingSessions` and `featuredPaper`, and move the old featured paper to the top of `previousPapers`.
- **Resources:** edit `src/data/resources.ts`. Links without a `url` show "Link coming soon".
- **Contact info:** `src/data/site.ts`. Replace the placeholder `email`. To make the form send directly, paste a Formspree (or similar) URL into `formEndpoint`; otherwise it opens the visitor's email app.
- **Remove all "Placeholder" tags:** set `showPlaceholderNotices: false` in `site.ts`.

## Branding

Colors and fonts are tokens at the top of `src/app/globals.css` (`--color-brand-*` teal, `--color-ink-*` navy, `--color-paper-*` cream, `--color-signal-*` amber accent). Change the values and the whole site follows. Fonts are set in `src/app/layout.tsx`. The neuron mark is `components/graphics/NeuronMark.tsx` and `src/app/icon.svg`.

## Deploy

**Vercel (easiest):** push to GitHub, import the repo at vercel.com, click Deploy. Then set `url` in `site.ts` to your real domain (used for the sitemap and link previews).
Any Node host works too: `npm run build && npm start`.

## Photos and credits

Headshots must be credited to the photographer and the PPU (@eus_ppu). This is set in `photoCredits` in `src/data/site.ts` and shown on the Team page and homepage; keep it while you use those photos. Raw originals (`Headshots/`, `Event, Bonding, & Activities Photos/`) are git-ignored; the site uses the resized copies in `public/team` and `public/events`.
