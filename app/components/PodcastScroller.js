"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { extractYouTubeId } from "../../lib/youtube";

const AUTO_SCROLL_PX_PER_SEC = 40;
const DRAG_CLICK_THRESHOLD = 5;
const RESUME_AFTER_MS = 2000;

// Horizontal strip of every guest photo. It auto-scrolls (real `scrollLeft`,
// not a CSS transform, so it can share the same track with user input), the
// track is duplicated so looping back to the start is seamless, and a
// visitor can grab it with the mouse or a touch swipe to browse at their own
// pace — auto-scroll pauses while they're interacting and resumes shortly
// after. Clicking a guest who has an episode opens it in an in-page modal;
// guests without a `youtube` link yet render as plain, unclickable stills.
export default function PodcastScroller({ guests }) {
  const [active, setActive] = useState(null);
  const track = [...guests, ...guests];

  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const dragRef = useRef(null);
  const lastScrollLeftRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Auto-scroll loop: advances scrollLeft every frame and wraps it back by
  // exactly one copy's width once the duplicated second half scrolls into
  // where the first half started, so the loop never visibly jumps.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Matches the site-wide reduced-motion rule in globals.css (which only
    // catches CSS animations) for this scroller's JS-driven equivalent.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame;
    let last = performance.now();

    function tick(now) {
      const dt = now - last;
      last = now;

      if (!pausedRef.current) {
        const halfWidth = el.scrollWidth / 2;
        let next = el.scrollLeft + (AUTO_SCROLL_PX_PER_SEC * dt) / 1000;
        if (next >= halfWidth) next -= halfWidth;
        el.scrollLeft = next;
        lastScrollLeftRef.current = el.scrollLeft;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [guests]);

  function pause() {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }

  function scheduleResume() {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_AFTER_MS);
  }

  // Mouse drag-to-scroll. Touch already scrolls the native overflow-x
  // container on its own, so this only wires up the mouse pointer type.
  //
  // Pointer capture is deferred until the pointer has actually moved past
  // the click threshold, not grabbed on pointerdown itself: capturing a
  // plain click (mousedown+mouseup with no movement) redirects the click
  // event's target to this container instead of the guest's <button>,
  // which silently ate every click and made cards unplayable with a mouse
  // (touch was unaffected since it never enters this handler).
  function onPointerDown(e) {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    pause();
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
      captured: false,
    };
  }

  function onPointerMove(e) {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || !el) return;
    const delta = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) > DRAG_CLICK_THRESHOLD) {
      drag.moved = true;
      drag.captured = true;
      el.setPointerCapture(drag.pointerId);
    }
    if (drag.moved) el.scrollLeft = drag.startScrollLeft - delta;
  }

  function endDrag(e) {
    const el = scrollerRef.current;
    if (dragRef.current?.captured && el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture may already be released (e.g. pointercancel)
      }
    }
    dragRef.current = null;
    scheduleResume();
  }

  function onTouchStart() {
    pause();
  }

  function onTouchEnd() {
    scheduleResume();
  }

  function onCardClick(e, guest) {
    if (dragRef.current?.moved) {
      e.preventDefault();
      return;
    }
    setActive(guest);
  }

  const videoId = active ? extractYouTubeId(active.youtube) : null;

  return (
    <>
      <div
        ref={scrollerRef}
        onMouseEnter={pause}
        onMouseLeave={scheduleResume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="overflow-x-auto scrollbar-none border-y border-line py-8 -mx-6 sm:-mx-10 cursor-grab active:cursor-grabbing"
      >
        <div className="flex w-max gap-6 px-6 sm:px-10">
          {track.map((guest, i) => {
            const hidden = i >= guests.length;
            const playable = Boolean(guest.youtube);

            const Tag = playable ? "button" : "div";

            return (
              <Tag
                key={`${guest.name}-${i}`}
                type={playable ? "button" : undefined}
                aria-hidden={hidden ? "true" : undefined}
                tabIndex={hidden ? -1 : undefined}
                onClick={playable ? (e) => onCardClick(e, guest) : undefined}
                aria-label={playable ? `Play ${guest.name} on the Laravel India Podcast` : undefined}
                draggable={false}
                className={`group relative w-56 sm:w-64 aspect-video flex-shrink-0 overflow-hidden rounded-2xl border border-line select-none ${
                  playable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <Image
                  src={guest.photo}
                  alt={guest.name}
                  fill
                  draggable={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  sizes="256px"
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
          })}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
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
        </div>
      )}
    </>
  );
}
