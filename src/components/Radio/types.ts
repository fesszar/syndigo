import type { CSSProperties } from 'react';

/**
 * Radio Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:24263
 */

export interface RadioProps {
  /** Radio name (for grouping) */
  name?: string;
  /** Radio value */
  value?: string;
  /** Whether radio is checked */
  checked?: boolean;
  /** Whether radio is disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface RadioGroupProps {
  /** Group name */
  name: string;
  /** Currently selected value */
  value?: string;
  /** Radio options */
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
