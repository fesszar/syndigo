import type { CSSProperties } from 'react';
import { Text } from '../Text';
import type { BackgroundTasksSectionHeaderProps, BackgroundTasksSectionVariant } from './types';

const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '6px 16px',
  backgroundColor: 'var(--color-surface-white)',
  borderLeft: '1px solid var(--color-stroke-light)',
  borderRight: '1px solid var(--color-stroke-light)',
  boxSizing: 'border-box',
};

const dividerStyle: CSSProperties = {
  flex: 1,
  height: '1px',
  backgroundColor: 'var(--color-stroke-light)',
};

const skeletonStyle: CSSProperties = {
  width: '79px',
  height: '12px',
  backgroundColor: 'var(--color-surface-light)',
  borderRadius: '100px',
};

const labelMap: Record<Exclude<BackgroundTasksSectionVariant, 'skeleton'>, string> = {
  currentlyRunning: 'Currently Running',
  recentlyCompleted: 'Recently Completed',
};

export function BackgroundTasksSectionHeader({
  variant,
  loading = false,
  className,
  style,
}: BackgroundTasksSectionHeaderProps) {
  // Show skeleton for loading state or skeleton variant
  if (loading || variant === 'skeleton') {
    return (
      <div className={className} style={{ ...containerStyle, ...style }}>
        <div style={skeletonStyle} />
      </div>
    );
  }

  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <Text variant="body12Medium" style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
        {labelMap[variant]}
      </Text>
      <div style={dividerStyle} />
    </div>
  );
}
