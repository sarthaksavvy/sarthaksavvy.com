"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COURSES_URL, YOUTUBE_URL } from "../content/profile";

const navLinks = [
  { href: "/ai-consulting", label: "AI Consulting" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/public-speaking", label: "Public Speaking" },
  { href: "/side-projects", label: "Side Projects" },
  { href: YOUTUBE_URL, label: "Youtube", external: true },
  { href: COURSES_URL, label: "Courses", external: true },
  { href: "/about-me", label: "About Me" },
];

function NavLink({ href, label, external, pathname, onClick }) {
  const isActive = !external && pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-current={isActive ? "page" : undefined}
      className="group relative font-mono text-xs tracking-widest uppercase text-ink/70 hover:text-ink transition-colors"
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every other overlay on the site (the entry gate, the floating chat panel)
  // closes on Escape and hands focus back to whatever opened it. This one did
  // neither: a keyboard visitor who opened the menu had no way to close it
  // short of tabbing through all seven links, or reaching for the mouse.
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      panelRef.current?.querySelector("a")?.focus();

      function onKeyDown(event) {
        if (event.key === "Escape") {
          event.preventDefault();
          setIsOpen(false);
        }
      }
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      toggleRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="flex justify-between items-center px-6 sm:px-10 py-5 sm:py-6 max-w-[1400px] mx-auto w-full"
      >
        <Link href="/" className="font-display italic text-lg sm:text-xl">
          Sarthak Shrivastava
        </Link>

        {/* The row switches to the menu button at `lg`, not `md`. Six links
            and the wordmark just fitted a 768px viewport; the seventh pushes
            the last one to 783px, past the edge of a container that clips its
            overflow — so "About Me" would be sliced off with no way to reach
            it. The tighter `gap-6` is what lets all seven fit at 1024px. */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
          {navLinks.map((link) => (
            <NavLink key={link.label} {...link} pathname={pathname} />
          ))}
        </div>

        {/* The three bars animate into a cross, which is the only signal that
            the menu is open — and it is a purely visual one. aria-expanded is
            what carries that same state to a screen reader, and aria-controls
            ties the button to the panel it opens. */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-40 w-8 h-6 flex flex-col justify-between"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
            className="block h-px w-full bg-ink origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-px w-full bg-ink"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
            className="block h-px w-full bg-ink origin-center"
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-paper border-b border-line"
          >
            {/* A landmark of its own: the panel renders outside the primary
                nav above, so without this the mobile links sit in no landmark
                at all. */}
            <nav aria-label="Primary mobile" className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-current={
                      !link.external && pathname === link.href ? "page" : undefined
                    }
                    onClick={() => setIsOpen(false)}
                    className="font-display italic text-2xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
