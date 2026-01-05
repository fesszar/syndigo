import type { CSSProperties, ReactNode } from 'react';

/**
 * InlineError Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 13839:3536
 */

export type InlineErrorSeverity = 'error' | 'warning' | 'info';

export type InlineErrorSize = 'small' | 'medium';

export interface InlineErrorProps {
  /** Error message to display */
  message: string;
  /** Severity level affects color */
  severity?: InlineErrorSeverity;
  /** Size variant */
  size?: InlineErrorSize;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Custom icon to display (overrides default) */
  icon?: ReactNode;
  /** Whether the message can wrap to multiple lines */
  multiline?: boolean;
  /** Text alignment */
  align?: 'left' | 'right' | 'center';
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
