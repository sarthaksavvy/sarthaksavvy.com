"use client";

import { Calendar, ExternalLink, Linkedin, MapPin, Quote, Users } from "lucide-react";
import { motion } from "framer-motion";
import PhotoStack from "./PhotoStack";

// "Recooty" -> "Recooty's", "Aubergine Solutions" -> "Aubergine Solutions'".
function possessive(name) {
  return name.endsWith("s") ? `${name}’` : `${name}’s`;
}

export default function SingleEvent({ event, index = 0 }) {
  return (
    <motion.div
      className="relative pl-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-accent" />
        <span className="text-sm text-accentText mt-2 font-mono">{event.year}</span>
      </div>

      <div className="border border-line rounded-2xl hover:border-ink/40 transition-colors">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-display italic text-2xl mb-2">{event.title}</h2>
              <p className="text-accentText font-medium mb-2">{event.conference}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted mb-6 font-mono">
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {event.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} />
              {event.audience}
            </span>
          </div>
          <PhotoStack event={event} />

          <div className="mt-6">
            <p className="text-ink/70">{event.description}</p>

            {event.testimonial && (
              <blockquote className="mt-6 flex gap-3 border-l-2 border-accent pl-4">
                <Quote size={18} className="shrink-0 text-accentText mt-1" />
                <div>
                  <p className="italic text-ink/80">{event.testimonial.quote}</p>
                  <footer className="mt-2 text-sm text-muted font-mono not-italic">
                    — {event.testimonial.author}
                    {event.testimonial.role ? `, ${event.testimonial.role}` : ""}
                  </footer>
                </div>
              </blockquote>
            )}

            <div className="flex flex-wrap gap-4 mt-4">
              {event.slides && (
                <a
                  href={event.slides}
                  className="flex items-center gap-2 text-accentText hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  View Slides
                </a>
              )}
              {event.recording && (
                <a
                  href={event.recording}
                  className="flex items-center gap-2 text-accentText hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Watch Recording
                </a>
              )}
              {/* The post written at the time of the event — proof the talk
                  actually happened, not just a claim on this page. */}
              {event.linkedin && (
                <a
                  href={event.linkedin}
                  className="flex items-center gap-2 text-accentText hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} />
                  See the LinkedIn post
                </a>
              )}
              {/* Write-ups by the host or venue. Someone else vouching for the
                  session is stronger proof than his own post, so they get their
                  own links rather than being folded into the one above. */}
              {event.coverage?.map((post) => (
                <a
                  key={post.url}
                  href={post.url}
                  className="flex items-center gap-2 text-accentText hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} />
                  {possessive(post.by)} post
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
