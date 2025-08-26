"use client";
import React, { useState } from "react";

import ArrowTrackingBubble from "@/components/arrowtracker";
import { CometCardDemo } from "@/components/Profile";
import TypedText from "@/components/typed";
import { SmallButton } from "@/components/button";
import { SquareButton } from "@/components/square-button";
import { Briefcase, Mail, Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SocialButton } from "@/components/socialButton";
import AboutSection from "@/components/about";
import TabsBar from "@/components/tab";
import { ThreeDCardDemo } from "@/components/3dCard";
import ImageCard from "@/components/imageCard";
import { TechGrid } from "@/components/techCard";

import news from "@/app/Assets/project/SupremeTyping.png";
import Supremecoding from "@/app/Assets/project/SupremeCoding.png";
import student from "@/app/Assets/project/Student.png";
import twiddle from "@/app/Assets/project/twiddle.png";
import reading from "@/app/Assets/project/Reading.png";
import expense from "@/app/Assets/project/ExApp.png";
import certificate from "@/app/Assets/certificate.png";
import Footer from "@/components/footer";

export default function BackgroundRippleEffectDemo() {
    const [tab, setTab] = useState<"projects" | "certs" | "stack">("projects");

    return (
        <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
            <ArrowTrackingBubble fullScreen size={56} className="z-0" />

            <div className="relative z-10">
                <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-12 gap-8">
                    <div className="w-full md:w-1/2 flex flex-col items-start">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs sm:text-sm font-semibold text-white/90 mb-3">
                                {" cout << Hello World << endl "}
                            </span>
                            <div>UTKARSH</div>
                            <div>BHATT</div>
                            <div className="py-4">
                                <h2 className="text-base sm:text-2xl lg:text-3xl font-bold">
                                    <TypedText strings={["Full stack Developer", "Flutter Developer", "Web Developer"]} />
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base max-w-md text-gray-300">
                                Enhancing digital experiences that are smooth, scalable, and made to impress.
                            </p>
                        </h1>

                        <div className="hidden md:flex flex-col md:flex-row gap-3 mt-6 md:w-1/2">
                            <SmallButton>React.js</SmallButton>
                            <SmallButton>Tailwind</SmallButton>
                            <SmallButton>Flutter</SmallButton>
                            <SmallButton>Node.js</SmallButton>
                            <SmallButton>Next.js</SmallButton>
                        </div>

                        <div className="flex gap-6 py-5 items-center">
                            <div >
                            <SquareButton label="Projects" icon={<Briefcase size={18} />} />
                            </div>
                            <SquareButton label="Contact Me" icon={<Mail size={18} />}
                                onClick={() => window.location.href = "mailto:ubhatt2004@gmail.com"} />
                        </div>

                        <div className="flex gap-6 py-5 items-center">
                            <SocialButton href="https://github.com/UKbhatt" icon={<Github size={22} />} />
                            <SocialButton href="https://www.linkedin.com/in/utkarsh-bhatt-183325261/"
                                icon={<Linkedin size={22} />} />
                            <SocialButton href="https://x.com/utkarsh_B2004" icon={<FaXTwitter size={22} />} />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <CometCardDemo />
                        </div>
                    </div>
                </section>

                <AboutSection />

                <section className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden">
                    <div className="mt-10 w-full">
                        <TabsBar initial="projects" onChange={setTab} />
                    </div>

                    <div className="mt-2 max-w-5xl w-full px-1" id="project">
                        {tab === "projects" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 items-start">
                                <ThreeDCardDemo name="CoCreate" github="https://github.com/UKbhatt/CoCreate"
                                    image="https://cms.pixso.net/images/articles/profile-page-design.png" />
                                <ThreeDCardDemo name="SupremeCoding" github="https://github.com/UKbhatt/SupremeCoding"
                                    image={Supremecoding} live="https://supremecoding.vercel.app/"/>
                                <ThreeDCardDemo name="TwiddleUI" github="https://github.com/UKbhatt/TwiddleUI"
                                    image={twiddle} live="https://twiddle-ui-dusky.vercel.app/"/>
                                <ThreeDCardDemo name="SupremeTyping" github="https://github.com/UKbhatt/SupremeTyping"
                                    image={news} live="https://supremetyping.vercel.app/"/>
                                <ThreeDCardDemo name="ThoughtFlow" github="https://github.com/UKbhatt/Thought_Flow"
                                    image={student} />
                                <ThreeDCardDemo name="ReadingVerse" github="https://github.com/UKbhatt/ReadingVerse"
                                    image={reading} />
                            </div>
                        )}

                        {tab === "certs" && (
                            <div className="flex items-center justify-center py-10">
                                <ImageCard src={certificate} />
                            </div>
                        )}

                        {tab === "stack" && (
                            <div className="py-10">
                                <TechGrid />
                            </div>
                        )}
                    </div>
                    <Footer />
                </section>
            </div>
        </main>
    );
}
