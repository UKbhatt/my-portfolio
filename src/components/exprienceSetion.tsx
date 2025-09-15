"use client";
import Image, { StaticImageData } from "next/image";
import Reveal from "@/components/reveal";
import { Briefcase } from "lucide-react" ; 
import digital  from "../app/Assets/digitalGuruji.jpg";

type Experience = {
    company: string;
    role: string;
    period: string;
    logo?: string | StaticImageData;
    bullets?: string[];
    color?: string;
};

const EXPERIENCES: Experience[] = [
    {
        company: "Digital Guruji",
        role: "Flutter Developere Intern",
        period: "May 2025 -- Aug 2025",
        logo: digital,
        bullets: [
            "Built responsive, cross-platform Flutter apps with seamless Android and iOS performance.",
            "Integrated Firebase (Realtime DB, Authentication, Push Notifications) to improve engagement.",
            " Optimized app performance via efficient state management and API handling, reducing load time.",
            "Wrote unit and integration tests for backend APIs, reducing post-release bugs.",
        ],
        color: "from-blue-500 to-indigo-500",
    },
   
];

export default function ExperienceSection() {
    return (
        <section className="relative w-full px-4 md:px-8 lg:px-16 py-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight flex items-center gap-3 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                Experience
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8">
                {EXPERIENCES.map((exp, i) => (
                    <Reveal key={i} delay={120 + i * 90}>
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                            <div className="absolute left-[-1.1rem] top-6 h-[calc(100%+1.5rem)] w-[2px] bg-gradient-to-b from-white/20 to-white/0 hidden sm:block" />
                            <div className="absolute left-[-1.4rem] top-6 h-4 w-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 ring-2 ring-white/20 hidden sm:block" />

                            <div className="flex items-start gap-4">
                                <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-white/10 to-white/0 flex items-center justify-center ring-1 ring-white/10 overflow-hidden">
                                    {exp.logo ? (
                                        <Image src={exp.logo} alt={exp.company} width={36} height={36} className="object-contain" />
                                    ) : (
                                        <Briefcase className="text-white/70" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="text-lg font-semibold">{exp.role} · {exp.company}</div>
                                        <div className="text-sm text-white/60">{exp.period}</div>
                                    </div>
                                    <ul className="mt-2 space-y-1 text-white/80 text-sm">
                                        {exp.bullets?.map((b, idx) => <li key={idx}>• {b}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className={`mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r ${exp.color ?? "from-slate-500 to-slate-700"}`} />
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
