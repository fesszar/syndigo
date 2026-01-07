import type { CSSProperties } from 'react';

export interface UmbrellaIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function UmbrellaIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: UmbrellaIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M23 12C22.0807 9.6709 20.5104 7.64897 18.4796 6.17269C16.4488 4.6964 14.0456 3.82636 11.5488 3.66108C9.05208 3.4958 6.56036 4.04225 4.36478 5.23849C2.16919 6.43474 0.361282 8.22961 0.15 10.42C0.0541697 11.275 0.147328 12.1393 0.423119 12.9547C0.698909 13.7701 1.15068 14.5181 1.75 15.15M18 19C18 19.7956 17.6839 20.5587 17.1213 21.1213C16.5587 21.6839 15.7956 22 15 22C14.2044 22 13.4413 21.6839 12.8787 21.1213C12.3161 20.5587 12 19.7956 12 19V12M12 2V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
