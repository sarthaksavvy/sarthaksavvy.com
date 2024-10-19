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
        <a href="/" className="text-2xl sm:text-xl font-bold">
          SARTHAK SHRIVASTAVA
        </a>
        <div className="">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
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
        </div>
      )}

      <div className="md:flex gap-8 hidden">
        <Link href="/podcasts" className="hover:text-gray-300">
          Podcasts
        </Link>

        <Link href="/public-speaking" className="hover:text-gray-300">
          Public Speaking
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
      </div>
    </nav>
  );
}
