// The answer-first block: one self-contained paragraph, high on the page,
// written so it still means something when it is lifted away from everything
// around it.
//
// This is the single highest-leverage thing on a page for an answer engine. A
// model asked "who is X" or "what does X do" is looking for a sentence of the
// form "<subject> is a <category> that <does what>" and will reuse one nearly
// verbatim if it finds it. If it does not, it assembles its own out of
// fragments taken from a hero, a nav label and an image caption — which is
// where confidently wrong job titles come from. A hero that reads "Hi, I am
// Sarthak." is good design and says nothing extractable.
//
// `data-speakable` is what the WebPage node's SpeakableSpecification points at,
// so a voice assistant reads this rather than the navigation.
export default function AnswerBlock({ children, className = "" }) {
  return (
    <div
      data-speakable
      className={`border border-line rounded-3xl p-8 sm:p-10 bg-paper ${className}`}
    >
      <div className="text-lg sm:text-xl text-ink/80 leading-relaxed max-w-3xl space-y-4">
        {children}
      </div>
    </div>
  );
}
