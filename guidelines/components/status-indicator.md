# StatusIndicator

A pill-shaped status indicator with colored dot and label.

**Figma Source:** [Status Indicator](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22496-28818)

---

## Overview

StatusIndicator is a **pill-shaped badge** with a colored dot and text label. It communicates the status of an item, process, or entity.

**Use cases:**
- Item status (active, inactive, pending)
- Process state (success, error, warning)
- Entity status indicators in tables/lists

---

## Props

```typescript
interface StatusIndicatorProps {
  /** Status type */
  type?: StatusIndicatorType;
  /** Label text */
  label: string;
  /** Hide label (show only dot) */
  hideLabel?: boolean;
}

type StatusIndicatorType = 'default' | 'neutral' | 'warning' | 'critical' | 'success';
```

---

## Status Types (FROM DESIGN SYSTEM)

**IMPORTANT:** Do NOT invent new status types. These are the only valid types from the Design System:

| Type | Dot Color | Hex | Use For |
|------|-----------|-----|---------|
| `default` | Blue | #2d75e2 | Primary/default status |
| `neutral` | Grey | #718094 | Informational/neutral |
| `warning` | Orange | #f58319 | Warning conditions |
| `critical` | Red | #db3a3a | Errors/critical issues |
| `success` | Green | #0e8662 | Success states |

---

## Visual Specifications

### Container
- **Background:** white
- **Border:** 1px solid #dee5ef
- **Border radius:** 24px (pill shape)
- **Padding:** 5px 10px
- **Gap:** 8px

### Dot
- **Size:** 9×9px
- **Shape:** Circle (50% border-radius)
- **Color:** Per type (see table above)

### Label
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 14px
- **Color:** #4d5c6e

---

## Usage Examples

### Default Status

```tsx
import { StatusIndicator } from '@syndigo/components';

<StatusIndicator type="default" label="Active" />
```

### All Status Types

```tsx
<StatusIndicator type="default" label="In Progress" />
<StatusIndicator type="neutral" label="Inactive" />
<StatusIndicator type="warning" label="Pending Review" />
<StatusIndicator type="critical" label="Error" />
<StatusIndicator type="success" label="Complete" />
```

### Dot Only (Hidden Label)

```tsx
<StatusIndicator type="success" label="Complete" hideLabel />
```

### In a Table Row

```tsx
<tr>
  <td>Item Name</td>
  <td>
    <StatusIndicator type="success" label="Published" />
  </td>
</tr>
```

---

## Do NOT Invent Status Types

The following are **NOT** valid and should **NOT** be added:

```tsx
// ❌ WRONG - Do not invent new types
<StatusIndicator type="info" label="..." />
<StatusIndicator type="pending" label="..." />
<StatusIndicator type="active" label="..." />
<StatusIndicator type="error" label="..." />
```

Use the DS-approved types instead:

```tsx
// ✅ CORRECT - Use approved types
<StatusIndicator type="default" label="Info" />
<StatusIndicator type="warning" label="Pending" />
<StatusIndicator type="default" label="Active" />
<StatusIndicator type="critical" label="Error" />
```

---

## Accessibility

- `role="status"` on container
- `aria-hidden="true"` on decorative dot
- Semantic label text for screen readers

---

## Do's and Don'ts

### Do's
- ✅ Use only DS-approved status types
- ✅ Use descriptive labels
- ✅ Match type to semantic meaning
- ✅ Use consistently across the app

### Don'ts
- ❌ Don't invent new status types
- ❌ Don't use colors outside the DS palette
- ❌ Don't use for decorative purposes
- ❌ Don't use without meaningful label

---

## Related Components

- [Badge](./badge.md) - Notification badges
- [Tag](./tag.md) - Categorization tags
- [Pill](./pill.md) - Selection pills
