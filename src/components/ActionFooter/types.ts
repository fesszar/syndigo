import type { CSSProperties, ReactNode } from 'react';

export interface ActionFooterProps {
  /**
   * Show secondary (cancel) button
   * @default true
   */
  showSecondaryButton?: boolean;
  
  /**
   * Primary button label
   * @default "Save"
   */
  primaryLabel?: string;
  
  /**
   * Secondary button label
   * @default "Cancel"
   */
  secondaryLabel?: string;
  
  /**
   * Primary button click handler
   */
  onPrimaryClick?: () => void;
  
  /**
   * Secondary button click handler
   */
  onSecondaryClick?: () => void;
  
  /**
   * Disable primary button
   */
  primaryDisabled?: boolean;
  
  /**
   * Disable secondary button
   */
  secondaryDisabled?: boolean;
  
  /**
   * Show loading state on primary button
   */
  primaryLoading?: boolean;
  
  /**
   * Custom primary button (overrides default)
   */
  primaryButton?: ReactNode;
  
  /**
   * Custom secondary button (overrides default)
   */
  secondaryButton?: ReactNode;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Additional styles
   */
  style?: CSSProperties;
}
