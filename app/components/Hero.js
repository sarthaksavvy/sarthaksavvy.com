"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import MagneticButton from "./motion/MagneticButton";

const ParticleImage = dynamic(() => import("./motion/ParticleImage"), { ssr: false });

export default function Hero() {
  return (
    <main className="relative px-6 sm:px-10 max-w-[1400px] mx-auto pt-6 sm:pt-10 pb-20 min-h-[90vh]">
      <div className="hidden md:block absolute right-[2%] top-[2%] w-[42%] h-[70vh] max-h-[640px] z-10">
        <ParticleImage src="/images/sarthak.jpg" className="w-full h-full" />
      </div>

      <div className="relative z-0 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-accent mb-6"
            >
              Founder · Builder · AI Consultant
            </motion.p>
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
                  {i === 1 ? <span className="italic text-accent">{line}.</span> : line}
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
            India-based founder, content creator, developer and AI consultant —
            passionate about building products and automating daily work.
          </motion.p>

          <StaggerGroup className="flex flex-wrap items-center gap-4">
            <StaggerItem>
              <MagneticButton
                href="https://cal.com/sarthaksavvy"
                target="_blank"
                className="bg-ink text-paper px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors flex items-center gap-3 inline-flex"
              >
                Book a Call
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-paper opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-paper" />
                </span>
              </MagneticButton>
            </StaggerItem>

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
          <span className="md:text-right">134K+ Youtube Subs</span>
          <span className="md:text-right">Bitfumes Founder</span>
        </motion.div>
      </div>
    </main>
  );
}
