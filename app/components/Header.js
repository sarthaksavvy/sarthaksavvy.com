"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/podcasts", label: "Podcasts" },
  { href: "/public-speaking", label: "Public Speaking" },
  { href: "/side-projects", label: "Side Projects" },
  { href: "https://youtube.com/bitfumes", label: "Youtube", external: true },
  { href: "https://courses.sarthaksavvy.com/", label: "Courses", external: true },
  { href: "/about-me", label: "About Me" },
];

function NavLink({ href, label, external, pathname, onClick }) {
  const isActive = !external && pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
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

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-6 sm:px-10 py-5 sm:py-6 max-w-[1400px] mx-auto w-full">
        <Link href="/" className="font-display italic text-lg sm:text-xl">
          Sarthak Shrivastava
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <NavLink key={link.label} {...link} pathname={pathname} />
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-40 w-8 h-6 flex flex-col justify-between"
          aria-label="Toggle menu"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-paper border-b border-line"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
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
                    onClick={() => setIsOpen(false)}
                    className="font-display italic text-2xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
