# Radio

A radio input component for single-selection from a group of options.

**Figma Source:** [Radio Toggle](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-24263)

---

## Overview

Radio components allow users to select exactly one option from a set. Use `Radio` for individual inputs or `RadioGroup` for managed groups.

---

## Components

### Radio
Single radio input with optional label.

### RadioGroup
A group of radio inputs with shared state and name.

---

## Props

### Radio Props

```typescript
interface RadioProps {
  /** Radio name (for grouping) */
  name?: string;
  /** Radio value */
  value?: string;
  /** Whether radio is checked */
  checked?: boolean;
  /** Whether radio is disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Change handler */
  onChange?: (value: string) => void;
}
```

### RadioGroup Props

```typescript
interface RadioGroupProps {
  /** Group name (required) */
  name: string;
  /** Currently selected value */
  value?: string;
  /** Radio options */
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
}
```

---

## Visual Specifications

### States

| State | Fill | Border | Inner Dot |
|-------|------|--------|-----------|
| default | white | #91a0b3 | none |
| checked | #2d75e2 | #2d75e2 | white |
| disabled | #dee5ef | #91a0b3 | none |

### Dimensions
- **Radio size:** 17×17px
- **Inner dot:** 7×7px (29.41% of container)
- **Gap (radio to label):** 8px

### Typography
- **Label font:** Inter Medium
- **Label size:** 12px
- **Label line-height:** 17px
- **Label color:** #4d5c6e
- **Disabled color:** #91a0b3

---

## Usage Examples

### Single Radio

```tsx
import { Radio } from '@syndigo/components';

<Radio
  name="option"
  value="a"
  label="Option A"
  checked={selected === 'a'}
  onChange={setSelected}
/>
```

### Radio Group (Recommended)

```tsx
import { RadioGroup } from '@syndigo/components';

<RadioGroup
  name="size"
  value={selectedSize}
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
  onChange={setSelectedSize}
/>
```

### Horizontal Layout

```tsx
<RadioGroup
  name="alignment"
  value={alignment}
  direction="horizontal"
  options={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ]}
  onChange={setAlignment}
/>
```

### With Disabled Option

```tsx
<RadioGroup
  name="plan"
  value={plan}
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
  onChange={setPlan}
/>
```

### Without Label

```tsx
<Radio
  name="toggle"
  value="on"
  checked={isOn}
  onChange={() => setIsOn(true)}
/>
```

---

## Accessibility

### Radio
- Native `<input type="radio">` for form support
- `aria-checked` for checked state
- `aria-disabled` for disabled state
- Keyboard navigation (Space/Enter to select)
- Focus visible indicator

### RadioGroup
- `role="radiogroup"` container
- `aria-label` for group name
- Arrow key navigation within group

```tsx
// Keyboard navigation
// Space/Enter: Select focused radio
// Arrow keys: Navigate between options (when focused)
```

---

## States Parity

| Figma State | Component Prop | Visual Match |
|-------------|----------------|--------------|
| Default | `checked={false}` | ✅ |
| Active | `checked={true}` | ✅ |
| Disabled | `disabled={true}` | ✅ |

---

## Do's and Don'ts

### Do's
- ✅ Use RadioGroup for multiple options
- ✅ Always provide labels for accessibility
- ✅ Use consistent naming within groups
- ✅ Pre-select a default when appropriate

### Don'ts
- ❌ Don't use for multi-select (use Checkbox)
- ❌ Don't use without labels unless icons are clear
- ❌ Don't mix horizontal/vertical in same group
- ❌ Don't have more than 5-7 options (use Select)

---

## Related Components

- [Checkbox](./checkbox.md) - Multi-select
- [Toggle](./toggle.md) - On/off switches
- [Select](./select.md) - Dropdown selection
