// A definition list of the numbers and attributes a model is most likely to be
// asked for, in the one shape that cannot be misread: term, then value.
//
// The same facts are already scattered across the page in prose and in stat
// tiles, and prose is where they get lost — "over a hundred thousand students"
// in the middle of a sentence is a phrase a model has to parse, while a <dt>
// reading "Students taught" beside a <dd> reading "100K+" is a fact it can
// copy. `asOf` is not decoration either: an undated number is one an engine
// will either hedge into vagueness or refuse to repeat.
//
// The values count up from zero as they scroll into view (CountUp), but only
// in the browser: the server-rendered <dd> always holds the real figure.
import CountUp from "../motion/CountUp";

export default function KeyFacts({ facts, asOf, className = "" }) {
  return (
    <div className={className}>
      <dl className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-3xl overflow-hidden">
        {facts.map((fact, i) => (
          <div key={fact.label} className="bg-paper p-6 sm:p-8">
            <dt className="text-xs font-mono uppercase tracking-widest text-muted mb-2">
              {fact.label}
            </dt>
            <dd className="font-display text-2xl sm:text-3xl text-accentText leading-tight">
              {/* A short stagger, so the tiles land one after another rather
                  than all ticking in lockstep. */}
              <CountUp value={fact.value} delay={i * 90} />
            </dd>
            {fact.note && (
              <dd className="text-sm text-ink/60 mt-2 leading-snug">
                {fact.note}
              </dd>
            )}
          </div>
        ))}
      </dl>
      {asOf && (
        <p className="text-xs font-mono uppercase tracking-widest text-muted mt-4">
          Figures current as of {asOf}
        </p>
      )}
    </div>
  );
}
