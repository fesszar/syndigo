import type { CSSProperties } from 'react';

export interface FileHeart02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FileHeart02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FileHeart02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M14 2.26946V6.4C14 6.96005 14 7.24008 14.109 7.45399C14.2049 7.64215 14.3578 7.79513 14.546 7.89101C14.7599 8 15.0399 8 15.6 8H19.7305M12 18L12.0587 17.9413C12.6575 17.3425 12.9569 17.0431 12.9945 16.6979C13.0018 16.633 13.0018 16.567 12.9945 16.5021C12.9569 16.1569 12.6575 15.8575 12.0587 15.2587L12 15.2M9 18C9 18 4 15 4 12C4 10 5.5 8.5 7.5 8.5C8.5 8.5 9.5 9 10 10C10.5 9 11.5 8.5 12.5 8.5C14.5 8.5 16 10 16 12C16 15 11 18 11 18M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
