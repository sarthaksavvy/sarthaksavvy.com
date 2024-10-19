import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex justify-between items-center p-6">
      <a href="/" className="text-xl font-bold">
        SARTHAK SHRIVASTAVA
      </a>
      <div className="flex gap-8">
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
