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

export const metadata = {
  title: "Ginger - LinkedIn AI Assistant | Sarthak Shrivastava",
  description:
    "Ginger is a Chrome extension that helps users generate human-like comments using AI on LinkedIn posts and reply to existing comments effortlessly.",
  openGraph: {
    title: "Ginger - LinkedIn AI Assistant | Sarthak Shrivastava",
    description:
      "Ginger is a Chrome extension that helps users generate human-like comments using AI on LinkedIn posts and reply to existing comments effortlessly.",
    url: "https://sarthaksavvy.com/side-projects/ginger",
    siteName: "Sarthak Shrivastava - Ginger",
    images: "/images/projects/ginger.jpg",
  },
};

export default function GingerProject() {
  const features = [
    {
      icon: <MessageSquare size={24} className="text-[#D1F366]" />,
      title: "AI Comment Generation",
      description:
        "Generate thoughtful, contextual comments on LinkedIn posts with a single click. Let AI help you craft professional, engaging responses.",
    },
    {
      icon: <RefreshCw size={24} className="text-[#D1F366]" />,
      title: "Comment Reply Assistance",
      description:
        "Effortlessly reply to any comments on LinkedIn posts with AI-powered suggestions that maintain your professional voice.",
    },
    {
      icon: <Zap size={24} className="text-[#D1F366]" />,
      title: "No Sign-in Required",
      description:
        "Get started immediately with no account creation required. Simply install the extension and begin enhancing your LinkedIn engagement.",
    },
    {
      icon: <Shield size={24} className="text-[#D1F366]" />,
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
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            href="/side-projects"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Side Projects
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Ginger</h1>
            <p className="text-xl text-gray-300 mb-8">
              A powerful LinkedIn AI assistant that helps you craft thoughtful,
              engaging comments and replies. Elevate your professional
              networking with intelligent, human-like interactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D1F366] text-black px-6 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors"
              >
                Add to Chrome
                <ExternalLink size={18} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-6 flex items-center justify-center">
            <div className="w-4/5 relative">
              <div className="bg-white p-3 rounded-t-lg flex items-center">
                <Chrome size={20} className="text-[#4285F4] mr-2" />
                <div className="h-8 bg-gray-100 rounded-full flex-1 px-4 flex items-center text-gray-500 text-sm">
                  chrome://extensions
                </div>
              </div>
              <div className="bg-gray-100 rounded-b-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-2xl mr-4">
                    G
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg">
                      Ginger - LinkedIn AI Assistant
                    </h3>
                    <p className="text-gray-600 text-sm">
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
          <h2 className="text-3xl font-bold mb-6 text-[#D1F366]" id="overview">
            Project Overview
          </h2>
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg">
            <p className="text-gray-300 mb-6">
              Ginger was created to solve a common challenge faced by
              professionals: maintaining an active and engaging presence on
              LinkedIn while managing limited time. Many professionals
              understand the importance of networking but struggle to craft
              meaningful comments and responses consistently.
            </p>
            <p className="text-gray-300">
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
          <h2 className="text-3xl font-bold mb-8 text-[#D1F366]">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#D1F366]">
            How It Works
          </h2>
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#D1F366] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Install</h3>
                <p className="text-gray-300">
                  Add the Ginger extension to your Chrome browser with a single
                  click from the Chrome Web Store.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#D1F366] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Browse</h3>
                <p className="text-gray-300">
                  Navigate to LinkedIn and find posts you'd like to engage with
                  in your feed or network.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#D1F366] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Generate</h3>
                <p className="text-gray-300">
                  Click the Ginger icon to instantly generate contextual,
                  professional comments that sound like you wrote them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#D1F366]">
            User Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < testimonial.rating ? "#D1F366" : "none"}
                      className={
                        i < testimonial.rating
                          ? "text-[#D1F366]"
                          : "text-gray-500"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-medium">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#D1F366]">
            Get Started Now
          </h2>
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg text-center">
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your LinkedIn engagement with Ginger. Install now and
              enjoy 100 free comment generations as a guest user, or sign in for
              300 generations.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D1F366] text-black px-8 py-4 rounded-full font-medium hover:bg-[#bde052] transition-colors text-lg"
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
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Side Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
