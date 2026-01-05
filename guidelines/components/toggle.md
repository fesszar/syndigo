# Toggle

A boolean toggle switch (on/off control).

**Figma Source:** [Toggle](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22500-29646)

---

## ⚠️ Toggle vs Switcher

| Component | Use Case | Options |
|-----------|----------|---------|
| **Toggle** | Binary on/off state | 2 states (checked/unchecked) |
| **Switcher** | Select between multiple options | 2+ named options |

### When to use Toggle
- Enable/disable a setting
- Turn a feature on or off
- Boolean preferences (yes/no)

### When to use Switcher
- Switch between view modes (List/Grid)
- Select a category or filter
- Choose between named alternatives

**Rule:** If the control has named options beyond on/off, use Switcher. If it's a simple boolean toggle, use Toggle.

---

## Overview

Toggle provides a **visual on/off switch** for binary states. It can include an optional label, required indicator, and subtext.

**Use cases:**
- Feature toggles
- Settings preferences
- Enable/disable options
- Notification controls

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked (on) state |
| `onChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | - | Optional label text |
| `subtext` | `string` | - | Optional subtext below label |
| `required` | `boolean` | `false` | Show required asterisk |
| `ariaLabel` | `string` | - | Accessible name |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional styles |

---

## Visual States

| State | Background | Knob Position |
|-------|------------|---------------|
| Unchecked (off) | text/secondary (#4d5c6e) | Left |
| Checked (on) | button/primary (#2d75e2) | Right |
| Disabled | text/tertiary (#91a0b3) | Left |

---

## Visual Specifications

### Track
- **Width:** 28.8px
- **Height:** 16px
- **Border radius:** 16px (pill shape)
- **Padding:** 1.6px

### Knob
- **Size:** 12.8px (circle)
- **Color:** white
- **Animation:** 0.15s ease transition

### Label
- **Typography:** 12px medium, text/secondary
- **Required asterisk:** system/critical (#db3a3a)
- **Subtext:** 11px medium, text/secondary

---

## Usage Examples

### Basic Toggle

```tsx
import { Toggle } from '@syndigo/components';

const [enabled, setEnabled] = useState(false);

<Toggle
  checked={enabled}
  onChange={setEnabled}
/>
```

### With Label

```tsx
<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>
```

### With Label and Required

```tsx
<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Accept terms"
  required
/>
```

### With Label and Subtext

```tsx
<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Dark mode"
  subtext="Enable dark theme across the application"
/>
```

### Disabled

```tsx
<Toggle
  checked={false}
  disabled
  label="Locked setting"
/>
```

---

## Accessibility

- `role="switch"` for proper semantics
- `aria-checked` reflects current state
- `aria-disabled` for disabled state
- `aria-label` for accessible name (falls back to label)
- Keyboard support: Space and Enter to toggle
- `tabIndex` managed (disabled = -1)

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Focus the toggle |
| Space | Toggle the state |
| Enter | Toggle the state |

---

## Do's and Don'ts

### Do's
- ✅ Use for binary on/off settings
- ✅ Provide a clear label describing the setting
- ✅ Use subtext for additional context
- ✅ Place label to the right of the toggle

### Don'ts
- ❌ Don't use for multiple named options (use Switcher)
- ❌ Don't use without a label in complex forms
- ❌ Don't change the meaning of checked/unchecked unexpectedly
- ❌ Don't merge with Switcher component

---

## Related Components

- [Switcher](./switcher.md) - For selecting between named options
- [Checkbox](./checkbox.md) - Alternative for form submissions
- [RadioGroup](./radio-group.md) - For mutually exclusive options
