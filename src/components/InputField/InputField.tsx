import type { CSSProperties, ReactNode } from 'react';
import { Text } from '../Text';

export type InputFieldState = 'default' | 'error' | 'disabled';

export interface InputFieldProps {
  label?: string;
  required?: boolean;
  helpText?: string;
  errorText?: string;
  tooltip?: ReactNode;
  state?: InputFieldState;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function InputField({
  label,
  required = false,
  helpText,
  errorText,
  tooltip,
  state = 'default',
  className,
  style,
  children,
}: InputFieldProps) {
  const isError = state === 'error' || !!errorText;

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    ...style,
  };

  const labelContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };

  const labelRowStyle: CSSProperties = {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  };

  const getLabelColor = (): string => {
    if (isError) return 'var(--color-system-critical)';
    return 'var(--color-text-secondary)';
  };

  return (
    <div className={className} style={containerStyle}>
      {label && (
        <div style={labelContainerStyle}>
          <div style={labelRowStyle}>
            <Text
              variant="body12Medium"
              style={{ color: getLabelColor() }}
            >
              {label}
            </Text>
            {required && (
              <Text
                variant="body12Medium"
                style={{ color: 'var(--color-system-critical)' }}
              >
                *
              </Text>
            )}
            {tooltip && (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {tooltip}
              </span>
            )}
          </div>
          {helpText && !isError && (
            <Text
              variant="supporting11Medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {helpText}
            </Text>
          )}
        </div>
      )}

      {children}

      {isError && errorText && (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <ErrorIcon />
          <Text
            variant="body12Medium"
            style={{ color: 'var(--color-system-critical)' }}
          >
            {errorText}
          </Text>
        </div>
      )}
    </div>
  );
}

function ErrorIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
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
