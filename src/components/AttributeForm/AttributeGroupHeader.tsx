import type { CSSProperties } from 'react';
import { Text } from '../Text';
import type { AttributeGroupHeaderProps } from './types';

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: 'var(--spacing-16, 16px)',
  backgroundColor: 'var(--color-surface-light)',
  borderTop: '1px solid var(--color-stroke-light)',
  borderBottom: '1px solid var(--color-stroke-light)',
  boxSizing: 'border-box',
};

const leftWrapperStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-16, 16px)',
};

const labelWrapperStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-4, 4px)',
};

const badgeStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  height: '18px',
  backgroundColor: 'var(--color-system-critical)',
  borderRadius: '2px',
};

const tooltipTriggerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
  cursor: 'help',
};

export function AttributeGroupHeader({
  label,
  showTooltip = true,
  errorCount = 0,
  className,
  style,
}: AttributeGroupHeaderProps) {
  const showBadge = errorCount > 0;

  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <div style={leftWrapperStyle}>
        <div style={labelWrapperStyle}>
          <Text variant="body14Bold" style={{ color: 'var(--color-text-primary)' }}>
            {label}
          </Text>
          {showTooltip && (
            <span style={tooltipTriggerStyle} title="More info">
              <InfoCircleIcon />
            </span>
          )}
        </div>
        {showBadge && (
          <div style={badgeStyle}>
            <Text variant="body12Medium" style={{ color: 'var(--color-text-white)' }}>
              {errorCount}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="var(--color-text-secondary)" strokeWidth="1.2" />
      <path
        d="M7 6v3M7 4.5v.5"
        stroke="var(--color-text-secondary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
