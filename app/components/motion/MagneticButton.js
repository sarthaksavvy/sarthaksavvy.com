"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// How far the element follows the cursor, as a fraction of the distance from
// its centre, and the spring that carries it there. Unchanged from the values
// the button has always used, so the effect looks exactly the same.
const PULL = 0.35;
const SPRING = { stiffness: 150, damping: 12, mass: 0.5 };

// This used to call `motion(Tag)` inline in the render body. Both that and its
// replacement, `motion.create(Tag)`, mint a brand new component *type* on every
// call, and React treats a new type as a different element: it unmounts the old
// subtree and mounts a fresh one in its place. Building the type during render
// therefore threw away and rebuilt this button's DOM node on every render — and
// with the cursor position held in state, that meant every mousemove.
//
// That was not just wasteful. A click only fires if its mousedown and its
// mouseup land on the same node, so a single mousemove delivered while the
// button was held replaced the node mid-press and the browser fired no click at
// all. Every MagneticButton on the site is a link — "Book a Call", "View Work",
// "Get in Touch", the podcast and project links — and each of them silently
// dropped clicks for anyone whose hand was not perfectly still.
//
// Caching by tag keeps one stable type per element kind for the life of the
// module, which is what lets the node survive across renders.
const motionTags = new Map();

function motionTag(tag) {
  let component = motionTags.get(tag);
  if (!component) {
    component = motion.create(tag);
    motionTags.set(tag, component);
  }
  return component;
}

export default function MagneticButton({
  children,
  className = "",
  as: Tag = "a",
  style,
  ...props
}) {
  const ref = useRef(null);
  const MotionTag = motionTag(Tag);
  // Same reason as TiltCard: the pull is written to a motion value by hand
  // rather than animated by Framer, so the global reduced-motion setting does
  // not reach it and this has to opt out on its own. The button keeps its
  // colour change on hover, so it still reads as interactive — it just stops
  // sliding out from under the cursor.
  const prefersReducedMotion = useReducedMotion();

  // Motion values are written to the DOM directly rather than through state, so
  // tracking the cursor no longer re-renders the component ~60 times a second.
  // Same approach as TiltCard: the pointer sets the *target*, and the spring
  // that the element actually renders follows it.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, SPRING);
  const y = useSpring(targetY, SPRING);

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    const rect = el.getBoundingClientRect();
    targetX.set((e.clientX - rect.left - rect.width / 2) * PULL);
    targetY.set((e.clientY - rect.top - rect.height / 2) * PULL);
  }

  function handleMouseLeave() {
    targetX.set(0);
    targetY.set(0);
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, x, y }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
