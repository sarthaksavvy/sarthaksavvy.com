import { SITE_URL, indexableRoutes } from "./routes";

export default function sitemap() {
  const lastModified = new Date();

  return indexableRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
