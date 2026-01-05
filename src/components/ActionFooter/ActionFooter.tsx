import type { CSSProperties } from 'react';
import { Button } from '../Button';
import type { ActionFooterProps } from './types';

const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 'var(--spacing-8, 8px)',
  padding: 'var(--spacing-8, 8px) var(--spacing-16, 16px)',
  backgroundColor: 'var(--color-surface-white)',
  borderTop: '1px solid var(--color-stroke-light)',
  boxSizing: 'border-box',
};

export function ActionFooter({
  showSecondaryButton = true,
  primaryLabel = 'Save',
  secondaryLabel = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  primaryDisabled = false,
  secondaryDisabled = false,
  primaryLoading = false,
  primaryButton,
  secondaryButton,
  className,
  style,
}: ActionFooterProps) {
  const mergedStyle: CSSProperties = {
    ...containerStyle,
    ...style,
  };

  return (
    <div className={className} style={mergedStyle}>
      {showSecondaryButton && (
        secondaryButton ?? (
          <Button
            variant="secondary"
            onClick={onSecondaryClick}
            disabled={secondaryDisabled}
          >
            {secondaryLabel}
          </Button>
        )
      )}
      {primaryButton ?? (
        <Button
          variant="primary"
          onClick={onPrimaryClick}
          disabled={primaryDisabled}
          loading={primaryLoading}
        >
          {primaryLabel}
        </Button>
      )}
    </div>
  );
}
