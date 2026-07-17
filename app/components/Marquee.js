const items = [
  "DOCKER CAPTAIN",
  "LARAVEL",
  "AI & AUTOMATION",
  "YOUTUBE CREATOR",
  "BITFUMES FOUNDER",
  "PUBLIC SPEAKER",
];

export default function Marquee() {
  const track = [...items, ...items];

  return (
    <div className="border-y border-line py-6 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {track.map((item, i) => (
          <span
            key={i}
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
