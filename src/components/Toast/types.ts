import type { CSSProperties, ReactNode } from 'react';

/**
 * Toast Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29433
 * 
 * A toast notification component with type variants.
 */

/**
 * Toast type variants
 * - success: Green, check-circle icon
 * - info: Blue, info icon
 * - critical: Red, warning-circle icon
 * - warning: Orange, warning-triangle icon
 */
export type ToastType = 'success' | 'info' | 'critical' | 'warning';

export interface ToastProps {
  /** Toast message */
  message: string;
  /** Toast type */
  type?: ToastType;
  /** Action button label */
  actionLabel?: string;
  /** Action button click handler */
  onAction?: () => void;
  /** Dismiss click handler */
  onDismiss?: () => void;
  /** Show dismiss button */
  showDismiss?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
