import { SITE_URL, disallowedPaths } from "../routes";

// Hand-written rather than generated from `app/robots.js`, because the
// generated form cannot emit comments or the non-standard `LLM-Content` style
// pointers, and this file has to say two things the metadata API has no field
// for: where the plain-text mirrors live, and that the named AI crawlers are
// welcome deliberately rather than by omission.
//
// Answer engines crawl with their own agents, and several of them are not the
// agent that trains the model. GPTBot gathers training data for OpenAI;
// OAI-SearchBot builds the index ChatGPT search cites from; ChatGPT-User is a
// live fetch made because someone asked a question just now. Anthropic,
// Perplexity, Google and Apple all draw the same distinction. A blanket
// `User-agent: *` technically permits all of them, but it states nothing, and
// several of these crawlers are measurably more conservative on a site that
// has not named them.
//
// Every bot below is allowed on purpose: being quoted by an assistant is what
// this site is for. The two exclusions are the same as they have always been —
// the API, and the /ask answers, which are generated per query and would open
// an unbounded space of near-duplicate URLs.

const AI_CRAWLERS = [
  // OpenAI — training, the ChatGPT search index, and live user-initiated fetches.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic.
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity — index and live fetch.
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini and AI Overviews grounding, which is separate from Googlebot.
  "Google-Extended",
  // Apple Intelligence and Siri.
  "Applebot",
  "Applebot-Extended",
  // Meta AI.
  "meta-externalagent",
  "FacebookBot",
  // DuckDuckGo's assistant.
  "DuckAssistBot",
  // Common Crawl, which most open-weight models are trained on.
  "CCBot",
  // Amazon, Mistral, Cohere, You.com, ByteDance, Diffbot, AI2.
  "Amazonbot",
  "MistralAI-User",
  "cohere-ai",
  "cohere-training-data-crawler",
  "YouBot",
  "Bytespider",
  "Diffbot",
  "Timpibot",
  "AI2Bot",
];

function group(userAgents) {
  return [
    ...userAgents.map((agent) => `User-agent: ${agent}`),
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
  ].join("\n");
}

export const dynamic = "force-static";

export function GET() {
  const body = [
    "# sarthaksavvy.com",
    "# Plain-text mirrors of every page, for LLMs and answer engines:",
    `#   ${SITE_URL}/llms.txt         — index of the site`,
    `#   ${SITE_URL}/llms-full.txt    — every page's content in one file`,
    `#   ${SITE_URL}/<page>.md        — markdown mirror of any page`,
    "",
    group(["*"]),
    "",
    "# AI assistants and answer engines are welcome, explicitly.",
    group(AI_CRAWLERS),
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
