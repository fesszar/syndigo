# ProgressBar

A progress indicator component supporting linear bar and circular ring variants.

**Figma Source:** [Progress Bar](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22492-19788)

---

## Overview

The ProgressBar displays determinate progress using either a horizontal bar or circular ring. Supports multiple tones for status indication.

---

## Props

```typescript
interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Minimum value (default: 0) */
  min?: number;
  /** Visual type: 'bar' | 'circle' */
  type?: ProgressBarType;
  /** Color tone: 'default' | 'success' | 'critical' | 'warning' */
  tone?: ProgressBarTone;
  /** Size for circle type (default: 48) */
  size?: number;
  /** Height for bar type (default: 14) */
  height?: number;
  /** Show percentage label (circle only) */
  showLabel?: boolean;
  /** Accessible label */
  ariaLabel?: string;
}
```

---

## Visual Specifications

### Bar Type
- **Height:** 14px (default)
- **Border radius:** 24px (pill)
- **Track color:** #dee5ef

### Circle Type
- **Size:** 48×48px (default)
- **Stroke width:** 4px
- **Track color:** #dee5ef

### Tone Colors
| Tone | Color | Usage |
|------|-------|-------|
| `default` | #2d75e2 (blue) | Standard progress |
| `success` | #0e8662 (green) | Successful completion |
| `critical` | #db3a3a (red) | Error/failure state |
| `warning` | #f58319 (orange) | Warning state |

---

## Usage Examples

### Basic Bar

```tsx
import { ProgressBar } from '@syndigo/components';

<ProgressBar value={50} />
```

### Circle Progress

```tsx
<ProgressBar type="circle" value={75} />
```

### With Label

```tsx
<ProgressBar type="circle" value={60} showLabel />
```

### Status Tones

```tsx
<ProgressBar value={100} tone="success" />
<ProgressBar value={30} tone="warning" />
<ProgressBar value={50} tone="critical" />
```

### Custom Size

```tsx
// Custom bar height
<ProgressBar value={40} height={8} />

// Custom circle size
<ProgressBar type="circle" value={60} size={64} />
```

### Custom Range

```tsx
<ProgressBar value={5} min={0} max={10} />
```

---

## Accessibility

The component includes proper ARIA attributes:
- `role="progressbar"`
- `aria-valuenow` - Current value
- `aria-valuemin` - Minimum value
- `aria-valuemax` - Maximum value
- `aria-label` - Descriptive label

```tsx
<ProgressBar 
  value={75} 
  ariaLabel="Upload progress: 75% complete" 
/>
```

---

## Animation

The component includes a subtle transition animation (0.3s ease-in-out) when the value changes. This is built into the DS spec.

---

## Do's and Don'ts

### Do's
- ✅ Use for determinate progress (known completion %)
- ✅ Use appropriate tone for context (success on complete)
- ✅ Provide accessible labels for screen readers
- ✅ Use circle type for compact spaces

### Don'ts
- ❌ Don't use for indeterminate progress (use Spinner)
- ❌ Don't mix tones inconsistently
- ❌ Don't use without meaningful value

---

## Related Components

- [Spinner](./spinner.md) - For indeterminate loading
- [StatusBadge](./status-badge.md) - For status indicators
