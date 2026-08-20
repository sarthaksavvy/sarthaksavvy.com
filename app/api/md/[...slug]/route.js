import { getSubscriberCount } from "../../../../lib/youtube";
import { SITE_URL, updatedFor } from "../../../routes";
import {
  markdownPages,
  renderMarkdownPage,
} from "../../../content/markdown";

// Serves the markdown mirror of a page. Reached as `/about-me.md`, not at this
// path — next.config.mjs rewrites `/:path*.md` here, so the URL a crawler sees
// and links to sits beside the HTML page it mirrors rather than under /api,
// which robots.txt disallows.
//
// The home page is `/index.md`, because `/.md` is not a URL.

export const revalidate = 86400;

// A crawler asking for a page that does not exist should be told so in the
// same format it asked for, and told where the real list is.
function notFound() {
  const body = `# Not found

There is no markdown mirror at this URL.

The full index of available pages is at ${SITE_URL}/llms.txt, and every page's
content in one file is at ${SITE_URL}/llms-full.txt.
`;

  return new Response(body, {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request, { params }) {
  const slug = (params.slug ?? []).join("/");
  const page = markdownPages.find((candidate) => candidate.slug === slug);
  if (!page) return notFound();

  // Only fetched for the two pages that quote a live subscriber count; the
  // rest never read it, and the fetch is cached for a day either way.
  const subscribers = await getSubscriberCount();
  const updated = updatedFor(page.path);

  const body = renderMarkdownPage(page, { subscribers, updated });

  return new Response(body, {
    headers: {
      // `text/markdown` is what the file is. Some crawlers send back a
      // download prompt for an unknown type, so charset is spelled out and the
      // canonical HTML page is advertised in a Link header — the same
      // relationship the <link rel="alternate"> in the HTML head declares from
      // the other direction, so whichever copy a crawler finds first can reach
      // the other.
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${SITE_URL}${page.path === "/" ? "" : page.path}>; rel="canonical"`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}

/** Prerenders every mirror at build time instead of on first request. */
export function generateStaticParams() {
  return markdownPages.map((page) => ({ slug: page.slug.split("/") }));
}
