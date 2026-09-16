"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { isVideo } from "../../../lib/media";

// A drag below this many pixels is a tap or a shaky finger, not a swipe.
const SWIPE_THRESHOLD = 50;

/**
 * Full-screen photo/video viewer for one event's gallery. Opened from
 * PhotoStack when a photo is clicked; navigable by arrow buttons, the arrow
 * keys, or a left/right swipe (pointer events, so touch and mouse-drag both
 * work through the same code path).
 */
export default function Lightbox({
  images,
  index,
  label,
  describe,
  onClose,
  onNavigate,
  footer,
}) {
  const dragStartX = useRef(null);
  const dragDeltaX = useRef(0);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  // Only the photo that was actually clicked morphs out of its thumbnail.
  // Once the visitor pages away the shared layout is dropped for the rest of
  // this viewing, so closing on another photo fades out instead of shrinking
  // into a thumbnail it never came from.
  //
  // Dropped by remounting the frame (its `key` changes), not by setting
  // `layoutId` to undefined: framer-motion reads `layoutId` once, at mount,
  // and unregisters by the id it currently holds. Blanking it after mount
  // left the frame registered in the thumbnail's group forever, so that
  // thumbnail never animated open again until reload.
  const openedIndexRef = useRef(index);
  const pagedRef = useRef(false);
  // Monotonic and idempotent, so safe to settle during render.
  if (index !== openedIndexRef.current) pagedRef.current = true;
  const morphs = !pagedRef.current;

  const goTo = useCallback(
    (next) => {
      const total = images.length;
      onNavigate(((next % total) + total) % total);
    },
    [images.length, onNavigate]
  );

  // Focus moves into the dialog on open and goes back to whatever opened it
  // on close. Left on the trigger, focus sat behind the modal: Tab walked the
  // page underneath, and Enter or Space re-fired the cover that opened the
  // gallery, snapping it back to the first photo.
  useEffect(() => {
    const opener = document.activeElement;
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      if (opener instanceof HTMLElement && document.contains(opener)) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(
          'button, video[controls], [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      } else if (event.key === "Escape") {
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
  const video = isVideo(src);
  const caption = describe ? describe(index) : `${label} — photo ${index + 1} of ${images.length}`;

  // Portaled straight onto <body> rather than rendered where PhotoStack sits
  // in the tree. Every event card animates in via framer-motion, which
  // leaves an inline `transform` on the card even after the animation
  // finishes — and a `fixed` element inside a transformed ancestor is
  // positioned relative to that ancestor, not the viewport. Left in place,
  // the overlay would be clipped to whichever card opened it instead of
  // covering the page.
  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      className="fixed inset-0 z-[70] bg-transparent backdrop-blur-sm flex items-center justify-center touch-none select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      // Closes on any tap that isn't stopped by the photo itself or a
      // control button. The old `target === currentTarget` check only
      // matched the bare backdrop strip outside the image frame — on
      // mobile the frame's letterboxed padding (which looks like the same
      // blurred backdrop, since the photo is `object-contain`) is actually
      // part of that inner container, so most of what a phone user taps
      // never reached this handler at all.
      onClick={onClose}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* The backdrop is see-through by design, so the page — mostly `paper` —
          shows behind these. White-on-translucent-white read at 1.1:1 there;
          the solid ink pill the footer counter already uses holds up on any
          photo and any background. */}
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center text-paper bg-ink/75 hover:bg-ink backdrop-blur-md transition-colors"
      >
        <X size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index - 1);
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-paper bg-ink/75 hover:bg-ink backdrop-blur-md transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index + 1);
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-paper bg-ink/75 hover:bg-ink backdrop-blur-md transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <motion.div
        key={morphs ? "opened" : "paged"}
        layoutId={morphs ? `photo-${label}-${index}` : undefined}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
        className={`relative w-full h-full max-w-5xl mx-4 sm:mx-16 overflow-hidden rounded-2xl ${
          footer
            ? "max-h-[45vh] sm:max-h-[55vh] mt-14 sm:mt-16 mb-48 sm:mb-52"
            : "max-h-[85vh] my-16"
        }`}
      >
        {video ? (
          <video
            key={src}
            src={src}
            controls
            autoPlay
            playsInline
            // Stops the swipe from starting too, not only the click: dragging
            // the seek bar or volume slider is a horizontal pointer drag, and
            // reaching the overlay's swipe handler it turned the slide and
            // unmounted the video mid-seek.
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            className="w-full h-full object-contain"
          />
        ) : (
          // No stopPropagation here (unlike the video below): `fill` makes
          // this <img> cover the whole container box, including its
          // letterboxed padding — which looks like backdrop but isn't. A
          // photo has nothing to interact with, so letting the tap bubble
          // and close the lightbox is both correct and the simplest way to
          // make that "blur area" actually clickable everywhere it appears.
          <Image
            key={src}
            src={src}
            alt={caption}
            fill
            // The frame is capped at max-w-5xl. "100vw" told a 2x laptop to fetch
            // the 3840w file to paint a 1024px box.
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
            priority
          />
        )}
      </motion.div>

      {(footer || images.length > 1) && (
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 px-6 flex flex-col items-center gap-2 text-center">
          {footer}
          {images.length > 1 && (
            <span
              aria-live="polite"
              className="rounded-full bg-ink/85 backdrop-blur-md px-3 py-1 text-paper/80 font-mono text-xs tracking-widest"
            >
              {index + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </motion.div>,
    document.body
  );
}
