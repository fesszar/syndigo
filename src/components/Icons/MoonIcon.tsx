import type { CSSProperties } from 'react';

export interface MoonIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MoonIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MoonIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1582 17.4668C18.1126 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.8829 19.5345 5.67423 18.3258C4.46556 17.1171 3.62593 15.589 3.25393 13.9205C2.88193 12.252 2.99274 10.5121 3.57348 8.9043C4.15423 7.29651 5.18085 5.88737 6.53324 4.84175C7.88562 3.79614 9.50779 3.15731 11.21 3C10.2134 4.34827 9.73387 6.00945 9.85853 7.68141C9.98318 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9905 14.2662 19.6517 13.7866 21 12.79Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
