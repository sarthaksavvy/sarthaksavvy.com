"use client";

export default function ResetIntroButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("gate:reset"))}
      className="fixed bottom-6 left-6 z-50 bg-paper border border-accent/40 text-ink px-5 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-accent hover:bg-accent hover:text-paper transition-colors shadow-lg flex items-center gap-3"
    >
      Replay Intro
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
    </button>
  );
}
