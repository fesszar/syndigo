import type { CSSProperties } from 'react';

export interface CloudDownloadIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudDownloadIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudDownloadIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M8 17L12 21L16 17M12 12V21M20.88 18.09C21.7494 17.4786 22.4014 16.6061 22.7413 15.5991C23.0812 14.5921 23.0914 13.503 22.7704 12.4898C22.4494 11.4766 21.8139 10.592 20.9561 9.96456C20.0983 9.33712 19.0628 8.99914 18 9H16.74C16.4373 7.82924 15.8731 6.74233 15.0899 5.82099C14.3067 4.89965 13.3248 4.16785 12.2181 3.68061C11.1113 3.19336 9.90851 2.96336 8.70008 3.00788C7.49164 3.05239 6.30903 3.37019 5.24114 3.93765C4.17325 4.50512 3.24787 5.30748 2.53458 6.28355C1.82129 7.25961 1.33865 8.38361 1.12294 9.57127C0.90723 10.7589 0.964065 11.9797 1.28917 13.1423C1.61428 14.3048 2.19853 15.3785 2.99997 16.284" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
