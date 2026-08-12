"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function playSound(src, onEnded) {
  try {
    const audio = new Audio(src);
    audio.volume = 0.6;
    if (onEnded) audio.addEventListener("ended", onEnded, { once: true });
    audio.play().catch(() => {});
    return audio;
  } catch (e) {
    return null;
  }
}

export default function EntryGate() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const pendingRef = useRef({ audio: null, onFirstMove: null });
  const panelRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const cancelPendingSequence = useCallback(() => {
    const pending = pendingRef.current;
    if (pending.onFirstMove) {
      window.removeEventListener("mousemove", pending.onFirstMove);
    }
    if (pending.audio) {
      pending.audio.pause();
    }
    pendingRef.current = { audio: null, onFirstMove: null };
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem("gate-seen");
    if (!seen) {
      setVisible(true);
    }
    setReady(true);

    function onReset() {
      cancelPendingSequence();
      sessionStorage.removeItem("gate-seen");
      setVisible(true);
    }
    window.addEventListener("gate:reset", onReset);
    return () => {
      window.removeEventListener("gate:reset", onReset);
      cancelPendingSequence();
    };
  }, [cancelPendingSequence]);

  const enter = useCallback(
    (withSound) => {
      cancelPendingSequence();
      sessionStorage.setItem("gate-seen", "1");
      setVisible(false);

      if (withSound) {
        const authAudio = playSound("/sounds/user_authentication.mp3", () => {
          function onFirstMove() {
            window.removeEventListener("mousemove", onFirstMove);
            pendingRef.current = { audio: null, onFirstMove: null };
            pendingRef.current.audio = playSound(
              "/sounds/inbound_signal_detected.mp3"
            );
          }
          pendingRef.current = { audio: null, onFirstMove };
          window.addEventListener("mousemove", onFirstMove);
        });
        pendingRef.current.audio = authAudio;
      }
    },
    [cancelPendingSequence]
  );

  // The gate covers the entire page, so while it is open it has to behave like
  // a modal dialog rather than a decorative overlay: focus moves into it, Tab
  // stays inside it, Escape leaves, and the page behind it stops scrolling.
  // Without that, a keyboard visitor tabs straight into a header they cannot
  // see and a screen reader reads a page that is hidden behind an opaque
  // panel.
  useEffect(() => {
    if (!visible) return;

    lastFocusedRef.current = document.activeElement;

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel ? panel.querySelectorAll(FOCUSABLE) : []);

    focusables()[0]?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        enter(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length || !panel) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !panel.contains(active);

      if (event.shiftKey && (outside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible, enter]);

  // Hand focus back to whatever the visitor was on before the gate opened, so
  // "Replay Intro" returns them to that button instead of dropping them at the
  // top of the document.
  useEffect(() => {
    if (visible) return;

    const last = lastFocusedRef.current;
    lastFocusedRef.current = null;
    if (last && last !== document.body && document.contains(last)) {
      last.focus();
    }
  }, [visible]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="gate"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="entry-gate-title"
          aria-describedby="entry-gate-hint"
          className="fixed inset-0 z-[100] bg-paper text-ink flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #171410 1px, transparent 1px), linear-gradient(to bottom, #171410 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-6 left-6 w-6 h-6 border-l border-t border-ink/30"
          />
          <div
            aria-hidden="true"
            className="absolute top-6 right-6 w-6 h-6 border-r border-t border-ink/30"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-ink/30"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-ink/30"
          />

          <motion.div
            className="relative text-center px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p
              aria-hidden="true"
              className="font-mono text-xs tracking-[0.3em] text-muted mb-4"
            >
              {"// SYSTEM · SARTHAKSAVVY.EXE"}
            </p>
            {/* Deliberately not an <h1>. This overlay is rendered from the
                root layout, so a heading here would give every page on the
                site a second h1 — and it would be the first one in the
                document, leaving "initializing portfolio" as the strongest
                heading signal on a page about something else entirely. */}
            <p
              id="entry-gate-title"
              className="font-display text-3xl sm:text-5xl italic mb-4"
            >
              initializing portfolio
            </p>
            <p
              id="entry-gate-hint"
              className="font-mono text-xs tracking-widest text-muted mb-10"
            >
              SELECT AUDIO STATE TO CONTINUE
              <span aria-hidden="true" className="animate-blink">
                _
              </span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => enter(true)}
                className="font-mono text-xs tracking-widest px-6 py-3 rounded-full border border-ink bg-ink text-paper hover:bg-accent hover:border-accent transition-colors"
              >
                SOUND ON
              </button>
              <button
                onClick={() => enter(false)}
                className="font-mono text-xs tracking-widest px-6 py-3 rounded-full border border-ink/30 hover:border-ink transition-colors"
              >
                SOUND OFF
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
