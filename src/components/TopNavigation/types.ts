import type { CSSProperties, ReactNode } from 'react';

/**
 * TopNavigation Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22507:30172
 * 
 * A top navigation bar component.
 */

export interface TopNavigationProps {
  /** Logo element (image or ReactNode) */
  logo?: ReactNode;
  /** Environment badge text (e.g., "Sandbox", "Production") */
  environment?: string;
  /** Environment status color */
  environmentStatus?: 'success' | 'warning' | 'error';
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Search value */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Notification count (messages) */
  messageCount?: number;
  /** Notification count (alerts) */
  alertCount?: number;
  /** Avatar image source */
  avatarSrc?: string;
  /** Avatar alt text */
  avatarAlt?: string;
  /** Avatar initials (fallback) */
  avatarInitials?: string;
  /** On avatar click handler */
  onAvatarClick?: () => void;
  /** On message icon click handler */
  onMessageClick?: () => void;
  /** On alert icon click handler */
  onAlertClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
