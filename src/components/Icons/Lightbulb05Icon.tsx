import type { CSSProperties } from 'react';

export interface Lightbulb05IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Lightbulb05Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Lightbulb05IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2V4M12 18V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
