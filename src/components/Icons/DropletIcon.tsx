import type { CSSProperties } from 'react';

export interface DropletIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function DropletIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: DropletIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M12 2.69L17.66 8.35C18.7189 9.41088 19.4559 10.7464 19.7918 12.2033C20.1276 13.6603 20.0488 15.1811 19.5641 16.5955C19.0795 18.0098 18.2081 19.2618 17.0479 20.207C15.8877 21.1522 14.4864 21.7533 13.0019 21.9447C11.5173 22.1361 10.0079 21.91 8.64088 21.2911C7.27391 20.6722 6.1034 19.6849 5.26542 18.4408C4.42744 17.1967 3.95495 15.7451 3.89877 14.2488C3.8426 12.7526 4.20504 11.2701 4.94669 9.96825L12 2.69Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
