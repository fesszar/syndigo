# FilterPanel

A container component for organizing and displaying filter sections with collapsible boxes.

**Figma Source:** [Filter Panel](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22482-17404)

---

## Overview

The FilterPanel component provides a structured UI for filtering data. It displays multiple filter sections as collapsible boxes in a grid layout, with optional header actions and search functionality. This is a **UI pattern only** - no app-specific filtering logic is included.

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Full panel with header, search, and grid | Main filter panel in sidebar or modal |
| `compact` | Simplified panel with boxes only | Embedded filter within content area |

---

## Components

### FilterPanel

The main container component that orchestrates filter sections.

### FilterBox

A collapsible section displaying a list of filter items with a header.

---

## Props

### FilterPanel Props

```typescript
interface FilterPanelProps {
  /** Panel variant */
  variant?: 'default' | 'compact';
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
  /** Callback when clear all is clicked */
  onClearAll?: () => void;
  /** Callback when apply is clicked */
  onApply?: () => void;
  /** Callback when a filter item is clicked */
  onItemClick?: (sectionId: string, itemId: string) => void;
}
```

### FilterSection Interface

```typescript
interface FilterSection {
  id: string;
  title: string;
  icon?: ReactNode;
  items: FilterItem[];
  collapsed?: boolean;
}
```

### FilterItem Interface

```typescript
interface FilterItem {
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}
```

---

## Visual Specifications

### Panel Container (Default)
- **Background:** white (#FFFFFF)
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px
- **Shadow:** 0px 14px 18px rgba(77, 92, 110, 0.15)

### Panel Container (Compact)
- **Background:** #f7f9fb
- **Padding:** 20px
- **Border radius:** 4px

### Header
- **Title:** 14px Bold, black
- **Padding:** 12px
- **Border bottom:** 1px solid #dee5ef

### Filter Box
- **Width:** 211px minimum
- **Background:** #f7f9fb
- **Border:** 1px solid #dee5ef
- **Border radius:** 6px

### Filter Box Header
- **Height:** 34px
- **Background:** #dee5ef
- **Icon:** 18px, #718094
- **Title:** 12px Semibold, black

### List Item
- **Height:** 28px
- **Padding:** 0 7px
- **Font:** 12px Medium, #4d5c6e
- **Hover:** #dee5ef background
- **Selected:** #e8f1fd background

---

## Usage Examples

### Default Panel with Sections

```tsx
import { FilterPanel } from '@syndigo/components';

const sections = [
  {
    id: 'attributes',
    title: 'Attributes',
    items: [
      { id: 'brand', label: 'Brand' },
      { id: 'color', label: 'Color' },
      { id: 'size', label: 'Size Type' },
    ],
  },
  {
    id: 'workflow',
    title: 'Workflow',
    items: [
      { id: 'pending', label: 'Pending Review' },
      { id: 'approved', label: 'Approved' },
      { id: 'rejected', label: 'Rejected' },
    ],
  },
  {
    id: 'status',
    title: 'Publication Status',
    items: [
      { id: 'published', label: 'Published' },
      { id: 'unpublished', label: 'Unpublished' },
      { id: 'error', label: 'Error' },
    ],
  },
];

<FilterPanel
  title="Filter"
  sections={sections}
  showHeader={true}
  showSearch={true}
  onItemClick={(sectionId, itemId) => handleFilter(sectionId, itemId)}
  onClearAll={handleClearAll}
  onApply={handleApply}
/>
```

### Compact Panel

```tsx
<FilterPanel
  variant="compact"
  sections={sections}
  showHeader={false}
  onItemClick={(sectionId, itemId) => handleFilter(sectionId, itemId)}
/>
```

### With Selected Items

```tsx
const sections = [
  {
    id: 'attributes',
    title: 'Attributes',
    items: [
      { id: 'brand', label: 'Brand', selected: true },
      { id: 'color', label: 'Color', selected: true },
      { id: 'size', label: 'Size Type' },
    ],
  },
];

<FilterPanel
  sections={sections}
  onItemClick={(sectionId, itemId) => toggleSelection(sectionId, itemId)}
/>
```

### Using FilterBox Directly

```tsx
import { FilterBox } from '@syndigo/components';

<FilterBox
  title="Attributes"
  items={[
    { id: 'brand', label: 'Brand' },
    { id: 'color', label: 'Color' },
  ]}
  onItemClick={(itemId) => handleSelect(itemId)}
/>
```

---

## Section Icons

The component automatically assigns icons based on section title:

| Section Title Contains | Icon |
|------------------------|------|
| "workflow" | Workflow icon (arrows in circle) |
| "publication", "status" | Check circle icon |
| Other | Layers icon (default) |

Custom icons can be provided via the `icon` prop on each section.

---

## Accessibility

- List items have `role="button"` and are keyboard focusable
- Filter boxes can be toggled with keyboard
- Clear visual distinction for hover and selected states
- Proper focus management

---

## Important Notes

**This is a UI pattern only.** The FilterPanel component:
- ✅ Renders filter sections and items
- ✅ Handles visual states (hover, selected)
- ✅ Triggers callbacks on user interaction
- ❌ Does NOT implement filtering logic
- ❌ Does NOT manage filter state internally
- ❌ Does NOT perform data queries

The parent application is responsible for:
- Managing which items are selected
- Implementing the actual filtering logic
- Updating the sections prop with new selection states

---

## Do's and Don'ts

### Do's
- ✅ Use consistent section titles across the application
- ✅ Provide meaningful item labels
- ✅ Handle the `onApply` callback to commit filter changes
- ✅ Use `onClearAll` to reset all selections
- ✅ Show loading states during filter operations

### Don'ts
- ❌ Don't put app-specific filtering logic in the component
- ❌ Don't nest FilterPanels
- ❌ Don't use excessively long item labels
- ❌ Don't disable the entire panel - disable individual items

---

## Related Components

- [FilterDropdown](./filter-dropdown.md) - Individual filter dropdowns with various input types
- [Button](./button.md) - Used in header actions
- [Dialog](./dialog.md) - Can contain FilterPanel for modal filtering
