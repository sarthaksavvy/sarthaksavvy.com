const items = [
  "DOCKER CAPTAIN",
  "LARAVEL",
  "AI & AUTOMATION",
  "YOUTUBE CREATOR",
  "BITFUMES FOUNDER",
  "PUBLIC SPEAKER",
];

export default function Marquee() {
  // The list is rendered twice because the loop translates the track by half
  // its width: the second copy is what slides in behind the first, so the strip
  // never shows a gap. It is a rendering trick, not content — hidden from
  // assistive tech below so a screen reader reads the six items once instead of
  // announcing the whole list twice over.
  const track = [...items, ...items];

  return (
    <div className="border-y border-line py-6 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {track.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length ? "true" : undefined}
            className="flex items-center font-display italic text-2xl sm:text-3xl px-8 whitespace-nowrap"
          >
            {item}
            <span className="text-accent ml-8 not-italic font-sans">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
