import ClientImage from "../ClientImage";

// One recognition or certification, as a card. The home page lists these in a
// <ul> and /about-me in a <dl>, so the wrapper and the two text elements are
// the caller's to choose — but the card itself is written once. The two pages
// each had their own copy, and only one of them learned about badges and
// verification links when those were added.
//
// The verification link is a real inline link inside the detail, and its hit
// area is stretched over the whole card with an `::after` overlay. Wrapping
// the card in an <a> instead would put <dt>/<dd> inside a link, which a <dl>
// does not allow, and would make the entire card text the link's name.
//
// `compact` is the home page's scroller size. `hidden` and `onLinkClick` are for
// a scroller's duplicated track: the copy must stay out of the tab order and
// the accessibility tree, and the click that ends a drag must not open Credly.
export default function CredentialCard({
  credential,
  as: Wrapper = "div",
  titleAs: Title = "h3",
  detailAs: Detail = "p",
  compact = false,
  hidden = false,
  onLinkClick,
  className = "",
}) {
  const { name, detail, image, url, verifyLabel } = credential;

  return (
    <Wrapper
      aria-hidden={hidden ? "true" : undefined}
      className={`group relative border border-line rounded-3xl bg-paper ${
        compact ? "p-7" : "p-8"
      } ${className}`}
    >
      {image && (
        // Decorative: the name beside it is already the accessible label, so
        // an alt would make a screen reader read the certification twice.
        <ClientImage
          src={image}
          alt=""
          width={340}
          height={340}
          sizes={compact ? "96px" : "112px"}
          // A fixed square box rather than `w-auto`: the badges are drawn to
          // different proportions, and letting each size itself would step
          // the card titles beside them out of line.
          className={`${compact ? "h-24 w-24 mb-4" : "h-28 w-28 mb-5"} object-left`}
        />
      )}
      <Title
        className={`font-display italic ${compact ? "text-xl" : "text-2xl"} mb-3 ${
          url ? "group-hover:text-accentText transition-colors" : ""
        }`}
      >
        {name}
      </Title>
      <Detail className={`text-ink/70 leading-relaxed ${compact ? "text-sm" : ""}`}>
        {detail}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            // Starts with the visible text so voice-control users can say what
            // they see; the name adds the context "Verify on Credly" lacks.
            aria-label={`${verifyLabel}: ${name}`}
            tabIndex={hidden ? -1 : undefined}
            onClick={onLinkClick}
            draggable={false}
            className="mt-3 block w-fit text-sm text-accentText underline underline-offset-4 decoration-accent/40 group-hover:decoration-accent transition-colors after:absolute after:inset-0 after:rounded-3xl"
          >
            {verifyLabel}
          </a>
        )}
      </Detail>
    </Wrapper>
  );
}
