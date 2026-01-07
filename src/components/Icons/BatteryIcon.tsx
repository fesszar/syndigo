import type { CSSProperties } from 'react';

export interface BatteryIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function BatteryIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: BatteryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <rect x="1" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 13V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
