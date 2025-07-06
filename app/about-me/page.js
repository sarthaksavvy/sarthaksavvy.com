import Image from "next/image";
import { 
  Briefcase, 
  Code, 
  Award, 
  Users, 
  Calendar, 
  Star, 
  Heart, 
  Coffee,
  BookOpen,
  Zap,
  Target,
  Globe,
  Shield,
  Cpu,
  Database,
  Cloud,
  Container,
  Brain,
  Quote
} from "lucide-react";

const AboutPage = () => {
  const skillsTimeline = [
    {
      year: "2018",
      title: "Web Development Foundation",
      skills: ["HTML", "CSS", "JavaScript", "PHP"],
      description: "Started my journey with web fundamentals"
    },
    {
      year: "2019",
      title: "Framework Mastery",
      skills: ["Laravel", "Vue.js", "MySQL"],
      description: "Dove deep into modern web frameworks"
    },
    {
      year: "2020",
      title: "DevOps & Cloud",
      skills: ["Docker", "AWS", "CI/CD", "Linux"],
      description: "Expanded into infrastructure and deployment"
    },
    {
      year: "2021",
      title: "Content Creation",
      skills: ["YouTube", "Course Creation", "Teaching"],
      description: "Started sharing knowledge with the community"
    },
    {
      year: "2022",
      title: "Advanced Technologies",
      skills: ["Python", "React", "Node.js", "Microservices"],
      description: "Embraced full-stack development"
    },
    {
      year: "2023",
      title: "AI & Leadership",
      skills: ["AI/ML", "LLMs", "Team Leadership", "Docker Captain"],
      description: "Leading in AI integration and community"
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Full Stack Developer",
      company: "Tech Startup",
      image: "/images/testimonials/rahul.jpg",
      quote: "Sarthak's Laravel course completely transformed my career. His teaching style is clear, practical, and engaging."
    },
    {
      name: "Priya Patel",
      role: "DevOps Engineer",
      company: "Fortune 500",
      image: "/images/testimonials/priya.jpg",
      quote: "The Docker content on Bitfumes helped me land my dream job. Sarthak explains complex concepts so simply."
    },
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      company: "Silicon Valley",
      image: "/images/testimonials/alex.jpg",
      quote: "Following Sarthak's journey inspired me to start my own tech channel. His authenticity is refreshing."
    }
  ];

  const personalValues = [
    {
      icon: <Heart className="w-8 h-8 text-[#D1F366]" />,
      title: "Passion for Teaching",
      description: "I believe knowledge grows when shared. Teaching others fuels my own learning journey."
    },
    {
      icon: <Target className="w-8 h-8 text-[#D1F366]" />,
      title: "Continuous Learning",
      description: "Technology evolves rapidly. I stay curious and embrace new challenges every day."
    },
    {
      icon: <Users className="w-8 h-8 text-[#D1F366]" />,
      title: "Community Building",
      description: "Building supportive communities where developers can grow together and help each other."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#D1F366]" />,
      title: "Innovation Focus",
      description: "Always exploring cutting-edge technologies to solve real-world problems efficiently."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-white via-[#D1F366] to-white bg-clip-text text-transparent animate-pulse">
            ABOUT ME
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get to know more about my journey, experiences, and what drives me
            in the world of technology and education.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-10 mb-20 shadow-2xl hover:shadow-[#D1F366]/20 transition-all duration-500 hover:scale-[1.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden relative group">
              <Image
                src="/images/about-me.jpg"
                alt="Sarthak Shrivastava"
                width={500}
                height={500}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-[#D1F366] leading-tight">
                Hello, I&apos;m Sarthak
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Known as &quot;sarthaksavvy&quot; in the tech community, I&apos;m a full-stack
                developer, Docker Captain, and founder of Bitfumes. My journey
                in technology has been driven by a passion for learning and
                sharing knowledge with developers worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-[#D1F366]/10 px-4 py-2 rounded-full">
                  <Container className="w-5 h-5 text-[#D1F366]" />
                  <span className="text-[#D1F366] font-medium">Docker Captain</span>
                </div>
                <div className="flex items-center gap-2 bg-[#D1F366]/10 px-4 py-2 rounded-full">
                  <Briefcase className="w-5 h-5 text-[#D1F366]" />
                  <span className="text-[#D1F366] font-medium">Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Timeline */}
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-[#D1F366] text-center">
            Skills Evolution
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#D1F366] via-[#D1F366]/50 to-transparent"></div>
            
            <div className="space-y-12">
              {skillsTimeline.map((item, index) => (
                <div key={index} className="relative pl-20 group">
                  <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-[#D1F366] group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-sm text-[#D1F366] mt-2 font-bold">{item.year}</span>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-[#D1F366]/20 text-[#D1F366] text-sm font-medium px-3 py-1 rounded-full border border-[#D1F366]/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Journey */}
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-[#D1F366] text-center">
            Professional Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center gap-4 mb-8">
                <Briefcase className="w-8 h-8 text-[#D1F366]" />
                <h3 className="text-3xl font-bold">Current Roles</h3>
              </div>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#D1F366]"></div>
                  <span className="text-lg">Founder of Bitfumes</span>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#D1F366]"></div>
                  <span className="text-lg">Software Engineer at Pfizer</span>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#D1F366]"></div>
                  <span className="text-lg">Content Creator</span>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#D1F366]"></div>
                  <span className="text-lg">Docker Captain</span>
                </li>
              </ul>
            </div>
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center gap-4 mb-8">
                <Code className="w-8 h-8 text-[#D1F366]" />
                <h3 className="text-3xl font-bold">Core Expertise</h3>
              </div>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Database className="w-5 h-5 text-[#D1F366]" />
                  <span className="text-lg">Laravel, JavaScript and Python Development</span>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Cloud className="w-5 h-5 text-[#D1F366]" />
                  <span className="text-lg">AWS Cloud Certified</span>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Container className="w-5 h-5 text-[#D1F366]" />
                  <span className="text-lg">Docker & DevOps</span>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Brain className="w-5 h-5 text-[#D1F366]" />
                  <span className="text-lg">AI & LLMs Integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-[#D1F366] text-center">
            Achievements & Impact
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center gap-4 mb-8">
                <Award className="w-8 h-8 text-[#D1F366]" />
                <h3 className="text-3xl font-bold">Recognition</h3>
              </div>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-[#D1F366]" />
                  <div>
                    <span className="text-lg font-semibold text-white">Docker Captain</span>
                    <p className="text-sm text-gray-400">December 2023</p>
                  </div>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Cloud className="w-6 h-6 text-[#D1F366]" />
                  <span className="text-lg">AWS Certified Solutions Architect</span>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Cpu className="w-6 h-6 text-[#D1F366]" />
                  <span className="text-lg">AWS Certified Developer</span>
                </li>
              </ul>
            </div>
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center gap-4 mb-8">
                <Globe className="w-8 h-8 text-[#D1F366]" />
                <h3 className="text-3xl font-bold">Community Impact</h3>
              </div>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Users className="w-6 h-6 text-[#D1F366]" />
                  <div>
                    <span className="text-2xl font-bold text-[#D1F366]">134K+</span>
                    <p className="text-lg">YouTube Subscribers</p>
                  </div>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-[#D1F366]" />
                  <div>
                    <span className="text-2xl font-bold text-[#D1F366]">100K+</span>
                    <p className="text-lg">Students on Udemy</p>
                  </div>
                </li>
                <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <Star className="w-6 h-6 text-[#D1F366]" />
                  <div>
                    <span className="text-2xl font-bold text-[#D1F366]">3,000+</span>
                    <p className="text-lg">Positive Course Reviews</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-[#D1F366] text-center">
            What People Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <Quote className="w-8 h-8 text-[#D1F366] mb-6" />
                <p className="text-gray-300 mb-6 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D1F366] to-[#bde052] flex items-center justify-center">
                    <span className="text-black font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Values Section */}
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-[#D1F366] text-center">
            What Drives Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {personalValues.map((value, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 p-3 bg-[#D1F366]/10 rounded-2xl group-hover:bg-[#D1F366]/20 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-12 mb-16 shadow-2xl hover:shadow-[#D1F366]/20 transition-all duration-500">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Brain className="w-10 h-10 text-[#D1F366]" />
              <h2 className="text-5xl font-bold text-[#D1F366]">
                Current Focus
              </h2>
            </div>
            <p className="text-xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              I&apos;m currently exploring and creating content about AI technologies,
              including OpenAI&apos;s developments and LLMs. My mission is to make
              technology education accessible while staying at the forefront of
              innovation and helping developers worldwide grow their skills.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:sarthak@bitfumes.com"
                className="bg-[#D1F366] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#bde052] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
              >
                <Coffee className="w-5 h-5" />
                Get in Touch
              </a>
              <a
                href="https://youtube.com/bitfumes"
                target="_blank"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
              >
                <BookOpen className="w-5 h-5" />
                Watch My Content
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
