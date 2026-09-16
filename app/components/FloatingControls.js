"use client";

import { useState } from "react";
import FloatingChatWidget from "./FloatingChatWidget";

// This bar exists so the floating "Ask anything about Sarthak" control has a
// single, deliberate anchor point rather than positioning itself ad hoc. It
// keeps the original desktop placement (flush to the viewport edge, 24px in)
// and owns `chatOpen` so the widget's open state lives above the launcher
// button that toggles it.
export default function FloatingControls() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    // The bar spans the viewport so its child can sit at the edge, which
    // would otherwise trap every click in the empty middle — hence
    // pointer-events-none here and pointer-events-auto on the control.
    <div className="fixed inset-x-0 bottom-0 z-50 px-6 pb-6 pointer-events-none">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-6">
        <FloatingChatWidget
          open={chatOpen}
          onOpenChange={setChatOpen}
          className="sm:ml-auto"
        />
      </div>
    </div>
  );
}
