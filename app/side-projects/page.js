import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ClientImage from "../components/ClientImage";

export const metadata = {
  title: "Sarthak Shrivastava - Side Projects",
  description: "Side Projects by Sarthak Shrivastava",
  alternates: {
    canonical: "https://sarthaksavvy.com/side-projects",
  },
  openGraph: {
    title: "Sarthak Shrivastava - Side Projects",
    description: "Side Projects by Sarthak Shrivastava",
    url: "https://sarthaksavvy.com/side-projects",
    siteName: "Sarthak Shrivastava - Side Projects",
    images: "/sarthak.jpg",
  },
};

export default function SideProjects() {
  const projects = [
    {
      id: 1,
      name: "Mezohub",
      description:
        "A revolutionary centralized platform designed to bridge the gap between talented developers, creative designers, and visionary entrepreneurs. Mezohub transforms the way teams form and collaborate on innovative projects by leveraging intelligent matching algorithms and comprehensive project management tools.",
      image: "/images/projects/mezohub.jpg",
      link: "https://mezohub.com",
      projectLink: "/side-projects/mezohub",
      tags: ["Collaboration", "Platform", "Community"],
      status: "Live & Growing",
      timeline: "6 months development",
      techStack: ["React", "Laravel", "MySQL", "WebSocket", "Digital Ocean"],
      features: [
        "AI-powered project discovery and intelligent team matching",
        "Real-time integrated messaging system with file sharing",
        "Advanced skill-based team formation algorithms",
        "Comprehensive project showcase portfolio with analytics",
        "Milestone tracking and project management tools",
        "Community-driven feedback and rating system",
      ],
      metrics: {
        users: "500+ active users",
        projects: "150+ projects launched",
        success: "85% project completion rate",
      },
    },
    {
      id: 2,
      name: "Expensorr",
      description:
        "A beautifully crafted, intuitive expense tracking application that revolutionizes personal finance management. Built with a focus on simplicity without sacrificing powerful features, Expensorr helps users take complete control of their financial habits through smart automation and insightful analytics.",
      image: "/images/projects/expensorr.jpg",
      link: "https://apps.apple.com/us/app/expensorr/id6739472004",
      projectLink: "/side-projects/expensorr",
      tags: ["Finance", "Tracking", "Mobile App"],
      status: "Available on App Store",
      timeline: "4 months development",
      techStack: ["Flutter", "Firebase", "Cloud Functions", "Figma"],
      features: [
        "Advanced OCR receipt scanning with automatic categorization",
        "Intelligent budget planning with predictive alerts",
        "Comprehensive expense reports and visual analytics",
        "Multi-currency support with real-time exchange rates",
        "Cloud synchronization across all devices",
        "Customizable spending categories and tags",
        "Export capabilities for tax preparation",
      ],
      metrics: {
        downloads: "1,000+ downloads",
        rating: "4.8/5 stars",
        retention: "70% monthly active users",
      },
    },
    {
      id: 3,
      name: "Ginger",
      description:
        "An innovative AI-powered Chrome extension that transforms LinkedIn networking by generating authentic, contextually relevant comments and replies. Ginger leverages advanced natural language processing to help professionals maintain meaningful engagement while saving valuable time and enhancing their online presence.",
      image: "/images/projects/ginger.jpg",
      link: "https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba",
      projectLink: "/side-projects/ginger",
      tags: ["AI", "Chrome Extension", "LinkedIn"],
      status: "Published on Chrome Web Store",
      timeline: "3 months development",
      techStack: ["JavaScript", "Chrome APIs", "OpenAI GPT", "Manifest V3"],
      features: [
        "Context-aware AI comment generation with human-like authenticity",
        "Intelligent reply assistance for existing comment threads",
        "Zero friction onboarding - no sign-in required to start",
        "Generous free tier: 100 generations for guests, 300 for users",
        "Tone customization for professional, casual, or enthusiastic responses",
        "Privacy-first design with no data storage",
        "Real-time content analysis and suggestion refinement",
      ],
      metrics: {
        installs: "2,500+ active installations",
        rating: "4.9/5 stars",
        engagement: "40% increase in user LinkedIn activity",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-20">
          <div className="relative">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              SIDE PROJECTS
            </h1>
            <div className="absolute -top-2 -left-2 w-24 h-24 bg-gradient-to-r from-[#D1F366]/20 to-[#ff6e6c]/20 rounded-full blur-xl"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            Transforming ideas into reality through innovative technology solutions. 
            Each project represents a journey of creativity, problem-solving, and continuous learning, 
            designed to make a meaningful impact in the digital world.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D1F366] rounded-full"></div>
              3 Active Projects
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#ff6e6c] rounded-full"></div>
              Multiple Tech Stacks
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4c346b] rounded-full"></div>
              Real-world Impact
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#2A2A2A] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-800/50 hover:border-gray-700/50"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D1F366]/5 via-transparent to-[#ff6e6c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <Link href={project.projectLink}>
                <div className="h-72 relative bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  <ClientImage
                    src={project.image}
                    alt={project.name}
                    className="transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#D1F366]">
                    {project.status}
                  </div>
                </div>
              </Link>
              
              <div className="p-8 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gradient-to-r from-[#4c346b] to-[#5d4a7a] text-[#f4f0fc] text-xs font-medium px-3 py-1.5 rounded-full border border-[#6b5b95]/30 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href={project.projectLink}>
                  <h2 className="text-3xl font-bold mb-4 text-white hover:text-[#D1F366] transition-colors duration-300 group-hover:translate-x-1">
                    {project.name}
                  </h2>
                </Link>
                
                <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="mb-6 p-4 bg-black/30 rounded-xl border border-gray-700/30">
                    <h4 className="text-sm font-semibold text-[#D1F366] mb-2">Project Metrics</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key}:</span>
                          <span className="font-medium text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-[#ff6e6c] flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#ff6e6c] rounded-full"></span>
                    Key Features
                  </h3>
                  <ul className="space-y-2.5">
                    {project.features.slice(0, 4).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff6e6c] mt-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                    {project.features.length > 4 && (
                      <li className="text-xs text-gray-400 italic">
                        +{project.features.length - 4} more features...
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded border border-gray-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700/30">
                  <Link
                    href={project.projectLink}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D1F366] to-[#bde052] text-black px-6 py-3 rounded-full font-medium hover:from-[#bde052] hover:to-[#a8c947] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>

                  <a
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-transparent border border-gray-600 text-gray-300 px-6 py-3 rounded-full font-medium hover:bg-white/10 hover:border-gray-500 hover:text-white transition-all duration-300"
                  >
                    Visit Project
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#2A2A2A] rounded-3xl p-12 shadow-2xl text-center border border-gray-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D1F366]/10 via-transparent to-[#ff6e6c]/10"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#D1F366]/20 to-[#ff6e6c]/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-[#4c346b]/20 to-[#D1F366]/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              I&apos;m passionate about turning innovative ideas into reality. Whether you have a project concept, 
              need technical consultation, or want to collaborate on the next big thing, let&apos;s connect and 
              create something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="mailto:sarthak@bitfumes.com"
                className="bg-gradient-to-r from-[#D1F366] to-[#bde052] text-black px-8 py-4 rounded-full font-medium hover:from-[#bde052] hover:to-[#a8c947] transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get in Touch
                <ArrowRight size={20} />
              </a>
              
              <a
                href="https://cal.com/sarthaksavvy"
                target="_blank"
                className="bg-transparent border border-gray-600 text-gray-300 px-8 py-4 rounded-full font-medium hover:bg-white/10 hover:border-gray-500 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
              >
                Schedule a Call
                <ArrowRight size={20} />
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D1F366] rounded-full"></div>
                Open to Collaborations
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ff6e6c] rounded-full"></div>
                Technical Consulting
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4c346b] rounded-full"></div>
                Startup Partnerships
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
