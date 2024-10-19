"use client";

import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 border-t-2 border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-6xl font-bold mb-8">LET'S CONNECT</h2>

              <p className="mb-2 text-gray-300">
                Say hello at{" "}
                <a
                  href="mailto:sarthak@bitfumes.com"
                  className="underline hover:text-[#D1F366]"
                >
                  sarthak@bitfumes.com
                </a>
              </p>

              {/* <p className="mb-8 text-gray-300">
              For more info, here's my{" "}
              <a href="/resume.pdf" className="underline hover:text-[#D1F366]">
                resume
              </a>
            </p> */}

              {/* Social Icons */}
              <div className="flex gap-6 mb-8">
                <a
                  href="https://www.linkedin.com/in/sarthaksavvy"
                  target="_blank"
                  className="text-[#D1F366] hover:text-white transition-colors"
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
                  className="text-[#D1F366] hover:text-white transition-colors"
                >
                  <Image
                    src="/images/icons/github.svg"
                    alt="Github"
                    width={24}
                    height={24}
                  />
                </a>
                <a
                  href="https://x.com/sarthaksavvy"
                  target="_blank"
                  className="text-[#D1F366] hover:text-white transition-colors"
                >
                  <Image
                    src="/images/icons/x.svg"
                    alt="X"
                    width={24}
                    height={24}
                  />
                </a>
                <a
                  href="https://www.instagram.com/sarthaksavvy"
                  target="_blank"
                  className="text-[#D1F366] hover:text-white transition-colors"
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

            {/* Copyright */}
            {/* move it to vertical bottom */}
            <div className="text-gray-200 mt-auto bottom-0">
              © {new Date().getFullYear()} Sarthak Shrivastava
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border-none rounded-lg p-3 text-white focus:ring-2 focus:ring-[#D1F366] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border-none rounded-lg p-3 text-white focus:ring-2 focus:ring-[#D1F366] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border-none rounded-lg p-3 text-white focus:ring-2 focus:ring-[#D1F366] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-[#1A1A1A] border-none rounded-lg p-3 text-white focus:ring-2 focus:ring-[#D1F366] focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#D1F366] text-black px-8 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
