import Link from "next/link";
import { socialIcons } from "./SocialIcons";
import { EMAIL, SOCIAL_PROFILES } from "../content/profile";

const links = [
  { href: "/ai-consulting", label: "AI Consulting" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/public-speaking", label: "Public Speaking" },
  { href: "/side-projects", label: "Side Projects" },
  { href: "/about-me", label: "About Me" },
  // Not in the header — eight links do not fit that row. It belongs in the
  // footer regardless: the FAQ is the page most likely to be the answer to a
  // query, and a sitewide link is what gets it crawled early and often.
  { href: "/faq", label: "FAQ" },
];

// The icon is the whole of each link, so its alt text is the only accessible
// name the link has. "x" on its own tells a screen reader nothing; the label
// below is what gets read out instead.
//
// Hrefs come from content/profile.js's SOCIAL_PROFILES — the same list the
// schema.org `sameAs` graph is built from — rather than being retyped here.
// A profile URL that changes in one of the two places and not the other is
// exactly the kind of drift content/profile.js exists to prevent.
const FOOTER_SOCIAL_ICONS = [
  { profileLabel: "LinkedIn", icon: "linkedin" },
  { profileLabel: "GitHub", icon: "github" },
  { profileLabel: "Instagram", icon: "instagram" },
  { profileLabel: "X (Twitter)", icon: "x", displayName: "X" },
];

const socials = FOOTER_SOCIAL_ICONS.map(({ profileLabel, icon, displayName }) => {
  const profile = SOCIAL_PROFILES.find((p) => p.label === profileLabel);
  return {
    href: profile.href,
    icon,
    label: `Sarthak Shrivastava on ${displayName ?? profileLabel}`,
  };
});

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 sm:px-10 pt-16 pb-8 mt-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted mb-3">
              {"// LET'S BUILD SOMETHING"}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="font-display italic text-4xl sm:text-6xl hover:text-accent transition-colors"
            >
              {EMAIL}
            </a>
          </div>
          <div className="flex gap-3 flex-wrap items-start">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-ink/20 text-ink/60 flex items-center justify-center hover:border-ink hover:bg-ink hover:text-paper transition-colors"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-line text-xs font-mono tracking-widest text-muted">
          <span>© {new Date().getFullYear()} SARTHAK SHRIVASTAVA</span>
          <div className="flex gap-6 flex-wrap justify-center">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-ink transition-colors"
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>
          <span>BUILT IN INDIA</span>
        </div>
      </div>
    </footer>
  );
}
