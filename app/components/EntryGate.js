"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  function cancelPendingSequence() {
    const pending = pendingRef.current;
    if (pending.onFirstMove) {
      window.removeEventListener("mousemove", pending.onFirstMove);
    }
    if (pending.audio) {
      pending.audio.pause();
    }
    pendingRef.current = { audio: null, onFirstMove: null };
  }

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
  }, []);

  function enter(withSound) {
    cancelPendingSequence();
    sessionStorage.setItem("gate-seen", "1");
    setVisible(false);

    if (withSound) {
      const authAudio = playSound("/sounds/user_authentication.mp3", () => {
        function onFirstMove() {
          window.removeEventListener("mousemove", onFirstMove);
          pendingRef.current = { audio: null, onFirstMove: null };
          pendingRef.current.audio = playSound("/sounds/inbound_signal_detected.mp3");
        }
        pendingRef.current = { audio: null, onFirstMove };
        window.addEventListener("mousemove", onFirstMove);
      });
      pendingRef.current.audio = authAudio;
    }
  }

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[100] bg-paper text-ink flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #171410 1px, transparent 1px), linear-gradient(to bottom, #171410 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-ink/30" />
          <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-ink/30" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-ink/30" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-ink/30" />

          <motion.div
            className="relative text-center px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted mb-4">
              // SYSTEM · SARTHAKSAVVY.EXE
            </p>
            <h1 className="font-display text-3xl sm:text-5xl italic mb-4">
              initializing portfolio
            </h1>
            <p className="font-mono text-xs tracking-widest text-muted mb-10">
              SELECT AUDIO STATE TO CONTINUE
              <span className="animate-blink">_</span>
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
