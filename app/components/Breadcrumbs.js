import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * The visible counterpart to `breadcrumbSchema()` in structuredData.js.
 * `trail` is the same array passed to that function — home is prepended
 * here, exactly as it is there — so the markup and what a visitor sees
 * can never disagree about what the trail is.
 *
 * Uses `text-muted` rather than an ink opacity utility: this is the same
 * 12px uppercase mono shape the `muted` token's own comment in
 * tailwind.config.js calls out (dates, labels, footer nav), and it is the
 * one already measured to clear 4.5:1 against `paper`. `text-ink/50`, used
 * here previously, only reaches 3.39:1 — short of WCAG AA for this text.
 */
export default function Breadcrumbs({ trail }) {
  const crumbs = [{ name: "Home", path: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-widest uppercase text-muted">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {i > 0 && (
                <ChevronRight
                  size={12}
                  className="text-ink/30 shrink-0"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="hover:text-ink transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
