import type { CSSProperties } from 'react';
import type { ModalProps, ModalSize } from './types';
import { CloseIcon } from '../Icons';
import { Text } from '../Text';
import { Button } from '../Button';

/**
 * Size configuration
 */
const sizeWidths: Record<ModalSize, number> = {
  small: 380,
  medium: 620,
  large: 980,
};

/**
 * Modal component
 * 
 * Use for complex content like forms, selections, and multi-step flows.
 * For simple confirmations/alerts, use Dialog instead.
 */
export function Modal({
  open,
  title,
  showTitle = true,
  size = 'large',
  children,
  primaryLabel = 'Confirm',
  secondaryLabel = 'Cancel',
  onPrimaryAction,
  onSecondaryAction,
  onClose,
  showSecondaryButton = true,
  showFooter = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  titleId: providedTitleId,
  contentId: providedContentId,
  className,
  style,
}: ModalProps) {
  const titleId = providedTitleId || 'modal-title';
  const contentId = providedContentId || 'modal-content';

  // Handle escape key
  if (typeof window !== 'undefined' && closeOnEscape) {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  }

  if (!open) return null;

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: `${sizeWidths[size]}px`,
    maxHeight: '90vh',
    backgroundColor: 'var(--color-surface-white, white)',
    borderRadius: '4px',
    boxShadow: '0px 4px 6px -2px rgba(26, 26, 26, 0.2)',
    overflow: 'hidden',
    ...style,
  };

  const titleBarStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-light, #f7f9fb)',
    borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
    boxSizing: 'border-box',
  };

  const titleTextStyle: CSSProperties = {
    color: 'var(--color-text-primary, black)',
    margin: 0,
    flexGrow: 1,
  };

  const closeButtonStyle: CSSProperties = {
    width: '24px',
    height: '24px',
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-primary, black)',
    flexShrink: 0,
  };

  const contentWrapperStyle: CSSProperties = {
    flexGrow: 1,
    width: '100%',
    padding: '16px',
    overflowY: 'auto',
    boxSizing: 'border-box',
  };

  const footerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    width: '100%',
    padding: '8px 16px',
    backgroundColor: 'var(--color-surface-white, white)',
    borderTop: '1px solid var(--color-stroke-light, #dee5ef)',
    boxSizing: 'border-box',
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={showTitle && title ? titleId : undefined}
        aria-describedby={contentId}
        className={className}
        style={modalContainerStyle}
      >
        {/* Title Bar */}
        {showTitle && (
          <div style={titleBarStyle}>
            <Text as="h2" variant="heading16Semibold" id={titleId} style={titleTextStyle}>
              {title}
            </Text>
            <button
              type="button"
              style={closeButtonStyle}
              onClick={onClose}
              aria-label="Close modal"
            >
              <CloseIcon size={12} />
            </button>
          </div>
        )}

        {/* Content */}
        <div id={contentId} style={contentWrapperStyle}>
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div style={footerStyle}>
            {showSecondaryButton && (
              <Button
                variant="secondary"
                onClick={onSecondaryAction || onClose}
              >
                {secondaryLabel}
              </Button>
            )}
            <Button
              variant="primary"
              onClick={onPrimaryAction}
            >
              {primaryLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
