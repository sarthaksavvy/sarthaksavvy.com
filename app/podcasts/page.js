"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Podcasts() {
  const [activeEpisode, setActiveEpisode] = useState(null);

  const podcastEpisodes = [
    {
      id: 1,
      title: "The Future of Web Development",
      description:
        "Exploring modern web technologies and future trends in development",
      date: "Mar 15, 2024",
      duration: "45 min",
      guests: "Sarah Johnson, Tech Lead at Google",
      thumbnail: "/api/placeholder/400/400",
    },
    {
      id: 2,
      title: "Building Accessible Websites",
      description: "Best practices for creating inclusive web experiences",
      date: "Mar 08, 2024",
      duration: "38 min",
      guests: "Alex Chen, Accessibility Expert",
      thumbnail: "/api/placeholder/400/400",
    },
    {
      id: 3,
      title: "From Junior to Senior Dev",
      description: "Career growth strategies in software development",
      date: "Mar 01, 2024",
      duration: "42 min",
      guests: "Michael Rodriguez, Senior Engineer",
      thumbnail: "/api/placeholder/400/400",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-6">MY PODCAST</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Join me as we explore the fascinating world of web development,
            featuring conversations with industry experts and deep dives into
            modern technologies.
          </p>
        </div>

        {/* Featured Episode */}
        <div className="bg-[#1A1A1A] rounded-3xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/laravel-india-podcast.png"
                alt="Latest episode cover"
                className="object-cover"
                width={400}
                height={400}
              />
            </div>
            <div className="space-y-6">
              {/* <div className="text-[#D1F366] font-medium">LATEST EPISODE</div> */}
              <h2 className="text-4xl font-bold">Laravel India Podcast</h2>
              <p className="text-gray-300">
                Laravel India Podcast is a podcast that has guest from Laravel
                Community from worldwide including peoples like Taylor Otwell
                (Laravel CEO), James Brooks (Laravel Core Team Member), Freek
                Van der Herten (Spatie Laravel Developer), and many more.
              </p>
              <div className="flex gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  Episodes: 12+
                </span>
                {/* <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  Latest Episode: 2 days ago
                </span> */}
              </div>
              <div className="flex gap-4">
                <a
                  href="https://open.spotify.com/show/3XuNgni6Q0yLMmgLnoRoib"
                  target="_blank"
                  className="bg-[#D1F366] text-black hover:bg-[#bde052] transition-colors px-6 py-3 rounded-full"
                >
                  Spotify
                </a>
                <a
                  href="https://podcasts.apple.com/in/podcast/laravel-india-podcast/id1528388091"
                  target="_blank"
                  className="bg-[#D1F366] text-black hover:bg-[#bde052] transition-colors px-6 py-3 rounded-full"
                >
                  Apple Podcasts
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
