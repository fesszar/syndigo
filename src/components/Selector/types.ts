import type { CSSProperties } from 'react';

/**
 * Selector Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:26590
 * 
 * A dropdown trigger button component (select-like control).
 * NOT a segmented control - use for triggering dropdown menus.
 */

export type SelectorState = 'default' | 'hover' | 'focus' | 'disabled' | 'error';

export interface SelectorProps {
  /** Display label */
  label: string;
  /** Placeholder when no value */
  placeholder?: string;
  /** Visual state */
  state?: SelectorState;
  /** Whether selector is disabled */
  disabled?: boolean;
  /** Whether selector has error */
  error?: boolean;
  /** Whether selector is open/expanded */
  open?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
