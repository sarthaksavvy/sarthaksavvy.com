import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

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

function maxTokensFor(question) {
  return DETAIL_PATTERN.test(question)
    ? MAX_TOKENS_DETAILED
    : MAX_TOKENS_DEFAULT;
}

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": SITE_URL,
    "X-Title": "Ask About Sarthak",
  },
});

const CACHE_TTL = 1000 * 60 * 60; // 1 hour
let contentCache = {
  data: null,
  timestamp: 0,
};

const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 10;

async function scrapeWebsiteContent() {
  const now = Date.now();
  if (contentCache.data && now - contentCache.timestamp < CACHE_TTL) {
    console.log("Returning cached content");
    return contentCache.data;
  }

  try {
    const baseUrl = "https://sarthaksavvy.com";
    const pages = [
      "/",
      "/about-me",
      "/side-projects",
      "/public-speaking",
      "/podcasts",
    ];

    let scrapedContent = "";
    const scrapePromises = pages.map(async (page) => {
      try {
        const response = await axios.get(`${baseUrl}${page}`, {
          timeout: 8000, // Reduced timeout
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
          return `\n\n=== Content from ${baseUrl}${page} ===\n${pageContent}`;
        }
        return "";
      } catch (pageError) {
        console.error(`Error scraping ${page}:`, pageError.message);
        return "";
      }
    });

    const results = await Promise.allSettled(scrapePromises);
    scrapedContent = results
      .filter((result) => result.status === "fulfilled" && result.value)
      .map((result) => result.value)
      .join("");

    const linkedinContent = `
=== LinkedIn Profile Information ===
Sarthak Shrivastava (sarthaksavvy) is a full-stack developer, Docker Captain, and founder of Bitfumes.
He works as a Software Engineer at Pfizer and is a content creator with 134K+ YouTube subscribers and 100K+ Udemy students.
His expertise includes Laravel, JavaScript, Python, AWS, Docker, AI/LLMs, and he's passionate about building and automating daily tasks.
LinkedIn: https://linkedin.com/in/sarthaksavvy
`;

    const finalContent = scrapedContent + linkedinContent;

    contentCache = {
      data: finalContent,
      timestamp: now,
    };

    console.log("Content scraped and cached successfully");
    return finalContent;
  } catch (error) {
    console.error("Error scraping content:", error);
    const fallbackContent = `
=== Fallback Information about Sarthak Shrivastava ===
Sarthak Shrivastava is an India-based founder, content creator, developer and AI consultant passionate about building and automating daily tasks.

Professional Background:
- Founder of Bitfumes
- Software Engineer at Pfizer
- Docker Captain
- Content Creator with 134K+ YouTube subscribers
- 100K+ Udemy students

Core Expertise:
- Laravel, JavaScript, Python
- AWS, Docker, AI/LLMs
- Full-stack development
- Content creation and education

Contact:
- Website: https://sarthaksavvy.com
- LinkedIn: https://linkedin.com/in/sarthaksavvy
- YouTube: https://youtube.com/bitfumes
- Email: sarthak@bitfumes.com
- Courses: https://bitfumes.com

Side Projects:
- Mezohub: A centralized platform for connecting developers, designers, and entrepreneurs
- Expensorr: A simple yet powerful expense tracking application
- Various other innovative projects showcasing technical skills
`;

    contentCache = {
      data: fallbackContent,
      timestamp: now,
    };

    return fallbackContent;
  }
}

function getRateLimitKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}

function isRateLimited(key) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(key) || [];

  const validRequests = userRequests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  validRequests.push(now);
  rateLimitStore.set(key, validRequests);

  return false;
}

function sanitizeInput(input) {
  if (typeof input !== "string") return "";

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .substring(0, 1000); // Enforce max length
}

export async function POST(request) {
  try {
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait before asking another question.",
        },
        { status: 429 }
      );
    }

    const { question } = await request.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const sanitizedQuestion = sanitizeInput(question);
    if (!sanitizedQuestion) {
      return NextResponse.json(
        { error: "Invalid question format" },
        { status: 400 }
      );
    }

    if (sanitizedQuestion.length > 1000) {
      return NextResponse.json(
        { error: "Question too long. Please keep it under 1000 characters." },
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

    const websiteContent = await scrapeWebsiteContent();

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

    const completion = await openrouter.chat.completions.create({
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
    });

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

    if (error.name === "AbortError" || error.code === "ECONNABORTED") {
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
