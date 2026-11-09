import { useId } from "react";

// A sparse, fixed star field for night surfaces. Positions come from a seeded generator,
// so the server and the browser draw the same sky. Two tiles of unrelated sizes overlap,
// which hides the repeat.

type Star = { x: number; y: number; r: number; o: number };

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function scatter(seed: number, size: number, count: number): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const x = 2 + rand() * (size - 4);
    const y = 2 + rand() * (size - 4);
    const m = rand(); // most stars are faint, a few are bright
    if (m > 0.94) return { x, y, r: 1.2, o: 0.9 };
    if (m > 0.75) return { x, y, r: 0.85, o: 0.6 };
    return { x, y, r: 0.6, o: 0.25 + m * 0.3 };
  });
}

const TILES = [
  { size: 397, stars: scatter(11, 397, 14) },
  { size: 571, stars: scatter(29, 571, 20) },
];

export default function StarField({ sparse = false }: { sparse?: boolean }) {
  const id = useId().replace(/[^\w-]/g, "");
  const tiles = sparse ? TILES.slice(0, 1) : TILES;
  return (
    <svg className="starfield" aria-hidden="true">
      <defs>
        {tiles.map((tile, i) => (
          <pattern key={i} id={`${id}-${i}`} width={tile.size} height={tile.size} patternUnits="userSpaceOnUse">
            {tile.stars.map((s, j) => (
              <circle key={j} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r} opacity={s.o.toFixed(2)} />
            ))}
          </pattern>
        ))}
      </defs>
      {tiles.map((_, i) => (
        <rect key={i} width="100%" height="100%" fill={`url(#${id}-${i})`} />
      ))}
    </svg>
  );
}
