export const SITE_URL = "https://sarthaksavvy.com";

// Single source of truth for the site's indexable routes. Used by the
// sitemap, the markdown mirrors and the llms.txt index, so a new page only has
// to be registered in one place.
//
// `updated` is the date the page's *content* last changed, not the date of the
// last deploy. The sitemap used to stamp every URL with `new Date()` at build
// time, which told a crawler that all eleven pages changed every time anything
// shipped — including a CSS tweak. A signal that fires for everything carries
// no information, and a crawler that learns to distrust lastmod stops using
// it. Answer engines lean on freshness harder than search does when deciding
// which of two sources to quote, so it is worth keeping honest: bump the date
// on a page when you change what that page says.
export const indexableRoutes = [
  { path: "/", changeFrequency: "monthly", priority: 1, updated: "2026-08-20" },
  { path: "/ai-consulting", changeFrequency: "monthly", priority: 0.9, updated: "2026-08-20" },
  { path: "/about-me", changeFrequency: "monthly", priority: 0.8, updated: "2026-08-20" },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8, updated: "2026-08-20" },
  { path: "/side-projects", changeFrequency: "monthly", priority: 0.8, updated: "2026-08-20" },
  { path: "/podcasts", changeFrequency: "monthly", priority: 0.7, updated: "2026-08-20" },
  { path: "/public-speaking", changeFrequency: "monthly", priority: 0.7, updated: "2026-08-13" },
  { path: "/side-projects/backstage-cut", changeFrequency: "yearly", priority: 0.6, updated: "2026-08-20" },
  { path: "/side-projects/audiobolo", changeFrequency: "yearly", priority: 0.6, updated: "2026-08-20" },
  { path: "/side-projects/ginger", changeFrequency: "yearly", priority: 0.6, updated: "2026-08-20" },
  { path: "/side-projects/expensorr", changeFrequency: "yearly", priority: 0.6, updated: "2026-08-20" },
  { path: "/side-projects/mezohub", changeFrequency: "yearly", priority: 0.6, updated: "2026-08-20" },
];

/**
 * The markdown mirror's slug for a route: "/about-me" -> "about-me", "/" ->
 * "index", because "/.md" is not a URL.
 *
 * Defined here rather than in the content layer because next.config.mjs needs
 * it to emit the Link headers, and it is loaded by plain Node — which cannot
 * follow the content layer's `import events.json` without an import attribute.
 * One rule, two callers, no second list of slugs to keep in step.
 */
export function markdownSlug(path) {
  return path === "/" ? "index" : path.replace(/^\//, "");
}

export function routeFor(path) {
  return indexableRoutes.find((route) => route.path === path);
}

/** ISO date a page's content last changed; falls back to the newest date on the site. */
export function updatedFor(path) {
  return routeFor(path)?.updated ?? SITE_UPDATED;
}

export const SITE_UPDATED = indexableRoutes
  .map((route) => route.updated)
  .sort()
  .at(-1);

// Routes kept out of search results: the API and the /ask tool, whose
// answers are generated per `?q=` and would otherwise open an unbounded
// space of thin, near-duplicate URLs to crawlers.
export const disallowedPaths = ["/api/", "/ask"];
