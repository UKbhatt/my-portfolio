"use client";
import Reveal from "@/components/reveal";
import { BookOpen, NotebookPen } from "lucide-react";

type Education = {
    institution: string;
    degree: string;
    period: string;
};

type Experience = {
    role: string;
    company: string;
    startMonth: number;
    startYear: number;
    endMonth?: number;
    endYear?: number;
    appName?: string;
    appLink?: string;
    bullets: string[];
};

const education: Education[] = [
    {
        institution: "Indian Institute of Information Technology Nagpur (IIITN)",
        degree: "Bachelor of Technology in Computer Science Engineering",
        period: "2022 — 2026",
    },
    {
        institution: "Central Academy Jhunsi, Prayagraj",
        degree: "+2 Science (PCM)",
        period: "2021 — 2022",
    },
];

const experiences: Experience[] = [
    {
        role: "Flutter Intern",
        company: "ApnaMart",
        startMonth: 1,
        startYear: 2026,
        appName: "App Store",
        appLink: "https://apps.apple.com/in/app/apna-mart-grocery-in-10-mins/id6502952029",
        bullets: [
            "Built and shipped 5+ production iOS features using Flutter for a live App Store application with over 1M downloads.",
            "Implemented RushTimer: real-time order countdown logic improving delivery time visibility and reducing order status queries by 31%.",
            "Optimized Address Flow for selection and validation, reducing checkout drop-offs by 46%.",
            "Developed Order Product Rider Rating system allowing users to rate orders, products, and riders.",
        ],
    },
    {
        role: "Flutter Developer Intern",
        company: "WhatBytes",
        startMonth: 10,
        startYear: 2025,
        endMonth: 11,
        endYear: 2025,
        appName: "App Store",
        appLink: "https://apps.apple.com/us/app/undercontrac/id6752382108",
        bullets: [
            "Built and shipped iOS features using Flutter for a production App Store application.",
            "Developed scalable UI screens following clean architecture, reducing code duplication.",
            "Integrated PostHog analytics tracking across 20+ user actions.",
            "Enabled product team to analyze feature adoption and improve retention by 70%.",
        ],
    },
    {
        role: "Flutter Developer Intern",
        company: "Belenoor Lifestyle Pvt. Ltd.",
        startMonth: 9,
        startYear: 2025,
        endMonth: 10,
        endYear: 2025,
        appName: "App Store",
        appLink: "https://apps.apple.com/us/app/belle-noor/id6749549488",
        bullets: [
            "Developed and deployed core e-commerce features impacting 80%+ of active users.",
            "Built product search with filters and real-time results improving product discovery speed.",
            "Optimized home page using Flutter Slivers reducing frame drops by 25%.",
            "Improved scroll performance and decreased average load time.",
        ],
    },
];

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getPeriod = (
    startMonth: number,
    startYear: number,
    endMonth?: number,
    endYear?: number
): string => {
    const start = `${monthNames[startMonth - 1]} ${startYear}`;
    const end = endMonth ? `${monthNames[endMonth - 1]} ${endYear}` : "Present";
    return `${start} — ${end}`;
};

const getDuration = (
    startMonth: number,
    startYear: number,
    endMonth?: number,
    endYear?: number
): string => {
    const start = new Date(startYear, startMonth - 1);
    const end = endMonth ? new Date(endYear!, endMonth - 1) : new Date();

    const totalMonths =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) return `${totalMonths} mo`;
    if (months === 0) return `${years} yr`;
    return `${years} yr ${months} mo`;
};

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
                            <NotebookPen size={18} className="text-amber-400" />
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

                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-semibold text-white">{exp.role}</h4>

                                        <div className="flex items-center gap-2 text-sm text-zinc-400 mt-0.5">
                                            <span>{exp.company}</span>

                                            {exp.appLink && (
                                                <>
                                                    <span className="text-zinc-600">•</span>
                                                    <a
                                                        href={exp.appLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-amber-400 transition-colors"
                                                    >
                                                        {exp.appName}
                                                    </a>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm text-amber-400/80">
                                                {getPeriod(
                                                    exp.startMonth,
                                                    exp.startYear,
                                                    exp.endMonth,
                                                    exp.endYear
                                                )}
                                            </span>

                                            <span className="text-zinc-600">•</span>

                                            <span className="text-sm text-zinc-500">
                                                {getDuration(
                                                    exp.startMonth,
                                                    exp.startYear,
                                                    exp.endMonth,
                                                    exp.endYear
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {exp.bullets.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {exp.bullets.map((bullet, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm text-zinc-400 flex gap-2"
                                            >
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