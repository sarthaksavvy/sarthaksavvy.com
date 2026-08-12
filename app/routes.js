export const SITE_URL = "https://sarthaksavvy.com";

// Single source of truth for the site's indexable routes. Used by the
// sitemap so a new page only has to be registered in one place.
export const indexableRoutes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about-me", changeFrequency: "monthly", priority: 0.8 },
  { path: "/side-projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/podcasts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/public-speaking", changeFrequency: "monthly", priority: 0.7 },
  { path: "/side-projects/ginger", changeFrequency: "yearly", priority: 0.6 },
  { path: "/side-projects/expensorr", changeFrequency: "yearly", priority: 0.6 },
  { path: "/side-projects/mezohub", changeFrequency: "yearly", priority: 0.6 },
];

// Routes kept out of search results: the API and the /ask tool, whose
// answers are generated per `?q=` and would otherwise open an unbounded
// space of thin, near-duplicate URLs to crawlers.
export const disallowedPaths = ["/api/", "/ask"];
