"use client";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

type Props = {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  className?: string;
};

export default function TypedText({
  strings,
  typeSpeed = 55,
  backSpeed = 35,
  backDelay = 800,
  loop = true,
  className,
}: Props) {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (!el.current) return;
    typed.current = new Typed(el.current, {
      strings,
      typeSpeed,
      backSpeed,
      backDelay,
      loop,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
    });
    return () => typed.current?.destroy();
  }, [strings, typeSpeed, backSpeed, backDelay, loop]);

  return <span ref={el} className={className} />;
}
