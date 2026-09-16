"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

// "156K+" -> { prefix: "", number: 156, suffix: "K+" }, "3,000+" keeps its
// comma, "1.2M+" keeps its one decimal place, "10+ years" keeps " years".
// Anything without a number in it ("Docker", "AWS ×2") comes back null and is
// shown as-is.
function parse(value) {
  const match = String(value).match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    suffix,
    target: Number(digits.replace(/,/g, "")),
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    grouping: digits.includes(","),
  };
}

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

/**
 * A figure that counts up from zero the first time it scrolls into view.
 *
 * The server always renders the real value, never "0". These numbers sit in a
 * <dd> precisely so a crawler or a model can copy them, and one that reads the
 * HTML without running scripts — or before this component hydrates — has to
 * find "156K+" there, not the start of an animation.
 *
 * On the client the figure is zeroed while it is still just below the fold,
 * so a visitor never sees the final number flash before the count begins, and
 * the count starts once most of it is on screen. It runs once. Figures already
 * above the viewport when the page loads are left alone, and with "Reduce
 * motion" on nothing changes at all.
 */
export default function CountUp({ value, delay = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { prefix, suffix, target, decimals, grouping } = parsed;
    const format = (n) =>
      prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouping,
      }) +
      suffix;

    let frame;
    let timer;
    let started = false;

    function run() {
      started = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / DURATION_MS, 1);
        if (t < 1) {
          setDisplay(format(target * easeOutCubic(t)));
          frame = requestAnimationFrame(tick);
        } else {
          // The original string, not a re-formatted number, so the settled
          // text is byte-for-byte what the server rendered.
          setDisplay(String(value));
        }
      };
      frame = requestAnimationFrame(tick);
    }

    // Zero it while it is still up to a quarter-screen below the fold.
    const arm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        setDisplay(format(0));
        arm.disconnect();
      },
      { rootMargin: "0px 0px 25% 0px" }
    );

    // Count once most of it is actually visible.
    const go = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        go.disconnect();
        arm.disconnect();
        setDisplay(format(0));
        timer = setTimeout(run, delay);
      },
      { threshold: 0.6 }
    );

    arm.observe(el);
    go.observe(el);

    return () => {
      arm.disconnect();
      go.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      // Unmounted mid-count (a fast navigation away): settle on the real value.
      setDisplay(String(value));
    };
  }, [value, delay]);

  return (
    // Fixed-width digits, so the figure doesn't jitter sideways as it counts.
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
