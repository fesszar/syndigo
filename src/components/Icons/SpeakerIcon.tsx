import type { CSSProperties } from 'react';

export interface SpeakerIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SpeakerIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SpeakerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6H12.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
