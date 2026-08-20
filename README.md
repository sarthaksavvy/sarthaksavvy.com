## SarthakSavvy portfolio website

This is a portfolio website for SarthakSavvy. It is a static website built with Next.js and Tailwind CSS.
If you want to see the website, you can visit https://sarthaksavvy.com.

### Running it

```bash
npm install
npm run dev
```

### Where the content lives

Anything a page states as fact comes from `app/content/`, not from the
component that renders it:

| File | Holds |
| --- | --- |
| `app/content/profile.js` | Who Sarthak is — roles, credentials, expertise, stats, links |
| `app/content/faqs.js` | Every question and answer, grouped by topic |
| `app/content/projects.js` | The five side projects |
| `app/content/consulting.js` | Consulting services and credentials |
| `app/content/markdown.js` | The plain-text mirror of each page |

The reason for the split is that four surfaces have to agree: the rendered
page, the schema.org graph, the markdown mirror at `<page>.md`, and `llms.txt`.
Editing a fact in one place updates all four. Editing the JSX instead updates
one and silently leaves the other three saying something else — which is worse
than saying nothing, because a model reading both has no way to tell which is
current.

**Adding a page** means registering it in `app/routes.js` *and* adding a
markdown builder in `app/content/markdown.js`. The build fails if you do only
the first, which is deliberate.

**Changing what a page says** means bumping that route's `updated` date in
`app/routes.js`. It feeds the sitemap's `lastmod` and the `dateModified` in the
page's schema, and both are worthless if they change on every deploy.

### Machine-readable surfaces

| URL | What it is |
| --- | --- |
| `/llms.txt` | Index of the site for LLMs, per llmstxt.org |
| `/llms-full.txt` | Every page's content in one file |
| `/<page>.md` | Markdown mirror of any page (`/index.md` for the home page) |
| `/robots.txt` | Names and allows each AI crawler explicitly |
| `/sitemap.xml` | Per-page `lastmod` from `routes.js` |

### After deploying a content change

```bash
npm run indexnow
```

Pings IndexNow so Bing, and the assistants that answer from Bing's index, pick
the change up in minutes rather than waiting to be crawled. Google does not
participate in IndexNow and finds changes through the sitemap instead.
