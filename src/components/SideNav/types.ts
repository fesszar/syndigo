import type { CSSProperties, ReactNode } from 'react';

/**
 * SideNav Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 17970:6726
 * 
 * A collapsible side navigation component with menu items,
 * action buttons, sections, and badges.
 */

export type SideNavState = 'expanded' | 'collapsed';

export interface SideNavMenuItem {
  /** Unique identifier */
  id: string;
  /** Menu item label */
  label: string;
  /** Menu item icon */
  icon: ReactNode;
  /** Whether item is active */
  active?: boolean;
  /** Badge count */
  badge?: number;
  /** Click handler */
  onClick?: () => void;
  /** Whether item is disabled */
  disabled?: boolean;
}

export interface SideNavSection {
  /** Section identifier */
  id: string;
  /** Section items */
  items: SideNavMenuItem[];
}

export interface SideNavActionButton {
  /** Button identifier */
  id: string;
  /** Button label */
  label: string;
  /** Button icon */
  icon: ReactNode;
  /** Badge count */
  badge?: number;
  /** Click handler */
  onClick?: () => void;
}

export interface SideNavProps {
  /** Current state */
  state?: SideNavState;
  /** Toggle handler */
  onToggle?: () => void;
  /** Logo for expanded state */
  logo?: ReactNode;
  /** Logo icon for collapsed state */
  logoIcon?: ReactNode;
  /** Action buttons (Quick Actions, Open Pages) */
  actionButtons?: SideNavActionButton[];
  /** Menu sections */
  sections?: SideNavSection[];
  /** Footer content */
  footer?: ReactNode;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface SideNavMenuItemProps {
  /** Item data */
  item: SideNavMenuItem;
  /** Whether nav is collapsed */
  collapsed?: boolean;
}
