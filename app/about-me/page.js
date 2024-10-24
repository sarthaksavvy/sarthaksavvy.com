import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-6">ABOUT ME</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Get to know more about my journey, experiences, and what drives me
            in the world of technology and education.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 mb-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/about-me.jpg"
                alt="Sarthak Shrivastava"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#D1F366]">
                Hello, I'm Sarthak
              </h2>
              <p className="text-gray-300">
                Known as "sarthaksavvy" in the tech community, I'm a full-stack
                developer, Docker Captain, and founder of Bitfumes. My journey
                in technology has been driven by a passion for learning and
                sharing knowledge.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Journey */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-[#D1F366]">
            Professional Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Current Roles</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">Founder of Bitfumes</li>
                <li className="flex items-center gap-2">
                  Software Engineer at Pfizer
                </li>
                <li className="flex items-center gap-2">Content Creator</li>
                <li className="flex items-center gap-2">Docker Captain</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Core Expertise</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">
                  Laravel, JavaScript and Python Development
                </li>
                <li className="flex items-center gap-2">AWS Cloud Certified</li>
                <li className="flex items-center gap-2">Docker & DevOps</li>
                <li className="flex items-center gap-2">
                  AI & LLMs Integration
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-[#D1F366]">
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Recognition</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">
                  Docker Captain (December 2023)
                </li>
                <li className="flex items-center gap-2">
                  AWS Certified Solutions Architect
                </li>
                <li className="flex items-center gap-2">
                  AWS Certified Developer
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Community Impact</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">
                  134K+ YouTube Subscribers
                </li>
                <li className="flex items-center gap-2">
                  100K+ Students on Udemy
                </li>
                <li className="flex items-center gap-2">
                  3,000+ Positive Course Reviews
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Focus */}
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 mb-16 shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-[#D1F366]">
            Current Focus
          </h2>
          <p className="text-gray-300 mb-6">
            I'm currently exploring and creating content about AI technologies,
            including OpenAI's developments and LLMs. My mission is to make
            technology education accessible while staying at the forefront of
            innovation.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:sarthak@bitfumes.com"
              className="bg-[#D1F366] text-black px-6 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors shadow-md"
            >
              Get in Touch
            </a>
            <a
              href="https://youtube.com/bitfumes"
              target="_blank"
              className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors shadow-md"
            >
              Watch My Content
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
