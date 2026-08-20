import { SITE_URL, indexableRoutes } from "./routes";

export default function sitemap() {
  return indexableRoutes.map(({ path, changeFrequency, priority, updated }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    // Was `new Date()` for every entry, which restamped the whole site on
    // every deploy. See the note on `updated` in routes.js.
    lastModified: new Date(`${updated}T00:00:00Z`),
    changeFrequency,
    priority,
  }));
}
