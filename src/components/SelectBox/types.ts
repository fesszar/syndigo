import type { CSSProperties, ReactNode } from 'react';

/**
 * SelectBox Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:28130
 * 
 * A form-like picker with search and selectable rows.
 * Supports add/remove row types for transfer list patterns.
 */

export type SelectBoxRowType = 'add' | 'remove';
export type SelectBoxRowState = 'default' | 'hover';

export interface SelectBoxOption {
  /** Option value */
  value: string;
  /** Primary label */
  label: string;
  /** Secondary label */
  secondaryLabel?: string;
  /** Whether option is disabled */
  disabled?: boolean;
}

export interface SelectBoxProps {
  /** Available options */
  options: SelectBoxOption[];
  /** Selected values */
  value?: string[];
  /** Row type (add shows plus, remove shows X) */
  rowType?: SelectBoxRowType;
  /** Show search input */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Show drag handles */
  showDragHandle?: boolean;
  /** Change handler */
  onChange?: (value: string[]) => void;
  /** Item click handler */
  onItemClick?: (option: SelectBoxOption) => void;
  /** Search change handler */
  onSearchChange?: (query: string) => void;
  /** Max height before scroll */
  maxHeight?: number;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface SelectBoxRowProps {
  /** Option data */
  option: SelectBoxOption;
  /** Row type */
  type?: SelectBoxRowType;
  /** Show drag handle */
  showDragHandle?: boolean;
  /** Click handler */
  onClick?: () => void;
}
