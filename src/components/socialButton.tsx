"use client";
import { ReactNode } from "react";

type SocialButtonProps = {
  icon: ReactNode;
  href: string;
};

export function SocialButton({ icon, href }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center 
                 w-12 h-12 rounded-xl border-2
                 bg-slate/90 text-gray-300 
                 hover:text-white 
                 shadow-md shadow-black/40
                 transition-all duration-300 
                 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
    >
      {icon}
    </a>
  );
}
