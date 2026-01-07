import type { CSSProperties } from 'react';

export interface Globe06IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Globe06Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Globe06IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
