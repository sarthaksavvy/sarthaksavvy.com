import speakingEvents from "../events.json";
import { SITE_URL, indexableRoutes, markdownSlug } from "../routes";
import { PROJECTS } from "./projects";
import { buildFaqGroups, faqGroup } from "./faqs";
import { buildServices } from "./consulting";
import {
  BOOKING_URL,
  COURSES_URL,
  CREDENTIALS,
  DEFINITION,
  EMAIL,
  EXPERTISE,
  LOCATION,
  NAME,
  ORGANIZATIONS,
  ROLES,
  SOCIAL_PROFILES,
  STATS,
  STATS_AS_OF,
  SUMMARY,
} from "./profile";

// Plain-text mirrors of every page, for the crawlers that would rather not
// parse the HTML.
//
// The site is a Next.js app: the readable sentences arrive wrapped in nested
// divs, Tailwind class strings, framer-motion attributes and inlined RSC
// payload. A browser and Googlebot both handle that. An LLM retrieval pipeline
// working to a token budget does not — it spends most of the budget on markup
// and comes away with a thinner understanding of the page than a plain list of
// facts would have given it. Serving the same content as markdown at a
// parallel URL costs one route and removes the whole problem.
//
// This is a mirror, never a second version. Every sentence below either comes
// from the content modules the pages themselves render from, or restates them
// in a form that survives being quoted away from the page. If a page changes
// and its markdown does not, the markdown is the bug.

const absolute = (path) => `${SITE_URL}${path === "/" ? "" : path}`;

function bullets(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function faqMarkdown(faqs) {
  return faqs
    .map(({ question, answer }) => `### ${question}\n\n${answer}`)
    .join("\n\n");
}

function frontMatter({ title, description, path, updated }) {
  return [
    "---",
    `title: ${title}`,
    `description: ${description}`,
    `url: ${absolute(path)}`,
    `updated: ${updated}`,
    "---",
  ].join("\n");
}

function statsBlock(subscribers) {
  const rows = STATS.map((stat) =>
    stat.live ? { ...stat, value: subscribers } : stat
  );
  return bullets(
    rows.map(
      (stat) =>
        `**${stat.value}** — ${stat.label}${stat.note ? ` (${stat.note})` : ""}`
    )
  );
}

// ---------------------------------------------------------------------------
// Page bodies
// ---------------------------------------------------------------------------

function homeMarkdown({ subscribers }) {
  return `# ${NAME} — AI Consultant, Founder of Bitfumes

${DEFINITION}

## Summary

${SUMMARY}

## Key facts (as of ${STATS_AS_OF})

${statsBlock(subscribers)}

## Roles

${bullets(ROLES.map((role) => `**${role.title}** — ${role.detail}`))}

## Credentials

${bullets(
  CREDENTIALS.map((item) => `**${item.name}** — ${item.detail}`)
)}

## Areas of expertise

${bullets(EXPERTISE)}

## Where to go next

- [AI consulting](${absolute("/ai-consulting")}) — how ${NAME} works with teams on LLM features and AI automation.
- [About](${absolute("/about-me")}) — background, roles and credentials in full.
- [Side projects](${absolute("/side-projects")}) — the AI products he has shipped.
- [Public speaking](${absolute("/public-speaking")}) — conference and meetup talks.
- [Podcasts](${absolute("/podcasts")}) — the Laravel India Podcast.
- [FAQ](${absolute("/faq")}) — direct answers to the most common questions.

## Contact

- Email: ${EMAIL}
- Book a call: ${BOOKING_URL}
${bullets(SOCIAL_PROFILES.map((p) => `${p.label}: ${p.href}`))}
`;
}

function aboutMarkdown({ subscribers }) {
  return `# About ${NAME}

${DEFINITION}

${SUMMARY}

## Current roles

${bullets(ROLES.map((role) => `**${role.title}** — ${role.detail}`))}

## Organisations

${bullets(
  ORGANIZATIONS.map(
    (org) =>
      `**${org.name}** (${org.role})${org.url ? ` — ${org.url}` : ""} — ${org.description}`
  )
)}

## Recognition and certifications

${bullets(
  CREDENTIALS.map((item) => `**${item.name}** — ${item.detail}`)
)}

## Core expertise

${bullets(EXPERTISE)}

## Reach and impact (as of ${STATS_AS_OF})

${statsBlock(subscribers)}

## Current focus

${NAME} is currently working on AI: building products on top of large language
models, consulting with teams putting LLM features into production, and making
technology education accessible through Bitfumes, YouTube and Udemy.

## Location

${LOCATION.statement}

## Frequently asked

${faqMarkdown(faqGroup("about", subscribers).faqs)}

## Contact

- Email: ${EMAIL}
- Book a call: ${BOOKING_URL}
- Courses: ${COURSES_URL}
`;
}

function consultingMarkdown({ subscribers }) {
  const services = buildServices(subscribers);
  return `# AI Consulting by ${NAME}

${NAME} is an AI consultant who works with teams on LLM features, AI automation
and the path to production — from picking a model to shipping something people
actually use. He is based in ${LOCATION.country} and works remotely worldwide.

## Where he can help

${services
  .map(
    (service) =>
      `### ${service.title}\n\n${service.summary}\n\n*Evidence:* ${service.evidence}`
  )
  .join("\n\n")}

