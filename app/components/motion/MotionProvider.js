"use client";

import { MotionConfig } from "framer-motion";

// Almost everything that moves on this site is a Framer Motion animation:
// headings that slide up as you scroll, cards that tilt under the cursor,
// buttons that lean towards it, the entry overlay. None of it carried any
// awareness of "Reduce motion", the OS-level setting a visitor turns on when
// large moving things make them ill — so the site ignored the one request the
// platform lets them make.
//
// `reducedMotion="user"` reads that setting and drops transform and layout
// animations for anyone who has it on, site-wide, without every component
// having to remember. Opacity still animates, which is deliberate: it is the
// part that does not trigger motion sickness, and keeping it means a
// `whileInView` reveal still resolves to visible content rather than being
// skipped into nothing.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
