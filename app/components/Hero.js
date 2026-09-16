"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleImage = dynamic(() => import("./motion/ParticleImage"), { ssr: false });

const TAGLINE_WORDS = ["Founder", "AI Consultant", "Builder", "Corporate Trainer"];

export default function Hero() {
  return (
    // Was a <main>. The landmark now comes from the root layout, so keeping
    // one here would nest a second one inside it and split the home page's
    // content across two landmarks with the same name.
    //
    // The portrait is an ordinary grid column, so this section is exactly as
    // tall as its taller column and nothing has to be tuned to match it. It
    // used to be `lg:absolute`, which took it out of flow and left a
    // `min-h-[…vh]` floor as the only thing holding the section open around
    // it. That floor tracked viewport height while the photo stops growing at
    // 640px, so the two could only agree at one window height: on taller
    // screens a band of empty paper opened above the media strip, and on short
    // ones the photo ran over the strip's top rule.
    <section className="relative px-6 sm:px-10 max-w-[1400px] mx-auto pt-6 sm:pt-10 lg:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:items-start">
        {/* `contents` below `lg`: this wrapper drops out of the layout, so its
            children become grid items themselves and `order` can slot the
            portrait between the tagline and the heading on a phone. From `lg`
            it is a real column again beside the photo. No gap-y on the grid,
            so the phone layout keeps spacing from each element's own margin. */}
        <div className="contents lg:block lg:col-span-7">
          <motion.p
            initial="hidden"
            animate="show"
            className="order-1 font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-accentText mb-6 flex flex-wrap gap-x-2"
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

          <h1 className="order-3 font-display text-6xl sm:text-8xl lg:text-[7.5rem] leading-[0.95] mb-8">
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
            className="order-4 text-ink/70 text-lg sm:text-xl mb-12 lg:mb-0 max-w-lg leading-relaxed"
          >
            India-based founder, AI consultant, content creator and corporate trainer
            with 10+ years of experience — passionate about helping businesses
            using AI.
          </motion.p>
        </div>

        {/* Between the tagline and the heading on a phone (`order-2`); its own
            column beside the text from `lg`. Switching at `lg` rather than `md`
            matters: at 768px a side-by-side photo leaves the heading too
            narrow for "Hi, I am" at display size. */}
        <div className="order-2 lg:order-none relative w-full h-[50vh] max-h-[420px] mb-8 lg:mb-0 lg:col-span-5 lg:h-[70vh] lg:max-h-[640px]">
          <ParticleImage src="/images/sarthak.jpg" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
