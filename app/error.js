"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";

// Next.js requires this exact file (a Client Component) to catch a rendering
// error anywhere in a route segment. Without it, a thrown error blanks the
// whole page to the framework's own unstyled "Application error" screen — no
// nav, no way back in, and nothing that looks like the rest of the site. This
// keeps a visitor inside the site's own design and gives them a way out,
// exactly as not-found.js already does for a missing page.
//
// Deliberately no Reveal, MagneticButton or other motion component here: this
// renders precisely when something on the page has already thrown, so the
// fallback stays plain markup rather than adding more surface that could fail
// the same way.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Unhandled error in route segment:", error);
  }, [error]);

  return (
    <div className="py-10 px-6 sm:px-10 min-h-[70vh] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full">
        <p className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-accent mb-6">
          Error
        </p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
          Something <span className="italic text-accent">broke.</span>
        </h1>
        <p className="text-lg text-ink/70 mb-12 max-w-lg leading-relaxed">
          This page hit an unexpected error. It has been logged — in the
          meantime, try again or head back to the homepage.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-ink text-paper px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors inline-flex items-center gap-3"
          >
            Try again
            <RotateCcw size={16} aria-hidden="true" />
          </button>
          <Link
            href="/"
            className="border border-ink/25 text-ink px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex items-center gap-3"
          >
            Home
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
