"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TechGrid } from "@components/techCard";
import ImageCard from "@components/imageCard";
import Supremecoding from "@app/Assets/project/SupremeCoding.png";
import student from "@app/Assets/project/Student.png";
import mockmate from "@app/Assets/project/Mockmate.png";
import chatnest from "@app/Assets/project/Chatnest.png";
import twiddle from "@app/Assets/project/twiddle.png";
import reading from "@app/Assets/project/Reading.png";
import certificate from "@app/Assets/certificate.png";
import cuda from "@app/Assets/cuda.png";
import profileImage from "@app/Assets/profile.jpeg";
import profileImageAlt from "@app/Assets/pf.jpg";
import Reveal from "@components/reveal";
import ExperienceSection from "@components/exprienceSetion";
import StatsSection from "@components/statSection";
import { Github, Linkedin, Mail, MapPin, Phone, Smartphone, Globe, Palette, Server, ExternalLink, Download, Menu, X, Send, User, Building2, MessageSquare, Loader2 } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

type ProjectCategory = "All" | "Web" | "Flutter" | "ML" | "AI" | "Python";

const projectCategories: ProjectCategory[] = ["All", "Web", "Flutter", "ML", "AI", "Python"];

type Project = {
    name: string;
    image: typeof mockmate;
    categories: Exclude<ProjectCategory, "All">[];
    tech: string[];
    github?: string;
    live?: string;
};

const allProjects: Project[] = [
    {
        name: "CoCreate",
        image: mockmate,
        categories: ["Web"],
        tech: ["Next.js", "TailwindCss", "LiveBlocks"],
        github: "https://github.com/UKbhatt/CoCreate",
    },
    {
        name: "MockMate",
        image: mockmate,
        categories: ["Web", "AI"],
        tech: ["React.js", "Tailwind", "Node.js", "Gemini API"],
        github: "https://github.com/UKbhatt/CoCreate",
        live: "https://mockmate-flax.vercel.app",
    },
    {
        name: "ChatNest",
        image: chatnest,
        categories: ["Web"],
        tech: ["React", "Socket.io", "Node.js"],
        github: "https://github.com/UKbhatt/ChatNest",
        live: "https://chat-nest-chi.vercel.app/",
    },
    {
        name: "TalkAI",
        image: Supremecoding,
        categories: ["Web", "AI"],
        tech: ["React.js", "Tailwind", "Node.js", "Gemini API"],
        github: "https://github.com/UKbhatt/TalkAi",
        live: "https://talk-ai-two.vercel.app",
    },
    {
        name: "SupremeCoding",
        image: Supremecoding,
        categories: ["Web"],
        tech: ["React", "Tailwind", "Node.js"],
        github: "https://github.com/UKbhatt/SupremeCoding",
        live: "https://supremecoding.vercel.app",
    },
    {
        name: "HealthDesk",
        image: Supremecoding,
        categories: ["Web"],
        tech: ["React.js", "Tailwind", "Node.js"],
        github: "https://github.com/UKbhatt/HealthDesk",
        live: "https://health-care-maqy.vercel.app",
    },
    {
        name: "TwiddleUI",
        image: twiddle,
        categories: ["Web"],
        tech: ["React", "Framer Motion", "Tailwind"],
        github: "https://github.com/UKbhatt/TwiddleUI",
        live: "https://twiddle-ui-dusky.vercel.app",
    },
    {
        name: "InboxIQ",
        image: student,
        categories: ["Flutter", "AI"],
        tech: ["Flutter", "Dart", "Supabase"],
        github: "https://github.com/UKbhatt/InboxIQ",
    },
    {
        name: "ThoughtFlow",
        image: student,
        categories: ["Flutter"],
        tech: ["Flutter", "Dart", "Supabase"],
        github: "https://github.com/UKbhatt/Thought_Flow",
    },
    {
        name: "ReadingVerse",
        image: reading,
        categories: ["Flutter"],
        tech: ["Flutter", "Dart", "Supabase"],
        github: "https://github.com/UKbhatt/ReadingVerse",
    },
    {
        name: "ASD Multimodal Detection System",
        image: reading,
        categories: ["ML"],
        tech: ["Deep Learning", "Transfer learning"],
        github: "https://colab.research.google.com/drive/165_fAic1qNym-SpQfv0d1XsSsrtedJTX?usp=sharing",
    },
    {
        name: "VaaniAi",
        image: reading,
        categories: ["ML", "AI"],
        tech: ["Python", "TensorFlow"],
        github: "https://github.com/UKbhatt/VaaniAI",
    },
    {
        name: "ShareSi",
        image: reading,
        categories: ["Python"],
        tech: ["Python", "Django"],
        github: "https://github.com/UKbhatt/ShareSi",
    },
    {
        name: "JobCompass",
        image: reading,
        categories: ["Python"],
        tech: ["Python", "Django"],
        github: "https://github.com/UKbhatt/JobCompass",
    },
];

