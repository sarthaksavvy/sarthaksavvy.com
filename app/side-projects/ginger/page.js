import {
  ArrowLeft,
  ArrowRight,
  Chrome,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import { ogImages, pageMetadata } from "../../seo";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  personSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "../../structuredData";
import { projectByPath } from "../../content/projects";

const SITE =
  "https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba";

const DESCRIPTION =
  "Ginger is a Chrome extension that helps users generate human-like comments using AI on LinkedIn posts and reply to existing comments effortlessly.";

export const metadata = pageMetadata({
  title: "Ginger - LinkedIn AI Assistant | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/side-projects/ginger",
  image: ogImages.ginger,
});

// The same record the index page and the /side-projects/ginger.md mirror
// render from, so the product is described identically wherever it appears.
const project = projectByPath("/side-projects/ginger");

const structuredData = graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/side-projects/ginger",
    name: "Ginger — LinkedIn AI assistant for Chrome",
    description: DESCRIPTION,
    primaryImage: project.image,
  }),
  softwareApplicationSchema({
    name: "Ginger",
    description: DESCRIPTION,
    url: SITE,
    path: "/side-projects/ginger",
    image: ogImages.ginger.url,
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome",
    features: project.features,
  }),
  breadcrumbSchema([
    { name: "Side Projects", path: "/side-projects" },
    { name: "Ginger", path: "/side-projects/ginger" },
  ])
);

export default function GingerProject() {
  const features = [
    {
      icon: <MessageSquare size={24} className="text-accent" />,
      title: "AI Comment Generation",
      description:
        "Generate thoughtful, contextual comments on LinkedIn posts with a single click. Let AI help you craft professional, engaging responses.",
    },
    {
      icon: <RefreshCw size={24} className="text-accent" />,
      title: "Comment Reply Assistance",
      description:
        "Effortlessly reply to any comments on LinkedIn posts with AI-powered suggestions that maintain your professional voice.",
    },
    {
      icon: <Zap size={24} className="text-accent" />,
      title: "No Sign-in Required",
      description:
        "Get started immediately with no account creation required. Simply install the extension and begin enhancing your LinkedIn engagement.",
    },
    {
      icon: <Shield size={24} className="text-accent" />,
      title: "Generous Free Usage",
      description:
        "Enjoy 100 free comment generations as a guest user. Sign in to unlock 300 generations for even more networking opportunities.",
    },
  ];

  const testimonials = [
    {
      text: "Ginger has transformed how I engage on LinkedIn. The comments it generates are indistinguishable from what I would write myself!",
      author: "Emma R.",
      rating: 5,
    },
    {
      text: "This extension has saved me countless hours while helping me maintain an active presence on LinkedIn. A must-have for professionals.",
      author: "David K.",
      rating: 5,
    },
    {
      text: "The ability to reply to comments with AI assistance has significantly increased my engagement rates. Highly recommended.",
      author: "Alex M.",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink py-16 px-6">
      <JsonLd data={structuredData} />
      <div className="container mx-auto max-w-6xl">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            href="/side-projects"
            className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Side Projects
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h1 className="font-display text-5xl md:text-6xl mb-6">Ginger</h1>
            <p className="text-xl text-ink/70 mb-8">
              A powerful LinkedIn AI assistant that helps you craft thoughtful,
              engaging comments and replies. Elevate your professional
              networking with intelligent, human-like interactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
              >
                Add to Chrome
                <ExternalLink size={18} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 bg-transparent border border-ink/20 text-ink px-6 py-3 rounded-full font-medium hover:bg-line/60 transition-colors"
              >
                Learn More
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl bg-paper border border-line p-6 flex items-center justify-center">
            <div className="w-4/5 relative">
              <div className="bg-white p-3 rounded-t-lg flex items-center">
                <Chrome size={20} className="text-[#4285F4] mr-2" />
                <div className="h-8 bg-gray-100 rounded-full flex-1 px-4 flex items-center text-muted text-sm">
                  chrome://extensions
                </div>
              </div>
              <div className="bg-gray-100 rounded-b-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-2xl mr-4">
                    G
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-lg">
                      Ginger - LinkedIn AI Assistant
                    </h3>
                    <p className="text-muted text-sm">
                      Help you write comments, connect with people, and grow
                      your network.
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                    Installed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-6 text-accent" id="overview">
            Project Overview
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <p className="text-ink/70 mb-6">
              Ginger was created to solve a common challenge faced by
              professionals: maintaining an active and engaging presence on
              LinkedIn while managing limited time. Many professionals
              understand the importance of networking but struggle to craft
              meaningful comments and responses consistently.
            </p>
            <p className="text-ink/70">
              This Chrome extension leverages AI to analyze LinkedIn posts and
              generate contextually relevant, professional comments that sound
              natural and authentic. With its simple installation process and
              immediate usability, Ginger helps users enhance their LinkedIn
              engagement without the learning curve or time investment typically
              required for effective networking.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20" id="features">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-ink/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            How It Works
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Install</h3>
                <p className="text-ink/70">
                  Add the Ginger extension to your Chrome browser with a single
                  click from the Chrome Web Store.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Browse</h3>
                <p className="text-ink/70">
                  Navigate to LinkedIn and find posts you&apos;d like to engage
                  with
                  in your feed or network.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Generate</h3>
                <p className="text-ink/70">
                  Click the Ginger icon to instantly generate contextual,
                  professional comments that sound like you wrote them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            User Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < testimonial.rating ? "#FF5A1F" : "none"}
                      className={
                        i < testimonial.rating
                          ? "text-accent"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                <p className="text-ink/70 mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="font-medium">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Get Started Now
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg text-center">
            <p className="text-xl text-ink/70 mb-8 max-w-2xl mx-auto">
              Transform your LinkedIn engagement with Ginger. Install now and
              enjoy 100 free comment generations as a guest user, or sign in for
              300 generations.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 rounded-full font-medium hover:bg-accent transition-colors text-lg"
            >
              <Chrome size={24} />
              Add to Chrome
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        {/* Back to Projects */}
        <div className="text-center">
          <Link
            href="/side-projects"
            className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Side Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
