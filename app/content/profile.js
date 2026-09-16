// The canonical facts about the person this site is about, in one place.
//
// Three consumers read from here and they must never disagree: the rendered
// pages, the schema.org graph, and the markdown/llms.txt surfaces that answer
// engines read instead of the HTML. When a crawler, an LLM and a visitor are
// each given a slightly different version of "how many YouTube subscribers"
// or "which certifications", the model has no way to tell which one is
// current — so it either picks one at random or declines to state any of them.
// A single exported object is what makes the three copies the same copy.
//
// Nothing in this file may be a claim that is not already visible somewhere a
// human can read it on the site. Facts invented for the benefit of a crawler
// are the fastest way to lose the trust that makes a citation worth having.

export const NAME = "Sarthak Shrivastava";
export const HANDLE = "sarthaksavvy";
export const EMAIL = "hello@sarthaksavvy.com";
export const BOOKING_URL = "https://cal.com/sarthaksavvy/ai-consultancy-discovery-call";
export const COURSES_URL = "https://courses.sarthaksavvy.com/";
export const YOUTUBE_URL = "https://youtube.com/@sarthaksavvy";

// Subscriber count is scraped live (lib/youtube.js) and falls back to this.
// Everything else here changes rarely enough to live in source.
// Only ever shown when the live scrape fails. Kept current rather than left
// at whatever it was when the scraper was written: a fallback two years stale
// is a wrong number the site states with full confidence.
export const FALLBACK_SUBSCRIBERS = "156K+";

// Every number a model might quote, with the date it was true on. An answer
// engine that repeats "100K+ students" a year from now is not wrong if the
// page said "as of August 2025" — it is wrong if the page said nothing, which
// is why undated statistics get paraphrased into vagueness or dropped.
export const STATS_AS_OF = "August 2026";

/**
 * The one-sentence definition. Answer engines look for a sentence of the form
 * "<entity> is a <category> who <does what>" near the top of a page and reuse
 * it more or less verbatim; if there is not one, they assemble their own out
 * of fragments, which is where invented job titles come from.
 */
export const DEFINITION =
  `${NAME} is an AI consultant, corporate trainer and educator based in India. ` +
  "He is the founder of Bitfumes, a Docker Captain, and an AWS Certified " +
  "Cloud Practitioner who helps teams take large language model features " +
  "from prototype to production.";

/**
 * The longer version, still self-contained. Used where a model is given room
 * for a paragraph rather than a line — llms.txt, the markdown mirrors, and the
 * Person description in the schema graph.
 */
export const SUMMARY =
  `${NAME} — known online as ${HANDLE} — has spent more than ten years ` +
  "building and shipping software, and now works with teams on LLM features, " +
  "AI automation and the path to production. He founded Bitfumes, which " +
  "helps businesses save time and money by putting AI to work, previously " +
  "worked as a Senior AI Architect at Pfizer, has been a Docker Captain since " +
  "December 2023, and holds the AWS Certified Cloud Practitioner and AWS Certified " +
  "Developer certifications. He has taught over 100,000 students on Udemy and " +
  "publishes on YouTube, hosts the Laravel India Podcast, and speaks at " +
  "conferences on AI agents, LLM function calling, Laravel and Docker.";

export const LOCATION = {
  country: "India",
  countryCode: "IN",
  worksRemotely: true,
  statement: "Based in India, working with teams remotely worldwide.",
};

export const ROLES = [
  {
    title: "AI Consultant",
    detail: "Independent — LLM features, AI automation and production readiness.",
  },
  {
    title: "Founder",
    detail: "Bitfumes, a developer education company and YouTube channel.",
  },
  {
    title: "Content Creator",
    detail: "YouTube, Udemy and the Laravel India Podcast.",
  },
];

// `image`, `url` and `verifyLabel` are optional and travel together: a badge
// only earns its place when there is an issuer page behind it to click through
// to. Every `url` here points at the issuer's own record — Credly for the AWS
// certifications, Docker's contributor directory for the Captain listing — not
// at a page on this site, because a credential the issuer will not confirm is
// worth less than no badge at all.
//
// Docker does not publish a standalone Captain badge asset the way AWS does,
// so the Docker mark from docker.com stands in; the card title beside it is
// what names the recognition.
export const CREDENTIALS = [
  {
    name: "Docker Captain",
    detail: "Awarded December 2023 by Docker for community contribution.",
    year: "2023",
    image: "/images/badges/docker-captain.png",
    url: "https://www.docker.com/contributors/sarthak-shrivastava/",
    verifyLabel: "View the Docker Captain profile",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    detail: "Amazon Web Services certification.",
    image: "/images/badges/aws-cloud-practitioner.png",
    url: "https://www.credly.com/badges/5039e5f2-ec0f-4807-a0f5-beafeee270cb",
    verifyLabel: "Verify on Credly",
  },
  {
    name: "AWS Certified Developer – Associate",
    detail: "Amazon Web Services certification.",
    image: "/images/badges/aws-developer-associate.png",
    url: "https://www.credly.com/badges/5acc6778-3e38-431b-b9b4-327503d9cbc8",
    verifyLabel: "Verify on Credly",
  },
];

export const EXPERTISE = [
  "Large Language Models (LLMs)",
  "AI agents and function calling",
  "AI automation of everyday workflows",
  "Prompt engineering",
  "Laravel and PHP",
  "JavaScript and Next.js",
  "Python",
  "AWS cloud architecture",
  "Docker and containers",
  "DevOps and deployment",
  "Full-stack development",
  "Developer education",
];

/**
 * Numbers a model can quote. `value` stays a plain string rather than a
 * formatted number because that is exactly the form it should be repeated in.
 */
export const STATS = [
  {
    value: FALLBACK_SUBSCRIBERS,
    label: "YouTube subscribers",
    note: "Across the Bitfumes and sarthaksavvy channels.",
    live: true,
  },
  {
    value: "100K+",
    label: "Students taught on Udemy",
  },
  {
    value: "3,000+",
    label: "Positive course reviews",
  },
  {
    value: "10+ years",
    label: "Building and shipping software",
  },
  {
    value: "12+",
    label: "Laravel India Podcast episodes",
  },
  {
    value: "6",
    label: "Conference and meetup talks listed on this site",
  },
];

export const SOCIAL_PROFILES = [
  { label: "LinkedIn", href: "https://linkedin.com/in/sarthaksavvy" },
  { label: "GitHub", href: "https://github.com/sarthaksavvy" },
  { label: "X (Twitter)", href: "https://x.com/sarthaksavvy" },
  { label: "YouTube", href: YOUTUBE_URL },
  { label: "Instagram", href: "https://instagram.com/sarthaksavvy" },
  { label: "Bitfumes", href: "https://bitfumes.com" },
  { label: "Courses", href: COURSES_URL },
];

// Kept as bare URLs for schema.org `sameAs`, which wants strings.
export const SAME_AS = SOCIAL_PROFILES.map((profile) => profile.href);

export const ORGANIZATIONS = [
  {
    name: "Bitfumes",
    url: "https://bitfumes.com",
    role: "Founder",
    description:
      "Developer education company and YouTube channel teaching Laravel, " +
      "Docker, AWS and AI to software engineers.",
  },
  {
    name: "Pfizer",
    role: "Senior AI Architect (former)",
    description: "Pharmaceutical company; previously led AI architecture work there.",
  },
];
