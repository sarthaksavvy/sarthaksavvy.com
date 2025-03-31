import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Code,
  ExternalLink,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";
import ClientImage from "../../components/ClientImage";

export const metadata = {
  title: "Mezohub - Backend Deployment Platform | Sarthak Shrivastava",
  description:
    "Mezohub is a platform for developers, freelancers, and entrepreneurs to deploy your backend project with ease.",
  openGraph: {
    title: "Mezohub - Backend Deployment Platform | Sarthak Shrivastava",
    description:
      "Mezohub is a platform for developers, freelancers, and entrepreneurs to deploy your backend project with ease.",
    url: "https://sarthaksavvy.com/side-projects/mezohub",
    siteName: "Sarthak Shrivastava - Mezohub",
    images: "/images/projects/mezohub.jpg",
  },
};

export default function MezohubProject() {
  const features = [
    {
      icon: <Users size={24} className="text-[#D1F366]" />,
      title: "Team Formation",
      description:
        "Deploy your backend project with ease. Our intelligent matching algorithm connects you with the right people.",
    },
    {
      icon: <Share2 size={24} className="text-[#D1F366]" />,
      title: "Project Showcase",
      description:
        "Deploy your backend project with ease. Our intelligent matching algorithm connects you with the right people.",
    },
    {
      icon: <MessageCircle size={24} className="text-[#D1F366]" />,
      title: "Integrated Messaging",
      description:
        "Deploy your backend project with ease. Our intelligent matching algorithm connects you with the right people.",
    },
    {
      icon: <Code size={24} className="text-[#D1F366]" />,
      title: "Resource Sharing",
      description:
        "Deploy your backend project with ease. Our intelligent matching algorithm connects you with the right people.",
    },
  ];

  const benefits = [
    {
      title: "For Developers",
      points: [
        "Deploy your backend project with ease",
        "Showcase your coding skills and portfolio",
        "Connect with designers and other professionals",
        "Learn new technologies through collaboration",
      ],
    },
    {
      title: "For Designers",
      points: [
        "Deploy your backend project with ease",
        "Showcase your coding skills and portfolio",
        "Connect with designers and other professionals",
        "Learn new technologies through collaboration",
      ],
    },
    {
      title: "For Entrepreneurs",
      points: [
        "Deploy your backend project with ease",
        "Showcase your coding skills and portfolio",
        "Connect with designers and other professionals",
        "Learn new technologies through collaboration",
      ],
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Mezohub</h1>
            <p className="text-xl text-gray-300 mb-8">
              A platform for connecting developers, designers, and entrepreneurs
              to deploy their backend project with ease. Mezohub bridges the gap
              between ideas and execution.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://mezohub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D1F366] text-black px-6 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors"
              >
                Visit Mezohub
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
            <ClientImage
              src="/images/projects/mezohub.jpg"
              alt="Mezohub Platform"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-[#D1F366]">
            Project Overview
          </h2>
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg">
            <p className="text-gray-300 mb-6">
              Mezohub was born out of the need to deploy your backend project
              with ease. The platform solves the common problem of deployment
              and deployment of backend projects.
            </p>
            <p className="text-gray-300">
              As a developer, I often found it challenging to deploy my backend
              project with ease. Mezohub addresses this by creating a dedicated
              space where skills, projects, and ideas can converge, making the
              collaboration process more efficient and productive.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
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

        {/* Benefits for Different Users */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#D1F366]">
            Who Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <ul className="space-y-3">
                  {benefit.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <CheckCircle
                        size={18}
                        className="text-[#D1F366] mt-1 flex-shrink-0"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-[#D1F366]">
            Technologies Used
          </h2>
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-[#252525] rounded-xl">
                <p className="font-semibold">React</p>
                <p className="text-sm text-gray-400">Frontend Framework</p>
              </div>
              <div className="text-center p-4 bg-[#252525] rounded-xl">
                <p className="font-semibold">Laravel</p>
                <p className="text-sm text-gray-400">Backend</p>
              </div>
              <div className="text-center p-4 bg-[#252525] rounded-xl">
                <p className="font-semibold">MySQL</p>
                <p className="text-sm text-gray-400">Database</p>
              </div>
              <div className="text-center p-4 bg-[#252525] rounded-xl">
                <p className="font-semibold">WebSocket</p>
                <p className="text-sm text-gray-400">Real-time Communication</p>
              </div>
              <div className="text-center p-4 bg-[#252525] rounded-xl">
                <p className="font-semibold">Digital Ocean</p>
                <p className="text-sm text-gray-400">Cloud Infrastructure</p>
              </div>
              <div className="text-center p-4 bg-[#252525] rounded-xl">
                <p className="font-semibold">Tailwind CSS</p>
                <p className="text-sm text-gray-400">Styling</p>
              </div>
              <div className="text-center p-4 bg-[#252525] rounded-xl">
                <p className="font-semibold">GitHub Actions</p>
                <p className="text-sm text-gray-400">CI/CD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 mb-12 shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to collaborate on Mezohub?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our growing community of developers, designers, and
            entrepreneurs to find your next project or team member.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://mezohub.com"
              target="_blank"
              className="bg-[#D1F366] text-black px-8 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors inline-flex items-center gap-2"
            >
              Visit Platform
              <ExternalLink size={20} />
            </a>
            <Link
              href="/side-projects"
              className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              View Other Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
