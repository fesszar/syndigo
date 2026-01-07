import type { CSSProperties } from 'react';

export interface Inbox02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Inbox02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Inbox02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M2 12H5.88197C6.56717 12 7.19357 12.3871 7.5 13L8.5 15C8.80643 15.6129 9.43283 16 10.118 16H13.882C14.5672 16 15.1936 15.6129 15.5 15L16.5 13C16.8064 12.3871 17.4328 12 18.118 12H22M7.8 4H16.2C17.8802 4 18.7202 4 19.362 4.32698C19.9265 4.6146 20.3854 5.07354 20.673 5.63803C21 6.27976 21 7.11984 21 8.8V17.2C21 18.8802 21 19.7202 20.673 20.362C20.3854 20.9265 19.9265 21.3854 19.362 21.673C18.7202 22 17.8802 22 16.2 22H7.8C6.11984 22 5.27976 22 4.63803 21.673C4.07354 21.3854 3.6146 20.9265 3.32698 20.362C3 19.7202 3 18.8802 3 17.2V8.8C3 7.11984 3 6.27976 3.32698 5.63803C3.6146 5.07354 4.07354 4.6146 4.63803 4.32698C5.27976 4 6.11984 4 7.8 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
