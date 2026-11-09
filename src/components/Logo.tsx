import { logo } from "@/assets/logo";

// The AmStat@UCF logo as inline SVG, so it takes its colors from the surface it sits on
// (--logo-letters, --logo-ink, --logo-curve) and its curves can be drawn in.
// "compact" enlarges @UCF so it stays legible at header size.
export default function Logo({
  variant = "full",
  label,
  className,
}: {
  variant?: "full" | "compact";
  /** Accessible name. Leave out when the logo sits inside a link that already has one. */
  label?: string;
  className?: string;
}) {
  const compact = variant === "compact";
  return (
    <svg
      className={className ? `logo ${className}` : "logo"}
      viewBox={compact ? logo.compact.viewBox : logo.viewBox}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {/* The curves pass behind the letters, as in the artwork */}
      <path className="logo-curve logo-sky" d={logo.sky} pathLength={1} />
      <path className="logo-curve logo-ink" d={logo.ink} pathLength={1} />
      <path className="logo-letters" d={logo.letters} fillRule="evenodd" />
      <path
        className="logo-ucf"
        d={logo.ucf}
        fillRule="evenodd"
        transform={compact ? logo.compact.ucfTransform : undefined}
      />
    </svg>
  );
}
