"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import HorizontalScroller from "../HorizontalScroller";
import Lightbox from "./Lightbox";
import { isVideo, posterFor } from "../../../lib/media";

// A cover shot for every past talk, one per event, on the same
// HorizontalScroller mechanics as the podcast guest row. Clicking one opens
// the event's full gallery full-screen via the same Lightbox the per-event
// photo grids further down the page use — morphing out of its thumbnail the
// same way, but starting from the whole set of photos (not just the cover)
// so a visitor can swipe through them, with the event's own details as a
// caption instead of just a filename-shaped one.
export default function EventsScroller({ events }) {
  const [openEvent, setOpenEvent] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);
  // Memoized so a lightbox page turn, which re-renders this component, hands
  // the scroller the same array instead of a fresh one each time.
  const covers = useMemo(
    () =>
      events
        .filter((event) => event.images.length > 0)
        .map((event) => ({ event, cover: event.images[0] })),
    [events]
  );

  if (!covers.length) return null;

  function openGallery(event) {
    setOpenEvent(event);
    setOpenIndex(0);
  }

  return (
    <div className="w-full">
      <HorizontalScroller
        items={covers}
        paused={Boolean(openEvent)}
        className="border-y border-line py-8 -mx-6 sm:-mx-10"
        trackClassName="px-6 sm:px-10"
        renderItem={({ event, cover }, { hidden, index, wasDragging }) => {
          function onClick(e) {
            if (wasDragging()) {
              e.preventDefault();
              return;
            }
            openGallery(event);
          }

          return (
            <button
              key={`${event.id}-${index}`}
              type="button"
              aria-hidden={hidden ? "true" : undefined}
              tabIndex={hidden ? -1 : undefined}
              onClick={onClick}
              aria-label={`${event.title} at ${event.conference}`}
              draggable={false}
              className="group w-56 sm:w-64 flex-shrink-0 select-none cursor-pointer text-left"
            >
              {/* `bg-line` is the loading state: a tinted frame reads as
                  "photo on its way", an empty outline as a broken image. */}
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-line">
                {/* Matches the layoutId Lightbox computes for this
                    single-image gallery (`photo-${label}-${index}`, index 0
                    here) so opening a cover morphs out of this card the same
                    way the per-event photo grids do further down the page.
                    Namespaced with "scroller-" so it never collides with
                    that same event's first thumbnail in its own PhotoStack
                    further down — both would otherwise resolve to the same
                    layoutId.

                    Only the real card carries it, never the strip's looping
                    duplicate. Two mounted nodes sharing a layoutId let
                    framer-motion elect the off-screen copy as the lead: the
                    gallery flew in from thousands of pixels away, every other
                    cover dropped to opacity 0 while it was open, and one stayed
                    blank after closing — which read as images failing to load. */}
                <motion.div
                  layoutId={hidden ? undefined : `photo-scroller-${event.title.trim()}-0`}
                  className="absolute inset-0"
                >
                  {isVideo(cover) ? (
                    <video
                      src={cover}
                      poster={posterFor(cover)}
                      muted
                      playsInline
                      preload="none"
                      aria-hidden="true"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <Image
                      width={256}
                      height={144}
                      src={cover}
                      alt=""
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    />
                  )}
                </motion.div>
              </div>
              <span className="block mt-3 font-display italic text-ink text-base leading-tight">
                {event.title.trim()}
              </span>
              <span className="block text-muted text-xs">{event.conference}</span>
            </button>
          );
        }}
      />

      <AnimatePresence>
        {openEvent && (
          <Lightbox
            images={openEvent.images}
            index={openIndex}
            label={`scroller-${openEvent.title.trim()}`}
            describe={(i) =>
              `${openEvent.title.trim()} at ${openEvent.conference} — photo ${i + 1} of ${openEvent.images.length}`
            }
            onClose={() => setOpenEvent(null)}
            onNavigate={setOpenIndex}
            footer={
              <div className="max-w-lg max-h-[30vh] overflow-y-auto rounded-2xl bg-ink/85 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="font-display italic text-paper text-xl sm:text-2xl leading-tight">
                  {openEvent.title.trim()}
                </h3>
                {/* `accent`, not `accentText`: this sits on a dark ink card, where
                    the darkened accentText (built for paper) measures ~2.6:1. */}
                <p className="text-accent text-sm mt-1">{openEvent.conference}</p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-paper/70 text-xs font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {openEvent.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {openEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={12} />
                    {openEvent.audience}
                  </span>
                </div>
                {openEvent.description && (
                  <p className="text-paper/80 text-xs sm:text-sm mt-3 leading-relaxed">
                    {openEvent.description}
                  </p>
                )}
              </div>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
