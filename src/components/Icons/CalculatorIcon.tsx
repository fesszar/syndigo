import type { CSSProperties } from 'react';

export interface CalculatorIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CalculatorIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CalculatorIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6H16M8 10H8.01M12 10H12.01M16 10H16.01M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
