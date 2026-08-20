import { getSubscriberCount } from "../../lib/youtube";
import { SITE_URL, SITE_UPDATED, updatedFor } from "../routes";
import { markdownPages, renderMarkdownPage } from "../content/markdown";
import { DEFINITION } from "../content/profile";

// /llms-full.txt — every page's markdown in one response.
//
// The point is the round trips. A retrieval pipeline that has to fetch eleven
// URLs to understand a site usually fetches two or three and answers from
// those; one file it can pull in a single request gets read in full. The
// per-page mirrors still exist because a model that already knows which page
// it wants should not have to download the whole site to read it.

export const revalidate = 86400;

const SEPARATOR = "\n\n---\n\n";

export async function GET() {
  const subscribers = await getSubscriberCount();
  const context = { subscribers, updated: SITE_UPDATED };

  const header = `# Sarthak Shrivastava — complete site content

> ${DEFINITION}

This file is the full text of every page on ${SITE_URL}, in markdown. It is
generated from the same source the rendered pages use, so it cannot drift from
what a visitor sees. Content last changed ${SITE_UPDATED}.

Each page below is also available on its own at ${SITE_URL}/<slug>.md`;

  const pages = markdownPages.map((page) =>
    renderMarkdownPage(page, { ...context, updated: updatedFor(page.path) })
  );

  const body = [header, ...pages].join(SEPARATOR);

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
