"use client";

import Image from "next/image";
import { useState } from "react";

// On mobile the photo spans the full viewport width; from `md` up it's laid
// out at 42% of a 1400px-max container, so it never needs to be wider than
// ~588px. Saying so lets Next pick a source that size instead of shipping the
// full-resolution original.
const SIZES = "(min-width: 1400px) 588px, (min-width: 768px) 42vw, 100vw";

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
  const [clipPath] = useState(buildOrganicClipPath);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={SIZES}
        className="object-cover"
      />
    </div>
  );
}
