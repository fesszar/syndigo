import type { CSSProperties } from 'react';

export interface Edit04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Edit04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Edit04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M21 18L19.9999 19.094C19.4695 19.6741 18.7502 20.0001 18.0002 20.0001C17.2501 20.0001 16.5308 19.6741 16.0005 19.094C15.4693 18.5154 14.75 18.1903 14.0002 18.1903C13.2504 18.1903 12.5312 18.5154 12 19.094M3 21H4.67454C5.16372 21 5.40832 21 5.63849 20.9447C5.84256 20.8957 6.03765 20.8149 6.2166 20.7053C6.41843 20.5816 6.59138 20.4086 6.93729 20.0627L19.5 7.5C20.3285 6.67157 20.3285 5.32843 19.5 4.5C18.6716 3.67157 17.3285 3.67157 16.5 4.5L3.93726 17.0627C3.59136 17.4086 3.4184 17.5816 3.29472 17.7834C3.18506 17.9624 3.10425 18.1574 3.05526 18.3615C3 18.5917 3 18.8363 3 19.3255V21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