const navItems = ["About", "Resume", "Stats", "Projects", "Skills", "Certifications", "Contact"];

const services = [
    {
        icon: <Smartphone className="text-amber-400" size={28} />,
        title: "Mobile App Development",
        desc: "Cross-platform mobile applications using Flutter and React Native, focused on performance, scalability, and clean UI.",
    },
    {
        icon: <Globe className="text-amber-400" size={28} />,
        title: "Full-Stack Web Development",
        desc: "End-to-end web applications using MERN and Next.js with responsive UI, secure APIs, and modern architecture.",
    },
    {
        icon: <Palette className="text-amber-400" size={28} />,
        title: "Flutter Development",
        desc: "High-quality Flutter applications with clean architecture, state management, and seamless cross-platform experience.",
    },
    {
        icon: <Server className="text-amber-400" size={28} />,
        title: "Backend Development",
        desc: "Scalable backend services using Node.js and Django with secure authentication, databases, and cloud-ready APIs.",
    },
];


function ProjectCard({ project }: { project: Project }) {
    const src = typeof project.image === "string" ? project.image : project.image.src;

    return (
        <div className="group">
            <div className="rounded-2xl overflow-hidden bg-zinc-800/30 border border-zinc-700/30 
                hover:border-amber-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/5">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                    <img
                        src={src}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        flex flex-col items-center justify-center p-4">

                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {project.tech.map((t, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-xs font-medium rounded-full
                                    bg-amber-400/20 text-amber-400 border border-amber-400/30"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg
                                    bg-zinc-800 text-white text-sm font-medium
                                    hover:bg-zinc-700 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github size={16} />
                                    Code
                                </a>
                            )}
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg
                                    bg-amber-400 text-black text-sm font-medium
                                    hover:bg-amber-300 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={16} />
                                    Live
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                    <div className="flex flex-wrap gap-1">
                        {project.categories.map((cat) => (
                            <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState("About");
    const [projectFilter, setProjectFilter] = useState<ProjectCategory>("All");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const [contactType, setContactType] = useState<"recruiter" | "other">("other");
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const filteredProjects = projectFilter === "All"
        ? allProjects
        : allProjects.filter(p => p.categories.includes(projectFilter));

    useEffect(() => {
        const htmlEl = document.documentElement;
        const bodyEl = document.body;
        htmlEl.classList.add("no-scrollbar");
        bodyEl.classList.add("no-scrollbar");
        htmlEl.style.overflow = "hidden";
        bodyEl.style.overflow = "hidden";
        return () => {
            htmlEl.classList.remove("no-scrollbar");
            bodyEl.classList.remove("no-scrollbar");
            htmlEl.style.overflow = "";
            bodyEl.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const sectionIds = navItems.map(item => item.toLowerCase());

        const handleScroll = () => {
            const scrollTop = scrollContainer.scrollTop;
            const containerHeight = scrollContainer.clientHeight;

            let currentSection = navItems[0];

            for (let i = 0; i < sectionIds.length; i++) {
                const section = document.getElementById(sectionIds[i]);
                if (section) {
                    const sectionTop = section.offsetTop - scrollContainer.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (scrollTop >= sectionTop - 100) {
                        currentSection = navItems[i];
                    }
                }
            }

            setActiveSection(currentSection);
        };

        handleScroll();

        scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const scrollContainer = scrollContainerRef.current;
        const section = document.getElementById(sectionId.toLowerCase());

        if (scrollContainer && section) {
            const sectionTop = section.offsetTop - scrollContainer.offsetTop;
            scrollContainer.scrollTo({
                top: sectionTop,
                behavior: "smooth"
            });
        }

        setActiveSection(sectionId);
        setSidebarOpen(false);
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...contactForm,
                    type: contactType
                })
            });

            const data = await response.json();

            if (data.ok) {
                setSubmitStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
                setContactForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
            } else {
                setSubmitStatus({ type: "error", message: data.error || "Failed to send message. Please try again." });
            }
        } catch {
            setSubmitStatus({ type: "error", message: "Network error. Please check your connection and try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen bg-[#131313] text-white overflow-hidden p-2 sm:p-4 lg:p-6">
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 rounded-xl bg-[#1e1e1e] border border-zinc-800/50 
                flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex gap-2 sm:gap-4 lg:gap-6 h-full max-w-[1800px] mx-auto">
                <aside className={`
                    fixed md:relative z-40 md:z-auto
                    w-[280px] lg:w-[300px] flex-shrink-0 
                    bg-[#1e1e1e] rounded-2xl border border-zinc-800/50 shadow-xl
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    top-0 left-0 h-full md:h-auto
                `}>
                    <div className="h-full overflow-y-auto no-scrollbar p-6 flex flex-col">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-3 group" style={{ perspective: "1000px" }}>
                                <div
                                    className="w-32 h-32 relative transition-transform duration-700 ease-in-out"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div
                                        className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 border-zinc-700/50 shadow-lg
                                        group-hover:[transform:rotateY(180deg)] transition-transform duration-700"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <img
                                            src={profileImage.src}
                                            alt="Utkarsh Bhatt"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div
                                        className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-lg shadow-amber-500/20
                                        [transform:rotateY(180deg)] group-hover:[transform:rotateY(0deg)] transition-transform duration-700"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <img
                                            src={profileImageAlt.src}
                                            alt="Utkarsh Bhatt"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-xl font-bold text-white mt-2">Utkarsh Bhatt</h1>
                            <span className="mt-2 px-4 py-1.5 text-xs font-medium bg-[#2a2a2a] text-zinc-400 rounded-lg border border-zinc-700/30">
                                Software Developer
                            </span>
                        </div>

                        <div className="my-6 h-px bg-zinc-700/50" />

                        <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-[#2a2a2a] border border-zinc-700/30 flex items-center justify-center flex-shrink-0">
                                    <Mail size={18} className="text-amber-400" />
                                </div>
                                <div className="text-left min-w-0">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Email</p>
                                    <p className="text-zinc-300 text-sm truncate">ubhatt2004@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-[#2a2a2a] border border-zinc-700/30 flex items-center justify-center flex-shrink-0">
                                    <Phone size={18} className="text-amber-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Phone</p>
                                    <p className="text-zinc-300 text-sm">+91 9026906399</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-[#2a2a2a] border border-zinc-700/30 flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} className="text-amber-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Location</p>
                                    <p className="text-zinc-300 text-sm">India</p>
                                </div>
                            </div>

                            <a
                                href="https://drive.google.com/uc?export=download&id=1ZdVcOnyCnxeZarbl4Ug5-MTDpaDHIi1M"
                                className="group flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 rounded-xl
                                bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-semibold
                                hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/30
                                active:scale-[0.98] transition-all duration-300 shadow-lg shadow-amber-500/20"
                            >
                                <Download size={18} className="group-hover:animate-bounce" />
                                Download Resume
                            </a>
                        </div>

                        <div className="my-6 h-px bg-zinc-700/50" />

                        <div className="flex justify-center gap-2">
                            {[
                                { href: "https://www.linkedin.com/in/utkarsh-bhatt-183325261/", icon: <Linkedin size={16} /> },
                                { href: "https://github.com/UKbhatt", icon: <Github size={16} /> },
                                { href: "https://x.com/utkarsh_B2004", icon: <FaXTwitter size={16} /> },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-[#2a2a2a] border border-zinc-700/30 flex items-center justify-center 
                                    text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-200"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="flex-1 bg-[#1e1e1e] rounded-2xl border border-zinc-800/50 shadow-xl flex flex-col overflow-hidden ml-0 md:ml-0">
                    <nav className="flex-shrink-0 px-4 sm:px-8 py-4 sm:py-5 border-b border-zinc-800/50 overflow-x-auto no-scrollbar">
                        <div className="flex items-center justify-start md:justify-end gap-4 sm:gap-6 lg:gap-8 min-w-max pl-10 md:pl-0">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className={`relative text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeSection === item
                                        ? "text-amber-400"
                                        : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    {item}
                                    {activeSection === item && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-4 sm:-bottom-5 left-0 right-0 h-0.5 bg-amber-400"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </nav>

                    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar">
                        <section id="about" className="p-4 sm:p-6 lg:p-8">
                            <Reveal delay={100}>
                                <h2 className="text-2xl font-bold text-white mb-1">About Me</h2>
                                <div className="w-8 h-1 bg-amber-400 rounded-full mb-6" />

                                <p >
                                    I’m Utkarsh, a developer who enjoys crafting fast, clean, and delightful digital
                                    experiences. I work across the stack with React and Next.js on the frontend,
                                    and Node.js and Django on the backend, focusing on performance, scalability,
                                    and developer experience.
                                </p>
                                <p className="text-amber-400/80 leading-relaxed italic">
                                    Good software is built twice — first in the mind, then in code.
                                </p>
                            </Reveal>

                            <Reveal delay={150}>
                                <h3 className="text-xl font-bold text-white mt-12 mb-6">What I&apos;m Doing</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {services.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-4 p-5 rounded-xl bg-[#2a2a2a]/50 border border-zinc-700/30
                                            hover:border-zinc-600/50 transition-colors"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1e1e1e] border border-zinc-700/30 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </section>

                        <section id="resume" className="p-4 sm:p-6 lg:p-8 bg-[#1a1a1a]">
                            <ExperienceSection />
                        </section>

                        <section id="stats" className="p-4 sm:p-6 lg:p-8">
                            <Reveal delay={100}>
                                <h2 className="text-2xl font-bold text-white mb-1">Problem Solving Stats</h2>
                                <div className="w-8 h-1 bg-amber-400 rounded-full mb-2" />
                                <p className="text-zinc-500 mb-8">My competitive programming journey across different platforms</p>
                                <StatsSection
                                    cfHandle={process.env.NEXT_PUBLIC_CODEFORCES_HANDLE ?? ""}
                                    lcUser={process.env.NEXT_PUBLIC_LEETCODE_USERNAME ?? ""}
                                    ghUser={process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? ""}
                                />
                            </Reveal>
                        </section>

                        <section id="projects" className="p-4 sm:p-6 lg:p-8 bg-[#1a1a1a]">
                            <Reveal delay={100}>
                                <h2 className="text-2xl font-bold text-white mb-1">Portfolio</h2>
                                <div className="w-8 h-1 bg-amber-400 rounded-full mb-6" />

                                <div className="flex gap-6 mb-8">
                                    {projectCategories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setProjectFilter(category)}
                                            className={`text-sm font-medium transition-colors ${projectFilter === category
                                                ? "text-amber-400"
                                                : "text-zinc-500 hover:text-white"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredProjects.map((project) => (
                                            <motion.div
                                                key={project.name}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ProjectCard project={project} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {filteredProjects.length === 0 && (
                                    <div className="text-center py-12 text-zinc-500">
                                        No projects in this category yet.
                                    </div>
                                )}
                            </Reveal>
                        </section>

                        <section id="skills" className="p-4 sm:p-6 lg:p-8">
                            <Reveal delay={100}>
                                <h2 className="text-2xl font-bold text-white mb-1">Skills & Technologies</h2>
                                <div className="w-8 h-1 bg-amber-400 rounded-full mb-2" />
                                <p className="text-zinc-500 mb-8">The tools and technologies I use to build scalable applications</p>
                                <TechGrid />
                            </Reveal>
                        </section>

                        <section id="certifications" className="p-4 sm:p-6 lg:p-8 bg-[#1a1a1a]">
                            <Reveal delay={100}>
                                <h2 className="text-2xl font-bold text-white mb-1">Certifications</h2>
                                <div className="w-8 h-1 bg-amber-400 rounded-full mb-2 " />
                                <p className="text-zinc-500 mb-8 ">Professional certifications and recognition</p>
                                <ImageCard src={certificate} />
                                <ImageCard src={cuda} />
                            </Reveal>
                        </section>

                        <section id="contact" className="p-4 sm:p-6 lg:p-8">
                            <Reveal delay={100}>
                                <h2 className="text-2xl font-bold text-white mb-1">Get In Touch</h2>
                                <div className="w-8 h-1 bg-amber-400 rounded-full mb-2" />
                                <p className="text-zinc-500 mb-8">Have a question or want to work together? Send me a message!</p>

                                <div className="flex gap-4 mb-8">
                                    <button
                                        onClick={() => setContactType("recruiter")}
                                        className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${contactType === "recruiter"
                                            ? "bg-amber-400 text-black border-amber-400"
                                            : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-600"
                                            }`}
                                    >
                                        <Building2 size={18} />
                                        <span className="font-medium">I'm a Recruiter</span>
                                    </button>
                                    <button
                                        onClick={() => setContactType("other")}
                                        className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${contactType === "other"
                                            ? "bg-amber-400 text-black border-amber-400"
                                            : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-zinc-600"
                                            }`}
                                    >
                                        <User size={18} />
                                        <span className="font-medium">Other Inquiry</span>
                                    </button>
                                </div>

                                <form onSubmit={handleContactSubmit} className="max-w-2xl space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 
                                                text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none 
                                                transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 
                                                text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none 
                                                transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={contactForm.phone}
                                                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 
                                                text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none 
                                                transition-colors"
                                                placeholder="+91 9876543210"
                                            />
                                        </div>

                                        {contactType === "recruiter" && (
                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-2">Company *</label>
                                                <input
                                                    type="text"
                                                    required={contactType === "recruiter"}
                                                    value={contactForm.company}
                                                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 
                                                    text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none 
                                                    transition-colors"
                                                    placeholder="Company name"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            value={contactForm.subject}
                                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 
                                            text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none 
                                            transition-colors"
                                            placeholder={contactType === "recruiter" ? "Job Opportunity / Position" : "What's this about?"}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">Message *</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={contactForm.message}
                                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 
                                            text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none 
                                            transition-colors resize-none"
                                            placeholder={contactType === "recruiter"
                                                ? "Tell me about the role and your company..."
                                                : "Your message..."}
                                        />
                                    </div>

                                    {submitStatus && (
                                        <div className={`p-4 rounded-xl ${submitStatus.type === "success"
                                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                                            : "bg-red-500/10 border border-red-500/30 text-red-400"
                                            }`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl
                                        bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold
                                        hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] 
                                        active:scale-[0.98] transition-all duration-300 
                                        shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </Reveal>
                        </section>

                        <footer className="p-6 text-center text-zinc-500 text-sm border-t border-zinc-800/50">
                            © 2025 Utkarsh Bhatt. All rights reserved.
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