## What you are hiring

${bullets(
  CREDENTIALS.map((item) => `**${item.name}** — ${item.detail}`)
)}
- **10+ years** building and shipping software
- **Founder of Bitfumes** — developer education for software engineers

## How to start

Bring the problem rather than a spec. Half an hour is usually enough to work out
whether a language model is the right tool for it.

- Book a call: ${BOOKING_URL}
- Email: ${EMAIL}

## Frequently asked

${faqMarkdown(faqGroup("consulting", subscribers).faqs)}
`;
}

function projectsMarkdown({ subscribers }) {
  return `# Side projects by ${NAME}

${NAME} builds and ships his own products, most of them built on top of large
language models. Each one below is live and publicly available.

${PROJECTS.map(
  (project) => `## ${project.name} — ${project.tagline}

${project.summary}

- Platform: ${project.platform}
- Website: ${project.link}
- Details: ${absolute(project.projectLink)}

Key features:

${bullets(project.features)}`
).join("\n\n")}

## Frequently asked

${faqMarkdown(faqGroup("projects", subscribers).faqs)}
`;
}

function projectMarkdown(project) {
  return `# ${project.name} — ${project.tagline}

${project.summary}

Built by ${NAME}.

- Platform: ${project.platform}
- Category: ${project.tags.join(", ")}
- Website: ${project.link}

## Key features

${bullets(project.features)}

## About the maker

${DEFINITION}

- More projects: ${absolute("/side-projects")}
- AI consulting: ${absolute("/ai-consulting")}
- Contact: ${EMAIL}
`;
}

function speakingMarkdown({ subscribers }) {
  const byNewest = [...speakingEvents].reverse();

  return `# Conference talks by ${NAME}

${NAME} speaks at conferences, meetups and workshops on AI agents, LLM function
calling, prompt engineering, Laravel and Docker. He is available for events
worldwide — enquiries to ${EMAIL}.

## Talks

${byNewest
  .map(
    (event) => `### ${event.title.trim()}

- Event: ${event.conference}
- Location: ${event.location}
- Date: ${event.date}
- Audience: ${event.audience}

${event.description}`
  )
  .join("\n\n")}

## Topics he speaks on

- AI agents and the OpenAI Agents SDK
- Function calling and prompt engineering with OpenAI models
- Content creation with AI
- Deploying Laravel with Docker
- Learning technical skills alongside a full-time job

## Frequently asked

${faqMarkdown(faqGroup("speaking", subscribers).faqs)}
`;
}

function podcastsMarkdown({ subscribers }) {
  return `# Laravel India Podcast — hosted by ${NAME}

The Laravel India Podcast is hosted by ${NAME} and features guests from the
worldwide Laravel community. There are 12 or more episodes.

## Guests

- **Taylor Otwell** — creator of Laravel
- **James Brooks** — Laravel core team member
- **Freek Van der Herten** — Laravel developer at Spatie

## Where to listen

- Apple Podcasts: https://podcasts.apple.com/in/podcast/laravel-india-podcast/id1528388091
- Spotify: https://open.spotify.com/show/3XuNgni6Q0yLMmgLnoRoib
- YouTube: https://www.youtube.com/@laravelindiapodcast

