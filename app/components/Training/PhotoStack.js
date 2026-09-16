"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lightbox from "./Lightbox";
import { isVideo, posterFor } from "../../../lib/media";

// Every photo in the timeline is a full-resolution camera JPEG — a few of them
// are over 3MB. Rendered through next/image the 80px thumbnails download as
// 80px thumbnails instead of the originals, which is the difference between a
// couple of hundred kilobytes and roughly 24MB on this page.
const THUMB_SIZE = 80;

/**
 * The gallery for one talk: a row of thumbnails. Clicking one (or pressing
 * Enter/Space on a focused thumbnail) opens it in a full-screen lightbox
 * that can be paged through with the arrow keys, on-screen arrows, or a
 * swipe — real buttons rather than hover, so the photos exist for phone and
 * keyboard users too, not just a mouse hovering over them.
 */
export default function PhotoStack({ event }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const label = event.title.trim();

  function describe(index) {
    return `${label} at ${event.conference} — photo ${index + 1} of ${
      event.images.length
    }`;
  }

  if (!event.images.length) return null;

  return (
    <div className="w-full">
      <ul className="flex gap-2 overflow-x-auto pb-1 list-none p-0 m-0">
        {event.images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              aria-label={describe(index)}
              onClick={() => setLightboxIndex(index)}
              className="block border border-transparent hover:border-ink/40 transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {/* Shared with the matching image in the lightbox via
                  `layoutId` — framer-motion morphs this thumbnail's box (and
                  its rounded corners) into the full-screen frame, and back
                  again on close, instead of the lightbox just appearing. */}
              <motion.div
                layoutId={`photo-${label}-${index}`}
                className="relative h-20 w-20 overflow-hidden rounded-lg"
              >
                {isVideo(image) ? (
                  <video
                    src={image}
                    poster={posterFor(image)}
                    muted
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes={`${THUMB_SIZE}px`}
                    className="object-cover"
                  />
                )}
              </motion.div>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={event.images}
            index={lightboxIndex}
            label={label}
            describe={describe}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
