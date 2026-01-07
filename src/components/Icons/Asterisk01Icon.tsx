import type { CSSProperties } from 'react';

export interface Asterisk01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Asterisk01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Asterisk01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2V22M19.07 4.93L4.93 19.07M22 12H2M19.07 19.07L4.93 4.93" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
