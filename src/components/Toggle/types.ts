import type { CSSProperties } from 'react';

/**
 * Toggle Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29646
 * 
 * A boolean toggle switch (on/off control).
 * 
 * Note: This is DIFFERENT from Switcher, which is a segmented control
 * for selecting between multiple options. Toggle is for binary on/off states.
 */

export interface ToggleProps {
  /** Checked (on) state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Optional label */
  label?: string;
  /** Optional subtext below label */
  subtext?: string;
  /** Show required asterisk */
  required?: boolean;
  /** Accessible name for the toggle */
  ariaLabel?: string;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
