import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "./components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "./components/motion/Stagger";
import MagneticButton from "./components/motion/MagneticButton";

// Without this file, Next.js falls back to its own unstyled "404 | This page
// could not be found" — no nav context beyond the header/footer the root
// layout already provides, and no path back in for a broken or typo'd link.
// This gives a lost visitor the same three or four places everyone else on
// the site is pointed toward instead of a dead end.
export const metadata = {
  title: "Page Not Found — Sarthak Shrivastava",
  description: "This page doesn't exist or has moved.",
  robots: {
    index: false,
    follow: true,
  },
};

const destinations = [
  { href: "/", label: "Home" },
  { href: "/ai-consulting", label: "AI Consulting" },
  { href: "/side-projects", label: "Side Projects" },
  { href: "/about-me", label: "About Me" },
];

export default function NotFound() {
  return (
    <div className="py-10 px-6 sm:px-10 min-h-[70vh] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full">
        <Reveal>
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-accent mb-6">
            404
          </p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
            Page not <span className="italic text-accent">found.</span>
          </h1>
          <p className="text-lg text-ink/70 mb-12 max-w-lg leading-relaxed">
            The link is broken, or the page moved. Here&apos;s where everyone
            else on the site starts.
          </p>
        </Reveal>

        <StaggerGroup className="flex flex-wrap items-center gap-4">
          {destinations.map((destination, i) => (
            <StaggerItem key={destination.href}>
              <MagneticButton
                href={destination.href}
                className={
                  i === 0
                    ? "bg-ink text-paper px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors inline-flex items-center gap-3"
                    : "border border-ink/25 text-ink px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex items-center gap-3"
                }
              >
                {destination.label}
                {i === 0 && <ArrowRight size={16} aria-hidden="true" />}
              </MagneticButton>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
