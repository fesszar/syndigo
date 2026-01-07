import type { CSSProperties } from 'react';

export interface Lightbulb02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Lightbulb02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Lightbulb02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2V3M3 12H2M5.5 5.5L4.8999 4.8999M18.5 5.5L19.1002 4.8999M22 12H21M9 16.5H15M9.5 18.5H14.5M15.0001 16.5C16.4144 15.6252 17.5001 14.0157 17.5001 12C17.5001 8.96244 15.0376 6.5 12.0001 6.5C8.96252 6.5 6.50006 8.96244 6.50006 12C6.50006 14.0157 7.58574 15.6252 9.00006 16.5H9.00006C9.50006 18 9.50006 19 9.00006 20.5C9.00006 21.3284 10.3432 22 12.0001 22C13.6569 22 15.0001 21.3284 15.0001 20.5C14.5001 19 14.5001 18 15.0001 16.5H15.0001Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
