import type { CSSProperties } from 'react';

export interface PieChartIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PieChartIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PieChartIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M21.21 15.89C20.5738 17.3945 19.5788 18.7202 18.3119 19.7513C17.0449 20.7824 15.5447 21.4874 13.9424 21.8048C12.3401 22.1221 10.6844 22.0421 9.12012 21.5718C7.55585 21.1015 6.1306 20.2551 4.96893 19.1067C3.80725 17.9582 2.94473 16.5428 2.45661 14.9839C1.96848 13.425 1.86942 11.7699 2.16857 10.1637C2.46772 8.55743 3.15591 7.0488 4.17262 5.7695C5.18932 4.49021 6.50341 3.47857 8 2.82001" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
