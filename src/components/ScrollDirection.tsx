"use client";

import { useEffect } from "react";

// Sets data-scroll="up" | "down" on <html> so the header can tuck away while reading.
export default function ScrollDirection() {
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let queued = false;

    const update = () => {
      queued = false;
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      root.dataset.scroll = y > lastY && y > 160 ? "down" : "up";
      lastY = y;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
