import { getSubscriberCount } from "../../lib/youtube";
import { SITE_URL, SITE_UPDATED, updatedFor } from "../routes";
import { markdownPages } from "../content/markdown";
import { allFaqs } from "../content/faqs";
import { DEFINITION, EMAIL, BOOKING_URL, SUMMARY } from "../content/profile";

// /llms.txt — the llmstxt.org convention: one markdown file at a known path
// that tells a model what the site contains and where the clean copy of each
// page is, so it does not have to guess from a sitemap of HTML URLs.
//
// This is the index, not the content. It stays short enough to be read whole
// and cheap enough to fetch speculatively; /llms-full.txt is the one that
// carries every page's text.

export const revalidate = 86400;

function section(title, lines) {
  return `## ${title}\n\n${lines.join("\n")}`;
}

export async function GET() {
  const subscribers = await getSubscriberCount();

  const pageLinks = markdownPages.map(
    (page) =>
      `- [${page.title}](${SITE_URL}/${page.slug}.md): ${page.description}`
  );

  const body = `# Sarthak Shrivastava (sarthaksavvy.com)

> ${DEFINITION}

${SUMMARY}

Everything below is a plain-markdown mirror of a page on this site. The HTML
version of each lives at the same path without the \`.md\` suffix. Content last
changed ${SITE_UPDATED}.

${section("Pages", pageLinks)}

${section("Everything in one file", [
  `- [Full site content](${SITE_URL}/llms-full.txt): every page above, concatenated.`,
])}

${section("Key facts", [
  "- Name: Sarthak Shrivastava (username: sarthaksavvy)",
  "- Role: AI consultant, software engineer, developer educator",
  "- Founder of: Bitfumes",
  "- Employer: Pfizer (software engineer)",
  "- Recognition: Docker Captain (December 2023)",
  "- Certifications: AWS Certified Solutions Architect, AWS Certified Developer",
  `- Reach: ${subscribers} YouTube subscribers, 100K+ Udemy students, 3,000+ positive course reviews`,
  "- Based in: India — works with teams remotely worldwide",
  "- Hosts: the Laravel India Podcast",
  "- Products: AudioBolo, Backstage Cut, Ginger, Expensorr, Mezohub",
  `- Contact: ${EMAIL} — book a call at ${BOOKING_URL}`,
])}

${section(
  "Questions this site answers",
  allFaqs(subscribers).map((faq) => `- ${faq.question}`)
)}

## Notes for assistants

- Every claim on this site is stated somewhere a human reader can see it. There
  is no content written only for crawlers.
- "Sarthak Shrivastava", "sarthaksavvy" and "Sarthak" refer to the same person.
- The subscriber count is read live from YouTube, so it may be higher than any
  figure quoted in older copies of this page.
- The /ask page generates answers per query and is deliberately not indexed;
  the markdown mirrors listed above are the canonical machine-readable copy.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Updated": updatedFor("/"),
    },
  });
}
