# TogglePills

A pill-based toggle group for single-select options.

**Figma Source:** [Toggle Pills](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22504-29766)

---

## Overview

TogglePills provides a **visual pill-based selector** for choosing one option from a group. Each pill can be active, default, or disabled.

**Use cases:**
- Filter selection
- View mode switching
- Category selection
- Quick option toggles

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `TogglePillOption[]` | required | Array of pill options |
| `value` | `string \| null` | required | Currently selected option id |
| `onChange` | `(value: string \| null) => void` | required | Change handler |
| `disabled` | `boolean` | `false` | Disabled state for entire group |
| `allowDeselect` | `boolean` | `false` | Allow deselection |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional styles |
| `ariaLabel` | `string` | - | Accessible group label |

### TogglePillOption

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display label |
| `disabled` | `boolean` | Disabled state for this option |

---

## Pill States

| State | Background | Text Color |
|-------|------------|------------|
| Active | button/primary (#2d75e2) | white |
| Default | surface/light (#f7f9fb) | text/secondary (#4d5c6e) |
| Disabled | surface/light (#f7f9fb) | text/tertiary (#91a0b3) |
| Disabled + Active | surface/medium (#dee5ef) | text/tertiary (#91a0b3) |

---

## Visual Specifications

### Container
- **Padding:** 4px
- **Border radius:** 4px
- **Background:** surface/light (#f7f9fb)
- **Border:** 1px solid stroke/medium (default) or stroke/light (disabled)

### Individual Pills
- **Height:** 26px
- **Padding:** 10px
- **Border radius:** 4px
- **Typography:** 12px medium

---

## Usage Examples

### Basic Usage

```tsx
import { TogglePills } from '@syndigo/components';

const [selected, setSelected] = useState<string | null>('option1');

<TogglePills
  options={[
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### With Deselection Allowed

```tsx
<TogglePills
  options={[
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ]}
  value={filter}
  onChange={setFilter}
  allowDeselect
/>
```

### With Disabled Options

```tsx
<TogglePills
  options={[
    { id: 'view1', label: 'View 1' },
    { id: 'view2', label: 'View 2', disabled: true },
    { id: 'view3', label: 'View 3' },
  ]}
  value={view}
  onChange={setView}
/>
```

### Entire Group Disabled

```tsx
<TogglePills
  options={options}
  value={selected}
  onChange={setSelected}
  disabled
/>
```

---

## Selection Behavior

| Behavior | Description |
|----------|-------------|
| Single-select | Only one pill can be active at a time |
| Click active pill | No change (unless `allowDeselect` is true) |
| Click inactive pill | Selects it, deselects previous |
| `allowDeselect=true` | Clicking active pill sets value to null |

**Note:** Selection behavior is controlled via props, not invented logic.

---

## Accessibility

- `role="radiogroup"` on container
- `role="radio"` on each pill
- `aria-checked` reflects selection state
- `aria-disabled` for disabled state
- Keyboard support: Space and Enter to select

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Focus next/previous pill |
| Space | Select focused pill |
| Enter | Select focused pill |

---

## Do's and Don'ts

### Do's
- ✅ Use for single-select scenarios
- ✅ Keep option labels concise
- ✅ Provide meaningful accessible labels
- ✅ Use consistent pill counts (2-5 recommended)

### Don'ts
- ❌ Don't use for multi-select (use Checkbox group)
- ❌ Don't use for boolean on/off (use Toggle)
- ❌ Don't invent selection logic beyond props
- ❌ Don't exceed 5+ options (consider dropdown)

---

## Related Components

- [Toggle](./toggle.md) - Binary on/off switch
- [Switcher](./switcher.md) - Segmented control alternative
- [Pill](./pill.md) - Individual pill component
