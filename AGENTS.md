# AGENTS.md

Guidance for AI agents working in this repository. Read this before changing anything.

This is the personal site of Sarthak Shrivastava — Next.js 15 (App Router), React 18,
JavaScript (no TypeScript), Tailwind 3, framer-motion. It is a marketing and
credibility site, not an app: most of what matters here is what the pages *say* and
whether machines can read it correctly.

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build — run this before declaring work done
npm run lint     # ESLint; see the warning below
npm run indexnow # ping IndexNow after a content change ships
```

`next.config.mjs` sets `eslint.ignoreDuringBuilds: true`, so **lint problems do not
fail the build**. A passing `npm run build` is not evidence that lint is clean. Run
`npm run lint` yourself on any file you touch.

A clean lint is not evidence of clean code either. `.eslintrc.json` extends only
`next/core-web-vitals`, which does not enable `no-unused-vars` — an unused import or
variable passes lint silently. When you move or delete code, check for imports and
components left with no remaining user (`grep` for the symbol).

**Do not run `next build` or `rm -rf .next` while `next dev` is running.** They share
`.next/`, and a build in the working tree corrupts the dev server's output and produces
misleading build errors. To check a production build, build an isolated copy of the
repo instead.

## The rule that matters most: facts live in one place

`app/content/profile.js` is the single source of truth for every claim about the
person this site is about — roles, credentials, statistics, location, social
profiles. Three consumers read from it and **must never disagree**:

1. the rendered pages (`app/**/page.js`)
2. the schema.org graph (`app/structuredData.js`)
3. the markdown / `llms.txt` mirrors that answer engines read instead of the HTML
   (`app/content/markdown.js`, `app/llms.txt/route.js`)

When a crawler, an LLM and a visitor are each handed a slightly different version of
"how many subscribers" or "which certifications", the model cannot tell which is
current — so it picks one at random or declines to state any of them.

Consequences for you:

- **Never hardcode a fact into a page.** Import it from the content layer.
- **Never state a claim the site does not already support.** Facts invented for the
  benefit of a crawler are the fastest way to lose the citation they were meant to win.
- **A credential badge or "verify" link must point at the issuer's own record** —
  Credly, Docker's contributor directory — never at a page on this site.
- When you change a fact, grep for its prose restatements. The same certification is
  named in `profile.js`, `faqs.js`, `consulting.js`, `llms.txt/route.js` and the
  page copy; changing only the data object leaves the site contradicting itself.

The same single-source rule governs routes: `app/routes.js` holds `indexableRoutes`,
read by the sitemap, the markdown mirrors and the llms.txt index. A new page is
registered there, once.

## Adding or changing a page

Every indexable page carries four things. Missing any one of them is a bug:

1. `metadata` built with `pageMetadata()` from `app/seo.js` — canonical, OpenGraph
   and Twitter tags all derive from there.
2. A `<JsonLd>` node built from the helpers in `app/structuredData.js`.
3. An entry in `indexableRoutes` in `app/routes.js`.
4. A markdown mirror entry in `app/content/markdown.js`.

`updated` in `indexableRoutes` is the date that page's **content** changed, not the
deploy date. Bump it when you change what the page says; leave it alone for a CSS
tweak. A lastmod that fires for everything carries no information.

## Design tokens

Use the Tailwind theme colors, never raw hex: `paper`, `ink`, `muted`, `line`,
`accent`, `accentText`, `accent2`.

`accent` (#FF5A1F) and `accentText` (#C23300) are **not interchangeable**, and the
distinction is a contrast fix, not a preference:

- `accent` is a **surface and icon** color — `bg-accent`, list markers, icons. It has
  to stay bright because `ink` text on it only clears WCAG AA *because* it is light.
- `accentText` is the same hue darkened to 5.03:1 on `paper`, for **anything read as
  text**: inline links, italic flourish words in headlines, eyebrows, stat values.

`muted` is secondary **text** only — never a background or a border. It usually lands
on 12px uppercase mono with wide tracking, which is the least forgiving shape small
text takes; it was darkened specifically to clear AA there.

Read the comments in `tailwind.config.js` before adjusting any of these.

## Images

- Everything under `/public/images` renders through `next/image`. Prefer the
  `ClientImage` wrapper (`app/components/ClientImage.js`) — it handles load errors with
  a text fallback instead of a broken-image icon.
- An image shown at one **fixed** size (a card, a badge) takes explicit `width` and
  `height` and no `sizes` — Next then emits just 1x and 2x candidates. Do not use
  `fill` with a pixel `sizes` like `sizes="256px"`: a `sizes` value with no `vw` in it
  makes Next emit every width from 16w to 3840w, which on the home page strip was
  227KB of srcset markup. Reserve `fill` + a `vw`-based `sizes` for images whose
  rendered width genuinely varies with the viewport.
- `next.config.mjs` sets a long `minimumCacheTTL`; these are static assets, treat them
  as such.

## Content Security Policy

`next.config.mjs` defines a strict CSP. `img-src` is `'self' data:` and `script-src`
allows only Google Tag Manager. **Any new third-party script, font, image host or
fetch target requires editing the CSP** — and remote images additionally need
`images.remotePatterns`. A resource blocked by CSP fails silently in production while
working in dev. If you add an external asset and cannot update the policy, download
the asset into `/public` instead.

## Code style

- **Comments explain why, not what.** This codebase documents the reasoning and often
  the specific bug a line prevents — see `tailwind.config.js`, `app/routes.js`,
  `app/content/profile.js`. Match that density when you touch those files. Do not add
  narration comments (`// map over the array`) to ordinary code.
- No TypeScript. Plain `.js` with JSDoc where a shape needs explaining.
- `"use client"` only where a component genuinely needs browser APIs or state. Pages
  are server components by default; keep data fetching there.
- Shared UI belongs in `app/components/` (`content/` for answer-engine blocks,
  `motion/` for animation primitives). Check for an existing component before writing
  a new one — there is already a scroller (`HorizontalScroller`), a lightbox, a reveal,
  a section heading, a credential card and an image wrapper. A strip of plain
  `{ src, href, label, sublabel }` items should use the scroller's built-in card rather
  than re-implementing it in `renderItem`.

## Accessibility

- Decorative images take `alt=""`. An image whose adjacent text already names it is
  decorative — duplicating the name makes a screen reader say it twice.
- Interactive elements need a discernible accessible name, and anything that animates
  should respect `prefers-reduced-motion` (see `app/components/motion/`).
- Do not regress the contrast decisions recorded in `tailwind.config.js`.

## Verifying your work

Do not ask the user to check the browser for you. Run the dev server, load the page,
and confirm the change — including at ~375px width, where the hero and the scrollers
use different layouts than desktop. Then run `npm run build`.

Check layout at more than one window **height**, not just width. A value that only
looks right at one viewport size is a coupling waiting to break. The hero used to pin
its portrait with `lg:absolute` and hold the section open with a hand-tuned
`min-h-[…vh]`; it matched the photo at exactly one window height and opened a band of
empty space (or overlapped the next section) at every other. Prefer normal flow —
grid columns, `order`, `display: contents` — over absolute positioning plus a magic
number.
