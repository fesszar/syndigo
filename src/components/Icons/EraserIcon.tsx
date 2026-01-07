import type { CSSProperties } from 'react';

export interface EraserIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function EraserIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: EraserIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M20 20H9L3.29289 14.2929C2.90237 13.9024 2.90237 13.2692 3.29289 12.8787L14.1213 2.05025C14.5118 1.65972 15.145 1.65972 15.5355 2.05025L21.1924 7.70711C21.5829 8.09763 21.5829 8.7308 21.1924 9.12132L14 16.3137M11 20H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
