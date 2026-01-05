import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

/**
 * Button variant types matching Figma design system
 * - Primary: Main call-to-action buttons
 * - Secondary: Secondary actions, less emphasis
 * - Critical: Destructive or warning actions
 * - Text: Minimal styling, link-like appearance
 */
export type ButtonVariant = 'primary' | 'secondary' | 'critical' | 'text';

/**
 * Button state types (managed internally via CSS/events)
 * - Default: Normal state
 * - Hover: Mouse over
 * - Active/Clicked: Mouse pressed
 * - Disabled: Non-interactive
 * - Loading: Processing state (shows spinner)
 */
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled' | 'loading';

/**
 * Icon position in button
 * - None: No icon
 * - Left: Icon before label (startIcon)
 * - Right: Icon after label (endIcon)
 */
export type ButtonIconPosition = 'none' | 'left' | 'right';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Shows loading spinner and disables interaction */
  loading?: boolean;
  /** Icon element to display before the label */
  startIcon?: ReactNode;
  /** Icon element to display after the label */
  endIcon?: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles (merged with variant styles) */
  style?: CSSProperties;
  /** Button label/content */
  children?: ReactNode;
}
