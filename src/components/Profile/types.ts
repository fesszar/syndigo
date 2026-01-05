import type { CSSProperties, ReactNode } from 'react';

/**
 * Profile Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:24227
 * 
 * A generic profile dropdown/card component.
 * No auth/user logic - all data passed via props.
 */

export interface ProfileMenuItem {
  /** Menu item label */
  label: string;
  /** Menu item icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Whether item is destructive (e.g., logout) */
  destructive?: boolean;
  /** Whether to show separator before this item */
  showSeparator?: boolean;
}

export interface ProfileProps {
  /** Avatar content (image or initials) */
  avatar?: ReactNode;
  /** Display name */
  name: string;
  /** Email address */
  email?: string;
  /** Role or secondary info */
  role?: string;
  /** Menu items */
  menuItems?: ProfileMenuItem[];
  /** Whether dropdown menu is visible */
  showMenu?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
