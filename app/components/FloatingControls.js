"use client";

import { useState } from "react";
import ResetIntroButton from "./ResetIntroButton";
import FloatingChatWidget from "./FloatingChatWidget";

// Both floating controls used to position themselves independently — one
// pinned bottom-left, the other bottom-right. Side by side they need about
// 500px of room, so on any phone they overlapped: the "Replay Intro" pill sat
// on top of the "Ask anything about Sarthak" button, hiding half its label and
// swallowing taps meant for it.
//
// Anchoring both to one bar fixes that by making the layout a single decision
// instead of two independent guesses. The row keeps the original desktop
// placement exactly (flush to the viewport edges, 24px in); below `sm` it
// stacks, with the ask button nearest the thumb. Owning `chatOpen` here also
// lets the reset button step aside while the ask panel is expanded, which is
// the one case where a stack would still collide.
export default function FloatingControls() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    // The bar spans the viewport so its children can sit at both edges, which
    // would otherwise trap every click in the empty middle — hence
    // pointer-events-none here and pointer-events-auto on the controls.
    <div className="fixed inset-x-0 bottom-0 z-50 px-6 pb-6 pointer-events-none">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-6">
        {!chatOpen && <ResetIntroButton />}
        {/* ml-auto rather than justify-between on the row, so hiding the reset
            button does not slide the ask control across the screen. */}
        <FloatingChatWidget
          open={chatOpen}
          onOpenChange={setChatOpen}
          className="sm:ml-auto"
        />
      </div>
    </div>
  );
}
