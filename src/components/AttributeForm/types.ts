import type { CSSProperties, ReactNode } from 'react';

/**
 * Input types supported by AttributeRow (from Figma)
 */
export type AttributeInputType = 
  | 'textField' 
  | 'textArea' 
  | 'tags' 
  | 'table' 
  | 'emptyState';

/**
 * AttributeGroupHeader props (from Figma: attribute group header)
 */
export interface AttributeGroupHeaderProps {
  /**
   * Group label/title
   */
  label: string;
  
  /**
   * Show tooltip trigger icon
   */
  showTooltip?: boolean;
  
  /**
   * Tooltip content (if showTooltip is true)
   */
  tooltipContent?: ReactNode;
  
  /**
   * Error count badge (0 = hidden)
   */
  errorCount?: number;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Additional styles
   */
  style?: CSSProperties;
}

/**
 * AttributeRow props (from Figma: attribute)
 */
export interface AttributeRowProps {
  /**
   * Attribute label
   */
  label: string;
  
  /**
   * Input type variant
   * @default 'textField'
   */
  inputType?: AttributeInputType;
  
  /**
   * Enable multi-language mode (shows language labels)
   * @default false
   */
  multiLanguage?: boolean;
  
  /**
   * Show tooltip trigger next to label
   */
  showTooltip?: boolean;
  
  /**
   * Tooltip content
   */
  tooltipContent?: ReactNode;
  
  /**
   * Error message (shows inline error)
   */
  errorMessage?: string;
  
  /**
   * Show AI assist icon
   * @default true
   */
  showAiIcon?: boolean;
  
  /**
   * Show history/clock icon
   * @default true
   */
  showHistoryIcon?: boolean;
  
  /**
   * The input element(s) - uses existing TextField, TextArea, etc.
   */
  children: ReactNode;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Additional styles
   */
  style?: CSSProperties;
}

/**
 * AttributeForm props (composed layout container)
 */
export interface AttributeFormProps {
  /**
   * Form content (AttributeGroupHeader + AttributeRow elements)
   */
  children: ReactNode;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Additional styles
   */
  style?: CSSProperties;
}
