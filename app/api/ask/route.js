import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import { getSubscriberCount } from "../../../lib/youtube";
import { buildServices, credentials } from "../../content/consulting";

const SITE_URL = "https://sarthaksavvy.com";
// Pinned deliberately: the "~...-latest" alias resolves to a snapshot served by
// a slower provider pool (13-66s vs 5-7s in benchmarks).
const MODEL = "deepseek/deepseek-v4-flash";

// Ceiling only — the model is told to match answer length to the question, and
// unused headroom costs nothing. Detail-seeking questions get the wider cap.
const MAX_TOKENS_DEFAULT = 1000;
const MAX_TOKENS_DETAILED = 1600;
const DETAIL_PATTERN =
  /\b(list|all|every|each|compare|difference|walk me through|step by step|in detail|detailed|explain|breakdown|elaborate|tell me (about|everything))\b/i;

// Kept in step with the `maxLength` on both question inputs in the UI.
const MAX_QUESTION_LENGTH = 1000;

// The browser gives up on a request after 45s. Without a matching ceiling here
// the model call outlives the reader it was for and still bills for the
// tokens it produces, so it is cut off with enough margin for the response to
// travel back. One retry rather than the SDK's default of two, for the same
// reason: three sequential 35s attempts cannot fit inside the client's budget,
// so the later ones can only cost money.
const LLM_TIMEOUT_MS = 35000;
const LLM_MAX_RETRIES = 1;

function maxTokensFor(question) {
  return DETAIL_PATTERN.test(question)
    ? MAX_TOKENS_DETAILED
    : MAX_TOKENS_DEFAULT;
}

// Built per request rather than once at module scope. The SDK constructor
// throws when it cannot find a key, and at build time there is no key to find
// — which made `next build` fail while collecting this route unless the
// environment happened to carry OPENROUTER_API_KEY. It also meant the missing
// key check further down could never run, because the module blew up before
// the handler was ever reached.
function openrouterClient() {
  return new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    maxRetries: LLM_MAX_RETRIES,
    defaultHeaders: {
      "HTTP-Referer": SITE_URL,
      "X-Title": "Ask About Sarthak",
    },
  });
}

const CACHE_TTL = 1000 * 60 * 60; // 1 hour
// When every page fetch failed there is nothing worth keeping for an hour, so
// the stand-in profile is cached only long enough to absorb a burst of
// questions before the crawl is worth attempting again.
const DEGRADED_CACHE_TTL = 1000 * 60 * 2;

let contentCache = {
  data: null,
  timestamp: 0,
  ttl: CACHE_TTL,
};

// Set while a crawl is running so that concurrent questions arriving at a cold
// instance wait on the one crawl instead of each starting their own.
let inFlightScrape = null;

function linkedinContent(subscribers) {
  return `
=== LinkedIn Profile Information ===
Sarthak Shrivastava (sarthaksavvy) is a full-stack developer, Docker Captain, and founder of Bitfumes.
He works as a Software Engineer at Pfizer and is a content creator with ${subscribers} YouTube subscribers and 100K+ Udemy students.
His expertise includes Laravel, JavaScript, Python, AWS, Docker, AI/LLMs, and he's passionate about building and automating daily tasks.
LinkedIn: https://linkedin.com/in/sarthaksavvy
`;
}

