"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/30 backdrop-blur-md">
      {/* mobile-first padding; scales up on larger screens */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-8">
        {/* top row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* left: brand/summary */}
          <div className="text-center md:text-left md:max-w-md">
            <h2 className="text-lg font-semibold text-white">Utkarsh Bhatt</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Full-Stack Developer • Passionate about building scalable apps,
              interactive UIs, and impactful products.
            </p>
          </div>

          {/* right: socials */}
          <div className="w-full md:w-auto">
            <h3 className="mb-3 text-center md:text-right text-sm font-semibold uppercase tracking-wide text-white/70">
              Connect
            </h3>
            <div className="flex justify-center md:justify-end gap-2 sm:gap-3">
              <a
                href="https://github.com/UKbhatt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/utkarsh-bhatt-183325261/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="mailto:ubhatt2004@gmail.com"
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
              >
                <Mail className="h-5 w-5" />
              </a>

              <a
                href="https://x.com/utkarsh_B2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Utkarsh Bhatt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
