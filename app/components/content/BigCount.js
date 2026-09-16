"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const COUNT_UP_SECONDS = 1.6;

// A headline number under a page title — "17 training events", "11 podcast
// episodes". The count is passed in from the same list the page renders, so
// adding an event, a guest or a project moves the number with nothing else to
// edit.
//
// It counts up from 0 the first time it scrolls into view. The number that
// actually carries meaning is the sr-only one: it is the real value in the
// server HTML, so crawlers and screen readers get "17", never a "0" caught
// mid-animation.
export default function BigCount({ value, label, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: COUNT_UP_SECONDS,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <p ref={ref} className={`flex items-baseline gap-4 ${className}`}>
      <span className="sr-only">
        {value} {label}
      </span>
      <span
        aria-hidden="true"
        className="font-display italic text-accentText text-7xl sm:text-8xl md:text-9xl leading-none tabular-nums"
      >
        {shown}
      </span>
      <span
        aria-hidden="true"
        className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted"
      >
        {label}
      </span>
    </p>
  );
}
