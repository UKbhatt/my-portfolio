"use client";
import Reveal from "@/components/reveal";
import { BookOpen } from "lucide-react";

const education = [
    {
        institution: "Indian Institute of Information Technology Nagpur(IIITN)",
        degree: "Bachelor of Technology in Computer Science Engineering",
        period: "2022 — 2026",
    },
    {
        institution: "Central Academy Jhunsi, Prayagraj",
        degree: "+2 Science (PCM)",
        period: "2021 — 2022",
    },
];

const experiences = [
    {
        role: "Flutter Developer Intern",
        company: "whatBytes",
        period: "Oct 2025 — Nov 2025",
        duration: "2 mo",
        location: "Remote, India",
        bullets: [
            "Collaborated on end-to-end features, working on both frontend (Flutter/Dart) and backend integration.",
        ],
    },
    {
        role: "Flutter Developer Intern",
        company: "Bellenoor Pvt. Ltd.",
        period: "Sep 2025 — Oct 2025",
        duration: "2 mo",
        location: "Remote, India",
        bullets: [
            "Integrated AWS services such as API Gateway, Lambda, S3, DynamoDB for backend workflows.",
        ],
    },
    {
        role: "Flutter Developer Intern",
        company: "Digital Guruji Pvt. Ltd.",
        period: "May 2025 — Aug 2025",
        duration: "4 mo",
        location: "Remote, India",
        bullets: [
            "Built responsive, cross-platform Flutter apps with seamless Android and iOS performance.",
        ],
    },
];

export default function ExperienceSection() {
    return (
        <div>
            <Reveal delay={100}>
                <h2 className="text-2xl font-bold text-white mb-1">Resume</h2>
                <div className="w-8 h-1 bg-amber-400 rounded-full mb-8" />
            </Reveal>

            <Reveal delay={120}>
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] border border-zinc-700/30 flex items-center justify-center">
                            <BookOpen size={18} className="text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Education</h3>
                    </div>

                    <div className="space-y-6 ml-2">
                        {education.map((edu, i) => (
                            <div key={i} className="relative pl-6">
                                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-amber-400" />
                                {i < education.length - 1 && (
                                    <div className="absolute left-[3px] top-4 w-0.5 h-[calc(100%+12px)] bg-zinc-700/50" />
                                )}
                                
                                <h4 className="font-semibold text-white">{edu.institution}</h4>
                                <p className="text-sm text-zinc-400 mt-0.5">{edu.degree}</p>
                                <p className="text-sm text-amber-400/80 mt-1">{edu.period}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>

            <Reveal delay={150}>
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] border border-zinc-700/30 flex items-center justify-center">
                            <BookOpen size={18} className="text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Experience</h3>
                    </div>

                    <div className="space-y-6 ml-2">
                        {experiences.map((exp, i) => (
                            <div key={i} className="relative pl-6">
                                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-amber-400" />
                                {i < experiences.length - 1 && (
                                    <div className="absolute left-[3px] top-4 w-0.5 h-[calc(100%+12px)] bg-zinc-700/50" />
                                )}
                                
                                <h4 className="font-semibold text-white">{exp.role}</h4>
                                <p className="text-sm text-zinc-400 mt-0.5">{exp.company}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-amber-400/80">{exp.period}</span>
                                    <span className="text-zinc-600">•</span>
                                    <span className="text-sm text-zinc-500">{exp.duration}</span>
                                </div>
                                <p className="text-sm text-zinc-500 italic mt-0.5">{exp.location}</p>
                                
                                {exp.bullets && exp.bullets.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {exp.bullets.map((bullet, idx) => (
                                            <li key={idx} className="text-sm text-zinc-400 flex gap-2">
                                                <span className="text-amber-400/60">•</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
