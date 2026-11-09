// The logo's two bell curves, drawn wide across the datathon band.
// Both are normal densities centered on the band. Spread and height are measured from the
// artwork: sd as a fraction of the width, peak and base as fractions of the height.
const W = 1000;
const H = 300;

const CURVES = [
  { name: "sky", sd: 0.18, peak: 0.4, base: 0.93 },
  { name: "ink", sd: 0.2, peak: 0.08, base: 0.69 },
].map(({ name, sd, peak, base }) => {
  let d = "";
  for (let i = 0; i <= 200; i++) {
    const x = i / 200;
    const y = base - (base - peak) * Math.exp(-((x - 0.5) ** 2) / (2 * sd * sd));
    d += (i ? "L" : "M") + (x * W).toFixed(1) + " " + (y * H).toFixed(1);
  }
  return { name, d };
});

export default function BandCurve() {
  return (
    <svg className="band-curve" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      {CURVES.map((c) => (
        <path key={c.name} className={c.name} d={c.d} />
      ))}
    </svg>
  );
}
