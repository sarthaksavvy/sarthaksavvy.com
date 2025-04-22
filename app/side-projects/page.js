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
        "A centralized platform for connecting developers, designers, and entrepreneurs to collaborate on innovative projects.",
      image: "/images/projects/mezohub.jpg",
      link: "https://mezohub.com",
      projectLink: "/side-projects/mezohub",
      tags: ["Collaboration", "Platform", "Community"],
      features: [
        "Project discovery and matching",
        "Integrated messaging system",
        "Skill-based team formation",
        "Project showcase portfolio",
      ],
    },
    {
      id: 2,
      name: "Expensorr",
      description:
        "A simple yet powerful expense tracking application that helps you monitor and manage your personal finances with ease.",
      image: "/images/projects/expensorr.jpg",
      link: "https://apps.apple.com/us/app/expensorr/id6739472004",
      projectLink: "/side-projects/expensorr",
      tags: ["Finance", "Tracking", "Mobile App"],
      features: [
        "Receipt scanning and categorization",
        "Budget planning and alerts",
        "Expense reports and analytics",
        "Multi-currency support",
      ],
    },
    {
      id: 3,
      name: "Ginger",
      description:
        "A Chrome extension that helps users generate human-like comments using AI on LinkedIn posts and reply to existing comments effortlessly.",
      image: "/images/projects/ginger.jpg",
      link: "https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba",
      projectLink: "/side-projects/ginger",
      tags: ["AI", "Chrome Extension", "LinkedIn"],
      features: [
        "Human-like LinkedIn comment generation",
        "Reply to comments with AI assistance",
        "No sign-in required to get started",
        "100 free generations for guests, 300 for signed-in users",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-6">SIDE PROJECTS</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Exploring my creativity and expanding my skills through these
            passion projects. Each project is an opportunity to innovate and
            solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link href={project.projectLink}>
                <div className="h-64 relative bg-gray-800">
                  <ClientImage
                    src={project.image}
                    alt={project.name}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#4c346b] text-[#f4f0fc] text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={project.projectLink}>
                  <h2 className="text-3xl font-bold mb-3 text-[#ffffff] hover:text-[#D1F366] transition-colors">
                    {project.name}
                  </h2>
                </Link>
                <p className="text-[#f4f0fc] mb-6">{project.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#ff6e6c]">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-[#f4f0fc]"
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff6e6c] mt-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={project.projectLink}
                    className="inline-flex items-center gap-2 bg-[#D1F366] text-black px-6 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>

                  <a
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
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
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Interested in collaborating?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always open to new ideas and collaborations on interesting
            projects. Let's create something amazing together!
          </p>
          <a
            href="mailto:sarthak@bitfumes.com"
            className="bg-[#D1F366] text-black px-8 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors inline-flex items-center gap-2"
          >
            Get in Touch
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
