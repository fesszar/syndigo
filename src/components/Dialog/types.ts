import type { CSSProperties, ReactNode } from 'react';

/**
 * Dialog type variants from Figma
 * - Confirm: Standard dialog with primary (blue) action button
 * - Destructive: Dialog with critical (red) action button for dangerous actions
 * - Tooltip: Error list display with optional action button
 */
export type DialogType = 'confirm' | 'destructive' | 'tooltip';

export interface DialogProps {
  /** Dialog type variant */
  type?: DialogType;
  /** Whether the dialog is open */
  open?: boolean;
  /** Dialog title (for header) */
  title?: string;
  /** Dialog content/message */
  children?: ReactNode;
  /** Primary action button label */
  primaryLabel?: string;
  /** Secondary/cancel button label */
  secondaryLabel?: string;
  /** Primary action handler */
  onPrimaryAction?: () => void;
  /** Secondary/cancel action handler */
  onSecondaryAction?: () => void;
  /** Close handler (X button or backdrop) */
  onClose?: () => void;
  /** Hide close button */
  hideCloseButton?: boolean;
  /** Hide secondary button */
  hideSecondaryButton?: boolean;
  /** ID for aria-labelledby (auto-generated if not provided) */
  titleId?: string;
  /** ID for aria-describedby (auto-generated if not provided) */
  descriptionId?: string;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

export interface TooltipDialogProps {
  /** Dialog is open */
  open?: boolean;
  /** Category label (e.g., "ERRORS TO FIX") */
  categoryLabel?: string;
  /** List of error messages */
  errors?: string[];
  /** Action button label (optional) */
  actionLabel?: string;
  /** Action button handler */
  onAction?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}
