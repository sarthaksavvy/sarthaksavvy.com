"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const RADIUS = 130;

// The photo is laid out at 42% of a 1400px-max container, so it never needs to
// be wider than ~588px however large the screen gets. Saying so lets Next pick
// a source that size instead of shipping the full-resolution original.
const SIZES = "(min-width: 1400px) 588px, 42vw";

// Builds an irregular, hand-torn-looking frame instead of a perfect
// rectangle — points walk each edge with small random jitter.
function buildOrganicClipPath() {
  const points = [];
  const perEdge = 6;
  const jitter = 3; // percent

  function jittered(base) {
    return Math.max(0, Math.min(100, base + (Math.random() - 0.5) * jitter * 2));
  }

  for (let i = 0; i <= perEdge; i++) {
    points.push([jittered((i / perEdge) * 100), jittered(0)]);
  }
  for (let i = 0; i <= perEdge; i++) {
    points.push([jittered(100), jittered((i / perEdge) * 100)]);
  }
  for (let i = 0; i <= perEdge; i++) {
    points.push([jittered(100 - (i / perEdge) * 100), jittered(100)]);
  }
  for (let i = 0; i <= perEdge; i++) {
    points.push([jittered(0), jittered(100 - (i / perEdge) * 100)]);
  }

  return `polygon(${points.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(", ")})`;
}

export default function ParticleImage({ src, className = "" }) {
  const wrapRef = useRef(null);
  const sharpRef = useRef(null);
  const ringRef = useRef(null);
  const [clipPath] = useState(buildOrganicClipPath);

  function setMask(x, y, visible) {
    const el = sharpRef.current;
    if (el) {
      el.style.maskImage = `radial-gradient(${RADIUS}px circle at ${x}px ${y}px, black 55%, transparent 100%)`;
      el.style.webkitMaskImage = el.style.maskImage;
      el.style.opacity = visible ? "1" : "0";
    }

    const ring = ringRef.current;
    if (ring) {
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.opacity = visible ? "1" : "0";
    }
  }

  function handleMove(e) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    setMask(e.clientX - rect.left, e.clientY - rect.top, true);
  }

  function handleLeave() {
    setMask(-9999, -9999, false);
  }

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ clipPath, WebkitClipPath: clipPath }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Resting state: the photo sits behind a very subtle blur.

          Both layers stay lazy on purpose. The effect only exists on desktop —
          Hero hides the whole thing below `md` — and a lazy image inside a
          `display: none` parent is never fetched, so phones stop paying for a
          photo they are not shown. It costs nothing above the fold either:
          this component is loaded with `ssr: false`, so it already renders
          after hydration, and the page's LCP is the headline, not the photo. */}
      <Image
        src={src}
        alt=""
        fill
        sizes={SIZES}
        className="object-cover"
        style={{ filter: "blur(1.5px)" }}
      />
      {/* Hover state: the sharp photo is revealed only inside a soft
          circular mask that follows the cursor. Same `src` as the layer above,
          so this is one download shared by both. */}
      <Image
        ref={sharpRef}
        src={src}
        alt=""
        fill
        sizes={SIZES}
        className="object-cover transition-opacity duration-200"
        style={{ opacity: 0 }}
      />
      {/* Ring outlining exactly where the clear reveal ends. */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full border border-ink/30 transition-opacity duration-200"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          opacity: 0,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.4) inset",
        }}
      />
    </div>
  );
}
