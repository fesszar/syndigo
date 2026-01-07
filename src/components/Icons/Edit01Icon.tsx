import type { CSSProperties } from 'react';

export interface Edit01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Edit01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Edit01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 20H21M3.5 20H4.5C4.89782 20 5.27936 19.842 5.56066 19.5607C5.84196 19.2794 6 18.8978 6 18.5V17.5C6 17.1022 5.84196 16.7206 5.56066 16.4393C5.27936 16.158 4.89782 16 4.5 16H3.5C3.10218 16 2.72064 16.158 2.43934 16.4393C2.15804 16.7206 2 17.1022 2 17.5V18.5C2 18.8978 2.15804 19.2794 2.43934 19.5607C2.72064 19.842 3.10218 20 3.5 20ZM16.5 3.5C16.8978 3.10217 17.2794 2.94414 17.5607 2.66284C17.842 2.38154 18.8978 2 19.5 2C20.1022 2 20.7206 2.15804 21.0607 2.43934C21.4008 2.72064 21.5 3.10217 21.5 3.5C21.5 3.89783 21.342 4.27936 21.0607 4.56066C20.7794 4.84196 19.8978 5 19.5 5L7 17.5V20H9.5L21.0607 8.43934C21.342 8.15804 21.5 7.77651 21.5 7.37868C21.5 6.98086 21.342 6.59932 21.0607 6.31802" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
