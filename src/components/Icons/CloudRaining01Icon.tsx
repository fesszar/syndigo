import type { CSSProperties } from 'react';

export interface CloudRaining01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudRaining01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudRaining01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16 13V21M8 13V21M12 15V23M20 16.58C21.0512 16.1196 21.9121 15.3116 22.4381 14.2916C22.9641 13.2715 23.1231 12.1016 22.8886 10.9782C22.654 9.85478 22.0402 8.84623 21.1501 8.12185C20.26 7.39748 19.1478 7.00137 18 7.00001H16.74C16.4228 5.77254 15.8251 4.63795 14.9961 3.68978C14.1671 2.74161 13.1304 2.00715 11.9694 1.54673C10.8083 1.0863 9.5559 0.912907 8.31393 1.04075C7.07196 1.16859 5.87727 1.59421 4.82457 2.28357C3.77187 2.97294 2.89117 3.90653 2.25587 5.00322C1.62058 6.09991 1.24874 7.32874 1.17002 8.59573C1.0913 9.86272 1.30813 11.1307 1.80302 12.2966C2.2979 13.4626 3.05688 14.4934 4.02 15.31" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
