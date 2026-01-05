import type { CSSProperties, ReactNode } from 'react';

/**
 * FilterDropdown Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22482:14590
 */

export type FilterDropdownType = 
  | 'multiselect'
  | 'value'
  | 'boolean'
  | 'UOM'
  | 'date'
  | 'workflow'
  | 'nested';

export type FilterOperator = 
  | 'is'
  | 'isNot'
  | 'contains'
  | 'doesNotContain'
  | 'hasValue'
  | 'hasNoValue'
  | 'greaterThan'
  | 'lessThan'
  | 'between';

export interface FilterOption {
  label: string;
  value: string;
  selected?: boolean;
}

export interface FilterPill {
  id: string;
  attribute: string;
  operator: string;
  value: string;
}

export interface FilterDropdownProps {
  /** The type of filter dropdown to render */
  type: FilterDropdownType;
  /** Label displayed in the header */
  label: string;
  /** Whether the dropdown is open */
  open?: boolean;
  /** Available filter options (for multiselect type) */
  options?: FilterOption[];
  /** Selected values */
  selectedValues?: string[];
  /** Current operator selection */
  operator?: FilterOperator;
  /** Available operators for dropdown */
  operators?: { label: string; value: FilterOperator }[];
  /** Boolean value (for boolean type) */
  booleanValue?: boolean;
  /** Min value (for UOM/value types) */
  minValue?: string;
  /** Max value (for UOM/value types) */
  maxValue?: string;
  /** Unit of measure (for UOM type) */
  unit?: string;
  /** Available units (for UOM type) */
  units?: string[];
  /** Text input value (for value type) */
  inputValue?: string;
  /** Date value (for date type) */
  dateValue?: Date;
  /** Time value (for date type) */
  timeValue?: string;
  /** Workflow selection (for workflow type) */
  workflow?: string;
  /** Workflow step selection (for workflow type) */
  workflowStep?: string;
  /** Assigned to selection (for workflow type) */
  assignedTo?: string;
  /** Match type for nested filters */
  matchType?: 'sameRow' | 'anyRow';
  /** Active filter pills (for nested type) */
  filterPills?: FilterPill[];
  /** Search query for filtering options */
  searchQuery?: string;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Whether the filter is disabled */
  disabled?: boolean;
  /** Whether to show the Reset button (date type) */
  showReset?: boolean;
  /** Callback when filter is applied */
  onApply?: () => void;
  /** Callback when filter is closed */
  onClose?: () => void;
  /** Callback when filter is reset */
  onReset?: () => void;
  /** Callback when option selection changes */
  onSelectionChange?: (values: string[]) => void;
  /** Callback when operator changes */
  onOperatorChange?: (operator: FilterOperator) => void;
  /** Callback when boolean value changes */
  onBooleanChange?: (value: boolean) => void;
  /** Callback when input value changes */
  onInputChange?: (value: string) => void;
  /** Callback when min/max values change */
  onRangeChange?: (min: string, max: string) => void;
  /** Callback when unit changes */
  onUnitChange?: (unit: string) => void;
  /** Callback when date changes */
  onDateChange?: (date: Date) => void;
  /** Callback when time changes */
  onTimeChange?: (time: string) => void;
  /** Callback when workflow fields change */
  onWorkflowChange?: (workflow: string, step: string, assignedTo: string) => void;
  /** Callback when search query changes */
  onSearchChange?: (query: string) => void;
  /** Callback when filter pill is removed */
  onRemoveFilterPill?: (id: string) => void;
  /** Callback to add new nested filter */
  onAddNestedFilter?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Custom content to render in the dropdown body */
  children?: ReactNode;
}

export interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface DropdownSelectProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
