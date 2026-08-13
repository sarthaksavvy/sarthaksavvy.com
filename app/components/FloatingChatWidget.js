"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Open state is owned by FloatingControls so the reset button can move out of
// the way while the panel is expanded. Positioning lives there too — this
// component only draws the launcher and the panel.
export default function FloatingChatWidget({
  open,
  onOpenChange,
  className = "",
}) {
  const [question, setQuestion] = useState("");
  const router = useRouter();
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  // The launcher unmounts while the panel is open, so its ref is null exactly
  // when we want to focus it. Instead we note that focus is owed and hand it
  // back on the render where the launcher exists again.
  const focusOwedRef = useRef(false);

  const close = useCallback(() => {
    focusOwedRef.current = true;
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      router.push(`/ask?q=${encodeURIComponent(question.trim())}`);
      setQuestion("");
      onOpenChange(false);
    }
  };

  // A panel that covers part of the page needs a way out that is not a mouse
  // aimed at a 12px glyph: Escape closes it, and focus lands in the textarea
  // on open rather than staying behind on the page underneath.
  useEffect(() => {
    if (!open) {
      if (focusOwedRef.current) {
        focusOwedRef.current = false;
        launcherRef.current?.focus();
      }
      return;
    }

    inputRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  if (open) {
    return (
      <div
        role="dialog"
        aria-labelledby="ask-widget-title"
        className={`pointer-events-auto bg-paper border border-line rounded-2xl p-6 w-full max-w-[20rem] shadow-2xl ${className}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="ask-widget-title"
            className="font-display italic text-lg text-ink"
          >
            Ask about Sarthak
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close ask panel"
            className="text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="ask-widget-question" className="sr-only">
            Your question about Sarthak
          </label>
          <textarea
            id="ask-widget-question"
            ref={inputRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to know about Sarthak's background, projects, or expertise?"
            className="w-full bg-transparent border border-line rounded-lg p-3 text-ink placeholder-muted focus:ring-1 focus:ring-accent focus:border-accent focus:outline-none resize-none"
            rows={3}
            maxLength={1000}
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted font-mono">
              {question.length}/1000
            </span>
            <button
              type="submit"
              disabled={!question.trim()}
              className="bg-ink text-paper px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ask
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-line">
          <p className="text-xs text-muted text-center font-mono">
            Powered by AI · Instant answers about Sarthak&apos;s work
          </p>
        </div>
      </div>
    );
  }

  return (
    <button
      ref={launcherRef}
      type="button"
      onClick={() => onOpenChange(true)}
      aria-expanded={false}
      className={`pointer-events-auto max-w-full text-left bg-ink text-paper px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 ${className}`}
    >
      <span>Ask anything about Sarthak</span>
      <span
        aria-hidden="true"
        className="w-2 h-2 shrink-0 bg-accent rounded-full animate-pulse"
      />
    </button>
  );
}
