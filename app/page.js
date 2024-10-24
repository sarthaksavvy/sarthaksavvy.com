import Image from "next/image";

export const metadata = {
  title: "Sarthak Shrivastava - Sarthaksavvy",
  description: "Sarthak Shrivastava's personal website",
  alternates: {
    canonical: "https://sarthaksavvy.com",
  },
  openGraph: {
    title: "Sarthak Shrivastava - Sarthaksavvy",
    description: "Sarthak Shrivastava's personal website",
    url: "https://sarthaksavvy.com",
    siteName: "Sarthak Shrivastava - Sarthaksavvy",
    images: "/sarthak.jpg",
  },
};

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 mt-20">
        {/* Left Column */}
        <div className="flex-1">
          <h1 className="text-5xl sm:text-6xl md:text-6xl font-bold leading-tight mb-6">
            HI, I AM
            <br />
            SARTHAK SHRIVASTAVA.
          </h1>
          <p className="text-gray-300 text-xl mb-8 max-w-md">
            India based founder, content creator, developer and AI enthusiast
            passionate about building and automating daily tasks.
          </p>

          {/* Contact and Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:sarthak@bitfumes.com"
              className="bg-[#D1F366] text-black px-6 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors"
            >
              EMAIL ME
            </a>
            <a
              href="https://linkedin.com/in/sarthaksavvy"
              target="_blank"
              className="p-2 bg-gray-800 rounded-full"
            >
              <Image
                src="/images/icons/linkedin.svg"
                alt="Linkedin"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://github.com/sarthaksavvy"
              target="_blank"
              className="p-2 bg-gray-800 rounded-full"
            >
              <Image
                src="/images/icons/github.svg"
                alt="Github"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://instagram.com/sarthaksavvy"
              target="_blank"
              className="p-2 bg-gray-800 rounded-full"
            >
              <Image
                src="/images/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1 mt-8 md:mt-0">
          <div className="rounded-3xl overflow-hidden bg-gray-200">
            <Image
              src="/images/sarthak.jpg"
              alt="Professional portrait"
              width={500}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </main>
      {/* <Contact /> */}
    </>
  );
}
