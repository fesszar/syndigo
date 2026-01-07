import type { CSSProperties } from 'react';

export interface CloudRaining04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudRaining04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudRaining04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8 19V21M8 13V15M16 19V21M16 13V15M12 21V23M12 15V17M20 16.58C21.0512 16.1196 21.9121 15.3116 22.4381 14.2916C22.9641 13.2715 23.1231 12.1016 22.8886 10.9782C22.654 9.85478 22.0402 8.84623 21.1501 8.12185C20.26 7.39748 19.1478 7.00137 18 7.00001H16.74" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
