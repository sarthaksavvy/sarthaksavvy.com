"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Linkedin, MessageCircle, Share2 } from "lucide-react";

// X has no lucide glyph, and a text label reads fine next to the other icons.
const linkClass =
  "inline-flex items-center gap-2 border border-line rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink hover:border-ink/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

/**
 * Share buttons for one event page. `url` is the canonical absolute URL, so a
 * link copied from a preview deployment still points at the real site and the
 * preview card the recipient sees is the one built for that URL.
 */
export default function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // navigator.share is absent on most desktop browsers and in the server
  // render, so the button only appears once the client knows it will work.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard is blocked outside secure contexts; the other buttons still work.
    }
  }

  const encoded = encodeURIComponent(url);

  return (
    <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Share this event">
      <button type="button" onClick={copy} className={linkClass}>
        {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
        {copied ? "Copied" : "Copy link"}
        <span className="sr-only" aria-live="polite">
          {copied ? "Link copied to clipboard" : ""}
        </span>
      </button>
      <a
        className={linkClass}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin size={14} aria-hidden="true" />
        LinkedIn
      </a>
      <a
        className={linkClass}
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span aria-hidden="true" className="font-bold leading-none">𝕏</span>
        Post
      </a>
      <a
        className={linkClass}
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={14} aria-hidden="true" />
        WhatsApp
      </a>
      {canNativeShare && (
        <button
          type="button"
          className={linkClass}
          onClick={() => navigator.share({ title, url }).catch(() => {})}
        >
          <Share2 size={14} aria-hidden="true" />
          More
        </button>
      )}
    </div>
  );
}
