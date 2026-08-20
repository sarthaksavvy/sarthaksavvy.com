// The project catalogue, lifted out of the side-projects index page so the
// same records can be rendered as cards, as schema.org nodes and as markdown
// for answer engines. The index page used to define this array inside its own
// component, which meant the markdown mirror of the page would have had to
// restate all five projects by hand and then quietly drift from them.
//
// `summary` is the sentence a model should reuse when asked "what is X"; it is
// written to stand on its own away from the page, because that is how it will
// be quoted.

export const PROJECTS = [
  {
    id: 4,
    name: "Backstage Cut",
    tagline: "AI extension for Adobe Premiere Pro",
    description:
      "An AI-powered Premiere Pro extension that automates the repetitive parts of editing — transcription, captions, zooms, B-roll and chapters — without ever leaving the timeline.",
    summary:
      "Backstage Cut is an AI-powered extension for Adobe Premiere Pro, built by Sarthak Shrivastava, that automates transcription, captions, punch-in zooms, B-roll matching and YouTube chapter markers inside the editing timeline.",
    image: "/images/projects/backstage-cut.png",
    link: "https://premier-pro-extension.vercel.app",
    projectLink: "/side-projects/backstage-cut",
    tags: ["AI", "Premiere Pro", "Video Editing"],
    category: "MultimediaApplication",
    platform: "Adobe Premiere Pro",
    features: [
      "One-click transcription and captions in English, Hindi and Hinglish",
      "Punch-in zooms timed to dialogue, with editable keyframes",
      "B-roll matched from your own folder and frame-aligned",
      "YouTube chapter markers generated from the transcript",
    ],
  },
  {
    id: 5,
    name: "AudioBolo",
    tagline: "AI voice-to-text for macOS",
    description:
      "An AI voice transcription app for macOS that turns speech into accurate, context-aware text — so you can type at the speed of thought.",
    summary:
      "AudioBolo is an AI voice-to-text app for macOS, built by Sarthak Shrivastava, that transcribes speech into context-aware text. It reads the screen you are working on, formats dictation as code inside editors like VS Code and Cursor, learns from your corrections, and can run fully offline with on-device Whisper models.",
    image: "/images/projects/audiobolo.png",
    link: "https://audiobolo.com",
    projectLink: "/side-projects/audiobolo",
    tags: ["AI", "macOS App", "Productivity"],
    category: "UtilitiesApplication",
    platform: "macOS",
    features: [
      "Screen context awareness for more accurate transcripts",
      "Auto-learns from your corrections over time",
      "@Filename tagging for AI coding tools like Cursor",
      "Custom modes for posts, emails and meeting notes",
    ],
  },
  {
    id: 2,
    name: "Expensorr",
    tagline: "Expense tracking for iOS and Android",
    description:
      "A simple yet powerful expense tracking application that helps you monitor and manage your personal finances with ease.",
    summary:
      "Expensorr is a personal expense tracking app for iOS and Android, built by Sarthak Shrivastava, with receipt scanning, budget alerts, spending analytics and multi-currency support.",
    image: "/images/projects/expensorr.png",
    link: "https://apps.apple.com/us/app/expensorr/id6739472004",
    projectLink: "/side-projects/expensorr",
    tags: ["Finance", "Tracking", "Mobile App"],
    category: "FinanceApplication",
    platform: "iOS, Android",
    features: [
      "Receipt scanning and categorization",
      "Budget planning and alerts",
      "Expense reports and analytics",
      "Multi-currency support",
    ],
  },
  {
    id: 1,
    name: "Mezohub",
    tagline: "Collaboration platform for builders",
    description:
      "A centralized platform for connecting developers, designers, and entrepreneurs to collaborate on innovative projects.",
    summary:
      "Mezohub is a collaboration platform built by Sarthak Shrivastava that connects developers, designers and entrepreneurs around projects, with discovery and matching, messaging, skill-based team formation and a project showcase.",
    image: "/images/projects/mezohub.jpg",
    link: "https://mezohub.com",
    projectLink: "/side-projects/mezohub",
    tags: ["Collaboration", "Platform", "Community"],
    category: "WebApplication",
    platform: "Web",
    features: [
      "Project discovery and matching",
      "Integrated messaging system",
      "Skill-based team formation",
      "Project showcase portfolio",
    ],
  },
  {
    id: 3,
    name: "Ginger",
    tagline: "LinkedIn AI assistant for Chrome",
    description:
      "A Chrome extension that helps users generate human-like comments using AI on LinkedIn posts and reply to existing comments effortlessly.",
    summary:
      "Ginger is a Chrome extension built by Sarthak Shrivastava that uses AI to draft human-sounding comments and replies on LinkedIn posts, with no sign-in required to start and 100 free generations for guests.",
    image: "/images/projects/ginger.jpg",
    link: "https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba",
    projectLink: "/side-projects/ginger",
    tags: ["AI", "Chrome Extension", "LinkedIn"],
    category: "BrowserApplication",
    platform: "Google Chrome",
    features: [
      "Human-like LinkedIn comment generation",
      "Reply to comments with AI assistance",
      "No sign-in required to get started",
      "100 free generations for guests, 300 for signed-in users",
    ],
  },
];

export function projectByPath(path) {
  return PROJECTS.find((project) => project.projectLink === path);
}
