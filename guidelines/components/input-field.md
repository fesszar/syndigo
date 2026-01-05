# InputField Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

The `<InputField>` component is a wrapper that provides label, help text, and error messaging for form inputs. It uses the `<Text>` primitive with typography tokens.

## API

```tsx
interface InputFieldProps {
  label?: string;
  required?: boolean;
  helpText?: string;
  errorText?: string;
  tooltip?: ReactNode;
  state?: 'default' | 'error' | 'disabled';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
```

---

## Variants/States

| State | Label Color | Description |
|-------|-------------|-------------|
| `default` | `--color-text-secondary` | Normal state |
| `error` | `--color-system-critical` | Validation error |
| `disabled` | `--color-text-secondary` | Non-interactive |

---

## Features

### Label with Required Indicator

```tsx
<InputField label="Email" required>
  <input type="email" />
</InputField>
```

### Help Text

```tsx
<InputField label="Password" helpText="Must be at least 8 characters">
  <input type="password" />
</InputField>
```

### Error State with Message

```tsx
<InputField label="Email" errorText="Invalid email address" state="error">
  <input type="email" />
</InputField>
```

### With Tooltip

```tsx
<InputField 
  label="API Key" 
  tooltip={<InfoIcon />}
>
  <input type="text" />
</InputField>
```

---

## Usage Examples

### Basic Usage

```tsx
import { InputField } from '@syndigo/design-system';

<InputField label="Name">
  <input type="text" placeholder="Enter your name" />
</InputField>
```

### Complete Form Field

```tsx
<InputField
  label="Email"
  required
  helpText="We'll never share your email"
  errorText={errors.email}
  state={errors.email ? 'error' : 'default'}
>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</InputField>
```

---

## Typography Tokens Used

| Element | Token | Size |
|---------|-------|------|
| Label | `body12Medium` | 12px |
| Required asterisk | `body12Medium` | 12px |
| Help text | `supporting11Medium` | 11px |
| Error text | `body12Medium` | 12px |

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use InputField for consistent form styling
<InputField label="Username" required>
  <TextField />
</InputField>

// Show helpful context
<InputField label="Phone" helpText="Include country code">
  <TextField />
</InputField>

// Show clear error messages
<InputField label="Password" errorText="Password is too short">
  <TextField />
</InputField>
```

### ❌ Don't

```tsx
// Don't add labels manually
<div>
  <label style={{ color: '#4d5c6e' }}>Name</label>  {/* Bad */}
  <TextField />
</div>

// Don't use raw colors for error states
<span style={{ color: 'red' }}>Error</span>  {/* Bad */}
```

---

## Figma Mapping

| Figma Property | Component Prop |
|----------------|----------------|
| `State=Default` | `state="default"` |
| `State=Critical` | `state="error"` |
| `State=Disabled` | `state="disabled"` |
| `Required=true` | `required` |
| `Tooltip=true` | `tooltip={...}` |
| `Subtext=true` | `helpText="..."` |
