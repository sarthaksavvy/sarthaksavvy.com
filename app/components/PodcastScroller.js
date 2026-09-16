"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { extractYouTubeId } from "../../lib/youtube";
import HorizontalScroller from "./HorizontalScroller";

// Horizontal strip of every guest photo, built on the shared HorizontalScroller
// for the auto-scroll/drag mechanics. Clicking a guest who has an episode
// opens it in an in-page modal; guests without a `youtube` link yet render as
// plain, unclickable stills.
export default function PodcastScroller({ guests }) {
  const [active, setActive] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKeyDown);

    // Focus goes into the player and back to the guest card on close, and
    // the page behind stops scrolling — the same contract the training
    // Lightbox keeps. Without it focus stayed on the card behind the overlay.
    const opener = document.activeElement;
    closeButtonRef.current?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && document.contains(opener)) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [active]);

  const videoId = active ? extractYouTubeId(active.youtube) : null;

  return (
    <>
      <HorizontalScroller
        items={guests}
        paused={Boolean(active)}
        className="border-y border-line py-8 -mx-6 sm:-mx-10"
        trackClassName="px-6 sm:px-10"
        renderItem={(guest, { hidden, index, wasDragging }) => {
          const playable = Boolean(guest.youtube);
          const Tag = playable ? "button" : "div";

          function onClick(e) {
            if (wasDragging()) {
              e.preventDefault();
              return;
            }
            setActive(guest);
          }

          return (
            <Tag
              key={`${guest.name}-${index}`}
              type={playable ? "button" : undefined}
              aria-hidden={hidden ? "true" : undefined}
              tabIndex={hidden ? -1 : undefined}
              onClick={playable ? onClick : undefined}
              aria-label={playable ? `Play ${guest.name} on the Laravel India Podcast` : undefined}
              draggable={false}
              className={`group relative w-56 sm:w-64 aspect-video flex-shrink-0 overflow-hidden rounded-2xl border border-line bg-line select-none ${
                playable ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <Image
                width={256}
                height={144}
                src={guest.photo}
                alt={guest.name}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              />
              {playable && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/30 transition-colors">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-paper/90 text-ink shadow-lg transition-transform group-hover:scale-110">
                    <Play size={20} className="translate-x-0.5" fill="currentColor" />
                  </span>
                </span>
              )}
              <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pt-8 pb-3 text-left">
                <span className="block font-display italic text-paper text-base leading-tight">
                  {guest.name}
                </span>
                <span className="block text-paper/70 text-xs">{guest.role}</span>
              </span>
            </Tag>
          );
        }}
      />

      {/* Portaled onto <body>: this strip renders inside a framer-motion
          Reveal, whose leftover inline transform makes a `fixed` child
          position against the strip instead of the viewport. */}
      {active &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} on the Laravel India Podcast`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-paper hover:text-accent transition-colors"
            >
              <X size={28} />
            </button>
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
              {videoId && (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={active.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
