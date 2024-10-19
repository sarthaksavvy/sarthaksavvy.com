import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-6 flex items-center gap-12 mt-20">
        {/* Left Column */}
        <div className="flex-1">
          <h1 className="text-6xl font-bold leading-tight mb-6">
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
            <button className="bg-[#D1F366] text-black px-6 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors">
              CONTACT ME
            </button>
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
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1">
          <div className="rounded-3xl overflow-hidden bg-gray-200">
            <Image
              src="/images/sarthak.jpg"
              alt="Professional portrait"
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
      {/* <Contact /> */}
    </>
  );
}
