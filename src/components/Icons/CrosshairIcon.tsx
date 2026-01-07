import type { CSSProperties } from 'react';

export interface CrosshairIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CrosshairIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CrosshairIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 12H18M6 12H2M12 6V2M12 22V18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
