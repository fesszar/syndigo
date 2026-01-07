import type { CSSProperties } from 'react';

export interface FolderClosedIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FolderClosedIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FolderClosedIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M22 19V12C22 10.1198 22 9.17976 21.673 8.45803C21.3854 7.81354 20.9265 7.2646 20.362 6.92698C19.7202 6.55 18.8802 6.55 17.2 6.55H12.5553C12.0376 6.55 11.7787 6.55 11.5455 6.48C11.3399 6.41825 11.1481 6.32106 10.9795 6.19333C10.7893 6.04922 10.6386 5.85172 10.3373 5.45671L9.46268 4.31L9.26268 4.04329C8.96142 3.64828 8.81079 3.45078 8.62052 3.30667C8.45186 3.17894 8.26012 3.08175 8.0545 3.02C7.82135 2.95 7.56248 2.95 7.04473 2.95H5.2C4.0799 2.95 3.51984 2.95 3.09202 3.16799C2.71569 3.35973 2.40973 3.66569 2.21799 4.04202C2 4.46984 2 5.0299 2 6.15V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
