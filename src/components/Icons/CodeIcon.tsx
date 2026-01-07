import type { CSSProperties } from 'react';

export interface CodeIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CodeIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CodeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
