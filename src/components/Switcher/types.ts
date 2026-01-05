import type { CSSProperties } from 'react';

/**
 * Switcher Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22498:28939
 * 
 * A segmented control / tab switcher with labeled options.
 */

/**
 * Switcher variant types
 * - primary: Blue filled active option, light grey container
 * - secondary: Light blue active option with border, white container
 */
export type SwitcherType = 'primary' | 'secondary';

/**
 * Option state
 * - default: Inactive option
 * - active: Currently selected option
 * - hover: Mouse hover state
 */
export type SwitcherOptionState = 'default' | 'active' | 'hover';

export interface SwitcherOption {
  /** Option identifier */
  id: string;
  /** Option label */
  label: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface SwitcherProps {
  /** Array of options */
  options: SwitcherOption[];
  /** Currently selected option id */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Switcher type */
  type?: SwitcherType;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Accessible label for the switch group */
  ariaLabel?: string;
}
