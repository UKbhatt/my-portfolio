"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { StaticImageData } from "next/image";

type ContentProps = {
  image: string | StaticImageData;
  name: string;
  live?: string;
  github: string;
  tech?: string[];   // ✅ new
  status?: "in-progress" | "completed" | "planned"; // ✅ new
};

export function ThreeDCardDemo({ image, name, live, github, tech, status }: ContentProps) {
  const src = typeof image === "string" ? image : image.src;

  // ✅ status color mapping
  const statusColors: Record<string, string> = {
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-400/30",
    "completed": "bg-green-500/20 text-green-400 border-green-400/30",
    "planned": "bg-blue-500/20 text-blue-400 border-blue-400/30",
  };

  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  
        dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] 
        dark:bg-black dark:border-white/[0.2] border-black/[0.1] 
        w-auto sm:w-[22rem] h-auto rounded-xl p-4 border"
      >
        {/* Header row with name + status */}
        <div className="flex items-center justify-between">
          <CardItem
            translateZ="40"
            className="text-lg font-semibold text-neutral-600 dark:text-white"
          >
            {name}
          </CardItem>

          {status && (
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${statusColors[status]}`}
            >
              {status === "in-progress"
                ? "In Progress"
                : status === "completed"
                ? "Completed"
                : "Planned"}
            </span>
          )}
        </div>

        {/* Image */}
        <CardItem translateZ="80" className="w-full mt-3">
          <img
            src={src}
            height="600"
            width="600"
            className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-lg"
            alt={name}
          />
        </CardItem>

        {/* Tech stack badges */}
        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md border border-white/10 
                           bg-white/5 text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center mt-6">
          {live && (
            <CardItem
              translateZ={20}
              as="a"
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-normal dark:text-white hover:underline"
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
