import Anthropic from "@anthropic-ai/sdk";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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
Sarthak Shrivastava is an India-based founder, content creator, developer and AI enthusiast passionate about building and automating daily tasks.

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
      !process.env.ANTHROPIC_API_KEY ||
      process.env.ANTHROPIC_API_KEY === "your_anthropic_api_key_here"
    ) {
      return NextResponse.json(
        {
          error:
            "Anthropic API key not configured. Please set a valid ANTHROPIC_API_KEY environment variable.",
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
- Keep responses concise but informative (2-4 paragraphs max)
- Include relevant links when appropriate (website, LinkedIn, YouTube, etc.)
- Maintain a professional yet friendly tone
- If asked about contact information, direct them to his website or LinkedIn`;

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 500,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: sanitizedQuestion,
        },
      ],
    });

    const answer =
      message.content[0]?.text ||
      "Sorry, I could not generate an answer at this time.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error processing question:", error);

    if (error.status === 429) {
      return NextResponse.json(
        { error: "Anthropic API rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    if (error.status === 401) {
      return NextResponse.json(
        { error: "Invalid Anthropic API key configuration." },
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
