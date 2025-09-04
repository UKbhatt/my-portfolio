"use client";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react"; 

type SquareButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export function SquareButton({ label, icon, onClick }: SquareButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center
                 w-40 h-10 md:w-40 md:h-10
                 rounded-lg bg-slate-900 text-white font-semibold
                 shadow-md transition-all duration-300
                 hover:shadow-[0_0_25px_rgba(0,0,0,0.5)]
                 hover:bg-slate-800 gap-2"
    >
      <span>{label}</span>
      <span
        className="flex items-center text-sm text-gray-300
                   transition-transform duration-300 group-hover:translate-x-1"
      >
        {icon ?? <ArrowRight size={16} />}
      </span>
    </button>
  );
}
