"use client";

import { useCallback, useEffect, useRef, useState, Suspense } from "react";
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

// Matches the `maxLength` on the textarea and the ceiling the API enforces.
const MAX_QUESTION_LENGTH = 1000;
// Longer answers need more headroom than a typical fetch timeout allows.
const REQUEST_TIMEOUT_MS = 45000;

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
  const resultsRef = useRef(null);
  // Every request takes a ticket. Only the holder of the current ticket is
  // allowed to write to state, so a superseded request cannot resolve late and
  // overwrite the answer to the question the visitor is actually reading.
  const requestTicketRef = useRef(0);
  const activeRequestRef = useRef(null);

  const cancelActiveRequest = useCallback(() => {
    requestTicketRef.current += 1;

    const active = activeRequestRef.current;
    if (!active) return;

    clearTimeout(active.timeoutId);
    active.controller.abort();
    activeRequestRef.current = null;
  }, []);

  const handleAskQuestion = useCallback(
    async (questionText) => {
      const trimmed = questionText.trim();
      if (!trimmed) return;

      // The floating ask widget is rendered from the root layout, so it is on
      // this page too: asking from it while an answer is still loading used to
      // leave two requests racing, and the slower one won. That could settle
      // the page on the previous question's answer, displayed underneath the
      // new question's text, with no way to tell the two apart.
      cancelActiveRequest();
      const ticket = requestTicketRef.current;
      const isCurrent = () => requestTicketRef.current === ticket;

      setLoading(true);
      setError("");
      setAnswer("");

      // Submitting disables both the textarea and the button, and a disabled
      // element cannot hold focus — so the browser dropped the keyboard
      // visitor back onto <body> and they had to tab in from the top of the
      // document again. Moving focus to the results panel keeps them where the
      // page is about to change, and gives a screen reader the progress text.
      resultsRef.current?.focus();

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT_MS
      );
      activeRequestRef.current = { controller, timeoutId };

      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: trimmed }),
          signal: controller.signal,
        });

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
        if (!isCurrent()) return;
        setAnswer(data.answer);
      } catch (err) {
        // A superseded or unmounted request aborts by design. Reporting that
        // as a failure would put a timeout message on screen at the exact
        // moment the replacement request is working correctly.
        if (!isCurrent()) return;

        if (err.name === 'AbortError') {
          setError("Request timeout. Please try again with a shorter question.");
        } else {
          setError(err.message || "Sorry, I couldn't process your question right now. Please try again.");
        }
        console.error("Error:", err);
      } finally {
        // Cleared here rather than only on the success path, where a failed
        // request left its 45s timer running with the controller still
        // referenced by it.
        clearTimeout(timeoutId);
        if (activeRequestRef.current?.controller === controller) {
          activeRequestRef.current = null;
        }
        if (isCurrent()) setLoading(false);
      }
    },
    [cancelActiveRequest]
  );

  useEffect(() => {
    const q = searchParams.get("q");
    if (!q) return;

    // `maxLength` only constrains typing, so a shared or hand-edited `?q=` can
    // arrive longer than the API accepts. Left as-is it seeded the box with a
    // question the counter read as "1400/1000" and every submit came back as a
    // 400, with no hint that the length was the problem.
    const seeded = q.slice(0, MAX_QUESTION_LENGTH);
    setQuestion(seeded);
    handleAskQuestion(seeded);
  }, [searchParams, handleAskQuestion]);

  // Navigating away mid-answer should stop the request, not let it run to
  // completion against a page nobody is looking at.
  useEffect(() => cancelActiveRequest, [cancelActiveRequest]);

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

        {/* Answer Section. The wrapper stays mounted even when there is
            nothing to show: it has to exist before it can take focus on
            submit, and a live region that appears in the same paint as its
            first message is not reliably announced. */}
        <div
          ref={resultsRef}
          tabIndex={-1}
          aria-busy={loading}
          className="focus:outline-none"
        >
          {/* The answer replaces the panel contents without moving focus or
              scrolling, so nothing signals to a screen reader that the page
              responded. This carries the state change as one short sentence,
              rather than making the whole panel live and having it read a
              several-hundred-word answer aloud unprompted. */}
          <p aria-live="polite" className="sr-only">
            {loading
              ? "Searching through Sarthak's information."
              : error
                ? `That question could not be answered. ${error}`
                : answer
                  ? "The answer is ready, below the question box."
                  : ""}
          </p>

          {(loading || answer || error) && (
            <div className="border border-line rounded-3xl p-8 sm:p-10 mb-10">
              <h2 className="text-xs font-mono uppercase tracking-widest mb-6 text-muted">
                Answer
              </h2>

              {loading && (
                <div className="flex items-center gap-3 text-ink/60">
                  <span
                    aria-hidden="true"
                    className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"
                  />
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
        </div>

        {/* Suggested Questions */}
        {!loading && !answer && !error && (
          <div className="mb-20">
            {/* An h2, not an h3: this is a top-level section of the page,
                sibling to "Answer". As an h3 it skipped a level, because it
                only ever renders when the "Answer" h2 is absent. */}
            <h2 className="text-xs font-mono uppercase tracking-widest mb-6 text-muted">
              Popular Questions
            </h2>
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
