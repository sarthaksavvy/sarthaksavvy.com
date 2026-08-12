// Renders a schema.org block for crawlers. Nothing here is visible to a
// visitor — it is the machine-readable copy of what the page already says.
//
// The `</` escape matters: a JSON string containing "</script>" would close
// this tag early and turn the rest of the payload into markup. All the data on
// the site is static, but the escape keeps that true if a value ever starts
// coming from somewhere else.
function serialize(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
