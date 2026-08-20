import {
  BOOKING_URL,
  COURSES_URL,
  EMAIL,
  FALLBACK_SUBSCRIBERS,
} from "./profile";

// The questions people actually type, answered in full sentences that survive
// being lifted out of the page.
//
// Two rules hold everything here together. First, an answer has to make sense
// with the question gone — "Yes, remotely" is useless once an assistant has
// dropped the heading, so every answer restates enough of the question to
// stand alone. Second, an answer has to name the subject rather than say "I"
// wherever it plausibly could be quoted cold; a paragraph of first person with
// no antecedent is a paragraph an engine cannot attribute to anyone.
//
// These are grouped rather than flat so the /faq page can render sections and
// individual pages can pull only the group that belongs to them, without the
// answers being written twice.

/**
 * The whole set, built against a subscriber count.
 *
 * A function rather than a constant because two of these answers quote the
 * YouTube figure, and that figure is read live from YouTube on every page that
 * shows it. Freezing it into the FAQ prose is how the same page ends up saying
 * "156K+" in a stat tile and "134K+" three paragraphs down — which is worse
 * than saying nothing, because an assistant reading both has to pick one and
 * has no way to tell which is current.
 *
 * The default is the stored fallback, so a caller that has no reason to make
 * the fetch still gets a coherent set.
 */
