import type { CSSProperties } from 'react';

export interface KeyIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function KeyIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: KeyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M21 2L19 4M11.39 11.61C11.9064 12.1195 12.3168 12.726 12.5978 13.3948C12.8787 14.0635 13.0246 14.7813 13.0271 15.5066C13.0295 16.232 12.8884 16.9507 12.6119 17.6213C12.3354 18.2919 11.9291 18.9012 11.4162 19.4141C10.9033 19.9271 10.294 20.3333 9.62333 20.6098C8.95271 20.8863 8.23403 21.0275 7.50866 21.025C6.78329 21.0226 6.06556 20.8767 5.39679 20.5957C4.72802 20.3148 4.12151 19.9043 3.612 19.388C2.61013 18.3507 2.05576 16.9614 2.06832 15.5193C2.08088 14.0772 2.65942 12.6977 3.67999 11.678C4.70055 10.6584 6.08037 10.081 7.52249 10.0696C8.96461 10.0583 10.3534 10.6139 11.39 11.617V11.61ZM11.39 11.61L19 4M19 4L22 7L19 10L16 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
