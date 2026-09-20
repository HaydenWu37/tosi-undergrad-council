"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { CategoryBadge } from "@/components/ui/Badge";
import { eventPhotoSrc, formatLongDate } from "@/lib/format";
import type { EventItem } from "@/lib/types";

/** Photo-led card for a finished event. Click to open the full gallery. */
export function PastEventCard({ event }: { event: EventItem }) {
  const [open, setOpen] = useState(false);
  const photos = event.photos ?? [];
  if (photos.length === 0) return null;
  const alt = event.photoAlt ?? event.title;

  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-900 text-left shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift"
      >
        <Image
          src={eventPhotoSrc(event, photos[0])}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
        />
        <span className="absolute left-4 top-4">
          <CategoryBadge category={event.category} />
        </span>
        <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <span className="font-display text-xl leading-tight sm:text-2xl">{event.title}</span>
          <span className="eyebrow flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] backdrop-blur-sm">
            <Images className="h-3.5 w-3.5" aria-hidden="true" />
            {photos.length}
          </span>
        </span>
        <span className="sr-only">
          View {photos.length} {photos.length === 1 ? "photo" : "photos"} from {event.title}
        </span>
      </button>
      <p className="mt-3 px-1 text-sm text-ink-600">
        {event.date && <span className="mr-1 font-medium text-ink-800">{formatLongDate(event.date)}.</span>}
        {event.description}
      </p>
      {open && <Lightbox event={event} alt={alt} onClose={() => setOpen(false)} />}
    </article>
  );
}

function Lightbox({ event, alt, onClose }: { event: EventItem; alt: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const photos = event.photos ?? [];
  const many = photos.length > 1;

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  const step = useCallback(
    (n: number) => setI((cur) => (cur + n + photos.length) % photos.length),
    [photos.length],
  );

  return (
    <dialog
      ref={ref}
      aria-label={`${event.title} photo gallery`}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="m-auto w-[min(96vw,1100px)] max-w-none overflow-hidden rounded-2xl bg-ink-950 p-0 text-white backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
    >
      <div className="on-dark flex items-center justify-between gap-4 px-5 py-3">
        <div className="min-w-0">
          <p className="truncate font-display text-lg">{event.title}</p>
          <p className="eyebrow text-[0.65rem] text-ink-400" aria-live="polite">
            Photo {i + 1} of {photos.length}
          </p>
        </div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Close gallery</span>
        </button>
      </div>

      <div className="relative h-[68vh] bg-black">
        <Image
          key={photos[i]}
          src={eventPhotoSrc(event, photos[i])}
          alt={`${alt} (photo ${i + 1} of ${photos.length})`}
          fill
          sizes="96vw"
          className="object-contain"
        />
        {many && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              className="on-dark absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-950/70 p-3 text-white backdrop-blur transition-colors hover:bg-ink-950"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Previous photo</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="on-dark absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-950/70 p-3 text-white backdrop-blur transition-colors hover:bg-ink-950"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Next photo</span>
            </button>
          </>
        )}
      </div>
    </dialog>
  );
}
