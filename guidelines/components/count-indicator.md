# CountIndicator Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`, node `22480:9961`

---

## Overview

The `<CountIndicator>` component displays a numeric badge or counter. It supports multiple color variants and contrast levels for different use cases.

## API

```tsx
interface CountIndicatorProps {
  count: number;
  max?: number;
  type?: 'default' | 'success' | 'warning' | 'critical' | 'neutral';
  contrast?: 'strong' | 'subtle';
  className?: string;
  style?: CSSProperties;
}
```

---

## Props

### count
The numeric value to display.

### max (default: 99)
Maximum value before showing overflow format. When `count > max`, displays as `"99+"` (or whatever max is set to).

| Count | Max | Display |
|-------|-----|---------|
| 5 | 99 | "5" |
| 99 | 99 | "99" |
| 100 | 99 | "99+" |
| 150 | 99 | "99+" |
| 1000 | 999 | "999+" |

### type
Color variant for the indicator.

| Type | Strong Background | Subtle Border/Text |
|------|-------------------|-------------------|
| `default` | Blue (#2d75e2) | Blue |
| `success` | Green (#0e8662) | Green |
| `warning` | Orange (#f58319) | Orange |
| `critical` | Red (#db3a3a) | Red |
| `neutral` | Gray (#4d5c6e) | Gray border, secondary text |

### contrast
Visual emphasis level.

| Contrast | Description |
|----------|-------------|
| `strong` | Filled background with white text (default) |
| `subtle` | White background with colored border and text |

---

## Figma → Props Mapping

| Figma Variant | Component Props |
|---------------|-----------------|
| `Type=Default, Contrast=Strong` | `type="default" contrast="strong"` |
| `Type=Success, Contrast=Strong` | `type="success" contrast="strong"` |
| `Type=Warning, Contrast=Strong` | `type="warning" contrast="strong"` |
| `Type=Critical, Contrast=Strong` | `type="critical" contrast="strong"` |
| `Type=Neutral, Contrast=Strong` | `type="neutral" contrast="strong"` |
| `Type=Neutral, Contrast=Subtle` | `type="neutral" contrast="subtle"` |
| `Type=Warning, Contrast=Subtle` | `type="warning" contrast="subtle"` |
| `Type=Critical, Contrast=Subtle` | `type="critical" contrast="subtle"` |

---

## Usage Examples

### Basic Count

```tsx
import { CountIndicator } from '@syndigo/design-system';

<CountIndicator count={12} />
```

### Different Types

```tsx
// Notification count
<CountIndicator count={5} type="critical" />

// Success count
<CountIndicator count={42} type="success" />

// Neutral badge
<CountIndicator count={8} type="neutral" />
```

### Subtle Contrast

```tsx
// Outline style
<CountIndicator count={15} type="warning" contrast="subtle" />

// Neutral outline
<CountIndicator count={3} type="neutral" contrast="subtle" />
```

### Max Overflow

```tsx
// Will display "99+"
<CountIndicator count={150} max={99} />

// Will display "9+"
<CountIndicator count={15} max={9} />

// Custom max
<CountIndicator count={1500} max={999} />
```

### With Icons/Buttons

```tsx
function NotificationBell() {
  return (
    <div style={{ position: 'relative' }}>
      <BellIcon />
      <CountIndicator
        count={notificationCount}
        type="critical"
        style={{ position: 'absolute', top: -8, right: -8 }}
      />
    </div>
  );
}
```

---

## Visual Specifications

### Size
- Min width: 20px
- Height: 20px
- Padding: 2px vertical, 3px horizontal

### Typography
- Font: Inter Medium
- Size: 13px
- Line height: 16px

### Border Radius
- 4px (`--radius-4`)

---

## Color Reference

### Strong Contrast (Filled)

| Type | Background Token | Hex |
|------|------------------|-----|
| Default | `--color-button-primary` | #2d75e2 |
| Success | `--color-system-success` | #0e8662 |
| Warning | `--color-system-warning` | #f58319 |
| Critical | `--color-system-critical` | #db3a3a |
| Neutral | `--color-gray-500` | #4d5c6e |

### Subtle Contrast (Outline)

| Type | Border Token | Text Token |
|------|--------------|------------|
| Default | `--color-button-primary` | `--color-button-primary` |
| Success | `--color-system-success` | `--color-system-success` |
| Warning | `--color-system-warning` | `--color-system-warning` |
| Critical | `--color-system-critical` | `--color-system-critical` |
| Neutral | `--color-stroke-light` | `--color-text-secondary` |

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use for notification counts
<CountIndicator count={unreadCount} type="critical" />

// Use subtle for less emphasis
<CountIndicator count={itemCount} type="neutral" contrast="subtle" />

// Set appropriate max for context
<CountIndicator count={messages} max={99} />
```

### ❌ Don't

```tsx
// Don't use for non-numeric content
<CountIndicator count="New" /> // ❌ Use a Badge instead

// Don't mix types arbitrarily
<CountIndicator count={5} type="critical" /> // Only if actually critical
```

---

## Accessibility

- Ensure sufficient color contrast (all variants meet WCAG AA)
- Consider adding `aria-label` for screen readers when used for notifications
- When used with icons, include context for assistive technology
