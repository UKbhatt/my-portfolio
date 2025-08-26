"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/30 backdrop-blur-md w-full px-10">
      {/* removed max-w-6xl */}
      <div className="px-6 py-8 w-full">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row w-full">
          {/* Left section */}
          <div className="text-center md:text-left md:w-1/2 w-full">
            <h2 className="text-lg font-semibold text-white">Utkarsh Bhatt</h2>
            <p className="mt-2 text-sm text-white/60 w-1/2">
              Full-Stack Developer • Passionate about building scalable apps,
              interactive UIs, and impactful products.
            </p>
          </div>

          {/* Right section */}
          <div className="w-full md:w-auto">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/70 text-center md:text-right">
              Connect
            </h3>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://github.com/UKbhatt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/utkarsh-bhatt-183325261/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:ubhatt2004@gmail.com"
                className="text-white/60 transition hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/utkarsh_B2004"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition hover:text-white"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-white/40 w-full">
          © {new Date().getFullYear()} Utkarsh Bhatt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
