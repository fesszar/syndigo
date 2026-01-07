import type { CSSProperties } from 'react';

export interface TerminalIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function TerminalIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: TerminalIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 17L10 11L4 5M12 19H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
