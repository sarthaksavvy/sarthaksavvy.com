"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionText }),
      });

      if (!response.ok) {
        throw new Error("Failed to get answer");
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setError("Sorry, I couldn't process your question right now. Please try again.");
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
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ask About Sarthak
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get instant answers about Sarthak&apos;s background, projects, expertise, and professional journey.
          </p>
        </div>

        {/* Question Form */}
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-gray-300 mb-2 font-medium">
                Your Question
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know about Sarthak? Ask about his projects, skills, experience, or anything else..."
                className="w-full bg-[#1A1A1A] border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#D1F366] focus:border-transparent focus:outline-none resize-none"
                rows={4}
                maxLength={1000}
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {question.length}/1000 characters
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="bg-[#D1F366] text-black px-8 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Getting Answer...
                </>
              ) : (
                "Ask Question"
              )}
            </button>
          </form>
        </div>

        {/* Answer Section */}
        {(loading || answer || error) && (
          <div className="bg-[#1A1A1A] border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#D1F366]">Answer</h2>
            
            {loading && (
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 border-2 border-[#D1F366] border-t-transparent rounded-full animate-spin"></div>
                <span>Searching through Sarthak&apos;s information...</span>
              </div>
            )}

            {error && (
              <div className="text-red-400 bg-red-900/20 border border-red-700 rounded-lg p-4">
                {error}
              </div>
            )}

            {answer && (
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {answer}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggested Questions */}
        {!loading && !answer && !error && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Popular Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "What are Sarthak's main areas of expertise?",
                "Tell me about Sarthak's side projects",
                "What is Sarthak's professional background?",
                "How can I get in touch with Sarthak?",
                "What technologies does Sarthak work with?",
                "Tell me about Sarthak's YouTube channel and courses"
              ].map((suggestedQ, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuestion(suggestedQ);
                    handleAskQuestion(suggestedQ);
                  }}
                  className="text-left p-4 bg-[#1A1A1A] border border-gray-600 rounded-lg hover:border-[#D1F366] transition-colors text-gray-300 hover:text-white"
                >
                  {suggestedQ}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#D1F366] hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#D1F366] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-300">Loading...</span>
        </div>
      </div>
    }>
      <AskPageContent />
    </Suspense>
  );
}
