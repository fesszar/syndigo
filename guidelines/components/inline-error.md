# InlineError

A compact inline component for displaying validation errors and status messages.

**Figma Source:** [Inline Error](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=13839-3536)

---

## Overview

The InlineError component displays validation messages inline with form fields or other content. It supports different severity levels, optional icons, and can handle single or multi-line text.

---

## Variants

### Severity

| Severity | Color | Use Case |
|----------|-------|----------|
| `error` | #db3a3a (system/critical) | Validation errors, required fields |
| `warning` | #f5a623 (system/warning) | Warnings, potential issues |
| `info` | #2d75e2 (system/info) | Informational messages |

### Size

| Size | Font Size | Icon Size |
|------|-----------|-----------|
| `small` | 11px | 14px |
| `medium` | 12px | 16px |

### Icon Options

| Option | Description |
|--------|-------------|
| `showIcon={true}` | Display severity icon (default) |
| `showIcon={false}` | Text only |
| `icon={<Custom />}` | Custom icon override |

---

## Props

```typescript
interface InlineErrorProps {
  /** Error message to display */
  message: string;
  /** Severity level affects color */
  severity?: 'error' | 'warning' | 'info';
  /** Size variant */
  size?: 'small' | 'medium';
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Custom icon to display (overrides default) */
  icon?: ReactNode;
  /** Whether the message can wrap to multiple lines */
  multiline?: boolean;
  /** Text alignment */
  align?: 'left' | 'right' | 'center';
}
```

---

## Visual Specifications

### Typography (Token Verified ✓)

| Property | Value | Token |
|----------|-------|-------|
| Font Family | Inter | --font-family-sans |
| Font Weight | 500 (Medium) | --weight-font-weight-medium |
| Font Size (medium) | 12px | Body/12-medium |
| Font Size (small) | 11px | Body/11-medium |
| Line Height | 14px | Matches token |

### Spacing (Token Verified ✓)

| Property | Value | Token |
|----------|-------|-------|
| Icon-Text Gap | 4px | --spacing-4 / --4 |

### Colors (Token Verified ✓)

| Severity | Color | Token |
|----------|-------|-------|
| Error | #db3a3a | --color-system-critical / system/critical |
| Warning | #f5a623 | --color-system-warning |
| Info | #2d75e2 | --color-system-info |

### Icon

| Property | Value |
|----------|-------|
| Size (medium) | 16×16px |
| Size (small) | 14×14px |
| Default Icon | info-circle |
| Warning Icon | warning-triangle |

---

## Usage Examples

### Basic Error

```tsx
import { InlineError } from '@syndigo/components';

<InlineError message="Required" />
```

### Without Icon

```tsx
<InlineError 
  message="This field is required" 
  showIcon={false}
/>
```

### Warning Severity

```tsx
<InlineError 
  message="This value may cause issues" 
  severity="warning"
/>
```

### Info Message

```tsx
<InlineError 
  message="Enter a valid email address" 
  severity="info"
/>
```

### Small Size

```tsx
<InlineError 
  message="Required" 
  size="small"
/>
```

### Multi-line Message

```tsx
<InlineError 
  message="This is a longer error message that needs to wrap to multiple lines for better readability."
  multiline={true}
/>
```

### Right-Aligned

```tsx
<InlineError 
  message="Required" 
  align="right"
/>
```

### With Form Field

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input 
    id="email" 
    type="email" 
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <InlineError 
    id="email-error"
    message="Please enter a valid email address" 
  />
</div>
```

---

## Accessibility

- Uses `role="alert"` for screen reader announcements
- Uses `aria-live="polite"` for non-intrusive updates
- Should be associated with form fields using `aria-describedby`
- Color is not the only indicator - icon provides additional context

---

## Do's and Don'ts

### Do's
- ✅ Use for form validation feedback
- ✅ Keep messages concise and actionable
- ✅ Place directly below the related field
- ✅ Use appropriate severity for the message type
- ✅ Associate with form fields using aria-describedby

### Don'ts
- ❌ Don't use for success messages (use a different component)
- ❌ Don't use excessively long messages
- ❌ Don't hide the icon for critical errors
- ❌ Don't use warning/info severity for blocking errors
- ❌ Don't stack multiple InlineErrors vertically

---

## Related Components

- [InputField](./input-field.md) - Form input with built-in error support
- [TextField](./text-field.md) - Text area with validation
- [Dialog](./dialog.md) - For larger error displays
