// Every route's page component is an async server component that awaits a
// live YouTube fetch (see lib/youtube.js) before it can render anything —
// cached for 24h on success, but a cold cache or a slow upstream response
// otherwise leaves the browser on a blank tab with no feedback at all. This
// is the Next.js file convention for exactly that gap: it streams in
// immediately on navigation and is swapped out the moment the page segment
// below it is ready, so a visitor always sees something within a paint.
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="py-32 flex items-center justify-center min-h-[60vh]"
    >
      <div className="flex items-center gap-3 text-muted">
        <span
          aria-hidden="true"
          className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"
        />
        <span className="font-mono text-xs tracking-widest uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
