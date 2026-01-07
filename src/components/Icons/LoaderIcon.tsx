import type { CSSProperties } from 'react';

export interface LoaderIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function LoaderIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: LoaderIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
