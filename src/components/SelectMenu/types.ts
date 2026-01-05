import type { CSSProperties, ReactNode } from 'react';

/**
 * SelectMenu Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:27783
 * 
 * A dropdown menu component with selectable items.
 * Supports single and multi-select modes.
 */

export type SelectMenuItemState = 'default' | 'hover' | 'active';

export interface SelectMenuOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether option is disabled */
  disabled?: boolean;
}

export interface SelectMenuProps {
  /** Menu options */
  options: SelectMenuOption[];
  /** Selected value(s) */
  value?: string | string[];
  /** Multi-select mode */
  multiple?: boolean;
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Max height before scroll */
  maxHeight?: number;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface SelectMenuItemProps {
  /** Option data */
  option: SelectMenuOption;
  /** Whether item is selected */
  selected?: boolean;
  /** Whether to show checkbox */
  showCheckbox?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Keyboard handler */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** Focus state */
  focused?: boolean;
}