function fallbackContent(subscribers) {
  const services = buildServices(subscribers)
    .map((service) => `- ${service.title}: ${service.summary}`)
    .join("\n");
  const creds = credentials.map((c) => `- ${c.value}: ${c.label}`).join("\n");

  return `
=== Fallback Information about Sarthak Shrivastava ===
Sarthak Shrivastava is an India-based founder, content creator, developer and AI consultant passionate about building and automating daily tasks.

Professional Background:
- Founder of Bitfumes
- Software Engineer at Pfizer
- Docker Captain
- Content Creator with ${subscribers} YouTube subscribers
- 100K+ Udemy students

Core Expertise:
- Laravel, JavaScript, Python
- AWS, Docker, AI/LLMs
- Full-stack development
- Content creation and education

AI Consulting Services:
${services}

Credentials:
${creds}

Contact:
- Website: https://sarthaksavvy.com
- LinkedIn: https://linkedin.com/in/sarthaksavvy
- YouTube: https://youtube.com/@sarthaksavvy
- Email: hello@sarthaksavvy.com
- Courses: https://courses.sarthaksavvy.com/

Side Projects:
- Mezohub: A centralized platform for connecting developers, designers, and entrepreneurs
- Expensorr: A simple yet powerful expense tracking application
- Various other innovative projects showcasing technical skills
`;
}

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 10;
// One warm instance can be reached by an unbounded number of distinct clients
// over its lifetime, and nothing was ever removed from the store — so it grew
// by one entry per address, for as long as the instance lived. Expired entries
// are now swept, and this is the backstop for the case where they are all
// still inside the window.
const RATE_LIMIT_MAX_KEYS = 10000;

const rateLimitStore = new Map();

async function scrapeWebsiteContent() {
  const now = Date.now();

  const pages = [
    "/",
    "/ai-consulting",
    "/about-me",
    "/side-projects",
    "/public-speaking",
    "/podcasts",
    "/faq",
  ];

  const scrapePromises = pages.map(async (page) => {
    try {
      const response = await axios.get(`${SITE_URL}${page}`, {
        timeout: 8000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      const $ = cheerio.load(response.data);

      $("script, style, nav, header, footer").remove();

      const pageContent = $("body")
        .text()
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 2000);

      if (pageContent) {
        return `\n\n=== Content from ${SITE_URL}${page} ===\n${pageContent}`;
      }
      return "";
    } catch (pageError) {
      console.error(`Error scraping ${page}:`, pageError.message);
      return "";
    }
  });

  const results = await Promise.allSettled(scrapePromises);
  const scrapedContent = results
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value)
    .join("");

  const subscribers = await getSubscriberCount();

  // The static profile below used to sit in a `catch` that could not fire:
  // `Promise.allSettled` never rejects and every fetch already had its own
  // `try`, so a site-wide outage produced an empty crawl rather than an error.
  // The model was then handed the three-line LinkedIn blurb and nothing else,
  // and that was cached for an hour.
  if (!scrapedContent) {
    console.error("All page scrapes failed; serving the static profile");
    const fallback = fallbackContent(subscribers);
    contentCache = {
      data: fallback,
      timestamp: now,
      ttl: DEGRADED_CACHE_TTL,
    };
    return fallback;
  }

  const finalContent = scrapedContent + linkedinContent(subscribers);

  contentCache = {
    data: finalContent,
    timestamp: now,
    ttl: CACHE_TTL,
  };

  return finalContent;
}

function getWebsiteContent() {
  const now = Date.now();

  if (contentCache.data && now - contentCache.timestamp < contentCache.ttl) {
    return Promise.resolve(contentCache.data);
  }

  if (!inFlightScrape) {
    inFlightScrape = scrapeWebsiteContent().finally(() => {
      inFlightScrape = null;
    });
  }

  return inFlightScrape;
}

function getRateLimitKey(request) {
  // `request.ip` is filled in by the host from the connection itself, so it is
  // preferred over anything the caller can put in a header. The headers are
  // the fallback for a deployment sitting behind its own proxy, and only
  // `x-forwarded-for` was consulted before.
  //
  // The last resort is still a single shared bucket, which throttles unrelated
  // visitors together — but a quota that protects paid calls should fail
  // closed, so an unidentifiable client is limited rather than exempt.
  const forwarded = request.headers.get("x-forwarded-for");
  const forwardedClient = forwarded ? forwarded.split(",")[0].trim() : "";

  return (
    request.ip ||
    request.headers.get("x-real-ip") ||
    forwardedClient ||
    "unknown"
  );
}

function pruneRateLimitStore(now) {
  for (const [key, timestamps] of rateLimitStore) {
    const newest = timestamps[timestamps.length - 1];
    if (newest === undefined || now - newest >= RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(key);
    }
  }

  // Everything left is still inside its window. Map iterates in insertion
  // order, so this drops the keys first seen — the ones whose windows are
  // closest to expiring anyway.
  for (const key of rateLimitStore.keys()) {
    if (rateLimitStore.size <= RATE_LIMIT_MAX_KEYS) break;
    rateLimitStore.delete(key);
  }
}

