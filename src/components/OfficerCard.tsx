import type { Officer } from "@/content/officers";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Head-and-shoulders silhouette shown until a real headshot is added
function Portrait({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Placeholder portrait for ${name}`}>
      <g className="sil">
        <circle cx="200" cy="205" r="78" />
        <path d="M58 520c0-112 64-182 142-182s142 70 142 182z" />
      </g>
      <text className="initials" x="376" y="476" textAnchor="end">{initials(name)}</text>
    </svg>
  );
}

export default function OfficerCard({ officer, number }: { officer: Officer; number: number }) {
  return (
    <li className="officer">
      <div className="officer-photo">
        {officer.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- officer photos are plain files in /public, sized by CSS
          <img src={officer.photo} alt={officer.name} loading="lazy" />
        ) : (
          <Portrait name={officer.name} />
        )}
        <span className="officer-no" aria-hidden="true">{String(number).padStart(2, "0")}</span>
      </div>
      <div className="officer-body">
        <p className="officer-role label">{officer.role}</p>
        <h3 className="officer-name">{officer.name}</h3>
        <p className="officer-meta">{officer.major} · {officer.year}</p>
        <p className="officer-desc">{officer.duty}</p>
        {(officer.linkedin || officer.email) && (
          <p className="officer-links">
            {officer.linkedin && <a className="ext" href={officer.linkedin}>LinkedIn</a>}
            {officer.email && <a href={`mailto:${officer.email}`}>Email</a>}
          </p>
        )}
      </div>
    </li>
  );
}
