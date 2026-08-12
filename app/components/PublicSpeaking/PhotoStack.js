"use client";

import Image from "next/image";
import { useState } from "react";

const VIDEO_PATTERN = /\.(mp4|mpg|mov|webm)$/i;

// Every photo in the timeline is a full-resolution camera JPEG — a few of them
// are over 3MB. Rendered through next/image the 80px thumbnails download as
// 80px thumbnails instead of the originals, which is the difference between a
// couple of hundred kilobytes and roughly 24MB on this page.
const THUMB_SIZE = 80;

/**
 * The gallery for one talk: a row of thumbnails with a large preview of
 * whichever one is active.
 *
 * Selection is driven by real buttons rather than hover alone. Hover was the
 * only way in before, which meant the photos did not exist at all for anyone
 * on a phone or working from the keyboard — a tap fires no mouseenter, and
 * there was nothing in the tab order to focus. Pointer users keep the instant
 * hover preview; a click now pins it so the photo stays put while you look at
 * it.
 */
export default function PhotoStack({ event }) {
  const [pinned, setPinned] = useState(null);
  const [previewed, setPreviewed] = useState(null);

  // A pinned photo wins over whatever the pointer happens to be passing over,
  // so moving the mouse away from a photo you clicked does not close it.
  const active = pinned ?? previewed;
  const label = event.title.trim();

  function describe(index) {
    return `${label} at ${event.conference} — photo ${index + 1} of ${
      event.images.length
    }`;
  }

  function close() {
    setPinned(null);
    // Also drop the hover/focus preview. A tap both focuses the button and
    // fires the click, so leaving `previewed` set would hold the photo open
    // and make the closing tap look like it did nothing.
    setPreviewed(null);
  }

  function toggle(index) {
    if (pinned === index) {
      close();
    } else {
      setPinned(index);
    }
  }

  function onKeyDown(nativeEvent) {
    if (nativeEvent.key === "Escape" && active !== null) {
      nativeEvent.preventDefault();
      close();
    }
  }

  return (
    <div className="w-full" onKeyDown={onKeyDown}>
      <ul className="flex gap-2 overflow-x-auto pb-1 list-none p-0 m-0">
        {event.images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              aria-label={describe(index)}
              aria-pressed={pinned === index}
              onClick={() => toggle(index)}
              onMouseEnter={() => setPreviewed(index)}
              onMouseLeave={() =>
                setPreviewed((current) => (current === index ? null : current))
              }
              onFocus={() => setPreviewed(index)}
              onBlur={() =>
                setPreviewed((current) => (current === index ? null : current))
              }
              className={`block rounded-lg overflow-hidden border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                active === index
                  ? "border-accent"
                  : "border-transparent hover:border-ink/40"
              } ${
                pinned === index ? "ring-1 ring-accent" : ""
              }`}
            >
              {VIDEO_PATTERN.test(image) ? (
                <video
                  src={image}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="h-20 w-20 object-cover"
                />
              ) : (
                <Image
                  src={image}
                  alt=""
                  width={THUMB_SIZE}
                  height={THUMB_SIZE}
                  sizes={`${THUMB_SIZE}px`}
                  className="h-20 w-20 object-cover"
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Rendered in normal flow rather than absolutely positioned. The old
          preview was pinned below an 80px thumbnail row inside a 400px box
          with overflow hidden, so the bottom 88px of every photo was cut off
          no matter which one you opened. */}
      {active !== null && (
        <div className="relative mt-2 h-[400px] rounded-xl overflow-hidden shadow-2xl bg-line/30">
          {VIDEO_PATTERN.test(event.images[active]) ? (
            <video
              src={event.images[active]}
              controls
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={event.images[active]}
              alt={describe(active)}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}
