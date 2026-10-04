"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
  type ReactNode,
} from "react";

// Figure 1: a histogram that fills in as draws come from a log-normal(0, 0.5),
// with the true density on top and live mean/median markers.
// The SVG is laid out at its real pixel width so labels stay legible on phones.

const M = { top: 34, right: 12, bottom: 30, left: 12 };
const X_MAX = 4;
const BINS = 40;
const BIN_W = X_MAX / BINS;
const SIGMA = 0.5;
const MAX_N = 10_000;
const INITIAL_DRAWS = 500;
const DRAWS_PER_CLICK = 100;
const CURVE_STEPS = 240;
const LABEL_CHAR_W = 11 * 0.6; // IBM Plex Mono advance width at the 11px label size

function pdf(x: number) {
  if (x <= 0) return 0;
  const l = Math.log(x);
  return Math.exp(-(l * l) / (2 * SIGMA * SIGMA)) / (x * SIGMA * Math.sqrt(2 * Math.PI));
}

function drawLogNormal() {
  // Box–Muller for a standard normal, then exponentiate
  let u = 0;
  while (u === 0) u = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
  return Math.exp(SIGMA * z);
}

const drawMany = (k: number) => Array.from({ length: k }, drawLogNormal);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Sample = { values: number[]; counts: number[]; sum: number; sumSq: number };
type Action = { type: "add"; draws: number[] } | { type: "reset" };

const EMPTY: Sample = { values: [], counts: new Array(BINS).fill(0), sum: 0, sumSq: 0 };

function reducer(state: Sample, action: Action): Sample {
  if (action.type === "reset") return EMPTY;
  const counts = state.counts.slice();
  let { sum, sumSq } = state;
  for (const x of action.draws) {
    sum += x;
    sumSq += x * x;
    const b = Math.floor(x / BIN_W);
    if (b < BINS) counts[b]++;
  }
  return { values: state.values.concat(action.draws), counts, sum, sumSq };
}

function useMediaQuery(query: string, serverValue: boolean) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => serverValue);
}

const fmt = (v: number) => v.toFixed(2);

