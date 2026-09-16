"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mic, Presentation } from "lucide-react";

const AUTO_SCROLL_PX_PER_SEC = 40;
const DRAG_CLICK_THRESHOLD = 5;
const RESUME_AFTER_MS = 2000;
// A frame delta is capped so a tab that was backgrounded (where the browser
// stops calling rAF) resumes where it left off instead of advancing by the
// whole time it was hidden in a single frame.
const MAX_FRAME_MS = 64;
// Touch devices follow a tap with emulated mouse events. A `mouseenter` that
// arrives this soon after a touch is that emulation, not a real hover, and
// must not cancel the resume the touch just scheduled.
const TOUCH_MOUSE_EMULATION_MS = 1000;

// Corner badge for cards that say what they are. A strip that mixes kinds
// (the home page's podcasts and talks) otherwise leaves a visitor guessing
// from the caption alone.
const KIND_BADGES = {
  podcast: { Icon: Mic, label: "Podcast" },
  training: { Icon: Presentation, label: "Training" },
};

/**
 * A self-scrolling horizontal strip of cards — the mechanics behind the
 * podcast guest row, reusable anywhere else a "media reel" is needed. It
 * auto-scrolls (real `scrollLeft`, not a CSS transform, so it shares one
 * track with user input), the track is duplicated so looping back to the
 * start is seamless, and a visitor can grab it with the mouse or a touch
 * swipe to browse at their own pace — auto-scroll pauses while they're
 * interacting and resumes shortly after.
 *
 * Given plain `{ src, href, label, sublabel }` items it renders the house
 * card itself — picture, then title and a line of context underneath it,
 * the way the training event covers read. That is the default so a new
 * strip does not have to restate the same markup to look like the others.
 * `renderItem` overrides it for cards that need their own behavior (the
 * podcast row opens a video modal; the event row opens a lightbox); it gets
 * each item back with `wasDragging()`, so a card's onClick can swallow the
 * click that ends a drag.
 */
