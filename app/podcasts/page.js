import { Clock } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Sarthak Shrivastava - Podcasts",
  description: "Podcasts by Sarthak Shrivastava",
  alternates: {
    canonical: "https://sarthaksavvy.com/podcasts",
  },
  openGraph: {
    title: "Sarthak Shrivastava - Podcasts",
    description: "Podcasts by Sarthak Shrivastava",
    url: "https://sarthaksavvy.com/podcasts",
    siteName: "Sarthak Shrivastava - Podcasts",
    images: "/laravel-india-podcast.png",
  },
};

export default function Podcasts() {
  return (
    <div>
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
          <div className="bg-[#1A1A1A] rounded-3xl p-8 mb-16 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
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
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://podcasts.apple.com/in/podcast/laravel-india-podcast/id1528388091"
                    target="_blank"
                    className="bg-[#D1F366] text-black hover:bg-[#bde052] transition-colors px-6 py-3 rounded-full"
                  >
                    Apple Podcasts
                  </a>
                  <a
                    href="https://open.spotify.com/show/3XuNgni6Q0yLMmgLnoRoib"
                    target="_blank"
                    className="bg-[#D1F366] text-black hover:bg-[#bde052] transition-colors px-6 py-3 rounded-full"
                  >
                    Spotify
                  </a>
                  <a
                    href="https://www.youtube.com/playlist?list=PLe30vg_FG4ORc-DFXDwqYojn75HKeHZLA"
                    target="_blank"
                    className="bg-[#D1F366] text-black hover:bg-[#bde052] transition-colors px-6 py-3 rounded-full"
                  >
                    Youtube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
