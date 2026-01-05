# SelectBox

A form-like picker with search functionality and selectable rows for transfer list patterns.

**Figma Source:** [Select Box](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-28130)

---

## Overview

SelectBox is a **searchable picker** with row items that support add/remove actions. It's designed for transfer list patterns where users pick items from a list.

**Use cases:**
- Recipient selection
- Transfer lists (add/remove items)
- Searchable item pickers
- Multi-select with visual feedback

---

## Props

### SelectBox Props

```typescript
interface SelectBoxProps {
  /** Available options */
  options: SelectBoxOption[];
  /** Selected values */
  value?: string[];
  /** Row type (add shows plus, remove shows X) */
  rowType?: 'add' | 'remove';
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
}
```

### SelectBoxOption

```typescript
interface SelectBoxOption {
  /** Option value */
  value: string;
  /** Primary label */
  label: string;
  /** Secondary label */
  secondaryLabel?: string;
  /** Whether disabled */
  disabled?: boolean;
}
```

---

## Visual Specifications

### Container
- **Background:** white
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px

### Search Section
- **Background:** #f7f9fb
- **Padding:** 10px 13px
- **Input height:** 34px
- **Input shadow:** 0px 1px 3px rgba(0, 0, 0, 0.1)

### Row States

| State | Background | Border |
|-------|------------|--------|
| default | white | #dee5ef |
| hover | #f7f9fb | #dee5ef |

### Row Dimensions
- **Height:** 40px
- **Padding:** 7px 10px
- **Border radius:** 4px
- **Gap between rows:** 5px

### Row Types

| Type | Icon | Icon Color |
|------|------|------------|
| add | Plus (+) | #2d75e2 (blue) |
| remove | X | #4d5c6e (grey) |

### Typography
- **Primary label:** Inter Semi Bold, 11px, black
- **Secondary label:** Inter Medium, 9px, #4d5c6e
- **Search placeholder:** Inter Medium, 12px, #91a0b3

---

## Usage Examples

### Basic Usage

```tsx
import { SelectBox } from '@syndigo/components';

<SelectBox
  options={[
    { value: 'amazon', label: 'Amazon US' },
    { value: 'walmart', label: 'Walmart' },
    { value: 'target', label: 'Target' },
  ]}
  searchPlaceholder="Search all recipients"
  onItemClick={(option) => console.log('Selected:', option)}
/>
```

### Add Mode (Default)

```tsx
const [selected, setSelected] = useState<string[]>([]);

<SelectBox
  options={availableOptions}
  value={selected}
  rowType="add"
  onChange={setSelected}
/>
```

### Remove Mode

```tsx
<SelectBox
  options={selectedOptions}
  value={selected}
  rowType="remove"
  onChange={setSelected}
/>
```

### With Secondary Labels

```tsx
<SelectBox
  options={[
    { value: 'amazon', label: 'Amazon US', secondaryLabel: 'Marketplace' },
    { value: 'walmart', label: 'Walmart', secondaryLabel: 'Retail' },
  ]}
  onItemClick={handleSelect}
/>
```

### With Drag Handles

```tsx
<SelectBox
  options={options}
  showDragHandle
  rowType="remove"
  onItemClick={handleRemove}
/>
```

### Transfer List Pattern

```tsx
function TransferList() {
  const [available, setAvailable] = useState(allOptions);
  const [selected, setSelected] = useState([]);

  const handleAdd = (option) => {
    setSelected([...selected, option]);
    setAvailable(available.filter(o => o.value !== option.value));
  };

  const handleRemove = (option) => {
    setAvailable([...available, option]);
    setSelected(selected.filter(o => o.value !== option.value));
  };

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <SelectBox
        options={available}
        rowType="add"
        onItemClick={handleAdd}
        searchPlaceholder="Search available"
      />
      <SelectBox
        options={selected}
        rowType="remove"
        showDragHandle
        onItemClick={handleRemove}
      />
    </div>
  );
}
```

---

## State Styling Parity

Verified against Figma design:

| Element | Property | Value | ✓ |
|---------|----------|-------|---|
| Container | background | white | ✅ |
| Container | border | 1px solid #dee5ef | ✅ |
| Search bg | background | #f7f9fb | ✅ |
| Row default | background | white | ✅ |
| Row hover | background | #f7f9fb | ✅ |
| Add icon | color | #2d75e2 | ✅ |
| Remove icon | color | #4d5c6e | ✅ |
| Primary text | font | 11px Semi Bold | ✅ |
| Secondary text | font | 9px Medium | ✅ |

---

## Accessibility

- `role="listbox"` on container
- `role="option"` on rows
- `aria-disabled` for disabled items
- Search input with `aria-label`
- Keyboard navigation support

---

## Do's and Don'ts

### Do's
- ✅ Use for transfer list patterns
- ✅ Use `add` type for source list
- ✅ Use `remove` type for destination list
- ✅ Provide search for long lists

### Don'ts
- ❌ Don't use for simple dropdowns (use SelectMenu)
- ❌ Don't use for form fields (use Select input)
- ❌ Don't mix add/remove types in same box
- ❌ Don't use without clear add/remove affordance

---

## Related Components

- [SelectMenu](./select-menu.md) - Dropdown menu
- [Selector](./selector.md) - Dropdown trigger
- [Checkbox](./checkbox.md) - For multi-select menus
