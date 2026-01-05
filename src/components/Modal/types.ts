import type { CSSProperties, ReactNode } from 'react';

/**
 * Modal Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 14720:20653
 * 
 * Modal is distinct from Dialog - use Modal for complex content/forms,
 * use Dialog for simple confirmations/alerts.
 */

export type ModalSize = 'small' | 'medium' | 'large';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Modal title (optional - can hide title bar) */
  title?: string;
  /** Whether to show the title bar */
  showTitle?: boolean;
  /** Modal size */
  size?: ModalSize;
  /** Modal content */
  children: ReactNode;
  /** Primary action button label */
  primaryLabel?: string;
  /** Secondary action button label */
  secondaryLabel?: string;
  /** Primary action handler */
  onPrimaryAction?: () => void;
  /** Secondary action handler */
  onSecondaryAction?: () => void;
  /** Close handler (X button or overlay click) */
  onClose?: () => void;
  /** Whether to show secondary button */
  showSecondaryButton?: boolean;
  /** Whether to show action footer */
  showFooter?: boolean;
  /** Whether clicking overlay closes modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;
  /** ID for title element (a11y) */
  titleId?: string;
  /** ID for content element (a11y) */
  contentId?: string;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
