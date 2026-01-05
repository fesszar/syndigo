import type { CSSProperties, ReactNode } from 'react';

/**
 * FilterPanel Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22482:17404
 */

export type FilterPanelVariant = 'default' | 'compact';

export interface FilterSection {
  /** Unique identifier for the section */
  id: string;
  /** Section title displayed in header */
  title: string;
  /** Icon element for section header */
  icon?: ReactNode;
  /** List of filter items in the section */
  items: FilterItem[];
  /** Whether the section is collapsed */
  collapsed?: boolean;
}

export interface FilterItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface FilterPanelProps {
  /** Panel variant */
  variant?: FilterPanelVariant;
  /** Panel title (shown in default variant) */
  title?: string;
  /** Filter sections to display */
  sections: FilterSection[];
  /** Whether to show the search input */
  showSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Current search value */
  searchValue?: string;
  /** Whether to show the header with actions */
  showHeader?: boolean;
  /** Text for clear all action */
  clearAllText?: string;
  /** Text for apply action */
  applyText?: string;
  /** Whether the apply button is disabled */
  applyDisabled?: boolean;
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;
  /** Callback when clear all is clicked */
  onClearAll?: () => void;
  /** Callback when apply is clicked */
  onApply?: () => void;
  /** Callback when a filter item is clicked */
  onItemClick?: (sectionId: string, itemId: string) => void;
  /** Callback when a section is toggled */
  onSectionToggle?: (sectionId: string) => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Custom content to render */
  children?: ReactNode;
}

export interface FilterBoxProps {
  /** Section title */
  title: string;
  /** Icon element for header */
  icon?: ReactNode;
  /** List of filter items */
  items: FilterItem[];
  /** Whether the section is collapsed */
  collapsed?: boolean;
  /** Callback when header is clicked to toggle */
  onToggle?: () => void;
  /** Callback when an item is clicked */
  onItemClick?: (itemId: string) => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface FilterListItemProps {
  /** Item label */
  label: string;
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Callback when clicked */
  onClick?: () => void;
}
