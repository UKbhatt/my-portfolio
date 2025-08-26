"use client";
import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { X } from "lucide-react";

type ImageCardProps = {
  src: string | StaticImageData; 
};

export default function ImageCard({ src }: ImageCardProps) {
  const [open, setOpen] = useState(false);
  const url = typeof src === "string" ? src : src.src;

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative rounded-lg overflow-hidden border border-white/10 
        bg-white/5 hover:bg-white/10 transition shadow-md py-10"
        style={{ width: 300, height: 200 }}
        aria-label="Open image"
      >
        <Image
          src={url}
          alt="preview"
          fill
          sizes="150px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/10 hover:bg-white/20 border border-white/20"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <Image src={url} alt="full" fill className="object-contain" priority />
          </div>
        </div>
      )}
    </>
  );
}
