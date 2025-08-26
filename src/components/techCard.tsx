import { CardSpotlight } from "@/components/ui/card-spotlight";
import { FaJs, FaHtml5, FaReact, FaNode, FaCss3Alt, FaGitAlt, FaDocker, FaPython, FaDatabase, FaJava } from "react-icons/fa";
import {
    SiTypescript, SiNextdotjs, SiMongodb, SiTailwindcss, SiPrisma, SiExpress, SiC, SiCplusplus, SiJest, SiFirebase,
    SiSupabase, SiAppwrite, SiPytest
} from "react-icons/si";

export function TechGrid() {
    const tech = [
        { title: "Python", icon: <FaPython className="text-yellow-400 h-8 w-8" /> },
        { title: "HTML5", icon: <FaHtml5 className="text-orange-500 h-8 w-8" /> },
        { title: "CSS3", icon: <FaCss3Alt className="text-blue-400 h-8 w-8" /> },
        { title: "JavaScript", icon: <FaJs className="text-yellow-400 h-8 w-8" /> },
        { title: "React", icon: <FaReact className="text-sky-400 h-8 w-8" /> },
        { title: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400 h-8 w-8" /> },
        { title: "Next.js", icon: <SiNextdotjs className="text-white h-8 w-8" /> },
        { title: "Node.js", icon: <FaNode className="text-green-500 h-8 w-8" /> },
        { title: "Express.js", icon: <SiExpress className="text-gray-300 h-8 w-8" /> },
        { title: "MongoDB", icon: <SiMongodb className="text-green-600 h-8 w-8" /> },
        { title: "Prisma", icon: <SiPrisma className="text-white h-8 w-8" /> },
        { title: "TypeScript", icon: <SiTypescript className="text-blue-500 h-8 w-8" /> },
        { title: "SQL/Database", icon: <FaDatabase className="text-purple-400 h-8 w-8" /> },
        { title: "Docker", icon: <FaDocker className="text-blue-400 h-8 w-8" /> },
        { title: "Git", icon: <FaGitAlt className="text-red-500 h-8 w-8" /> },
        { title: "C", icon: <SiC className="text-blue-500 h-8 w-8" /> },
        { title: "C++", icon: <SiCplusplus className="text-indigo-500 h-8 w-8" /> },
        { title: "Java", icon: <FaJava className="text-red-600 h-8 w-8" /> },
        { title: "Jest", icon: <SiJest className="text-pink-600 h-8 w-8" /> },
        { title: "Pytest", icon: <SiPytest className="text-green-400 h-8 w-8" /> },
        { title: "Supabase", icon: <SiSupabase className="text-green-500 h-8 w-8" /> },
        { title: "Firebase", icon: <SiFirebase className="text-yellow-400 h-8 w-8" /> },
        { title: "Appwrite", icon: <SiAppwrite className="text-pink-500 h-8 w-8" /> },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {tech.map((t) => (
                <CardSpotlight key={t.title}
                    className="h-32 w-full flex flex-col items-center justify-center">
                    {t.icon}
                    <p className="text-white text-sm font-semibold">{t.title}</p>
                </CardSpotlight>
            ))}
        </div>
    );
}
