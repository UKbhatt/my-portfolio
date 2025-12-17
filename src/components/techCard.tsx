"use client";
import { FaJs, FaHtml5, FaReact, FaNode, FaCss3Alt, FaGitAlt, FaDocker, FaPython, FaDatabase, FaJava } from "react-icons/fa";
import {
    SiTypescript, SiNextdotjs, SiMongodb, SiTailwindcss, SiPrisma, SiExpress, SiC, SiCplusplus, SiJest, SiFirebase,
    SiSupabase, SiAppwrite, SiPytest, SiFlutter, SiDjango, SiFlask, SiFastapi, SiPostgresql,
    SiMysql,
    SiRedis,
    SiSqlite,

} from "react-icons/si";

type TechItem = {
    title: string;
    icon: React.ReactNode;
};

type SkillCategory = {
    name: string;
    items: TechItem[];
};

const skillCategories: SkillCategory[] = [
    {
        name: "Languages",
        items: [
            { title: "C", icon: <SiC className="text-blue-500" /> },
            { title: "C++", icon: <SiCplusplus className="text-indigo-500" /> },
            { title: "Python", icon: <FaPython className="text-yellow-400" /> },
            { title: "Java", icon: <FaJava className="text-red-600" /> },
            { title: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
            { title: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
        ],
    },
    {
        name: "Frontend",
        items: [
            { title: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
            { title: "CSS3", icon: <FaCss3Alt className="text-blue-400" /> },
            { title: "React.js", icon: <FaReact className="text-sky-400" /> },
            { title: "TailwindCss", icon: <SiTailwindcss className="text-sky-400" /> },
            { title: "Next.js", icon: <SiNextdotjs className="text-white" /> },
            { title: "Flutter", icon: <SiFlutter className="text-sky-400" /> },
        ],
    },
    {
        name: "Backend",
        items: [
            { title: "Node.js", icon: <FaNode className="text-green-500" /> },
            { title: "Express", icon: <SiExpress className="text-gray-300" /> },
            { title: "Prisma", icon: <SiPrisma className="text-white" /> },
            { title: "Django", icon: <SiDjango className="text-green-700" /> },
            { title: "Flask", icon: <SiFlask className="text-gray-200" /> },
            { title: "FastAPI", icon: <SiFastapi className="text-teal-400" /> },
        ],
    },
    {
        name: "Database & BaaS",
        items: [
            { title: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
            { title: "MySQL", icon: <SiMysql className="text-sky-500" /> },
            { title: "SQLite", icon: <SiSqlite className="text-blue-300" /> },
            { title: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
            { title: "Redis", icon: <SiRedis className="text-red-500" /> },
            { title: "Supabase", icon: <SiSupabase className="text-green-500" /> },
            { title: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
            { title: "Appwrite", icon: <SiAppwrite className="text-pink-500" /> },
        ],
    },
    {
        name: "DevOps & Tools",
        items: [
            { title: "Git", icon: <FaGitAlt className="text-red-500" /> },
            { title: "Docker", icon: <FaDocker className="text-blue-400" /> },
            { title: "Jest", icon: <SiJest className="text-pink-600" /> },
            { title: "Pytest", icon: <SiPytest className="text-green-400" /> },
        ],
    },
];

export function TechGrid() {
    return (
        <div className="space-y-6">
            {skillCategories.map((category) => (
                <div key={category.name}>
                    <h4 className="text-sm font-medium text-zinc-400 mb-3">{category.name}</h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {category.items.map((tech) => (
                            <div
                                key={tech.title}
                                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg
                                bg-zinc-800/50 border border-zinc-700/50
                                hover:border-zinc-600 hover:bg-zinc-700/50
                                transition-all duration-200 group/item"
                            >
                                <div className="text-xl transition-transform duration-200 group-hover/item:scale-110">
                                    {tech.icon}
                                </div>
                                <span className="text-[10px] font-medium text-zinc-400 text-center">
                                    {tech.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
