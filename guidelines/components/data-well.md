# DataWell Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`, node `22480:10172`

---

## Overview

The `<DataWell>` component displays a labeled data value in a bordered card format. It supports multiple sizes, states, optional status indicators, tooltip triggers, and action buttons.

## API

```tsx
interface DataWellProps {
  label: string;
  value: string | number;
  size?: 'large' | 'small';
  showStatusIndicator?: boolean;
  statusType?: 'default' | 'success' | 'warning' | 'critical' | 'info';
  showTooltipTrigger?: boolean;
  tooltipContent?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
```

---

## Props

### label (required)
The label text displayed above the value.

### value (required)
The main value to display. Can be a string or number.

### size (default: 'large')
Size variant affecting typography and height.

| Size | Height | Value Font Size | Value Line Height |
|------|--------|-----------------|-------------------|
| `large` | 66px | 16px | 20px |
| `small` | 60px | 12px | 14px |

### showStatusIndicator / statusType
Shows a colored dot next to the value.

| Status Type | Color | Hex |
|-------------|-------|-----|
| `default` | Blue | #2d75e2 |
| `success` | Green | #0e8662 |
| `warning` | Orange | #f58319 |
| `critical` | Red | #db3a3a |
| `info` | Blue | #2d75e2 |

### showTooltipTrigger
Shows an info icon next to the label for additional context.

### actionLabel / onActionClick
Shows an action link with arrow icon on the right side.

### onClick / isActive
Makes the card clickable/selectable with active state styling.

---

## Figma → Props Mapping

| Figma Variant | Component Props |
|---------------|-----------------|
| `Size=Large, State=Default` | `size="large"` |
| `Size=Large, State=Hover` | `size="large"` (hover auto) |
| `Size=Large, State=Active` | `size="large" isActive` |
| `Size=Small, State=Default` | `size="small"` |
| `Size=Small, State=Hover` | `size="small"` (hover auto) |
| `Size=Small, State=Active` | `size="small" isActive` |

### Figma Boolean Props

| Figma Prop | Component Prop |
|------------|----------------|
| `statusIndicator=true` | `showStatusIndicator` |
| `tooltipTrigger=true` | `showTooltipTrigger` |
| `button=true` | `actionLabel="..."` |

---

## State Styles

| State | Background | Border |
|-------|------------|--------|
| Default | white | `#dee5ef` (stroke/light) |
| Hover | white | `#91a0b3` (stroke/medium) |
| Active | `#e7f1ff` (blue/100) | `#2d75e2` (system/focus) |

---

## Usage Examples

### Basic Data Well

```tsx
import { DataWell } from '@syndigo/design-system';

<DataWell label="Total Products" value="1,234" />
```

### With Status Indicator

```tsx
<DataWell
  label="Failed Items"
  value={5}
  showStatusIndicator
  statusType="critical"
/>
```

### With Tooltip

```tsx
<DataWell
  label="Processing Time"
  value="2.5s"
  showTooltipTrigger
  tooltipContent="Average time to process a single item"
/>
```

### With Action Button

```tsx
<DataWell
  label="Pending Reviews"
  value={42}
  actionLabel="View all"
  onActionClick={() => navigate('/reviews')}
/>
```

### Selectable (for filters/dashboards)

```tsx
function FilterWells({ selected, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <DataWell
        label="All Items"
        value={100}
        onClick={() => onSelect('all')}
        isActive={selected === 'all'}
      />
      <DataWell
        label="With Errors"
        value={5}
        showStatusIndicator
        statusType="critical"
        onClick={() => onSelect('errors')}
        isActive={selected === 'errors'}
      />
    </div>
  );
}
```

### Small Size

```tsx
<DataWell
  label="SKUs"
  value="523"
  size="small"
/>
```

---

## Visual Specifications

### Container
- Padding: 12px
- Border radius: 4px
- Border: 1px solid (varies by state)

### Label
- Font: 12px medium
- Color: `#4d5c6e` (text/secondary)
- Gap to value: 8px

### Value (Large)
- Font: 16px semibold
- Line height: 20px
- Color: black (text/primary)

### Value (Small)
- Font: 12px semibold
- Line height: 14px
- Color: black (text/primary)

### Status Dot
- Size: 9px circle
- Gap to value text: 8px

### Tooltip Icon
- Size: 14px
- Color: `#718094` (icon/secondary)
- Gap to label: 4px

### Action Button
- Font: 12px semibold
- Color: `#2d75e2` (text/link)
- Icon: 16px arrow-right

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use for dashboard metrics
<DataWell label="Revenue" value="$12,345" />

// Use status indicators for status-based values
<DataWell
  label="Error Count"
  value={5}
  showStatusIndicator
  statusType="critical"
/>

// Use small size for compact layouts
<DataWell label="Items" value="42" size="small" />
```

### ❌ Don't

```tsx
// Don't use for long-form content
<DataWell label="Description" value="This is a very long..." />

// Don't mix status types arbitrarily
<DataWell label="Success" value={10} statusType="critical" />
```

---

## Accessibility

- Interactive wells have `role="button"` and `tabIndex={0}`
- Tooltip triggers should have descriptive `aria-label`
- Action buttons are keyboard accessible
- Status colors should not be the only indicator (use labels too)