export default function SamplingHistogram({ children }: { children: ReactNode }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [sample, dispatch] = useReducer(reducer, EMPTY);
  const [width, setWidth] = useState(640);
  const [hoverBin, setHoverBin] = useState(-1);
  const canHover = useMediaQuery("(hover: hover)", true);
  const captionId = useId();

  // Animation bookkeeping. Only touched from effects and event handlers.
  const pending = useRef(0);
  const drawn = useRef(0);
  const frame = useRef(0);
  const started = useRef(false);

  const queue = useCallback((k: number) => {
    if (prefersReducedMotion()) {
      const take = Math.min(k, MAX_N - drawn.current);
      drawn.current += take;
      dispatch({ type: "add", draws: drawMany(take) });
      return;
    }
    pending.current += k;
    if (frame.current) return;

    const step = () => {
      const room = MAX_N - drawn.current;
      if (pending.current <= 0 || room <= 0) {
        pending.current = 0;
        frame.current = 0;
        return;
      }
      // One at a time at first so the markers visibly wander, then faster
      const take = Math.min(drawn.current < 40 ? 1 : 6, pending.current, room);
      pending.current -= take;
      drawn.current += take;
      dispatch({ type: "add", draws: drawMany(take) });
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, []);

  const reset = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    pending.current = 0;
    drawn.current = 0;
    dispatch({ type: "reset" });
  };

  // Match the viewBox to the rendered width
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  // Start filling once the figure is on screen
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || started.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        started.current = true;
        queue(INITIAL_DRAWS);
      },
      { threshold: 0.3 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [queue]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, []);

  // ---- geometry ----
  const vbW = width;
  const vbH = Math.round(Math.min(380, Math.max(230, vbW * 0.6)));
  const W = vbW - M.left - M.right;
  const H = vbH - M.top - M.bottom;
  const baseline = M.top + H;
  const sx = (x: number) => M.left + (x / X_MAX) * W;

  const n = sample.values.length;
  const densities = sample.counts.map((c) => (n ? c / (n * BIN_W) : 0));
  const yMax = Math.max(1.15, Math.max(...densities) * 1.05);
  const sy = (d: number) => baseline - (d / yMax) * H;

  let curve = "";
  for (let i = 0; i <= CURVE_STEPS; i++) {
    const x = (i / CURVE_STEPS) * X_MAX;
    curve += (i ? "L" : "M") + sx(x).toFixed(1) + " " + sy(pdf(x)).toFixed(1);
  }

  const stats = useMemo(() => {
    const count = sample.values.length;
    if (!count) return null;
    const mean = sample.sum / count;
    const sorted = Float64Array.from(sample.values).sort();
    const mid = count >> 1;
    const median = count % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const sd = count > 1 ? Math.sqrt(Math.max(0, (sample.sumSq - count * mean * mean) / (count - 1))) : null;
    return { mean, median, sd };
  }, [sample]);

  // Keep a marker label inside the plot even when its line is near an edge
  const labelX = (x: number, text: string, side: "left" | "right") => {
    const len = text.length * LABEL_CHAR_W;
    const tx = side === "left" ? x - 5 - len : x + 5;
    return Math.max(2, Math.min(vbW - 2 - len, tx));
  };

  const markers = stats && [
    { key: "median", value: stats.median, label: `median ${fmt(stats.median)}`, side: "left" as const },
    { key: "mean", value: stats.mean, label: `mean ${fmt(stats.mean)}`, side: "right" as const },
  ];

  let hoverText = "";
  if (n && hoverBin >= 0) {
    const lo = hoverBin * BIN_W;
    const c = sample.counts[hoverBin];
    hoverText = `[${lo.toFixed(1)}, ${(lo + BIN_W).toFixed(1)}) ${c} ${c === 1 ? "draw" : "draws"}`;
  } else if (n) {
    hoverText = canHover ? "hover a bar for counts" : "tap a bar for counts";
  }

  const handlePointer = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * vbW;
    const y = ((e.clientY - r.top) / r.height) * vbH;
    const b = Math.floor(((x - M.left) / W) * BINS);
    setHoverBin(b >= 0 && b < BINS && y >= M.top - 6 && y <= baseline ? b : -1);
  };

  return (
    <figure className="plot">
      <div className="plot-panel on-dark">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${vbW} ${vbH}`}
          role="img"
          aria-labelledby={captionId}
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          onPointerLeave={(e) => {
            if (e.pointerType !== "touch") setHoverBin(-1); // keep a tapped bar's count visible
          }}
        >
          <g className="bars">
            {densities.map((d, i) => {
              const y = sy(d);
              return (
                <rect
                  key={i}
                  className={i === hoverBin ? "bar is-hover" : "bar"}
                  x={sx(i * BIN_W) + 0.5}
                  width={Math.max(1, W / BINS - 1)}
                  y={y}
                  height={baseline - y}
                />
              );
            })}
          </g>

          <path className="curve" d={curve} />

          <g className="axis" aria-hidden="true">
            <line x1={M.left} x2={M.left + W} y1={baseline + 0.5} y2={baseline + 0.5} />
            {Array.from({ length: X_MAX + 1 }, (_, t) => (
              <g key={t}>
                <line x1={sx(t)} x2={sx(t)} y1={baseline} y2={baseline + 5} />
                <text x={sx(t)} y={baseline + 20} textAnchor={t === 0 ? "start" : t === X_MAX ? "end" : "middle"}>
                  {t}
                </text>
              </g>
            ))}
          </g>

          {markers?.map((m) => {
            const x = sx(Math.min(m.value, X_MAX));
            return (
              <g key={m.key} className={`marker ${m.key}`} aria-hidden="true">
                <line x1={x} x2={x} y1={M.top - 6} y2={baseline} />
                <text x={labelX(x, m.label, m.side)} y={M.top - 14}>{m.label}</text>
              </g>
            );
          })}

          <text className="hover-label" x={vbW - M.right} y={M.top + 12} textAnchor="end" aria-hidden="true">
            {hoverText}
          </text>
        </svg>

        <div className="plot-foot">
          <dl className="stats" aria-label="Sample statistics">
            <div><dt>n</dt><dd>{n.toLocaleString("en-US")}</dd></div>
            <div><dt>mean</dt><dd>{stats ? fmt(stats.mean) : "–"}</dd></div>
            <div><dt>median</dt><dd>{stats ? fmt(stats.median) : "–"}</dd></div>
            <div><dt>sd</dt><dd>{stats?.sd != null ? fmt(stats.sd) : "–"}</dd></div>
          </dl>
          <div className="plot-controls">
            <button className="btn btn-quiet" type="button" onClick={() => queue(DRAWS_PER_CLICK)}>
              Draw {DRAWS_PER_CLICK} more
            </button>
            <button className="btn btn-quiet" type="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <figcaption id={captionId}>
        <b>Figure 1.</b> {children}
      </figcaption>
    </figure>
  );
}
