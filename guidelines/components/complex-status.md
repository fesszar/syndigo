# ComplexStatus Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`, node `22480:9930`

---

## Overview

The `<ComplexStatus>` component displays a summary card showing multiple status counts with colored indicator dots. It's used to show aggregate status information at a glance.

## API

```tsx
interface StatusItem {
  type: ComplexStatusType;
  count: number;
  label: string;
}

interface ComplexStatusProps {
  items: StatusItem[];
  levels?: 1 | 2 | 3 | 4;
  className?: string;
  style?: CSSProperties;
}
```

---

## Status Types

| Type | Dot Color | Hex Code | Use Case |
|------|-----------|----------|----------|
| `success` | Green | `#0e8662` | Completed/successful items |
| `partialSuccess` | Orange | `#f58319` | Partially completed items |
| `processing` | Blue | `#2d75e2` | In-progress items |
| `error` | Red | `#db3a3a` | Failed items |

---

## Levels (Layout Variations)

| Levels | Layout | Height | Description |
|--------|--------|--------|-------------|
| `1` | Single centered | 67px | One status item |
| `2` | Single row | 67px | Two items side by side |
| `3` | Mixed | 130px | Two items top, one bottom |
| `4` | 2×2 Grid | 130px | Four items in grid |

---

## Figma → Props Mapping

| Figma Property | Component Prop | Values |
|----------------|----------------|--------|
| `Levels=1` | `levels={1}` | Single item |
| `Levels=2` | `levels={2}` | Two items |
| `Levels=3` | `levels={3}` | Three items |
| `Levels=4` | `levels={4}` | Four items |

---

## Usage Examples

### Single Status

```tsx
import { ComplexStatus } from '@syndigo/design-system';

function SingleStatus() {
  return (
    <ComplexStatus
      items={[
        { type: 'success', count: 38, label: 'Success' }
      ]}
      levels={1}
    />
  );
}
```

### Two Statuses

```tsx
function TwoStatuses() {
  return (
    <ComplexStatus
      items={[
        { type: 'success', count: 38, label: 'Success' },
        { type: 'partialSuccess', count: 9, label: 'Partial Success' }
      ]}
      levels={2}
    />
  );
}
```

### Full Status Dashboard (4 Items)

```tsx
function FullDashboard() {
  return (
    <ComplexStatus
      items={[
        { type: 'success', count: 38, label: 'Success' },
        { type: 'partialSuccess', count: 9, label: 'Partial Success' },
        { type: 'processing', count: 23, label: 'Processing' },
        { type: 'error', count: 18, label: 'Error' }
      ]}
      levels={4}
    />
  );
}
```

### Dynamic from Data

```tsx
function StatusFromData({ stats }) {
  const items = [
    { type: 'success' as const, count: stats.success, label: 'Success' },
    { type: 'error' as const, count: stats.failed, label: 'Error' },
    { type: 'processing' as const, count: stats.pending, label: 'Processing' },
    { type: 'partialSuccess' as const, count: stats.partial, label: 'Partial Success' },
  ];

  return <ComplexStatus items={items} levels={4} />;
}
```

---

## Visual Specifications

### Container
- Background: white (`--color-surface-white`)
- Border: 1px solid `#dee5ef` (`--color-stroke-light`)
- Border radius: 4px
- Shadow: `0px 14px 18px rgba(77, 92, 110, 0.15)`

### Status Item
- Count: 16px medium weight, primary text color
- Dot: 8px circle with status-specific color
- Label: 12px medium weight, secondary text color (`#4d5c6e`)
- Gap between dot and label: 6px

### Dividers
- Vertical divider between items: 1px, 34px height
- Horizontal divider between rows: 1px full width
- Color: `#dee5ef` (`--color-stroke-light`)

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use consistent status types
<ComplexStatus
  items={[
    { type: 'success', count: 10, label: 'Completed' },
    { type: 'error', count: 2, label: 'Failed' }
  ]}
/>

// Match levels to items length
<ComplexStatus items={twoItems} levels={2} />
```

### ❌ Don't

```tsx
// Don't invent new status types
<ComplexStatus
  items={[
    { type: 'warning', count: 5, label: 'Warning' } // ❌ Not a valid type
  ]}
/>

// Don't use more levels than items
<ComplexStatus items={oneItem} levels={4} /> // ❌ Will show empty slots
```

---

## Accessibility

- Status dots use color only; consider adding aria-labels for screen readers
- Ensure sufficient color contrast between dots and background
- Labels should be descriptive enough to understand without color

---

## Related Components

- `StatusBadge` - For inline status indicators
- `ProgressBar` - For showing progress toward completion
