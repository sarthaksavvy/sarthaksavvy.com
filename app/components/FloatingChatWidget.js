"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      router.push(`/ask?q=${encodeURIComponent(question.trim())}`);
      setQuestion("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-ink text-paper px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group"
          >
            <span>Ask anything about Sarthak</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </button>
        )}

        {isOpen && (
          <div className="bg-paper border border-line rounded-2xl p-6 w-80 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display italic text-lg text-ink">Ask about Sarthak</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-ink transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know about Sarthak's background, projects, or expertise?"
                className="w-full bg-transparent border border-line rounded-lg p-3 text-ink placeholder-muted focus:ring-1 focus:ring-accent focus:border-accent focus:outline-none resize-none"
                rows={3}
                maxLength={1000}
              />

              <div className="flex justify-between items-center">
                <span className="text-xs text-muted font-mono">
                  {question.length}/1000
                </span>
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="bg-ink text-paper px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ask
                </button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-line">
              <p className="text-xs text-muted text-center font-mono">
                Powered by AI · Instant answers about Sarthak&apos;s work
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
