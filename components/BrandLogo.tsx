/**
 * Square brand badge. Renders either an image logo (contain on a padded
 * light box, or cover for logos that ship their own background) or a single
 * letter mark (e.g. PulseNine's pink "P").
 */
export interface BrandLogoSpec {
  src?: string;
  alt?: string;
  letter?: string;
  letterColor?: string;
  bg?: string;
  fit?: "contain" | "cover";
}

export default function BrandLogo({
  size = 44,
  src,
  alt = "",
  letter,
  letterColor,
  bg,
  fit = "contain",
}: BrandLogoSpec & { size?: number }) {
  const pad = src && fit === "contain" ? Math.round(size * 0.15) : 0;
  return (
    <div
      className="rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: bg, border: "1px solid var(--border-card)", padding: pad }}
      aria-hidden={!alt}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: fit, display: "block" }}
        />
      ) : (
        <span style={{ color: letterColor, fontWeight: 800, fontSize: Math.round(size * 0.5), lineHeight: 1 }}>
          {letter}
        </span>
      )}
    </div>
  );
}
