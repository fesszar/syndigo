import type { CSSProperties } from 'react';

export interface CpuIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CpuIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CpuIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="9" width="6" height="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 1V4M15 1V4M9 20V23M15 20V23M20 9H23M20 14H23M1 9H4M1 14H4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
