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
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#D1F366] text-black px-6 py-3 rounded-full font-medium hover:bg-[#bde052] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
          >
            <span>Ask anything about Sarthak</span>
            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          </button>
        )}

        {/* Expanded Chat Interface */}
        {isOpen && (
          <div className="bg-black border border-gray-700 rounded-2xl p-6 w-80 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Ask about Sarthak</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know about Sarthak&apos;s background, projects, or expertise?"
                className="w-full bg-[#1A1A1A] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#D1F366] focus:border-transparent focus:outline-none resize-none"
                rows={3}
                maxLength={500}
              />
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {question.length}/500
                </span>
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="bg-[#D1F366] text-black px-4 py-2 rounded-full font-medium hover:bg-[#bde052] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ask
                </button>
              </div>
            </form>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                Powered by AI • Get instant answers about Sarthak&apos;s work
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
