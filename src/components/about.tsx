"use client";
import { FaFileLines, FaFolderOpen } from "react-icons/fa6";
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=1ZdVcOnyCnxeZarbl4Ug5-MTDpaDHIi1M`;

export default function AboutSection() {
    return (
        <section
            id="about"
            className="w-full px-8 md:px-16 lg:px-24 py-20 bg-zinc-950"
        >
            <div className="max-w-6xl">
                <div className="mb-8">
                    <span className="text-xs font-mono text-zinc-600 tracking-wider">// INTRODUCTION</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-2 bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                        About Me
                    </h2>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-400 max-w-2xl">
                    I&apos;m Utkarsh, a developer who enjoys building fast, clean, and delightful
                    experiences. I work across the stack—React/Next.js on the front-end
                    and Node.js on the back—focused on performance and DX.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <a
                        href={DOWNLOAD_URL}
                        aria-label="Download Resume"
                        className="group flex items-center justify-center gap-3 rounded-xl
                        bg-white text-black px-5 py-2.5
                        transition-all duration-300 hover:bg-zinc-200
                        cursor-pointer select-none font-medium text-sm"
                    >
                        <FaFileLines className="text-lg transition-transform duration-300 group-hover:-translate-y-0.5" />
                        Download Resume
                    </a>

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
                        border border-zinc-800 bg-transparent text-zinc-300
                        px-5 py-2.5
                        transition-all duration-300 hover:bg-zinc-900 hover:text-white
                        cursor-pointer select-none font-medium text-sm"
                    >
                        <FaFolderOpen className="text-lg transition-transform duration-300 group-hover:-translate-y-0.5" />
                        View Projects
                    </div>
                </div>
            </div>
        </section>
    );
}
