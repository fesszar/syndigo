import type { CSSProperties, InputHTMLAttributes } from 'react';

/**
 * SearchField Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 17809:13258
 */

export type SearchFieldState = 'default' | 'hover' | 'active' | 'disabled' | 'error';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  /** Current visual state */
  state?: SearchFieldState;
  /** Error message to display */
  errorText?: string;
  /** Whether to show clear button when has value */
  showClearButton?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Input element styles */
  inputStyle?: CSSProperties;
}
