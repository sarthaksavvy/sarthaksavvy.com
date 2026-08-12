"use client";

// Positioning lives in FloatingControls, which lays this out alongside the ask
// widget; this component only draws the button.
export default function ResetIntroButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("gate:reset"))}
      className="pointer-events-auto bg-paper border border-accent/40 text-ink px-5 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-accent hover:bg-accent hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors shadow-lg flex items-center gap-3"
    >
      Replay Intro
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
    </button>
  );
}
