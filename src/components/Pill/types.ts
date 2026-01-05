import type { CSSProperties, ReactNode } from 'react';

/**
 * Pill Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:23742
 */

export type PillState = 'default' | 'hover' | 'active' | 'disabled';

export type PillIconPosition = 'left' | 'right' | 'none' | 'iconOnly';

export interface PillProps {
  /** Pill label text */
  label?: string;
  /** Visual state */
  state?: PillState;
  /** Whether pill is selected/active */
  selected?: boolean;
  /** Whether pill is disabled */
  disabled?: boolean;
  /** Icon element */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: PillIconPosition;
  /** Whether pill is removable (shows X button) */
  removable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Remove handler */
  onRemove?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
