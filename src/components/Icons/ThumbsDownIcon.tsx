import type { CSSProperties } from 'react';

export interface ThumbsDownIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ThumbsDownIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ThumbsDownIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M17 2H19.67C20.236 1.98999 20.7859 2.18813 21.2154 2.55682C21.645 2.92551 21.9242 3.43905 22 4V11C21.9242 11.5609 21.645 12.0745 21.2154 12.4432C20.7859 12.8119 20.236 13.01 19.67 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23767 1.99454 4.76962 2.16359 4.40209 2.47599C4.03457 2.78839 3.79232 3.22309 3.72 3.7L2.34 12.7C2.29649 12.9866 2.31583 13.2793 2.39666 13.5577C2.47749 13.8362 2.6179 14.0937 2.80814 14.3125C2.99839 14.5313 3.23395 14.7061 3.49843 14.8248C3.76292 14.9435 4.0501 15.0033 4.34 15H10Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
