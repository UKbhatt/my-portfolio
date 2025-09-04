"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type WithChildren<P = {}> = P & { children?: React.ReactNode };
type ElementType = React.ElementType;

// Generic polymorphic prop helper
type PolymorphicProps<T extends ElementType, P> =
  P & {
    as?: T;
    children?: React.ReactNode; // ✅ ensure children allowed
  } & Omit<React.ComponentPropsWithoutRef<T>, keyof P | "as" | "children">;

// -------------------- CardContainer --------------------

export const CardContainer = React.forwardRef<HTMLDivElement, WithChildren<{
  className?: string;
  containerClassName?: string;
}>>(({ children, className, containerClassName }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-20 flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={(node) => {
            if (ref && typeof ref !== "function") {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
            containerRef.current = node;
          }}

          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
});
CardContainer.displayName = "CardContainer";

// -------------------- CardBody --------------------

export const CardBody = React.forwardRef<HTMLDivElement, WithChildren<{ className?: string }>>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
CardBody.displayName = "CardBody";

// -------------------- CardItem (polymorphic) --------------------

type CardItemOwnProps = {
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  style?: React.CSSProperties;
};

export const CardItem = React.forwardRef(
  <T extends ElementType = "div">(
    {
      as,
      children,
      className,
      translateX = 0,
      translateY = 0,
      translateZ = 0,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0,
      style,
      ...rest
    }: PolymorphicProps<T, CardItemOwnProps>,
    ref: React.Ref<Element>
  ) => {
    const Tag = (as || "div") as T;
    const localRef = React.useRef<HTMLElement | null>(null);
    const [isMouseEntered] = useMouseEnter();

    React.useEffect(() => {
      if (!localRef.current) return;
      const el = localRef.current as HTMLElement;

      if (isMouseEntered) {
        el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      } else {
        el.style.transform =
          "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
      }
    }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

    return (
      <Tag
        ref={(node: any) => {
          // merge refs
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn("w-fit transition duration-200 ease-linear", className)}
        style={style}
        {...(rest as any)}
      >
        {children}
      </Tag>
    );
  }
);
CardItem.displayName = "CardItem";

// -------------------- Context & hook --------------------

const MouseEnterContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const useMouseEnter = () => {
  const ctx = React.useContext(MouseEnterContext);
  if (ctx === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return ctx;
};