function isRateLimited(key) {
  const now = Date.now();

  if (rateLimitStore.size > RATE_LIMIT_MAX_KEYS) {
    pruneRateLimitStore(now);
  }

  const recent = (rateLimitStore.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    // Written back so the entry shrinks as its window slides, rather than
    // holding every timestamp ever recorded for a client that keeps trying.
    rateLimitStore.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(key, recent);

  return false;
}

function sanitizeInput(input) {
  if (typeof input !== "string") return "";

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .substring(0, MAX_QUESTION_LENGTH);
}

export async function POST(request) {
  try {
    let payload;
    try {
      payload = await request.json();
    } catch (parseError) {
      // Previously this threw past every check below and came back as a 500,
      // which reads as "the site is broken" for what is a malformed request.
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const rawQuestion =
      typeof payload?.question === "string" ? payload.question : "";

    if (!rawQuestion.trim()) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Checked against the raw input. The old check ran after sanitizing, which
    // had already truncated to the limit, so it could never be true and an
    // over-long question was silently cut in half instead of being refused.
    if (rawQuestion.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        {
          error: `Question too long. Please keep it under ${MAX_QUESTION_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    const sanitizedQuestion = sanitizeInput(rawQuestion);
    if (!sanitizedQuestion) {
      return NextResponse.json(
        { error: "Invalid question format" },
        { status: 400 }
      );
    }

    if (
      !process.env.OPENROUTER_API_KEY ||
      process.env.OPENROUTER_API_KEY === "your_openrouter_api_key_here"
    ) {
      return NextResponse.json(
        {
          error:
            "OpenRouter API key not configured. Please set a valid OPENROUTER_API_KEY environment variable.",
        },
        { status: 500 }
      );
    }

    // Checked last, and only for a request that is actually about to spend a
    // crawl and a paid model call. The quota exists to protect those; a typo
    // or a malformed body should not eat into a visitor's ten questions.
    if (isRateLimited(getRateLimitKey(request))) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait before asking another question.",
        },
        { status: 429 }
      );
    }

    const websiteContent = await getWebsiteContent();

    const systemPrompt = `You are an AI assistant that answers questions about Sarthak Shrivastava based on the provided information.

Here's what you know about Sarthak:
${websiteContent}

Instructions:
- Answer questions about Sarthak's background, projects, expertise, and professional journey
- Be conversational and helpful
- If asked about something not covered in the provided information, politely say you don't have that specific information
- Match the length of your answer to the question: a couple of sentences for a simple factual one, several paragraphs or a list when the question asks for detail, a comparison, or a walkthrough. Never pad an answer to fill space
- Use Markdown where it helps readability — bold for emphasis, bullet lists for enumerations, links for URLs
- Include relevant links when appropriate (website, LinkedIn, YouTube, etc.)
- Maintain a professional yet friendly tone
- If asked about contact information, direct them to his website or LinkedIn`;

    const completion = await openrouterClient().chat.completions.create(
      {
        model: MODEL,
        max_tokens: maxTokensFor(sanitizedQuestion),
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: sanitizedQuestion,
          },
        ],
      },
      { timeout: LLM_TIMEOUT_MS }
    );

    const answer =
      completion.choices[0]?.message?.content?.trim() ||
      "Sorry, I could not generate an answer at this time.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error processing question:", error);

    if (error.status === 429) {
      return NextResponse.json(
        { error: "OpenRouter rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        { error: "Invalid OpenRouter API key configuration." },
        { status: 500 }
      );
    }

    if (error.status === 402) {
      return NextResponse.json(
        { error: "OpenRouter credits exhausted. Please top up the account." },
        { status: 500 }
      );
    }

    if (
      error.name === "AbortError" ||
      error.name === "APIConnectionTimeoutError" ||
      error.code === "ECONNABORTED"
    ) {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 408 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Sorry, I could not process your question right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
