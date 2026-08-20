import { BOOKING_URL, EMAIL, FALLBACK_SUBSCRIBERS } from "./profile";

export { BOOKING_URL, EMAIL };

export const CONSULTING_DESCRIPTION =
  "AI consultant working with teams on LLM features, AI automation and the " +
  "path to production — from picking a model to shipping something people use.";

// Each area is one thing Sarthak has actually built, described in terms of the
// work rather than the technology. `summary` is reused verbatim by the
// ProfessionalService markup and by the markdown mirror, so editing the copy
// here updates all three.
//
// A builder rather than a constant for the same reason the FAQ set is one: the
// last entry quotes the live YouTube figure, and a number frozen here would
// contradict the one the same page renders in its stat tiles.
export function buildServices(subscribers = FALLBACK_SUBSCRIBERS) {
  return [
    {
      title: "LLM features in your product",
      summary:
        "Taking a language model from a demo that impresses to a feature that survives real users: model choice, prompt design, timeouts, rate limits, and what the product does when the answer comes back wrong.",
      evidence:
        "Built end to end in AudioBolo, Backstage Cut and the ask box on this site.",
    },
    {
      title: "AI automation for everyday work",
      summary:
        "The repetitive middle of a workflow — transcribing, summarising, tagging, drafting, reformatting — is usually where the first hours come back. The useful part is deciding what to automate before anything gets built.",
      evidence: "Backstage Cut does this for video editing; Ginger does it for LinkedIn.",
    },
    {
      title: "Getting it into production, and keeping it there",
      summary:
        "Containers, deployment, cost and latency budgets, and the monitoring that tells you a model has quietly started answering badly.",
      evidence: "Docker Captain, AWS Certified Solutions Architect and Developer.",
    },
    {
      title: "Bringing your team along",
      summary:
        "Hands-on sessions so your engineers can extend the work afterwards, instead of owning a system only one person understands.",
      evidence: `${subscribers} subscribers on YouTube and 100K+ students on Udemy.`,
    },
  ];
}

// Everything here is already stated elsewhere on the site — the about page and
// the hero. Nothing on this page claims a credential that is not.
export const credentials = [
  { value: "10+ yrs", label: "Building and shipping software" },
  { value: "Docker", label: "Docker Captain since 2023" },
  { value: "AWS ×2", label: "Solutions Architect and Developer" },
  { value: "Bitfumes", label: "Founder and educator" },
];

// TODO(sarthak): engagement formats and what each one costs. Left empty rather
// than filled with plausible-sounding numbers — the section renders only once
// there is something real to put in it. Shape:
// { name: "Advisory call", detail: "...", price: "..." }
export const engagementFormats = [];

// TODO(sarthak): real client work, with permission to name it. Same reasoning:
// an invented case study is worse for trust than no case study at all.
// Shape: { client: "...", problem: "...", outcome: "...", href: "..." }
export const caseStudies = [];
