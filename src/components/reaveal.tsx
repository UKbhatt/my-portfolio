"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  once?: boolean;
  delay?: number;
  fromClassName?: string; 
  toClassName?: string;   
};

export default function Reveal({
  children,
  once = true,
  delay = 0,
  fromClassName = "opacity-0 translate-y-6",
  toClassName = "opacity-100 translate-y-0",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) setTimeout(() => setVisible(true), delay);
          else setVisible(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15 } 
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform
        ${visible ? toClassName : fromClassName}`}
    >
      {children}
    </div>
  );
}
