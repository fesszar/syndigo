import type { CSSProperties, ReactNode } from 'react';

/**
 * TabHeader Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22499:29032
 * 
 * A tab navigation header with selectable tabs.
 */

/**
 * Tab sizes
 * - default: Regular size (13px, medium weight)
 * - small: Smaller tabs (11px, semi-bold, uppercase)
 */
export type TabHeaderSize = 'default' | 'small';

/**
 * Tab states
 * - default: Inactive tab
 * - active: Currently selected tab
 * - hover: Mouse hover state
 */
export type TabState = 'default' | 'active' | 'hover';

export interface TabItem {
  /** Tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface TabHeaderProps {
  /** Array of tabs */
  tabs: TabItem[];
  /** Currently active tab id */
  activeTab: string;
  /** Tab change handler */
  onTabChange: (tabId: string) => void;
  /** Tab size */
  size?: TabHeaderSize;
  /** Show trailing icon button */
  showTrailingIcon?: boolean;
  /** Trailing icon click handler */
  onTrailingIconClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface TabProps {
  /** Tab label */
  label: string;
  /** Active state */
  isActive: boolean;
  /** Tab size */
  size?: TabHeaderSize;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick: () => void;
}
