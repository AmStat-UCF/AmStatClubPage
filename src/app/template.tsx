import type { ReactNode } from "react";
import RevealObserver from "@/components/RevealObserver";

// Re-mounts on every navigation: replays the page-enter animation and re-scans for reveals.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="page-enter">
      {children}
      <RevealObserver />
    </div>
  );
}