export default function HorizontalScroller({
  items,
  renderItem = defaultCard,
  className = "",
  trackClassName = "",
  // Held by a strip whose cards open an overlay (a lightbox, a video): the
  // click that opens it ends a pointer gesture, which would otherwise
  // schedule a resume and set the strip moving again underneath the overlay.
  paused = false,
}) {
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const heldRef = useRef(paused);
  const visibleRef = useRef(true);
  const resumeTimerRef = useRef(null);
  const dragRef = useRef(null);
  const lastTouchRef = useRef(0);
  // One copy's true width, gap included, measured off the rendered track.
  // Half of `scrollWidth` is not it: that also counts the track's side
  // padding, which put the wrap point 28px past one copy (a visible jump
  // every loop) and, for a short strip, past the furthest the strip can
  // scroll at all — so it never wrapped and froze at the right edge.
  const periodRef = useRef(0);
  // Separate from `dragRef` so it can outlive the drag session: the click
  // that ends a drag fires right after pointerup and needs to know it
  // happened. It is cleared as soon as that click has been dispatched —
  // left set, it swallowed the next keyboard or screen-reader activation,
  // which fires no pointer event to reset it.
  const lastDragMovedRef = useRef(false);

  const [reducedMotion, setReducedMotion] = useState(false);
  // Two copies is the minimum a seamless loop needs; a strip whose one copy
  // is narrower than the viewport needs more, or the wrap point sits beyond
  // the furthest it can scroll. Recomputed from real measurements below.
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // With motion reduced nothing loops, so the duplicate copies would only be
  // a second full run of `aria-hidden` cards for a visitor to scroll through.
  const copyCount = reducedMotion ? 1 : copies;
  const track = Array.from({ length: copyCount }, () => items).flat();

  useEffect(() => {
    const el = scrollerRef.current;
    const trackEl = trackRef.current;
    if (!el || !trackEl || reducedMotion) return;

    function measure() {
      const first = trackEl.children[0];
      const firstOfNextCopy = trackEl.children[items.length];
      if (!first || !firstOfNextCopy) return;
      const period = firstOfNextCopy.offsetLeft - first.offsetLeft;
      if (period <= 0) return;
      periodRef.current = period;
      setCopies(Math.max(2, Math.ceil(1 + el.clientWidth / period)));
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    observer.observe(trackEl);
    return () => observer.disconnect();
  }, [items.length, copyCount, reducedMotion]);

  // Only animate while the strip is actually on screen. Off screen the loop
  // would keep writing scrollLeft 60 times a second and keep pulling each
  // lazy card's image into view for nobody.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    heldRef.current = paused;
    if (!paused) scheduleResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  useEffect(() => () => clearTimeout(resumeTimerRef.current), []);

  // Auto-scroll loop. Depends on nothing that changes identity per render, so
  // a parent re-rendering (every lightbox page turn) no longer tears it down.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || reducedMotion) return;

    let frame;
    let last = performance.now();

    function tick(now) {
      const dt = Math.min(now - last, MAX_FRAME_MS);
      last = now;

      const period = periodRef.current;
      if (
        period > 0 &&
        visibleRef.current &&
        !pausedRef.current &&
        !heldRef.current
      ) {
        let next = el.scrollLeft + (AUTO_SCROLL_PX_PER_SEC * dt) / 1000;
        while (next >= period) next -= period;
        el.scrollLeft = next;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  function pause() {
    pausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
  }

  function scheduleResume() {
    clearTimeout(resumeTimerRef.current);
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
  // event's target to this container instead of the card's own element,
  // which would silently eat every click.
  function onPointerDown(e) {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    pause();
    lastDragMovedRef.current = false;
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
    // A press released outside the strip, before the drag threshold was
    // crossed, never captured the pointer — so its pointerup landed on some
    // other element and this session was never ended. With no button held
    // it is over; without this check the strip followed the bare cursor.
    if ((e.buttons & 1) === 0) {
      dragRef.current = null;
      scheduleResume();
      return;
    }
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
    if (dragRef.current?.moved) {
      lastDragMovedRef.current = true;
      // The browser dispatches this gesture's click synchronously after
      // pointerup, before any timer runs — so the click still sees the flag,
      // and nothing after it does.
      setTimeout(() => {
        lastDragMovedRef.current = false;
      }, 0);
    }
    dragRef.current = null;
    // Touch resumes from onTouchEnd. Scheduling it here too would fire on the
    // pointercancel a native touch pan raises the moment it starts, and set
    // the strip moving under a finger that is still down.
    if (e.pointerType === "mouse") scheduleResume();
  }

  function onTouchStart() {
    lastTouchRef.current = Date.now();
    pause();
  }

  function onTouchEnd() {
    lastTouchRef.current = Date.now();
    scheduleResume();
  }

  function onMouseEnter() {
    if (Date.now() - lastTouchRef.current < TOUCH_MOUSE_EMULATION_MS) return;
    pause();
  }

  // A keyboard user tabbing into the strip gets the same pause a hovering
  // mouse does. Otherwise the browser scrolls the focused card into view and
  // the loop immediately carries it, focus ring and all, off-screen again.
  function onBlur(e) {
    if (!scrollerRef.current?.contains(e.relatedTarget)) scheduleResume();
  }

  function wasDragging() {
    return lastDragMovedRef.current;
  }

  return (
    <div
      ref={scrollerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={scheduleResume}
      onFocus={pause}
      onBlur={onBlur}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing ${className}`}
    >
      <div ref={trackRef} className={`flex w-max gap-6 ${trackClassName}`}>
        {track.map((item, i) => {
          const hidden = i >= items.length;
          return renderItem(item, { hidden, index: i, wasDragging });
        })}
      </div>
    </div>
  );
}

// The house card: picture in a rounded frame, title and context below it.
// Kept here rather than in any one strip so every plain `{ src, href, label,
// sublabel }` reel looks the same without restating the markup.
function defaultCard(item, { hidden, index, wasDragging }) {
  const badge = KIND_BADGES[item.kind];
  const caption = (
    <>
      <span
        className={`block mt-3 font-display italic text-ink text-base leading-tight ${
          item.href ? "group-hover:text-accentText transition-colors" : ""
        }`}
      >
        {item.label}
      </span>
      {item.sublabel && (
        <span className="block text-muted text-xs">{item.sublabel}</span>
      )}
    </>
  );

  const media = (
    // `bg-line` is the loading state. Without it a card whose photo is still
    // on its way is an empty outline on paper, which reads as a broken image.
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-line">
      {/* A fixed 256×144 rather than `fill` + sizes="256px": Next emits every
          width from 16w to 3840w for a `sizes` value with no `vw` in it, which
          put 16 srcset candidates on each of the home strip's 140 cards — 227KB,
          38% of the page's HTML — for a card that only ever needs 1x and 2x. */}
      <Image
        width={256}
        height={144}
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
      />
      {badge && (
        <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-paper font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm pointer-events-none">
          <badge.Icon size={12} aria-hidden="true" />
          {badge.label}
        </span>
      )}
    </div>
  );

  const className = "group w-56 sm:w-64 flex-shrink-0 select-none text-left";
  const key = `${item.src}-${index}`;
  // `key` is deliberately not in here: React reads it off the element, and
  // spreading it in makes it an ordinary prop it then warns about.
  const shared = {
    "aria-hidden": hidden ? "true" : undefined,
    tabIndex: hidden ? -1 : undefined,
    draggable: false,
  };

  // A card only leads somewhere if the item says where; otherwise it is a
  // still and should not look or behave like a link.
  if (!item.href) {
    return (
      <div key={key} {...shared} className={className}>
        {media}
        {caption}
      </div>
    );
  }

  return (
    <Link
      key={key}
      {...shared}
      href={item.href}
      aria-label={item.sublabel ? `${item.label} — ${item.sublabel}` : item.label}
      // Without this, the click that ends a drag across the strip navigates
      // away from the page the visitor was busy browsing.
      onClick={(e) => {
        if (wasDragging()) e.preventDefault();
      }}
      className={`${className} cursor-pointer`}
    >
      {media}
      {caption}
    </Link>
  );
}
