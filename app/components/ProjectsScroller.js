"use client";

import HorizontalScroller from "./HorizontalScroller";

// One card per shipped product, on the same HorizontalScroller mechanics as
// the podcast guest row and the training highlights reel. Each card links
// straight to that project's own page — there's no in-page gallery here, just
// a fast way to browse the catalogue before committing to one.
//
// Projects are mapped onto the house card's `{ src, href, label, sublabel }`
// shape rather than rendered with their own markup. The hand-written copy had
// already drifted from the house card: no accessible name on the link, and a
// grab cursor where every other linked card shows a pointer.
export default function ProjectsScroller({ projects }) {
  if (!projects.length) return null;

  return (
    <HorizontalScroller
      items={projects.map((project) => ({
        src: project.image,
        href: project.projectLink,
        label: project.name,
        sublabel: project.tagline,
      }))}
      className="border-y border-line py-8 -mx-6 sm:-mx-10"
      trackClassName="px-6 sm:px-10"
    />
  );
}