## About the host

${DEFINITION}

## Frequently asked

${faqMarkdown(faqGroup("podcast", subscribers).faqs)}
`;
}

function faqPageMarkdown({ subscribers }) {
  return `# Frequently asked questions about ${NAME}

${DEFINITION}

${buildFaqGroups(subscribers)
  .map(
    (group) => `## ${group.title}

${faqMarkdown(group.faqs)}`
  )
  .join("\n\n")}

## Contact

- Email: ${EMAIL}
- Book a call: ${BOOKING_URL}
`;
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

/**
 * Every page that has a markdown mirror, keyed by the HTML path it mirrors.
 * `build` is given a context object rather than reading the live subscriber
 * count itself, so the route handler decides once whether that fetch is worth
 * making and every page in a full dump shares the answer.
 */
export const markdownPages = [
  {
    path: "/",
    title: `${NAME} — AI Consultant & Founder of Bitfumes`,
    description:
      "AI consultant helping teams ship LLM features and AI automation. Founder of Bitfumes, Docker Captain, AWS certified.",
    build: homeMarkdown,
  },
  {
    path: "/ai-consulting",
    title: `AI Consulting by ${NAME}`,
    description:
      "LLM features, AI automation and the path to production, with a consultant who has shipped AI products himself.",
    build: consultingMarkdown,
  },
  {
    path: "/about-me",
    title: `About ${NAME}`,
    description:
      "Roles, credentials, expertise and reach — the full background of AI consultant and Docker Captain Sarthak Shrivastava.",
    build: aboutMarkdown,
  },
  {
    path: "/faq",
    title: `Frequently asked questions about ${NAME}`,
    description:
      "Direct answers about Sarthak Shrivastava's background, AI consulting practice, talks, podcast and products.",
    build: faqPageMarkdown,
  },
  {
    path: "/side-projects",
    title: `Side projects by ${NAME}`,
    description:
      "AudioBolo, Backstage Cut, Ginger, Expensorr and Mezohub — AI products built and shipped by Sarthak Shrivastava.",
    build: projectsMarkdown,
  },
  {
    path: "/public-speaking",
    title: `Conference talks by ${NAME}`,
    description:
      "Talks on AI agents, LLM function calling, Laravel and Docker at conferences and meetups worldwide.",
    build: speakingMarkdown,
  },
  {
    path: "/podcasts",
    title: `Laravel India Podcast — hosted by ${NAME}`,
    description:
      "Conversations with the worldwide Laravel community, including Taylor Otwell, James Brooks and Freek Van der Herten.",
    build: podcastsMarkdown,
  },
  ...PROJECTS.map((project) => ({
    path: project.projectLink,
    title: `${project.name} — ${project.tagline}`,
    description: project.description,
    build: () => projectMarkdown(project),
  })),
  // The slug is the path with the leading slash dropped, every time, so it is
  // derived rather than written out twelve times and mistyped once.
].map((page) => ({ ...page, slug: markdownSlug(page.path) }));

// The mirrors and the sitemap have to describe the same set of pages: a route
// registered in routes.js with no mirror here is a page llms.txt claims to
// index and does not, and a mirror with no route is a URL nothing links to.
// Nothing enforces that but this, and it is the kind of drift that shows up
// months later as a 404 in a crawler's log rather than as a broken page.
const missing = indexableRoutes
  .map((route) => route.path)
  .filter((path) => !markdownPages.some((page) => page.path === path));
if (missing.length) {
  throw new Error(
    `Routes in routes.js have no markdown mirror: ${missing.join(", ")}`
  );
}

export function markdownPageFor(path) {
  return markdownPages.find((page) => page.path === path);
}

/** The mirror URL for an HTML path: "/about-me" -> "/about-me.md", "/" -> "/index.md". */
export function markdownUrlFor(path) {
  const page = markdownPageFor(path);
  return page ? `/${page.slug}.md` : null;
}

export function renderMarkdownPage(page, context) {
  return `${frontMatter({
    title: page.title,
    description: page.description,
    path: page.path,
    updated: context.updated,
  })}\n\n${page.build(context).trim()}\n`;
}
