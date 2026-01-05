import type { CSSProperties, ReactNode } from 'react';

/**
 * SelectField Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 17809:13864
 */

export type SelectFieldState = 'default' | 'hover' | 'active' | 'disabled' | 'error';

export interface SelectOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional icon */
  icon?: ReactNode;
}

export interface SelectFieldProps {
  /** Field label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Help text displayed below input */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Available options */
  options: SelectOption[];
  /** Currently selected value */
  value?: string;
  /** Current visual state */
  state?: SelectFieldState;
  /** Whether the dropdown is open */
  open?: boolean;
  /** Whether to show search in dropdown */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Full width mode */
  fullWidth?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when dropdown opens/closes */
  onOpenChange?: (open: boolean) => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
