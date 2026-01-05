# Selector

A dropdown trigger button component for filter selections and dropdown menus.

**Figma Source:** [Selector](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-26590)

---

## Overview

Selector is a **select-like control** (dropdown trigger button) - NOT a segmented control. It displays a label with a chevron icon and triggers a dropdown menu when clicked.

**Use cases:**
- Filter selectors ("Saved Filters", "Sort By")
- Dropdown trigger buttons
- Simple single-select triggers

---

## Props

```typescript
interface SelectorProps {
  /** Display label */
  label: string;
  /** Placeholder when no value */
  placeholder?: string;
  /** Visual state */
  state?: SelectorState;
  /** Whether disabled */
  disabled?: boolean;
  /** Whether has error */
  error?: boolean;
  /** Whether open/expanded */
  open?: boolean;
  /** Click handler */
  onClick?: () => void;
}

type SelectorState = 'default' | 'hover' | 'focus' | 'disabled' | 'error';
```

---

## Visual Specifications

### States

| State | Background | Border | Text | Icon |
|-------|------------|--------|------|------|
| default | white | #dee5ef | black | #718094 |
| hover | #f7f9fb | #91a0b3 | black | #718094 |
| focus | white | #2d75e2 | black | #718094 |
| disabled | #dee5ef | #91a0b3 | #91a0b3 | #91a0b3 |
| error | white | #db3a3a | black | #718094 |

### Dimensions
- **Padding:** 5px 11px
- **Gap:** 4px
- **Border radius:** 4px
- **Shadow:** 0px 1px 3px rgba(0, 0, 0, 0.1)
- **Icon size:** 24×24px

### Typography
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 14px
- **Text align:** Center

---

## Usage Examples

### Basic Usage

```tsx
import { Selector } from '@syndigo/components';

<Selector
  label="Saved Filters"
  onClick={() => setDropdownOpen(true)}
/>
```

### With Open State

```tsx
const [isOpen, setIsOpen] = useState(false);

<Selector
  label="Saved Filters"
  open={isOpen}
  onClick={() => setIsOpen(!isOpen)}
/>
```

### Disabled State

```tsx
<Selector
  label="Saved Filters"
  disabled
/>
```

### Error State

```tsx
<Selector
  label="Select an option"
  error
  onClick={handleOpen}
/>
```

### With Dropdown Menu

```tsx
<div style={{ position: 'relative' }}>
  <Selector
    label={selectedFilter || 'Saved Filters'}
    open={isOpen}
    onClick={() => setIsOpen(!isOpen)}
  />
  {isOpen && (
    <DropdownMenu
      options={filters}
      onSelect={handleSelect}
      onClose={() => setIsOpen(false)}
    />
  )}
</div>
```

---

## When to Use: Selector vs SelectBox vs SelectMenu

| Component | Use When |
|-----------|----------|
| **Selector** | Simple dropdown trigger with custom dropdown content |
| **SelectBox** | Form field with built-in options and value binding |
| **SelectMenu** | Full dropdown with search, multi-select, groups |

### Decision Tree

```
Need a form input with value binding?
├── Yes → Use SelectBox
└── No → Is content a simple options list?
    ├── Yes, with search/multi-select → Use SelectMenu
    └── No, custom content → Use Selector + custom dropdown
```

### Examples by Use Case

| Use Case | Recommended |
|----------|-------------|
| "Sort by" dropdown | Selector |
| "Saved Filters" picker | Selector |
| Country selection in form | SelectBox |
| Multi-select tags | SelectMenu |
| Custom filter panel | Selector + Panel |

---

## Does NOT Duplicate

This component is **distinct** from:

- **SelectBox** - Form input with value binding, validation, and built-in options
- **SelectMenu** - Full dropdown with search, filtering, multi-select
- **Button** - Action trigger without dropdown indication
- **Pill** - Selection chip/tag

Selector is specifically a **lightweight dropdown trigger** that:
- Shows current label + chevron
- Triggers custom dropdown content
- Has no built-in dropdown menu

---

## Accessibility

- Native `<button>` element
- `aria-expanded` for open state
- `aria-haspopup="listbox"` for dropdown indication
- Keyboard support (Enter/Space)
- Disabled state support

---

## Do's and Don'ts

### Do's
- ✅ Use for simple dropdown triggers
- ✅ Pair with custom dropdown content
- ✅ Show current selection as label
- ✅ Rotate chevron when open

### Don'ts
- ❌ Don't use for form fields (use SelectBox)
- ❌ Don't use for complex selections (use SelectMenu)
- ❌ Don't use without dropdown content
- ❌ Don't use for navigation

---

## Related Components

- [SelectBox](./select-box.md) - Form select input
- [SelectMenu](./select-menu.md) - Full dropdown with search
- [Button](./button.md) - Action buttons
- [Dropdown](./dropdown.md) - Dropdown menu container
