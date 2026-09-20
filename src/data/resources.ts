import type { ResourceCategory } from "@/lib/types";

/**
 * ────────────────────────────────────────────────────────────────
 *  RESOURCES  —  add categories or links here.
 *
 *  Links without a `url` show "Link coming soon", so you can leave
 *  placeholders in until you have the real address. The links that
 *  are filled in are general, widely used public resources; swap or
 *  remove any you don't want to recommend.
 * ────────────────────────────────────────────────────────────────
 */
export const resources: ResourceCategory[] = [
  {
    id: "neuroscience",
    title: "Neuroscience",
    description: "Where to read, learn, and keep up with the field.",
    icon: "brain",
    links: [
      {
        label: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/",
        description: "Search biomedical and neuroscience literature.",
      },
      {
        label: "Society for Neuroscience",
        url: "https://www.sfn.org/",
        description: "Professional society with public education material.",
      },
      { label: "Recommended neuroscience textbook list", description: "Coming soon." },
    ],
  },
  {
    id: "open-science",
    title: "Open science",
    description: "Tools and preprints that make research transparent and shareable.",
    icon: "door",
    links: [
      {
        label: "Open Science Framework (OSF)",
        url: "https://osf.io/",
        description: "Free platform for sharing projects, data, and preprints.",
      },
      {
        label: "bioRxiv",
        url: "https://www.biorxiv.org/",
        description: "Preprint server for the biological sciences.",
      },
      { label: "TOSI open science guides", description: "Coming soon." },
    ],
  },
  {
    id: "research-opportunities",
    title: "Research opportunities",
    description: "Ways to find and join a research group.",
    icon: "flask",
    links: [
      { label: "Lab and supervisor directory", description: "Coming soon." },
      { label: "How to email a professor about research", description: "Coming soon." },
      { label: "Summer research programs", description: "Coming soon." },
    ],
  },
  {
    id: "undergraduate-research",
    title: "Undergraduate research",
    description: "Support for students doing research for the first time.",
    icon: "microscope",
    links: [
      {
        label: "Google Scholar",
        url: "https://scholar.google.com/",
        description: "Find papers and see what labs are publishing.",
      },
      { label: "Undergraduate research funding and awards", description: "Coming soon." },
      { label: "Poster and presentation tips", description: "Coming soon." },
    ],
  },
  {
    id: "career",
    title: "Career resources",
    description: "Paths in and beyond academic research.",
    icon: "briefcase",
    links: [
      { label: "Careers in neuroscience overview", description: "Coming soon." },
      { label: "CV and résumé templates", description: "Coming soon." },
      { label: "Informational interview guide", description: "Coming soon." },
    ],
  },
  {
    id: "graduate-medical",
    title: "Graduate & medical school",
    description: "Planning for graduate programs and health professions.",
    icon: "graduation",
    links: [
      { label: "Applying to graduate school", description: "Coming soon." },
      { label: "Medical school pathways", description: "Coming soon." },
      { label: "Council Q&A with current trainees", description: "Coming soon." },
    ],
  },
  {
    id: "academic",
    title: "Academic resources",
    description: "Study support and course planning.",
    icon: "book",
    links: [
      { label: "Course planning for neuroscience", description: "Coming soon." },
      { label: "Study and writing support", description: "Coming soon." },
    ],
  },
];
