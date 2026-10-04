import type { CSSProperties } from "react";

// Splits a headline into words so each can rise in on its own delay.
// Screen readers get the plain sentence; the animated copy is hidden from them.
export default function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="split-words" aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="w" style={{ "--i": i } as CSSProperties}>
              <span>{word}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}
