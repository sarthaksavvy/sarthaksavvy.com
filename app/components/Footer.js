import { socialIcons } from "./SocialIcons";

const links = [
  { href: "/podcasts", label: "Podcasts" },
  { href: "/public-speaking", label: "Public Speaking" },
  { href: "/side-projects", label: "Side Projects" },
  { href: "/about-me", label: "About Me" },
];

const socials = [
  { href: "https://linkedin.com/in/sarthaksavvy", icon: "linkedin", label: "LinkedIn" },
  { href: "https://github.com/sarthaksavvy", icon: "github", label: "GitHub" },
  { href: "https://instagram.com/sarthaksavvy", icon: "instagram", label: "Instagram" },
  { href: "https://x.com/sarthaksavvy", icon: "x", label: "X" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 sm:px-10 pt-16 pb-8 mt-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted mb-3">
              // LET&apos;S BUILD SOMETHING
            </p>
            <a
              href="mailto:hello@sarthaksavvy.com"
              className="font-display italic text-4xl sm:text-6xl hover:text-accent transition-colors"
            >
              hello@sarthaksavvy.com
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
              <a
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="hover:text-ink transition-colors"
              >
                {l.label.toUpperCase()}
              </a>
            ))}
          </div>
          <span>BUILT IN INDIA</span>
        </div>
      </div>
    </footer>
  );
}
