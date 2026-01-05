import type { CSSProperties } from 'react';

/**
 * TabGroup Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29377
 * 
 * A group of tabs with underline style.
 * Composes the existing Tab component.
 */

export interface TabGroupItem {
  /** Tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Badge count */
  badge?: number;
  /** Show menu icon (ellipses) */
  showMenu?: boolean;
  /** Menu click handler */
  onMenuClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export interface TabGroupProps {
  /** Array of tab items */
  tabs: TabGroupItem[];
  /** Currently active tab id */
  activeTab: string;
  /** Tab change handler */
  onTabChange: (tabId: string) => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Accessible label for the tab group */
  ariaLabel?: string;
}
