"use client";
import ArrowTrackingBubble from "./arrowtracker";
import Reveal from "./reaveal";
import { FaFileLines, FaFolderOpen } from "react-icons/fa6";


export default function AboutSection() {
    return (
        <section
            id="about"
            className="w-full px-4 md:px-8 lg:px-16 py-16 md:py-24 text-foreground"
        >
            <ArrowTrackingBubble fullScreen size={56} className="z-0" />

            <div className="mx-auto max-w-5xl flex flex-col items-center text-center">
                <Reveal>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight flex flex-row gap-5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                        About Me
                    </h2>
                </Reveal>

                <Reveal delay={120}>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-300/90 max-w-2xl">
                        I’m Utkarsh, a developer who enjoys building fast, clean, and delightful
                        experiences. I work across the stack—React/Next.js on the front-end
                        and Node.js on the back—focused on performance and DX.
                    </p>
                </Reveal>

                <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 w-full max-w-xl">
                    <Reveal delay={180}>
                        <a
                            href="/Utkarsh_resume.pdf"
                            download
                            aria-label="Download Resume"
                            className="group flex items-center justify-center gap-3 rounded-xl
                         bg-blue-600 text-white border border-blue-600
                         px-1 py-2 sm:py-2
                         transition-transform duration-300 hover:scale-[1.03]
                         shadow-md shadow-blue-900/30 cursor-pointer select-none"
                        >
                            <FaFileLines className="text-white text-xl sm:text-xl transition-transform duration-300 
              group-hover:translate-y-[-2px]" />
                            <span className="font-semibold text-sm sm:text-base">Download Resume</span>
                        </a>
                    </Reveal>

                    <Reveal delay={240}>
                        <div
                            role="link"
                            aria-label="View Projects"
                            tabIndex={0}
                            onClick={() =>
                                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="group flex items-center justify-center gap-3 rounded-xl
                         border border-white/15 bg-transparent text-white
                         px-1 py-2 sm:py-2
                         transition-transform duration-300 hover:scale-[1.03]
                         hover:bg-white/5 cursor-pointer select-none"
                        >
                            <FaFolderOpen className="text-gray-200 text-xl sm:text-xl transition-transform duration-300 
              group-hover:translate-y-[-2px]" />
                            <span className="font-semibold text-sm sm:text-base">View Projects</span>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
