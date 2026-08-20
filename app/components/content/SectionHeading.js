// The site labels its sections in the style of a code comment — "// Where I
// can help". Read on screen that is a flourish; read by anything that consumes
// the text alone, the "//" is two characters of noise glued to the front of
// every heading on the site. A screen reader announces "slash slash where I
// can help", and an answer engine building an outline of the page gets a list
// of headings that all start the same way and none of which read as English.
//
// The slashes are drawn by CSS rather than sitting in the markup, so they are
// not in the element's text at all: `textContent` is "Where I can help", the
// accessibility tree agrees, and the pixels are unchanged. A wrapping
// aria-hidden span would have fixed the screen reader and left the slashes in
// the text a crawler extracts, which is the half of the problem that matters
// here.
export default function SectionHeading({ children, as: Tag = "h2", id }) {
  return (
    <Tag
      id={id}
      className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8 before:content-['//'] before:mr-[0.75em]"
    >
      {children}
    </Tag>
  );
}
