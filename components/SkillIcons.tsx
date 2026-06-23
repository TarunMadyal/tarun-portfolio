/**
 * Hand-crafted SVG skill marks. Brand logos (Figma, AWS) use their real
 * artwork; the rest are clean monochrome glyphs tinted with the skill accent
 * via the `color` prop. Each accepts `size` (height in px) and `color`.
 */

export interface SkillIconProps {
  size?: number;
  color?: string;
}

/* Web Development — code brackets </> */
export function WebDevIcon({ size = 22, color = "currentColor" }: SkillIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8.2 7.5 3.8 12l4.4 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.8 7.5 20.2 12l-4.4 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.4 5.5 10.6 18.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* UI / UX — vector pen nib */
export function UiUxIcon({ size = 22, color = "currentColor" }: SkillIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 20.2 5.7 14 14 5.7l4.3 4.3L10 18.3 4 20.2Z" fill={color} fillOpacity="0.14" />
      <path d="M4 20.2 5.7 14 14 5.7l4.3 4.3L10 18.3 4 20.2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 20.2 8.6 15.6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 5.7 16 3.7 20.3 8l-2 2Z" fill={color} />
      <circle cx="14.4" cy="9.6" r="1.3" fill={color} />
    </svg>
  );
}

/* Figma — official multicolour logo */
export function FigmaIcon({ size = 22 }: SkillIconProps) {
  const w = (size * 38) / 57;
  return (
    <svg width={w} height={size} viewBox="0 0 38 57" fill="none">
      <path fill="#F24E1E" d="M9.5 0H19v19H9.5a9.5 9.5 0 0 1 0-19Z" />
      <path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0Z" />
      <path fill="#A259FF" d="M9.5 19H19v19H9.5a9.5 9.5 0 0 1 0-19Z" />
      <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" />
      <path fill="#0ACF83" d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19Z" />
    </svg>
  );
}

/* Business Decks — presentation board with chart */
export function DeckIcon({ size = 22, color = "currentColor" }: SkillIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="12" rx="1.6" stroke={color} strokeWidth="1.5" />
      <path d="M7 12.5v-2M11 12.5V8.5M15 12.5v-3.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 16v2.5M8.5 20.5 12 18.5l3.5 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* AWS — wordmark + smile arrow (brand orange / accent) */
export function AwsIcon({ size = 22, color = "#FF9900" }: SkillIconProps) {
  const w = (size * 44) / 28;
  return (
    <svg width={w} height={size} viewBox="0 0 44 28" fill="none">
      <text
        x="22" y="15" textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="800"
        letterSpacing="-0.5" fill={color}
      >
        aws
      </text>
      <path d="M7 21c5 3.4 25 3.4 30 0" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M34 18.6 37.4 21l-2.6 2.4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* Cloud Learning — clean cloud */
export function CloudIcon({ size = 22, color = "currentColor" }: SkillIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M7.5 18h9a3.8 3.8 0 0 0 .5-7.57A5.4 5.4 0 0 0 6.7 9.2 3.8 3.8 0 0 0 7.5 18Z"
        stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
    </svg>
  );
}

/* Software Solutions — isometric cube */
export function CubeIcon({ size = 22, color = "currentColor" }: SkillIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 7.4 12 12l8-4.6M12 12v9.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
