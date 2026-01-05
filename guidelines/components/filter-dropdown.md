# FilterDropdown

A versatile filter dropdown component for filtering data with various input types.

**Figma Source:** [Filter Dropdown](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22482-14590)

---

## Overview

The FilterDropdown component provides a flexible way to filter data based on different attribute types. It supports 7 distinct filter types, each tailored to a specific data format.

---

## Filter Types

| Type | Description | Use Case |
|------|-------------|----------|
| `multiselect` | Checkbox list with search | Filtering by multiple categorical values |
| `value` | Single value input | Filtering by specific numeric/text values |
| `boolean` | True/False toggle | Filtering by boolean attributes |
| `UOM` | Min/Max with unit selector | Filtering by measurement ranges |
| `date` | Date and time picker | Filtering by date ranges |
| `workflow` | Workflow, step, and assignee selectors | Filtering by workflow status |
| `nested` | Filter pills with match conditions | Complex nested attribute filtering |

---

## Props

```typescript
interface FilterDropdownProps {
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
  /** Boolean value (for boolean type) */
  booleanValue?: boolean;
  /** Min value (for UOM/value types) */
  minValue?: string;
  /** Max value (for UOM/value types) */
  maxValue?: string;
  /** Unit of measure (for UOM type) */
  unit?: string;
  /** Filter pills (for nested type) */
  filterPills?: FilterPill[];
  /** Callback when filter is applied */
  onApply?: () => void;
  /** Callback when filter is closed */
  onClose?: () => void;
  // ... additional props per type
}
```

---

## Visual Specifications

### Container
- **Border radius:** 6px
- **Shadow:** 0px 14px 18px rgba(77, 92, 110, 0.15)
- **Background:** white (#FFFFFF)

### Header
- **Height:** 34px
- **Padding:** 8px 10px
- **Background:** #f7f9fb
- **Border bottom:** 1px solid #dee5ef
- **Font:** 11px Medium, #4d5c6e

### Footer
- **Padding:** 9px 12px
- **Border top:** 1px solid #dee5ef
- **Buttons:** Close (secondary) + Apply (primary)

### Width by Type
| Type | Width |
|------|-------|
| multiselect | 242px |
| value | 242px |
| boolean | 242px |
| UOM | 264px |
| nested | 391px |
| workflow | 428px |
| date | 533px |

---

## Usage Examples

### Multiselect Filter
```tsx
import { FilterDropdown } from '@syndigo/components';

<FilterDropdown
  type="multiselect"
  label="Brand"
  options={[
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ]}
  selectedValues={['small', 'medium']}
  onSelectionChange={(values) => setSelectedValues(values)}
  onApply={handleApply}
  onClose={handleClose}
/>
```

### Boolean Filter
```tsx
<FilterDropdown
  type="boolean"
  label="Is Active"
  booleanValue={true}
  onBooleanChange={(value) => setBooleanValue(value)}
  onApply={handleApply}
  onClose={handleClose}
/>
```

### Value Filter
```tsx
<FilterDropdown
  type="value"
  label="Bag Size"
  inputValue="23"
  onInputChange={(value) => setInputValue(value)}
  onApply={handleApply}
  onClose={handleClose}
/>
```

### UOM (Unit of Measure) Filter
```tsx
<FilterDropdown
  type="UOM"
  label="Length"
  minValue="10"
  maxValue="50"
  unit="mm"
  units={['mm', 'cm', 'in']}
  onRangeChange={(min, max) => setRange({ min, max })}
  onUnitChange={(unit) => setUnit(unit)}
  onApply={handleApply}
  onClose={handleClose}
/>
```

### Workflow Filter
```tsx
<FilterDropdown
  type="workflow"
  label="Workflow"
  workflow="Enrichment"
  workflowStep="Ready for copy"
  assignedTo="Assigned to me"
  onWorkflowChange={(workflow, step, assignedTo) => {
    setWorkflow(workflow);
    setStep(step);
    setAssignedTo(assignedTo);
  }}
  onApply={handleApply}
  onClose={handleClose}
/>
```

### Nested Filter
```tsx
<FilterDropdown
  type="nested"
  label="Address"
  matchType="sameRow"
  filterPills={[
    { id: '1', attribute: 'Postal Code', operator: '=', value: 'Has No Value' },
    { id: '2', attribute: 'Country', operator: '=', value: '"India"' },
  ]}
  onRemoveFilterPill={(id) => removeFilterPill(id)}
  onAddNestedFilter={handleAddFilter}
  onApply={handleApply}
  onClose={handleClose}
/>
```

### Date Filter
```tsx
<FilterDropdown
  type="date"
  label="Create Date & Time"
  dateValue={new Date()}
  timeValue="09:00"
  showReset={true}
  onDateChange={(date) => setDate(date)}
  onTimeChange={(time) => setTime(time)}
  onReset={handleReset}
  onApply={handleApply}
  onClose={handleClose}
/>
```

---

## State Parity

| State | Description | Visual Indicator |
|-------|-------------|------------------|
| Open | Dropdown is visible | Container rendered |
| Closed | Dropdown is hidden | `open={false}` returns null |
| Selected | Items are selected | Checked checkboxes, active pills |
| Disabled | Interaction disabled | Reduced opacity, no cursor |

---

## Operators

| Operator | Display Text | Types |
|----------|--------------|-------|
| `is` | Is | multiselect, boolean |
| `isNot` | Is Not | multiselect |
| `contains` | Contains | value |
| `doesNotContain` | Does Not Contain | value |
| `hasValue` | Has Value | value |
| `hasNoValue` | Has No Value | value |
| `greaterThan` | Greater Than | UOM, value |
| `lessThan` | Less Than | UOM, value |
| `between` | Between | UOM, date |

---

## Accessibility

- Checkbox items have `role="checkbox"` and `aria-checked`
- Toggle pills have `role="button"` and `tabIndex`
- Close button accessible for keyboard navigation
- Proper focus management within dropdown

---

## Do's and Don'ts

### Do's
- ✅ Use appropriate filter type for the data attribute
- ✅ Provide clear labels for the filter header
- ✅ Show selected count or values in trigger button
- ✅ Support keyboard navigation
- ✅ Provide search for large option lists (multiselect)

### Don'ts
- ❌ Don't mix filter types for same attribute
- ❌ Don't show dropdown without a trigger element
- ❌ Don't hide Close/Apply buttons
- ❌ Don't use date type for non-temporal data
- ❌ Don't overcrowd nested filters

---

## Related Components

- [Button](./button.md) - Used in footer actions
- [InputField](./input-field.md) - Used in value inputs
- [Dialog](./dialog.md) - Similar overlay pattern
