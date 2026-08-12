"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "../components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "../components/motion/Stagger";

const markdownComponents = {
  h1: ({ children }) => (
    <h3 className="font-display italic text-2xl text-ink mt-8 mb-3 first:mt-0">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3 className="font-display italic text-2xl text-ink mt-8 mb-3 first:mt-0">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="font-mono text-xs uppercase tracking-widest text-muted mt-8 mb-3 first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 last:mb-0 space-y-2 pl-5 list-disc marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 last:mb-0 space-y-2 pl-5 list-decimal marker:text-accent marker:font-mono marker:text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent/40 pl-5 italic text-ink/60 mb-4 last:mb-0">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="font-mono text-[0.85em] bg-line/70 rounded px-1.5 py-0.5">
        {children}
      </code>
    ) : (
      <code className="font-mono text-sm block">{children}</code>
    ),
  pre: ({ children }) => (
    <pre className="bg-line/70 rounded-2xl p-5 overflow-x-auto mb-4 last:mb-0">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-line my-8" />,
};

const POPULAR_QUESTIONS = [
  "What are Sarthak's main areas of expertise?",
  "Tell me about Sarthak's side projects",
  "What is Sarthak's professional background?",
  "How can I get in touch with Sarthak?",
  "What technologies does Sarthak work with?",
  "Tell me about Sarthak's YouTube channel and courses",
];

function AskPageContent() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuestion(q);
      handleAskQuestion(q);
    }
  }, [searchParams]);

  const handleAskQuestion = async (questionText) => {
    if (!questionText.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s — longer answers need more headroom

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionText }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 429) {
          throw new Error(errorData.error || "Too many requests. Please wait before asking another question.");
        } else if (response.status === 400) {
          throw new Error(errorData.error || "Invalid question format.");
        } else if (response.status === 408) {
          throw new Error("Request timeout. Please try again with a shorter question.");
        } else {
          throw new Error(errorData.error || "Failed to get answer");
        }
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError("Request timeout. Please try again with a shorter question.");
      } else {
        setError(err.message || "Sorry, I couldn't process your question right now. Please try again.");
      }
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAskQuestion(question);
  };

  return (
    <div className="py-10 px-6 sm:px-10">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="mb-16 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-7">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              Ask <span className="italic text-accent">Anything.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5 flex items-end">
            <p className="text-lg text-ink/70">
              Instant answers about Sarthak&apos;s background, projects,
              expertise and professional journey — pulled straight from this
              site.
            </p>
          </Reveal>
        </div>

        {/* Question Form */}
        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="border border-line rounded-3xl p-8 sm:p-10 mb-10"
          >
            <label
              htmlFor="question"
              className="block text-xs font-mono uppercase tracking-widest mb-4 text-muted"
            >
              Your Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know about Sarthak? Ask about his projects, skills, experience, or anything else..."
              className="w-full bg-transparent border border-line rounded-2xl p-5 text-ink text-lg placeholder-muted focus:ring-1 focus:ring-accent focus:border-accent focus:outline-none resize-none transition-colors"
              rows={4}
              maxLength={1000}
              required
              disabled={loading}
            />

            <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
              <span className="text-xs font-mono tracking-widest text-muted">
                {question.length}/1000
              </span>

              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="bg-ink text-paper px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink inline-flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-paper border-t-transparent rounded-full animate-spin" />
                    Thinking
                  </>
                ) : (
                  <>
                    Ask Question
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>

        {/* Answer Section */}
        {(loading || answer || error) && (
          <div className="border border-line rounded-3xl p-8 sm:p-10 mb-10">
            <h2 className="text-xs font-mono uppercase tracking-widest mb-6 text-muted">
              Answer
            </h2>

            {loading && (
              <div className="flex items-center gap-3 text-ink/60">
                <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="font-mono text-xs tracking-widest uppercase">
                  Searching through Sarthak&apos;s information
                </span>
              </div>
            )}

            {error && (
              <div className="border border-accent/40 bg-accent/5 text-ink/80 rounded-2xl p-5">
                {error}
              </div>
            )}

            {answer && (
              <div className="text-lg text-ink/80 leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}

        {/* Suggested Questions */}
        {!loading && !answer && !error && (
          <div className="mb-20">
            <h3 className="text-xs font-mono uppercase tracking-widest mb-6 text-muted">
              Popular Questions
            </h3>
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {POPULAR_QUESTIONS.map((suggestedQ) => (
                <StaggerItem key={suggestedQ}>
                  <button
                    onClick={() => {
                      setQuestion(suggestedQ);
                      handleAskQuestion(suggestedQ);
                    }}
                    className="w-full h-full text-left p-6 border border-line rounded-2xl text-ink/70 hover:text-ink hover:border-ink/40 transition-colors flex items-start justify-between gap-4 group"
                  >
                    {suggestedQ}
                    <ArrowRight
                      size={16}
                      className="mt-1 shrink-0 text-muted group-hover:text-accent transition-colors"
                    />
                  </button>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 flex items-center justify-center">
          <div className="flex items-center gap-3 text-muted">
            <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs tracking-widest uppercase">
              Loading
            </span>
          </div>
        </div>
      }
    >
      <AskPageContent />
    </Suspense>
  );
}
