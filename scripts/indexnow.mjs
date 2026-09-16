// Tells IndexNow which URLs changed, instead of waiting to be crawled.
//
// Bing, Yandex, Naver and Seznam share one IndexNow endpoint, and Bing's index
// is what Copilot and several smaller assistants answer from — so a page that
// Bing has not fetched yet is a page those assistants cannot cite, however good
// its markup is. Organic discovery of a small site takes days to weeks; a ping
// here is usually minutes. Google does not participate, which is why this
// supplements the sitemap rather than replacing it.
//
// Run after deploying a content change:
//
//   npm run indexnow
//
// The key file must be reachable at the URL below before a submission is
// accepted — that is how the endpoint verifies the submitter controls the host.

const HOST = "sarthaksavvy.com";
const KEY = "f01811ec9e2ab6eec70f823c45fa7d65";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Only routes.js, never the content layer. This runs under plain Node, which
// cannot load app/content/markdown.js: it imports trainings.json without an
// import attribute and uses extensionless relative imports, both of which
// only webpack resolves — so importing it here crashed the script before it
// sent anything.
//
// Nothing is lost by deriving the mirror URLs from the routes instead.
// markdown.js throws at build time if any route in routes.js has no mirror,
// and every mirror's slug is `markdownSlug(path)` — the helper routes.js holds
// precisely so that Node-loaded callers like this one never need markdown.js.
const { indexableRoutes, markdownSlug } = await import("../app/routes.js");

// Both the HTML pages and their markdown mirrors: the mirrors are real,
// crawlable URLs and benefit from the same nudge.
const urlList = [
  ...indexableRoutes.map((route) => `https://${HOST}${route.path === "/" ? "" : route.path}`),
  ...indexableRoutes.map((route) => `https://${HOST}/${markdownSlug(route.path)}.md`),
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
];

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 and 202 both mean accepted; 422 usually means the key file is not
// reachable yet, which is the one failure worth calling out by name.
console.log(`IndexNow responded ${response.status} for ${urlList.length} URLs`);
if (response.status === 422) {
  console.log(`Check that ${KEY_LOCATION} is live and contains exactly the key.`);
}
if (!response.ok && response.status !== 202) process.exitCode = 1;
