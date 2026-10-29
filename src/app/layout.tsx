import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReset } from "@/components/layout/ScrollReset";
import { AmbientField } from "@/components/graphics/AmbientField";
import { NeuralSceneLoader } from "@/components/graphics/NeuralSceneLoader";
import { VoidBackdrop } from "@/components/graphics/VoidBackdrop";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { site } from "@/data/site";

// Editorial pairing: an expressive, high-contrast serif for headlines
// (Cormorant Garamond — the "fine-art fashion magazine" voice the brief
// asks for) against a restrained, legible grotesque for everything people
// actually have to read (Manrope).
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-ui",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Open science, research & community`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
};

export const viewport: Viewport = { themeColor: "#f7fafd" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-ink-950 px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ScrollReset />
        <AmbientField />
        <VoidBackdrop />
        <NeuralSceneLoader />
        <CursorFollow />
        <Navbar />
        <main id="main" tabIndex={-1} className="relative flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
