import { ExternalLink, Linkedin } from "lucide-react";

// "Recooty" -> "Recooty's", "Aubergine Solutions" -> "Aubergine Solutions'".
function possessive(name) {
  return name.endsWith("s") ? `${name}’` : `${name}’s`;
}

const linkClass = "flex items-center gap-2 text-accentText hover:underline";
const external = { target: "_blank", rel: "noopener noreferrer" };

/**
 * Slides, recording and the LinkedIn proof for one talk. Shared by the timeline
 * card and the event's own page so the two cannot list different evidence.
 */
export default function EventLinks({ event }) {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {event.slides && (
        <a href={event.slides} className={linkClass} {...external}>
          <ExternalLink size={16} />
          View Slides
        </a>
      )}
      {event.recording && (
        <a href={event.recording} className={linkClass} {...external}>
          <ExternalLink size={16} />
          Watch Recording
        </a>
      )}
      {/* The post written at the time of the event — proof the talk
          actually happened, not just a claim on this page. */}
      {event.linkedin && (
        <a href={event.linkedin} className={linkClass} {...external}>
          <Linkedin size={16} />
          See the LinkedIn post
        </a>
      )}
      {/* Write-ups by the host or venue. Someone else vouching for the
          session is stronger proof than his own post, so they get their
          own links rather than being folded into the one above. */}
      {event.coverage?.map((post) => (
        <a key={post.url} href={post.url} className={linkClass} {...external}>
          <Linkedin size={16} />
          {possessive(post.by)} post
        </a>
      ))}
    </div>
  );
}
