// The right-skewed curve from the logo, drawn wide across the datathon band.
// Log-normal(0, 0.5) density, sampled once at build time.
const SIGMA = 0.5;

function pdf(x: number) {
  if (x <= 0) return 0;
  const l = Math.log(x);
  return Math.exp(-(l * l) / (2 * SIGMA * SIGMA)) / (x * SIGMA * Math.sqrt(2 * Math.PI));
}

const W = 1000;
const H = 300;
const X_MAX = 4.4;
const PEAK = pdf(Math.exp(-SIGMA * SIGMA));

let d = "";
for (let i = 0; i <= 200; i++) {
  const x = (i / 200) * X_MAX;
  const px = (x / X_MAX) * W;
  const py = H - (pdf(x) / PEAK) * (H - 8);
  d += (i ? "L" : "M") + px.toFixed(1) + " " + py.toFixed(1);
}

export default function BandCurve() {
  return (
    <svg className="band-curve" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} pathLength={1} />
    </svg>
  );
}
