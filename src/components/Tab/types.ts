import type { CSSProperties } from 'react';

/**
 * Tab Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22499:29217
 * 
 * A panel-style tab component with optional badge and menu icon.
 * 
 * Note: This is distinct from TabHeader which is a tab navigation header.
 * This Tab component is for panel-style tabs with badge counts and menu actions.
 */

/**
 * Tab states
 * - default: Inactive tab
 * - hover: Mouse hover state
 * - active: Currently selected tab
 */
export type TabComponentState = 'default' | 'hover' | 'active';

export interface TabComponentProps {
  /** Tab label */
  label: string;
  /** Active state */
  isActive?: boolean;
  /** Badge count */
  badge?: number;
  /** Show menu icon (ellipses) */
  showMenu?: boolean;
  /** Menu click handler */
  onMenuClick?: () => void;
  /** Tab click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
