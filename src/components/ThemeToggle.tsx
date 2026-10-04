"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { themeStorageKey, type Theme } from "@/content/design";

// Light/dark switch. The theme lives on <html data-theme>, set before paint by the boot script.
// Until someone picks a theme, the site follows their OS setting, including live changes.

const root = () => document.documentElement;
const readTheme = (): Theme => (root().dataset.theme === "dark" ? "dark" : "light");

function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(themeStorageKey);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const followOs = () => {
    if (!storedTheme()) root().setAttribute("data-theme", mql.matches ? "dark" : "light");
  };
  mql.addEventListener("change", followOs);

  return () => {
    mo.disconnect();
    mql.removeEventListener("change", followOs);
  };
}

function applyTheme(next: Theme) {
  root().setAttribute("data-theme", next);
  try {
    localStorage.setItem(themeStorageKey, next);
  } catch {
    // storage unavailable: the choice lasts for this page view only
  }
}

// Reveal the new theme as a circle growing out of the toggle, where the browser supports it
function switchTheme(next: Theme, x: number, y: number) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof document.startViewTransition !== "function") {
    applyTheme(next);
    return;
  }

  // Freeze other CSS transitions so the snapshot is the finished theme, not a halfway state
  root().setAttribute("data-theme-switching", "");
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const transition = document.startViewTransition(() => applyTheme(next));

  transition.ready.then(() => {
    root().animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
  transition.finished.finally(() => root().removeAttribute("data-theme-switching"));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  const dark = theme === "dark";

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    switchTheme(dark ? "light" : "dark", r.left + r.width / 2, r.top + r.height / 2);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-pressed={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
