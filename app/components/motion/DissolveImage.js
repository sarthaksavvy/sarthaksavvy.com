"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function DissolveImage({ src, alt, className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover grayscale-[0.6] scale-105 transition-transform duration-700"
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          maskImage: `radial-gradient(circle 180px at ${pos.x}% ${pos.y}%, black 40%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 180px at ${pos.x}% ${pos.y}%, black 40%, transparent 100%)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
