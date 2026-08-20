import SectionHeading from "./SectionHeading";

// Questions and answers as a <dl>, not as a stack of divs.
//
// The markup is doing the same job as the FAQPage JSON-LD, one level down: it
// says which text is the question and which is the answer, so a parser that
// never reads the structured data still gets the pairing right. Everything is
// expanded — no <details>, no accordion. Collapsed answers are text a crawler
// may or may not count, and there is nothing here worth hiding to save
// vertical space.
export default function FaqSection({
  title = "Common questions",
  faqs,
  headingLevel = "h2",
  id,
}) {
  return (
    <section className="mb-24" aria-labelledby={id ? `${id}-heading` : undefined}>
      <SectionHeading as={headingLevel} id={id ? `${id}-heading` : undefined}>
        {title}
      </SectionHeading>
      <dl className="grid gap-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="border border-line rounded-3xl p-8 hover:border-ink/40 transition-colors bg-paper"
          >
            <dt className="font-display italic text-2xl mb-4">{faq.question}</dt>
            <dd className="text-ink/70 leading-relaxed max-w-3xl">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
