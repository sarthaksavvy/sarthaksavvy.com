"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const VIDEO_PATTERN = /\.(mp4|mpg|mov|webm)$/i;

// A drag below this many pixels is a tap or a shaky finger, not a swipe.
const SWIPE_THRESHOLD = 50;

/**
 * Full-screen photo/video viewer for one event's gallery. Opened from
 * PhotoStack when a photo is clicked; navigable by arrow buttons, the arrow
 * keys, or a left/right swipe (pointer events, so touch and mouse-drag both
 * work through the same code path).
 */
export default function Lightbox({ images, index, label, describe, onClose, onNavigate }) {
  const dragStartX = useRef(null);
  const dragDeltaX = useRef(0);

  const goTo = useCallback(
    (next) => {
      const total = images.length;
      onNavigate(((next % total) + total) % total);
    },
    [images.length, onNavigate]
  );

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        goTo(index - 1);
      } else if (event.key === "ArrowRight") {
        goTo(index + 1);
      }
    }
    document.addEventListener("keydown", onKeyDown);

    // The overlay covers the viewport, but the page behind it can still
    // scroll under a touch drag without this — which fights the swipe
    // gesture used to move between photos.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [goTo, index, onClose]);

  function onPointerDown(event) {
    dragStartX.current = event.clientX;
    dragDeltaX.current = 0;
  }

  function onPointerMove(event) {
    if (dragStartX.current === null) return;
    dragDeltaX.current = event.clientX - dragStartX.current;
  }

  function endDrag() {
    if (dragStartX.current === null) return;
    if (Math.abs(dragDeltaX.current) > SWIPE_THRESHOLD) {
      goTo(dragDeltaX.current < 0 ? index + 1 : index - 1);
    }
    dragStartX.current = null;
    dragDeltaX.current = 0;
  }

  const src = images[index];
  const isVideo = VIDEO_PATTERN.test(src);
  const caption = describe ? describe(index) : `${label} — photo ${index + 1} of ${images.length}`;

  // Portaled straight onto <body> rather than rendered where PhotoStack sits
  // in the tree. Every event card animates in via framer-motion, which
  // leaves an inline `transform` on the card even after the animation
  // finishes — and a `fixed` element inside a transformed ancestor is
  // positioned relative to that ancestor, not the viewport. Left in place,
  // the overlay would be clipped to whichever card opened it instead of
  // covering the page.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center touch-none select-none"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 sm:mx-16 my-16">
        {isVideo ? (
          <video
            key={src}
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        ) : (
          <Image
            key={src}
            src={src}
            alt={caption}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-mono text-xs tracking-widest">
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}
