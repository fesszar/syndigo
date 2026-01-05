# Switcher

A segmented control / tab switcher with labeled options.

**Figma Source:** [Switcher](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22498-28939)

---

## Overview

Switcher is a **segmented control** that allows users to toggle between two or more mutually exclusive options. It functions like a set of radio buttons with a more visual treatment.

**Use cases:**
- View mode toggles (List/Grid)
- Filter options (All/Active/Archived)
- Content type selection
- Binary choices with labels

---

## Props

```typescript
interface SwitcherProps {
  /** Array of options */
  options: SwitcherOption[];
  /** Currently selected option id */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Switcher type */
  type?: 'primary' | 'secondary';
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label for the switch group */
  ariaLabel?: string;
}

interface SwitcherOption {
  id: string;
  label: string;
  disabled?: boolean;
}
```

---

## Switcher Types

| Type | Active Background | Active Text | Container BG |
|------|-------------------|-------------|--------------|
| `primary` | Blue (#2d75e2) | White | Light grey (#f7f9fb) |
| `secondary` | Light blue (#e7f1ff) + border | Black | White |

---

## Option States

| State | Background | Text Color |
|-------|------------|------------|
| `default` | transparent | Grey (#4d5c6e) |
| `active` (primary) | Blue (#2d75e2) | White |
| `active` (secondary) | Light blue (#e7f1ff) | Black |
| `hover` | Grey (#dee5ef) | Grey (#4d5c6e) |
| `disabled` | — | 50% opacity |

---

## Visual Specifications

### Container
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px
- **Padding:** 0 4px
- **Background (primary):** #f7f9fb
- **Background (secondary):** white

### Option
- **Height:** 26px
- **Padding:** 10px
- **Border radius:** 4px
- **Flex:** 1 1 0 (equal width)

### Typography
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 17px

---

## Usage Examples

### Basic Two Options (Primary)

```tsx
import { Switcher } from '@syndigo/components';

const [view, setView] = useState('list');

<Switcher
  options={[
    { id: 'list', label: 'List' },
    { id: 'grid', label: 'Grid' },
  ]}
  value={view}
  onChange={setView}
  type="primary"
/>
```

### Three Options (Secondary)

```tsx
const [filter, setFilter] = useState('all');

<Switcher
  options={[
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived' },
  ]}
  value={filter}
  onChange={setFilter}
  type="secondary"
/>
```

### With Disabled Option

```tsx
<Switcher
  options={[
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2', disabled: true },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### Fully Disabled

```tsx
<Switcher
  options={options}
  value={selected}
  onChange={setSelected}
  disabled
/>
```

---

## State Parity ✅

| Property | Default | Active (Primary) | Active (Secondary) | Hover |
|----------|---------|------------------|-------------------|-------|
| Background | transparent | #2d75e2 | #e7f1ff | #dee5ef |
| Border | none | none | 1px #91a0b3 | none |
| Text color | #4d5c6e | white | black | #4d5c6e |
| Cursor | pointer | pointer | pointer | pointer |

---

## Accessibility ✅

- `role="radiogroup"` on container
- `role="radio"` on each option
- `aria-checked` indicates selected state
- `aria-label` for screen reader description
- Keyboard navigation support
- Disabled state handling

---

## Do's and Don'ts

### Do's
- ✅ Use for mutually exclusive choices
- ✅ Keep option labels short
- ✅ Use consistent option count
- ✅ Provide clear visual feedback

### Don'ts
- ❌ Don't use for more than 4 options
- ❌ Don't use for non-exclusive choices (use checkboxes)
- ❌ Don't mix with other controls
- ❌ Don't use for navigation (use tabs)

---

## Related Components

- [Tabs](./tabs.md) - Content navigation
- [RadioGroup](./radio-group.md) - Form radio buttons
- [ToggleButton](./toggle-button.md) - On/off toggle
