import type { CSSProperties } from 'react';

export interface UnlockIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function UnlockIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: UnlockIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 11V7C6.99876 5.76005 7.45828 4.56387 8.28938 3.64367C9.12047 2.72347 10.2638 2.1449 11.4975 2.02029C12.7312 1.89568 13.9671 2.2339 14.9655 2.96931C15.9638 3.70472 16.6533 4.78485 16.9 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
