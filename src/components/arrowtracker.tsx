"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  size?: number;          
  className?: string;     
  fullScreen?: boolean;   
};

export default function ArrowTrackingBubble({ size = 56, className = "", fullScreen = false }: Props) {
  const areaRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.7 });

  const rot = useMotionValue(0);
  const srot = useSpring(rot, { stiffness: 200, damping: 25, mass: 0.7 });

  const [hovered, setHovered] = useState(false);
  const prev = useRef<{ x: number; y: number } | null>(null);

  const updateFromPoint = (clientX: number, clientY: number) => {
    let cx = clientX;
    let cy = clientY;

    if (!fullScreen) {
      const el = areaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      cx = clientX - rect.left;
      cy = clientY - rect.top;
    }

    x.set(cx);
    y.set(cy);

    if (prev.current) {
      const dx = cx - prev.current.x;
      const dy = cy - prev.current.y;
      if (dx !== 0 || dy !== 0) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        rot.set(angle);
      }
    }
    prev.current = { x: cx, y: cy };
  };

  useEffect(() => {
    if (!fullScreen) return;
    const onMove = (e: MouseEvent) => {
      updateFromPoint(e.clientX, e.clientY);
      setHovered(true);
    };
    const onLeave = () => {
      setHovered(false);
      prev.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [fullScreen]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (fullScreen) return;
    updateFromPoint(e.clientX, e.clientY);
  }
  function onEnter() {
    if (!fullScreen) setHovered(true);
  }
  function onLeave() {
    if (!fullScreen) {
      setHovered(false);
      prev.current = null;
    }
  }

  return (
    <div
      ref={areaRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={
        fullScreen
          ? `fixed inset-0 pointer-events-none ${className}` 
          : `relative w-full h-80 overflow-hidden ${className}`
      }
    >
      <div className="absolute inset-0 pointer-events-none 
      bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_90%)]" />

      <motion.div
        style={{
          width: size,
          height: size,
          x: sx,
          y: sy,
          scale: hovered ? 1 : 0.85,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <motion.div style={{ rotate: srot }} className="text-white opacity-20">
          <ArrowRight className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
