"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 w-full">
      <div className="flex justify-between w-full">
        <Link href="/" className="text-2xl sm:text-xl font-bold">
          SARTHAK SHRIVASTAVA
        </Link>
        <div className="">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl -mt-2"
          >
            &#9776;
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/podcasts" className="hover:text-gray-300">
            Podcasts
          </Link>
          <Link href="/public-speaking" className="hover:text-gray-300">
            Public Speaking
          </Link>
          <Link href="/side-projects" className="hover:text-gray-300">
            Side Projects
          </Link>
          <Link
            href="https://youtube.com/bitfumes"
            className="hover:text-gray-300"
            target="_blank"
          >
            Youtube
          </Link>
          <Link
            href="https://bitfumes.com"
            className="hover:text-gray-300"
            target="_blank"
          >
            Courses
          </Link>
          <Link href="/about-me" className="hover:text-gray-300">
            About Me
          </Link>
        </div>
      )}

      <div className="md:flex gap-8 hidden">
        <Link href="/podcasts" className="hover:text-gray-300 text-center">
          Podcasts
        </Link>

        <Link
          href="/public-speaking"
          className="hover:text-gray-300 w-32 text-center"
        >
          Public Speaking
        </Link>

        <Link
          href="/side-projects"
          className="hover:text-gray-300 w-28 text-center"
        >
          Side Projects
        </Link>

        <Link
          href="https://youtube.com/bitfumes"
          className="hover:text-gray-300 w-24 text-center"
          target="_blank"
        >
          Youtube
        </Link>

        <Link
          href="https://bitfumes.com"
          className="hover:text-gray-300 w-24 text-center"
          target="_blank"
        >
          Courses
        </Link>

        <Link href="/about-me" className="hover:text-gray-300 w-20 text-center">
          About Me
        </Link>
      </div>
    </nav>
  );
}
