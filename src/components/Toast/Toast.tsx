import type { CSSProperties } from 'react';
import type { ToastProps, ToastType } from './types';
import { Text } from '../Text';
import { Button } from '../Button';
import {
  CloseIcon,
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  WarningTriangleIcon,
} from '../Icons';

/**
 * Type-specific styling
 */
const typeStyles: Record<ToastType, {
  backgroundColor: string;
  borderColor: string;
}> = {
  success: {
    backgroundColor: 'var(--color-green-100, #e1fbf5)',
    borderColor: 'var(--color-green-600, #0e8662)',
  },
  info: {
    backgroundColor: 'var(--color-blue-100, #e7f1ff)',
    borderColor: 'var(--color-blue-500, #2d75e2)',
  },
  critical: {
    backgroundColor: 'var(--color-red-100, #ffecec)',
    borderColor: 'var(--color-red-500, #db3a3a)',
  },
  warning: {
    backgroundColor: 'var(--color-orange-100, #fff4eb)',
    borderColor: 'var(--color-orange-500, #f58319)',
  },
};

/**
 * Render type-specific icon
 */
function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case 'success':
      return <CheckCircleIcon />;
    case 'info':
      return <InfoIcon />;
    case 'critical':
      return <WarningCircleIcon />;
    case 'warning':
      return <WarningTriangleIcon />;
  }
}

/**
 * Toast component
 * 
 * A toast notification with type variants (success, info, critical, warning).
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29433
 */
export function Toast({
  message,
  type = 'success',
  actionLabel,
  onAction,
  onDismiss,
  showDismiss = true,
  className,
  style,
}: ToastProps) {
  const styles = typeStyles[type];

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 16px',
    backgroundColor: styles.backgroundColor,
    border: `1px solid ${styles.borderColor}`,
    borderRadius: '8px',
    boxShadow: '0px 8px 18px 0px rgba(0, 0, 0, 0.16)',
    overflow: 'hidden',
    ...style,
  };

  const contentStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
  };

  const leftWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flex: 1,
    minWidth: 0,
  };

  const rightWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
  };

  const dismissButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div
      className={className}
      style={containerStyle}
      role="alert"
      aria-live="polite"
    >
      <div style={contentStyle}>
        <div style={leftWrapperStyle}>
          <ToastIcon type={type} />
          <Text
            variant="body14Medium"
            style={{
              color: 'var(--color-text-primary, black)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {message}
          </Text>
        </div>
        <div style={rightWrapperStyle}>
          {actionLabel && onAction && (
            <Button
              variant="secondary"
              size="small"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
          {showDismiss && onDismiss && (
            <button
              type="button"
              style={dismissButtonStyle}
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              <CloseIcon size={24} color="#91a0b3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
