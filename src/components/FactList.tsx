import type { Fact } from "@/content/site";

// Key/value list with booktabs-style rules. Unfilled values show their hint as a placeholder.
export default function FactList({ facts, large = false }: { facts: Fact[]; large?: boolean }) {
  return (
    <dl className={large ? "facts facts-lg" : "facts"}>
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value ?? <span className="tbd">{fact.hint}</span>}</dd>
        </div>
      ))}
    </dl>
  );
}
