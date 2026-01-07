import type { CSSProperties } from 'react';

export interface Home05IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Home05Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Home05IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 10.674V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10.674C3 10.3758 3.06392 10.081 3.18737 9.80931C3.31082 9.53758 3.49095 9.29519 3.715 9.098L10.715 3.01C11.0755 2.69473 11.5388 2.52081 12.018 2.52081C12.4972 2.52081 12.9605 2.69473 13.321 3.01L20.321 9.098C20.5399 9.29611 20.7154 9.53794 20.8356 9.80795C20.9558 10.078 21.0179 10.3702 21.018 10.666L21 10.674Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
