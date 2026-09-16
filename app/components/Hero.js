"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import MagneticButton from "./motion/MagneticButton";
import { FALLBACK_SUBSCRIBERS } from "../content/profile";

const ParticleImage = dynamic(() => import("./motion/ParticleImage"), { ssr: false });

const TAGLINE_WORDS = ["Founder", "AI Consultant", "Builder", "Corporate Trainer"];

export default function Hero({ subscribers = FALLBACK_SUBSCRIBERS }) {
  return (
    // Was a <main>. The landmark now comes from the root layout, so keeping
    // one here would nest a second one inside it and split the home page's
    // content across two landmarks with the same name.
    <section className="relative px-6 sm:px-10 max-w-[1400px] mx-auto pt-6 sm:pt-10 pb-20 min-h-[90vh]">
      <div className="relative z-0 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <motion.p
            initial="hidden"
            animate="show"
            className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-accentText mb-6 flex flex-wrap gap-x-2"
          >
            {TAGLINE_WORDS.map((word, i) => (
              <span key={word} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    show: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {word}
                  {i < TAGLINE_WORDS.length - 1 && <span className="text-ink/30 ml-2">·</span>}
                </motion.span>
              </span>
            ))}
          </motion.p>

          {/* On mobile this sits in normal flow, between the tagline above
              and the heading below. From `md` up it's pulled out of flow
              entirely and pinned as an overlay next to the text — `absolute`
              looks up to the nearest positioned ancestor, which is the
              <section> above, not this column, so it doesn't disturb the
              col-span-8 layout on desktop. */}
          <div className="relative w-full h-[50vh] max-h-[420px] mb-8 md:mb-0 md:absolute md:right-[2%] md:top-[2%] md:w-[42%] md:h-[70vh] md:max-h-[640px] z-10">
            <ParticleImage src="/images/sarthak.jpg" className="w-full h-full" />
          </div>

          <h1 className="font-display text-6xl sm:text-8xl md:text-[7.5rem] leading-[0.95] mb-8">
            {["Hi, I am", "Sarthak"].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  {i === 1 ? <span className="italic text-accentText">{line}.</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-ink/70 text-lg sm:text-xl mb-12 max-w-lg leading-relaxed"
          >
            India-based founder, content creator, developer and AI consultant
            with 10+ years of experience — passionate about building products
            and automating daily work.
          </motion.p>

          <StaggerGroup className="flex flex-wrap items-center gap-4">
            <StaggerItem>
              <MagneticButton
                href="/side-projects"
                className="border border-ink/25 text-ink px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex"
              >
                View Work
              </MagneticButton>
            </StaggerItem>
          </StaggerGroup>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="md:col-span-4 flex md:flex-col justify-between items-start md:items-end gap-6 md:pt-4 font-mono text-xs tracking-widest text-muted uppercase pointer-events-none"
        >
          <span>Docker Captain</span>
          <span className="md:text-right">{subscribers} Youtube Subs</span>
          <span className="md:text-right">Bitfumes Founder</span>
        </motion.div>
      </div>
    </section>
  );
}
