import type { CSSProperties, ReactNode } from 'react';

export type ActionBarVariant = 'attributes' | 'relationships' | 'assets' | 'productSearch';

export interface ActionBarProps {
  /**
   * Visual variant of the action bar
   * @default 'attributes'
   */
  variant?: ActionBarVariant;

  /**
   * Content for the left/leading slot
   */
  left?: ReactNode;

  /**
   * Content for the center slot (optional)
   */
  center?: ReactNode;

  /**
   * Content for the right/trailing slot
   */
  right?: ReactNode;

  /**
   * Show border at bottom
   * @default true
   */
  showBorder?: boolean;

  /**
   * Use alternate background for product search variant
   * @default false
   */
  altBackground?: boolean;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: CSSProperties;

  /**
   * Children (alternative to slots)
   */
  children?: ReactNode;
}
