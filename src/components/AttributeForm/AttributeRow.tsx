import type { CSSProperties } from 'react';
import { Text } from '../Text';
import type { AttributeRowProps } from './types';

const containerStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
  gap: 'var(--spacing-16, 16px)',
  backgroundColor: 'var(--color-surface-white)',
  boxSizing: 'border-box',
};

const labelColumnStyle: CSSProperties = {
  gridColumn: '1 / span 2',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
  gap: 'var(--spacing-4, 4px)',
  paddingTop: 'var(--spacing-8, 8px)',
};

const inputColumnStyle: CSSProperties = {
  gridColumn: '3 / span 6',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '6px',
};

const inputRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  width: '100%',
};

const iconGroupStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-8, 8px)',
  flexShrink: 0,
};

const inlineErrorStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-4, 4px)',
  padding: '0 10px',
  width: '100%',
  boxSizing: 'border-box',
};

const tooltipTriggerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
  cursor: 'help',
  flexShrink: 0,
};

const iconWrapperStyle: CSSProperties = {
  width: '18px',
  height: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

export function AttributeRow({
  label,
  showTooltip = true,
  errorMessage,
  showAiIcon = true,
  showHistoryIcon = true,
  children,
  className,
  style,
}: AttributeRowProps) {
  const hasError = !!errorMessage;

  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      {/* Label Column (1-2) */}
      <div style={labelColumnStyle}>
        <Text variant="body14Medium" style={{ color: 'var(--color-text-primary)' }}>
          {label}
        </Text>
        {showTooltip && (
          <span style={tooltipTriggerStyle} title="More info">
            <InfoCircleIcon />
          </span>
        )}
      </div>

      {/* Input Column (3-8) */}
      <div style={inputColumnStyle}>
        <div style={inputRowStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {children}
          </div>
          <div style={iconGroupStyle}>
            {showAiIcon && (
              <span style={iconWrapperStyle} title="AI Assist">
                <AiStarsIcon />
              </span>
            )}
            {showHistoryIcon && (
              <span style={iconWrapperStyle} title="History">
                <ClockIcon />
              </span>
            )}
          </div>
        </div>

        {hasError && (
          <div style={inlineErrorStyle}>
            <ErrorCircleIcon />
            <Text variant="body12Medium" style={{ color: 'var(--color-system-critical)' }}>
              {errorMessage}
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

function AiStarsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 2l1.5 4.5L15 8l-4.5 1.5L9 14l-1.5-4.5L3 8l4.5-1.5L9 2z"
        fill="var(--color-button-primary)"
        stroke="var(--color-button-primary)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6" stroke="var(--color-button-primary)" strokeWidth="1.2" />
      <path
        d="M9 5v4l2.5 2.5"
        stroke="var(--color-button-primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ErrorCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="var(--color-system-critical)" fillOpacity="0.15" />
      <path
        d="M8 5v3M8 10v1"
        stroke="var(--color-system-critical)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
