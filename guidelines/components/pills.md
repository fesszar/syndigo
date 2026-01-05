# Pill

A selectable chip/tag component for filtering, selections, and categorization.

**Figma Source:** [Pills](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-23742)

---

## Overview

Pills are compact, interactive elements used for:
- Filter selections
- Tag displays
- Category chips
- Toggle options

---

## Props

```typescript
interface PillProps {
  /** Pill label text */
  label?: string;
  /** Visual state */
  state?: PillState;
  /** Whether pill is selected */
  selected?: boolean;
  /** Whether pill is disabled */
  disabled?: boolean;
  /** Icon element */
  icon?: ReactNode;
  /** Icon position: 'left' | 'right' | 'none' | 'iconOnly' */
  iconPosition?: PillIconPosition;
  /** Show remove button */
  removable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Remove handler */
  onRemove?: () => void;
}
```

---

## Visual Specifications

### States

| State | Background | Border | Text | Icon |
|-------|------------|--------|------|------|
| default | white | 1px #dee5ef | black | #718094 |
| hover | #f7f9fb | 1px #91a0b3 | black | #718094 |
| active | #2d75e2 | none | white | white |
| disabled | #dee5ef | none | #91a0b3 | #91a0b3 |

### Dimensions
- **Height:** 30px (with padding)
- **Padding:** 8px
- **Gap:** 4px (between elements)
- **Border radius:** 4px
- **Icon size:** 12×12px

### Typography
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 14px

---

## Usage Examples

### Basic Pill

```tsx
import { Pill } from '@syndigo/components';

<Pill label="Category" onClick={() => handleSelect()} />
```

### Selected State

```tsx
<Pill 
  label="Active Filter" 
  selected={true}
  onClick={() => toggleSelection()}
/>
```

### With Icon Positions

```tsx
// Icon on left (default)
<Pill label="Filter" iconPosition="left" />

// Icon on right
<Pill label="Filter" iconPosition="right" />

// No icon
<Pill label="Tag" iconPosition="none" />

// Icon only
<Pill iconPosition="iconOnly" />
```

### Custom Icon

```tsx
<Pill 
  label="Downloads"
  icon={<DownloadIcon />}
  iconPosition="left"
/>
```

### Removable Pill

```tsx
<Pill 
  label="Removable Tag"
  removable
  onRemove={() => handleRemove()}
/>
```

### Disabled State

```tsx
<Pill 
  label="Disabled"
  disabled
/>
```

### Filter Group Example

```tsx
function FilterGroup() {
  const [selected, setSelected] = useState<string[]>([]);
  
  const filters = ['All', 'Active', 'Pending', 'Completed'];
  
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {filters.map(filter => (
        <Pill
          key={filter}
          label={filter}
          selected={selected.includes(filter)}
          onClick={() => toggleFilter(filter)}
        />
      ))}
    </div>
  );
}
```

---

## Selection State Parity

The component maintains selection state parity through:

1. **`selected` prop** - Boolean to control active state
2. **`state` prop** - Can override visual state directly
3. **State priority:** `disabled` > `selected` > `state` prop

```tsx
// These are equivalent for visual appearance:
<Pill label="Active" selected={true} />
<Pill label="Active" state="active" />

// Disabled takes priority
<Pill label="Disabled" selected={true} disabled={true} />
// ^ Renders as disabled, not active
```

---

## Accessibility

- `role="button"` for keyboard interaction
- `tabIndex` for focus management
- `aria-pressed` for toggle state
- `aria-disabled` for disabled state
- Enter/Space key support

---

## Do's and Don'ts

### Do's
- ✅ Use for filter selections
- ✅ Use for removable tags
- ✅ Maintain consistent icon positions within a group
- ✅ Use selected state for active filters

### Don'ts
- ❌ Don't use for primary actions (use Button)
- ❌ Don't mix icon positions in same group
- ❌ Don't use long labels (truncate if needed)
- ❌ Don't use for navigation

---

## Related Components

- [Tag](./tag.md) - Non-interactive labels
- [Button](./button.md) - Primary actions
- [Checkbox](./checkbox.md) - Multi-select in forms
