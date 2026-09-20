import {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  Compass,
  DoorOpen,
  FlaskConical,
  GraduationCap,
  HandHelping,
  Handshake,
  Microscope,
  Presentation,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const map = {
  brain: Brain,
  flask: FlaskConical,
  book: BookOpen,
  graduation: GraduationCap,
  briefcase: Briefcase,
  microscope: Microscope,
  compass: Compass,
  users: Users,
  calendar: CalendarDays,
  presentation: Presentation,
  hand: HandHelping,
  badge: Award,
  handshake: Handshake,
  door: DoorOpen,
} as const;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden="true" strokeWidth={1.6} {...props} />;
}

/* Brand glyphs are inlined (lucide no longer ships them). */
export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.66 4.8 6.13v5.87h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.29h-4V9.75Z" />
    </svg>
  );
}
