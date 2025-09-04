"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

type Props = {
  children: ReactNode;
  /** When to start loading, e.g. "200px" before viewport */
  rootMargin?: string;
  /** 0..1 – how much must be visible to trigger */
  threshold?: number;
  /** Keep mounted after first time */
  once?: boolean;
  /** Optional placeholder while offscreen */
  fallback?: ReactNode;
  /** Enable entrance animation (defaults on) */
  animate?: boolean;
};

export default function LazyMount({
  children,
  rootMargin = "200px",
  threshold = 0.1,
  once = true,
  fallback = null,
  animate = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { root: null, rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  // Keep a lightweight box in the flow to avoid layout shift
  return (
    <div ref={ref}>
      {visible ? (
        animate ? (
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {children}
            </m.div>
          </LazyMotion>
        ) : (
          children
        )
      ) : (
        fallback
      )}
    </div>
  );
}
