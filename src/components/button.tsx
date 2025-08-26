"use client"
import React from "react";

type SmallButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function SmallButton({ children, onClick, className }: SmallButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 text-sm font-medium 
        rounded-full border-2 
        bg-gray-900 text-white border-gray-700
        transition-colors duration-200 
        hover:bg-gray-800 hover:border-gray-600
        active:scale-95 shadow-sm shadow-gray-900 hover:shadow-gray-700
        ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
