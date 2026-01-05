import * as React from 'react';
import type { CSSProperties } from 'react';
import type { DialogProps, TooltipDialogProps } from './types';

// Container styles
const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const dialogContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
  minWidth: '380px',
  maxWidth: '500px',
  backgroundColor: 'white',
};

// Header styles
const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '8px 10px',
  backgroundColor: 'var(--color-surface-light, #f7f9fb)',
  borderBottom: '1px solid var(--color-surface-medium, #dee5ef)',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  boxSizing: 'border-box',
};

const titleStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '11px',
  fontWeight: 600,
  lineHeight: '14px',
  color: 'var(--color-text-primary, black)',
  margin: 0,
};

const closeButtonStyle: CSSProperties = {
  width: '20px',
  height: '20px',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-icon-secondary, #718094)',
};

// Content styles
const contentStyle: CSSProperties = {
  width: '100%',
  padding: '20px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
};

const contentTextStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '16px',
  color: 'var(--color-text-secondary, #4d5c6e)',
  margin: 0,
};

// Footer styles
const footerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '8px',
  width: '100%',
  padding: '0 16px 20px 16px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
};

// Button styles
const buttonBaseStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 10px',
  borderRadius: '4px',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  cursor: 'pointer',
  border: 'none',
};

const secondaryButtonStyle: CSSProperties = {
  ...buttonBaseStyle,
  height: '32px',
  backgroundColor: 'white',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  color: 'var(--color-text-primary, black)',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
};

const primaryButtonStyle: CSSProperties = {
  ...buttonBaseStyle,
  height: '34px',
  backgroundColor: 'var(--color-button-primary, #2d75e2)',
  color: 'white',
};

const criticalButtonStyle: CSSProperties = {
  ...buttonBaseStyle,
  height: '34px',
  backgroundColor: 'var(--color-system-critical, #db3a3a)',
  color: 'white',
};

// Tooltip dialog styles
const tooltipContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
  minWidth: '300px',
};

const tooltipAccentStyle: CSSProperties = {
  width: '3px',
  alignSelf: 'stretch',
  backgroundColor: 'var(--color-system-critical, #db3a3a)',
  borderTopLeftRadius: '12px',
  borderBottomLeftRadius: '12px',
  flexShrink: 0,
};

const tooltipContentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '12px',
  flexGrow: 1,
};

const tooltipHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

const tooltipCategoryStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '10px',
  fontWeight: 600,
  lineHeight: '12px',
  color: 'var(--color-text-secondary, #4d5c6e)',
  textTransform: 'uppercase',
  margin: 0,
};

const errorListStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  paddingBottom: '14px',
};

const errorItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const errorTextStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-system-critical, #db3a3a)',
};

const tooltipFooterStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
};

// Close icon SVG
function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M1 1L9 9M9 1L1 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Error icon SVG
function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="var(--color-system-critical, #db3a3a)" fillOpacity="0.15" />
      <circle cx="8" cy="8" r="6" stroke="var(--color-system-critical, #db3a3a)" strokeWidth="1.2" />
      <path d="M8 5V8.5" stroke="var(--color-system-critical, #db3a3a)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="10.5" r="0.75" fill="var(--color-system-critical, #db3a3a)" />
    </svg>
  );
}

/**
 * Dialog component with accessibility support
 * Supports Confirm, Destructive, and Tooltip variants
 */
export function Dialog({
  type = 'confirm',
  open = false,
  title = 'Heading',
  children,
  primaryLabel = 'Confirm',
  secondaryLabel = 'Cancel',
  onPrimaryAction,
  onSecondaryAction,
  onClose,
  hideCloseButton = false,
  hideSecondaryButton = false,
  titleId: providedTitleId,
  descriptionId: providedDescriptionId,
  className,
  style,
}: DialogProps) {
  const generatedTitleId = React.useId();
  const generatedDescriptionId = React.useId();
  const titleId = providedTitleId || generatedTitleId;
  const descriptionId = providedDescriptionId || generatedDescriptionId;

  // Handle escape key
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const getPrimaryButtonStyle = () => {
    return type === 'destructive' ? criticalButtonStyle : primaryButtonStyle;
  };

  return (
    <div
      style={overlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={className}
        style={{ ...dialogContainerStyle, ...style }}
      >
        {/* Header */}
        <div style={headerStyle}>
          <h2 id={titleId} style={titleStyle}>
            {title}
          </h2>
          {!hideCloseButton && (
            <button
              type="button"
              style={closeButtonStyle}
              onClick={onClose}
              aria-label="Close dialog"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Content */}
        <div id={descriptionId} style={contentStyle}>
          {typeof children === 'string' ? (
            <p style={contentTextStyle}>{children}</p>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          {!hideSecondaryButton && (
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={onSecondaryAction || onClose}
            >
              {secondaryLabel}
            </button>
          )}
          <button
            type="button"
            style={getPrimaryButtonStyle()}
            onClick={onPrimaryAction}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * TooltipDialog for error lists and notifications
 */
export function TooltipDialog({
  open = false,
  categoryLabel = 'ERRORS TO FIX',
  errors = [],
  actionLabel,
  onAction,
  onClose,
  className,
  style,
}: TooltipDialogProps) {
  if (!open) return null;

  return (
    <div className={className} style={{ ...tooltipContainerStyle, ...style }}>
      {/* Red accent bar */}
      <div style={tooltipAccentStyle} />

      {/* Content */}
      <div style={tooltipContentStyle}>
        {/* Header */}
        <div style={tooltipHeaderStyle}>
          <p style={tooltipCategoryStyle}>{categoryLabel}</p>
          <button
            type="button"
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Error list */}
        {errors.length > 0 && (
          <div style={errorListStyle}>
            {errors.map((error, index) => (
              <div key={index} style={errorItemStyle}>
                <ErrorIcon />
                <span style={errorTextStyle}>{error}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action button */}
        {actionLabel && (
          <div style={tooltipFooterStyle}>
            <button type="button" style={secondaryButtonStyle} onClick={onAction}>
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
