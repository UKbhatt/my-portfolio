"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { StaticImageData } from "next/image";

type ContentProps = {
    image: string | StaticImageData;
    name: string;
    live?: string;
    github: string;
};

export function ThreeDCardDemo({ image, name, live, github }: ContentProps) {
    const src = typeof image === "string" ? image : image.src;
    return (
        <CardContainer className="inter-var">
            <CardBody
                className="bg-gray-50 relative group/card  
        dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] 
        dark:bg-black dark:border-white/[0.2] border-black/[0.1] 
        w-auto sm:w-[22rem] h-auto rounded-xl p-4 border"
            >
                <CardItem
                    translateZ="40"
                    className="text-lg font-semibold text-neutral-600 dark:text-white"
                >
                    {name}
                </CardItem>

                <CardItem translateZ="80" className="w-full mt-3">
                    <img
                        src={src}
                        height="600"
                        width="600"
                        className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-lg"
                        alt={name}
                    />
                </CardItem>

                <div className="flex items-center mt-8">
                    {live && (
                        <CardItem
                            translateZ={20}
                            as="a"
                            href={live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-normal dark:text-white"
                        >
                            Live →
                        </CardItem>
                    )}

                    <CardItem
                        as="a"
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        translateZ={20}
                        className="ml-auto px-3 py-1.5 rounded-lg bg-black dark:bg-white 
               dark:text-black text-white text-xs font-bold"
                    >
                        GitHub
                    </CardItem>
                </div>

            </CardBody>
        </CardContainer>
    );
}
