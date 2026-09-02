import { SITE_NAME } from "./seo";

// A Lighthouse PWA/SEO audit flags a missing web manifest even on a site with
// no install ambitions: browsers use it to pick the tab/task-switcher theme
// colour and the name shown if a visitor adds the site to their home screen.
// Colours mirror the Tailwind palette (`paper`/`ink`) rather than restating
// them, so the manifest can't drift from what the site actually looks like.
//
// The icon points at `/icon.svg` — the same monogram Next.js already serves
// for the browser tab via the `app/icon.svg` file convention. `app/favicon.ico`
// was removed when that SVG replaced it, but this manifest kept pointing at
// the now-deleted file, so the only icon a visitor's browser could find here
// was a 404 and "Add to Home Screen" had nothing to show.
export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: "Sarthaksavvy",
    description: "Sarthak Shrivastava's personal website",
    start_url: "/",
    display: "browser",
    background_color: "#F6F3EC",
    theme_color: "#F6F3EC",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
