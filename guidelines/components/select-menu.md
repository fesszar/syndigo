# SelectMenu

A dropdown menu component with selectable items supporting single and multi-select modes.

**Figma Source:** [Select Menu](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-27783)

---

## Overview

SelectMenu is a **full dropdown menu** with option items that support selection states, optional icons, and multi-select with checkboxes.

**Use cases:**
- Dropdown option lists
- Filter selections with multiple options
- Multi-select pickers
- Any selectable option list

---

## Props

### SelectMenu Props

```typescript
interface SelectMenuProps {
  /** Menu options */
  options: SelectMenuOption[];
  /** Selected value(s) */
  value?: string | string[];
  /** Multi-select mode */
  multiple?: boolean;
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Max height before scroll */
  maxHeight?: number;
}
```

### SelectMenuOption

```typescript
interface SelectMenuOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
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
- **Padding:** 7px
- **Shadow:** 0px 14px 18px rgba(77, 92, 110, 0.15)

### List Item States

| State | Background | Icon Color |
|-------|------------|------------|
| default | transparent | #718094 |
| hover/focused | #dee5ef | #4d5c6e |
| active/selected | #dee5ef | #4d5c6e |

### Item Dimensions
- **Height:** 28px
- **Padding:** 0 7px
- **Gap:** 10px
- **Icon size:** 16×16px
- **Checkbox size:** 17×17px

### Typography
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 14px
- **Color:** black

### Checkbox States
- **Unchecked:** white bg, 1.5px border #91a0b3
- **Checked:** #2d75e2 bg, white checkmark

---

## Usage Examples

### Single Select

```tsx
import { SelectMenu } from '@syndigo/components';

const [selected, setSelected] = useState('');

<SelectMenu
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  value={selected}
  onChange={(value) => setSelected(value as string)}
/>
```

### Multi-Select

```tsx
const [selected, setSelected] = useState<string[]>([]);

<SelectMenu
  multiple
  options={[
    { value: 'tag1', label: 'Tag 1' },
    { value: 'tag2', label: 'Tag 2' },
    { value: 'tag3', label: 'Tag 3' },
  ]}
  value={selected}
  onChange={(value) => setSelected(value as string[])}
/>
```

### With Icons

```tsx
<SelectMenu
  options={[
    { value: 'hash', label: 'Hash Filter', icon: <HashIcon /> },
    { value: 'pin', label: 'Pinned Items', icon: <PinIcon /> },
    { value: 'sort', label: 'Sort Order', icon: <SortIcon /> },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### With Disabled Options

```tsx
<SelectMenu
  options={[
    { value: 'active', label: 'Active Option' },
    { value: 'disabled', label: 'Disabled Option', disabled: true },
    { value: 'another', label: 'Another Option' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### With Max Height (Scrollable)

```tsx
<SelectMenu
  options={longOptionsList}
  value={selected}
  onChange={setSelected}
  maxHeight={150}
/>
```

---

## Keyboard Navigation

The SelectMenu component supports full keyboard navigation:

| Key | Action |
|-----|--------|
| `↓` Arrow Down | Move focus to next option |
| `↑` Arrow Up | Move focus to previous option |
| `Enter` | Select focused option |
| `Space` | Select focused option |
| `Home` | Move focus to first option |
| `End` | Move focus to last option |
| `Escape` | Close menu (when paired with trigger) |

### Implementation Notes

```tsx
// Keyboard handling is built into the component
// When using with a trigger, handle Escape in parent:
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    setMenuOpen(false);
  }
};
```

---

## Accessibility

- `role="listbox"` on container
- `role="option"` on items
- `aria-selected` for selection state
- `aria-disabled` for disabled items
- `aria-multiselectable` for multi-select mode
- Focus management for keyboard navigation

---

## Do's and Don'ts

### Do's
- ✅ Use for option selection lists
- ✅ Use `multiple` for multi-select
- ✅ Set reasonable `maxHeight` for long lists
- ✅ Provide clear option labels

### Don'ts
- ❌ Don't use for navigation menus (use Menu)
- ❌ Don't use for simple triggers (use Selector)
- ❌ Don't use for form fields (use SelectBox)
- ❌ Don't forget keyboard navigation testing

---

## Related Components

- [Selector](./selector.md) - Dropdown trigger button
- [SelectBox](./select-box.md) - Form select input
- [Checkbox](./checkbox.md) - Standalone checkbox
- [Menu](./menu.md) - Navigation/action menus
