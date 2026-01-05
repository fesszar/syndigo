import type { CSSProperties, ReactNode } from 'react';

/**
 * MenuItem Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22492:20300
 */

export type MenuItemState = 'default' | 'hover' | 'active' | 'disabled';

export interface MenuItemProps {
  /** Menu item label */
  label: string;
  /** Visual state */
  state?: MenuItemState;
  /** Whether item is selected/active */
  selected?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Leading icon (left side) */
  leadingIcon?: ReactNode;
  /** Trailing icon (right side, e.g., submenu arrow or actions) */
  trailingIcon?: ReactNode;
  /** Badge count/text */
  badge?: string | number;
  /** Keyboard shortcut text */
  shortcut?: string;
  /** Collapsed mode (icon only) */
  collapsed?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
