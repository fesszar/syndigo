import type { CSSProperties } from 'react';

export interface Inbox01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Inbox01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Inbox01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M2 12H5.88197C6.56717 12 7.19357 12.3871 7.5 13L8.5 15C8.80643 15.6129 9.43283 16 10.118 16H13.882C14.5672 16 15.1936 15.6129 15.5 15L16.5 13C16.8064 12.3871 17.4328 12 18.118 12H22M2 12V16.8C2 17.9201 2 18.4801 2.21799 18.908C2.40973 19.2843 2.71569 19.5903 3.09202 19.782C3.51984 20 4.0799 20 5.2 20H18.8C19.9201 20 20.4802 20 20.908 19.782C21.2843 19.5903 21.5903 19.2843 21.782 18.908C22 18.4801 22 17.9201 22 16.8V12M2 12L4.67452 5.21216C4.86641 4.72687 4.96235 4.48423 5.12573 4.30311C5.27019 4.14267 5.44932 4.01605 5.6497 3.93223C5.87621 3.83701 6.13669 3.83701 6.65766 3.83701H17.3423C17.8633 3.83701 18.1238 3.83701 18.3503 3.93223C18.5507 4.01605 18.7298 4.14267 18.8743 4.30311C19.0377 4.48423 19.1336 4.72687 19.3255 5.21216L22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
