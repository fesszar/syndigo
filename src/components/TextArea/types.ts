import type { CSSProperties, TextareaHTMLAttributes } from 'react';

/**
 * TextArea Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 19765:13557
 */

export type TextAreaState = 'default' | 'hover' | 'active' | 'disabled' | 'filled';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  /** Field label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Help text displayed below input */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Current visual state */
  state?: TextAreaState;
  /** Whether the textarea is resizable */
  resizable?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
  /** Number of rows */
  rows?: number;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Textarea element styles */
  textareaStyle?: CSSProperties;
}
