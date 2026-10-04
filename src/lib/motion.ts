import type { CSSProperties } from "react";

// Stagger step for [data-reveal] elements (each step is 80ms, see motion.css)
export const delay = (step: number) => ({ "--d": step }) as CSSProperties;
