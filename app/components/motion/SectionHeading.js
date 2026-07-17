"use client";

import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <Reveal className={className}>
      {eyebrow && (
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
        {title}
      </h2>
    </Reveal>
  );
}