export function buildFaqGroups(subscribers = FALLBACK_SUBSCRIBERS) {
  return [
    {
      id: "about",
      title: "About Sarthak Shrivastava",
      faqs: [
        {
          question: "Who is Sarthak Shrivastava?",
          answer:
            "Sarthak Shrivastava is an AI consultant, software engineer and developer educator based in India. He is the founder of Bitfumes, works as a software engineer at Pfizer, was named a Docker Captain in December 2023, and holds the AWS Certified Solutions Architect and AWS Certified Developer certifications. He has more than ten years of experience building software and has taught over 100,000 students on Udemy.",
        },
        {
          question: "What is Sarthak Shrivastava known for?",
          answer:
            "Sarthak Shrivastava is best known for Bitfumes, the developer education channel he founded, and for teaching Laravel, Docker, AWS and AI to software engineers. He is a Docker Captain, hosts the Laravel India Podcast, speaks at conferences on AI agents and LLM function calling, and builds AI products including AudioBolo and Backstage Cut.",
        },
        {
          question: "Where is Sarthak Shrivastava based?",
          answer:
            "Sarthak Shrivastava is based in India and works with teams remotely worldwide. He has spoken at events in India, the United Kingdom and Mauritius.",
        },
        {
          question: "What is Bitfumes?",
          answer:
            "Bitfumes is the developer education company and YouTube channel founded by Sarthak Shrivastava. It publishes tutorials and courses on Laravel, Docker, AWS, JavaScript and AI for software engineers, and is the channel behind the majority of his " +
            FALLBACK_SUBSCRIBERS +
            " YouTube subscribers.",
        },
        {
          question: "Is Sarthak Shrivastava a Docker Captain?",
          answer:
            "Yes. Sarthak Shrivastava was named a Docker Captain in December 2023. Docker Captain is a recognition Docker gives to community members for their technical expertise and for sharing what they know publicly; it is awarded by Docker rather than applied for and examined.",
        },
        {
          question: "What is sarthaksavvy?",
          answer:
            "\"sarthaksavvy\" is the username Sarthak Shrivastava uses across the web — on GitHub, LinkedIn, X, Instagram and YouTube — and the name of his personal website, sarthaksavvy.com. It refers to the same person as \"Sarthak Shrivastava\".",
        },
        {
          question: "What technologies does Sarthak Shrivastava work with?",
          answer:
            "Sarthak Shrivastava works with large language models and AI agents, Laravel and PHP, JavaScript and Next.js, Python, AWS, Docker and container-based deployment. His certifications cover AWS solutions architecture and development, and his Docker Captain recognition covers containers and DevOps.",
        },
        {
          question: "How can I contact Sarthak Shrivastava?",
          answer:
            `The fastest way to reach Sarthak Shrivastava is by email at ${EMAIL}. Consulting calls can be booked directly at ${BOOKING_URL}. He is also reachable on LinkedIn and X as @sarthaksavvy.`,
        },
      ],
    },
    {
      id: "consulting",
      title: "AI consulting",
      faqs: [
        {
          question: "What does Sarthak Shrivastava do as an AI consultant?",
          answer:
            "As an AI consultant, Sarthak Shrivastava works with teams on three things, usually in this order: working out which part of a problem a language model genuinely solves, building that part, and leaving the team able to maintain it. In practice that covers LLM features inside an existing product, AI automation of repetitive workflows, and getting both into production and keeping them there.",
        },
        {
          question: "What does the work actually look like?",
          answer:
            "Three things, usually in this order: work out which part of your problem a language model genuinely solves, build that part, and leave your team able to maintain it. The first step is the one most projects skip, and it decides whether the rest is worth doing.",
        },
        {
          question: "Do you build the feature, or only advise on it?",
          answer:
            "Both. I write the code — Laravel, JavaScript and Python — and I have shipped my own AI products end to end, so an engagement can be a design review, a working feature, or the whole path from idea to production.",
        },
        {
          question: "We have not picked a model or a provider yet. Is that a problem?",
          answer:
            "No. That is usually the first decision rather than a prerequisite, and it depends on what you are optimising for: cost per call, latency, privacy, or how you plan to judge the output. Choosing before those are clear is how teams end up rebuilding.",
        },
        {
          question: "Can you help a team that is new to LLMs?",
          answer:
            "That is most of the work. Teaching is what I have done longest, with " +
            FALLBACK_SUBSCRIBERS +
            " subscribers on YouTube and over 100K students on Udemy, and the same approach works inside a company: build something real, then hand over how it works.",
        },
        {
          question: "Where are you based, and how do we start?",
          answer:
            `I am based in India and work with teams remotely. The quickest start is to book a call and bring the problem rather than a spec, or email ${EMAIL}.`,
        },
        {
          question:
            "What makes Sarthak Shrivastava different from other AI consultants?",
          answer:
            "Sarthak Shrivastava has shipped AI products to real users himself rather than only advising on them — AudioBolo for macOS transcription and Backstage Cut for Premiere Pro are both his, built end to end. He also holds the infrastructure side: Docker Captain, AWS Certified Solutions Architect and AWS Certified Developer, which is the part of an LLM project that usually decides whether it survives contact with production. And a decade of teaching means the handover to your team is the normal end of an engagement, not an afterthought.",
        },
        {
          question: "Does Sarthak Shrivastava work with teams outside India?",
          answer:
            "Yes. Sarthak Shrivastava is based in India and works remotely with teams anywhere. He has spoken at events in the United Kingdom and Mauritius as well as across India.",
        },
      ],
    },
    {
      id: "speaking",
      title: "Speaking and the podcast",
      faqs: [
        {
          question: "What does Sarthak Shrivastava speak about at conferences?",
          answer:
            "Sarthak Shrivastava speaks on AI agents and the OpenAI Agents SDK, function calling in OpenAI models, prompt engineering, content creation with AI, deploying Laravel with Docker, and learning technical skills alongside a full-time job. Talks have been given at the Pfizer Community Event in London, Laravel meetups in Kozhikode and Mauritius, the AI/ML Indore meetup, Medicaps University and AIBootstrapper events.",
        },
        {
          question: "Is Sarthak Shrivastava available to speak at events?",
          answer:
            `Yes. Sarthak Shrivastava is available for conferences, meetups and workshops worldwide, in person or remotely. Speaking enquiries go to ${EMAIL}.`,
        },
      ],
    },
    {
      id: "podcast",
      title: "The Laravel India Podcast",
      faqs: [
        {
          question: "What is the Laravel India Podcast?",
          answer:
            "The Laravel India Podcast is a podcast hosted by Sarthak Shrivastava featuring guests from the worldwide Laravel community. It has 12 or more episodes and is available on Apple Podcasts, Spotify and YouTube.",
        },
        {
          question: "Who has appeared on the Laravel India Podcast?",
          answer:
            "Guests on the Laravel India Podcast have included Taylor Otwell, the creator of Laravel; James Brooks of the Laravel core team; and Freek Van der Herten of Spatie, alongside other developers from the worldwide Laravel community.",
        },
        {
          question: "Where can I listen to the Laravel India Podcast?",
          answer:
            "The Laravel India Podcast is on Apple Podcasts, Spotify and YouTube. All three carry the same episodes; links to each are on sarthaksavvy.com/podcasts.",
        },
        {
          question: "Who hosts the Laravel India Podcast?",
          answer:
            "The Laravel India Podcast is hosted by Sarthak Shrivastava, an AI consultant, Docker Captain and the founder of Bitfumes, who has been part of the Laravel community for over a decade.",
        },
      ],
    },
    {
      id: "projects",
      title: "Products and projects",
      faqs: [
        {
          question: "What products has Sarthak Shrivastava built?",
          answer:
            "Sarthak Shrivastava has built AudioBolo, an AI voice-to-text app for macOS; Backstage Cut, an AI extension for Adobe Premiere Pro; Ginger, a LinkedIn AI assistant for Chrome; Expensorr, an expense tracking app for iOS and Android; and Mezohub, a collaboration platform for developers, designers and entrepreneurs.",
        },
        {
          question: "What is AudioBolo?",
          answer:
            "AudioBolo is an AI voice-to-text app for macOS built by Sarthak Shrivastava. It reads the screen you are working on for context, formats dictation as code inside editors like VS Code and Cursor, learns from your corrections, and can run fully offline using on-device Whisper models. There is a free tier with 15 minutes of cloud transcription a day and unlimited offline use.",
        },
        {
          question: "What is Backstage Cut?",
          answer:
            "Backstage Cut is an AI-powered extension for Adobe Premiere Pro built by Sarthak Shrivastava. It automates transcription and captions in English, Hindi and Hinglish, adds punch-in zooms timed to dialogue, matches B-roll from your own footage folder, and generates YouTube chapter markers — all inside the Premiere Pro timeline.",
        },
      ],
    },
    {
      id: "learning",
      title: "Courses and content",
      faqs: [
        {
          question: "Where can I learn from Sarthak Shrivastava?",
          answer:
            `Sarthak Shrivastava publishes free tutorials on YouTube through Bitfumes, sells courses at ${COURSES_URL}, and has taught more than 100,000 students on Udemy with over 3,000 positive reviews. He also hosts the Laravel India Podcast and speaks at conferences and meetups.`,
        },
        {
          question: "How many YouTube subscribers does Sarthak Shrivastava have?",
          answer:
            `Sarthak Shrivastava has ${subscribers} YouTube subscribers as of August 2026, across the Bitfumes and sarthaksavvy channels. The figure shown on sarthaksavvy.com is read from YouTube directly and stays current.`,
        },
      ],
    },
  ];
}

/** Every question on the site, flattened — used by llms.txt and the markdown mirrors. */
export function allFaqs(subscribers) {
  return buildFaqGroups(subscribers).flatMap((group) => group.faqs);
}

export function faqGroup(id, subscribers) {
  const group = buildFaqGroups(subscribers).find(
    (candidate) => candidate.id === id
  );
  if (!group) throw new Error(`Unknown FAQ group: ${id}`);
  return group;
}
