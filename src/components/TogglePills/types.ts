import type { CSSProperties } from 'react';

/**
 * TogglePills Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22504:29766
 * 
 * A pill-based toggle group for single-select options.
 */

export interface TogglePillOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label */
  label: string;
  /** Disabled state for this option */
  disabled?: boolean;
}

export interface TogglePillsProps {
  /** Array of pill options */
  options: TogglePillOption[];
  /** Currently selected option id (null for none selected) */
  value: string | null;
  /** Change handler */
  onChange: (value: string | null) => void;
  /** Disabled state for entire group */
  disabled?: boolean;
  /** Allow deselection (clicking active pill deselects it) */
  allowDeselect?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Accessible label for the group */
  ariaLabel?: string;
}
