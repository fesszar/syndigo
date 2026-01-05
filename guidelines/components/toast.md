# Toast

A toast notification component with type variants for feedback messages.

**Figma Source:** [Toast](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22500-29433)

---

## Overview

Toast provides **non-blocking feedback** to users about operations, status changes, or important information. Each type has distinct colors and icons for quick visual recognition.

**Use cases:**
- Success confirmations
- Error notifications
- Warning alerts
- Informational messages

---

## Component Composition

**Toast reuses:**
- `Text` component - Message text
- `Button` component - Action button
- `CloseIcon` - Dismiss button
- Type-specific icons (`CheckCircleIcon`, `InfoIcon`, `WarningCircleIcon`, `WarningTriangleIcon`)

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | required | Toast message |
| `type` | `'success' \| 'info' \| 'critical' \| 'warning'` | `'success'` | Toast type |
| `actionLabel` | `string` | - | Action button label |
| `onAction` | `() => void` | - | Action button handler |
| `onDismiss` | `() => void` | - | Dismiss handler |
| `showDismiss` | `boolean` | `true` | Show dismiss button |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional styles |

---

## Type Variants

### Success
- **Background:** green/100 (#e1fbf5)
- **Border:** green/600 (#0e8662)
- **Icon:** CheckCircleIcon (green checkmark in circle)

### Info
- **Background:** blue/100 (#e7f1ff)
- **Border:** blue/500 (#2d75e2)
- **Icon:** InfoIcon (blue filled circle with "i")

### Critical
- **Background:** red/100 (#ffecec)
- **Border:** red/500 (#db3a3a)
- **Icon:** WarningCircleIcon (red filled circle with "!")

### Warning
- **Background:** orange/100 (#fff4eb)
- **Border:** orange/500 (#f58319)
- **Icon:** WarningTriangleIcon (orange filled triangle with "!")

---

## Visual Specifications

### Container
- **Padding:** 8px 16px
- **Border radius:** 8px
- **Border:** 1px solid (type-specific color)
- **Shadow:** 0px 8px 18px rgba(0,0,0,0.16)

### Content Layout
- **Display:** flex, horizontal
- **Gap:** 16px between left/right sections
- **Left:** Icon (24px) + Message text
- **Right:** Action button (optional) + Dismiss button

### Typography
- **Message:** 14px medium, text/primary

---

## Usage Examples

### Basic Success Toast

```tsx
import { Toast } from '@syndigo/components';

<Toast
  message="Changes saved successfully."
  type="success"
  onDismiss={() => hideToast()}
/>
```

### With Action Button

```tsx
<Toast
  message="File upload failed."
  type="critical"
  actionLabel="Retry"
  onAction={() => retryUpload()}
  onDismiss={() => hideToast()}
/>
```

### Info Toast

```tsx
<Toast
  message="New features available. Check them out!"
  type="info"
  actionLabel="Learn more"
  onAction={() => openFeatures()}
  onDismiss={() => hideToast()}
/>
```

### Warning Toast

```tsx
<Toast
  message="Your session will expire in 5 minutes."
  type="warning"
  actionLabel="Extend"
  onAction={() => extendSession()}
  onDismiss={() => hideToast()}
/>
```

---

## Accessibility

- `role="alert"` for screen reader announcements
- `aria-live="polite"` for non-urgent updates
- Dismiss button has `aria-label="Dismiss"`
- Color is not the only indicator (icons differ by type)

---

## Interactions

| Interaction | Behavior |
|-------------|----------|
| Click action button | Calls `onAction` |
| Click dismiss button | Calls `onDismiss` |

---

## Do's and Don'ts

### Do's
- ✅ Keep messages concise and actionable
- ✅ Use appropriate type for the message context
- ✅ Provide action button for recoverable errors
- ✅ Allow dismissal for non-critical toasts

### Don'ts
- ❌ Don't use toasts for critical blocking errors (use Dialog)
- ❌ Don't stack multiple toasts (not in DS scope)
- ❌ Don't add custom animations (not in DS)
- ❌ Don't make toasts auto-dismiss without user setting

---

## Related Components

- [Button](./button.md) - Action button
- [Dialog](./dialog.md) - For blocking/modal notifications
- [StatusIndicator](./status-indicator.md) - Inline status display
