import type { Fact } from "@/content/site";

// Key/value list with booktabs-style rules. Unfilled values show their hint as a placeholder.
export default function FactList({ facts, tone = "light" }: { facts: Fact[]; tone?: "light" | "dark" }) {
  return (
    <dl className={tone === "dark" ? "facts-dark" : "facts"}>
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value ?? <span className="tbd">{fact.hint}</span>}</dd>
        </div>
      ))}
    </dl>
  );
}
