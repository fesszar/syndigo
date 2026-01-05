# SearchField

A specialized input field for search functionality with search icon and optional clear button.

**Figma Source:** [Search Input Field](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=17809-13258)

---

## Overview

The SearchField component provides a dedicated search input with a search icon prefix and optional clear button. It's designed for filtering and searching data.

---

## States

| State | Description |
|-------|-------------|
| `default` | Initial state with placeholder text |
| `hover` | Mouse over the input |
| `active` | Input is focused |
| `disabled` | Input is not interactive |
| `error` | Validation error state |

---

## Props

```typescript
interface SearchFieldProps {
  /** Current visual state */
  state?: 'default' | 'hover' | 'active' | 'disabled' | 'error';
  /** Error message to display */
  errorText?: string;
  /** Whether to show clear button when has value */
  showClearButton?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Placeholder text (default: "Search") */
  placeholder?: string;
  // ...extends InputHTMLAttributes
}
```

---

## Visual Specifications

### Dimensions
- **Height:** 34px
- **Width:** 218px (default), 100% (fullWidth)
- **Padding:** 5px 10px
- **Border radius:** 4px

### Typography
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 14px
- **Placeholder color:** #91a0b3

### Icon
- **Search icon:** 16×16px, #718094
- **Clear icon:** 16×16px (on hover)

### Border States
| State | Border |
|-------|--------|
| Default | 1px solid #dee5ef |
| Hover | 1px solid #91a0b3 |
| Active | 1.5px solid #2d75e2 |
| Disabled | none (bg: #dee5ef) |
| Error | 1.5px solid #db3a3a |

---

## Usage Examples

### Basic Search

```tsx
import { SearchField } from '@syndigo/components';

<SearchField
  placeholder="Search products..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>
```

### With Clear Button

```tsx
<SearchField
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onClear={() => setSearchValue('')}
  showClearButton={true}
/>
```

### Full Width

```tsx
<SearchField
  fullWidth
  placeholder="Search all items..."
/>
```

### With Error

```tsx
<SearchField
  state="error"
  errorText="Search term too short"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>
```

---

## Accessibility

- Search icon provides visual context
- Input has appropriate `type="text"` 
- Clear button is keyboard accessible
- Error states include error message

---

## Do's and Don'ts

### Do's
- ✅ Use for filtering/searching data
- ✅ Provide meaningful placeholder text
- ✅ Include clear button for longer inputs
- ✅ Debounce search callbacks for performance

### Don'ts
- ❌ Don't use for regular text input
- ❌ Don't hide the search icon
- ❌ Don't use without a clear purpose

---

## Related Components

- [TextField](./text-field.md) - General text input
- [SelectField](./select-field.md) - Dropdown selection
