import type { CSSProperties } from 'react';

export interface ImageXIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ImageXIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ImageXIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M14.5 2.5L19.5 7.5M19.5 2.5L14.5 7.5M22 12V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7.8C2 6.11984 2 5.27976 2.32698 4.63803C2.6146 4.07354 3.07354 3.6146 3.63803 3.32698C4.27976 3 5.11984 3 6.8 3H11M2.14551 19.9263C2.36671 19.2386 2.91715 18.5943 3.67836 18.1287C4.43957 17.6631 5.3655 17.4 6.32353 17.4H11.6765C12.6345 17.4 13.5604 17.6631 14.3216 18.1287C15.0829 18.5943 15.6333 19.2386 15.8545 19.9263M12.2 10.4C12.2 12.3882 10.5882 14 8.6 14C6.61178 14 5 12.3882 5 10.4C5 8.41178 6.61178 6.8 8.6 6.8C10.5882 6.8 12.2 8.41178 12.2 10.4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
