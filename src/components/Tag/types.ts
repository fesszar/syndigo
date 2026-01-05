import type { CSSProperties } from 'react';

/**
 * Tag Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22499:29113
 * 
 * A removable tag/chip component with label and optional close button.
 */

/**
 * Tag states
 * - default: Normal state
 * - hover: Mouse hover state
 * - focused: Keyboard focus state
 * - disabled: Disabled state
 * - selected: Selected/active state
 */
export type TagState = 'default' | 'hover' | 'focused' | 'disabled' | 'selected';

export interface TagProps {
  /** Tag label */
  label: string;
  /** Show close button */
  removable?: boolean;
  /** Remove handler */
  onRemove?: () => void;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
