import type { CSSProperties } from 'react';

export interface CloudRaining06IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudRaining06Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudRaining06IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M20 15.58C21.0512 15.1196 21.9121 14.3116 22.4381 13.2916C22.9641 12.2715 23.1231 11.1016 22.8886 9.97822C22.654 8.85478 22.0402 7.84623 21.1501 7.12185C20.26 6.39748 19.1478 6.00137 18 6.00001H16.74C16.4228 4.77254 15.8251 3.63795 14.9961 2.68978C14.1671 1.74161 13.1304 1.00715 11.9694 0.546729C10.8083 0.0863046 9.5559 -0.0870926 8.31393 0.0407461C7.07196 0.168585 5.87727 0.594207 4.82457 1.28357C3.77187 1.97294 2.89117 2.90653 2.25587 4.00322C1.62058 5.09991 1.24874 6.32874 1.17002 7.59573C1.0913 8.86272 1.30813 10.1307 1.80302 11.2966C2.2979 12.4626 3.05688 13.4934 4.02 14.31M12 10V22M8 14V18M16 14V18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
