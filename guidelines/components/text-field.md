# TextField Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

The `<TextField>` component is a styled text input that uses `<InputField>` internally for label/help/error support. All styling is token-driven with no raw values.

## API

```tsx
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  helpText?: string;
  errorText?: string;
  state?: 'default' | 'hover' | 'focus' | 'disabled' | 'error';
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
}
```

---

## States (from Figma)

| State | Background | Border | Description |
|-------|------------|--------|-------------|
| `default` | `--color-surface-white` | `--color-stroke-light` (1px) | Normal state |
| `hover` | `--color-surface-white` | `#91a0b3` (1px) | Mouse over |
| `focus` | `--color-surface-white` | `--color-button-primary` (1.5px) | Active input |
| `disabled` | `#dee5ef` | none | Non-interactive |
| `error` | `--color-surface-white` | `--color-system-critical` (1.5px) | Validation error |

---

## Usage Examples

### Basic Usage

```tsx
import { TextField } from '@syndigo/design-system';

<TextField 
  label="Email" 
  placeholder="Enter your email" 
/>
```

### With Label and Help Text

```tsx
<TextField
  label="Password"
  type="password"
  placeholder="Enter password"
  helpText="Must be at least 8 characters"
/>
```

### Required Field

```tsx
<TextField
  label="Username"
  required
  placeholder="Choose a username"
/>
```

### Error State

```tsx
<TextField
  label="Email"
  placeholder="Enter email"
  errorText="Please enter a valid email address"
/>
```

### Disabled State

```tsx
<TextField
  label="Account ID"
  value="ACC-12345"
  disabled
/>
```

### Full Width

```tsx
<TextField
  label="Description"
  placeholder="Enter description"
  fullWidth
/>
```

---

## Form Example

```tsx
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  return (
    <form>
      <TextField
        label="Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        errorText={errors.name}
      />
      
      <TextField
        label="Email"
        required
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        errorText={errors.email}
        helpText="We'll never share your email"
      />
      
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
```

---

## Styling Tokens Used

| Property | Token/Value |
|----------|-------------|
| Height | 34px |
| Padding | 5px 10px |
| Border radius | `--radius-sm` (4px) |
| Font size | `--size-font-size-2xs` (12px) |
| Font weight | `--weight-font-weight-medium` (500) |
| Default border | `--color-stroke-light` |
| Focus border | `--color-button-primary` |
| Error border | `--color-system-critical` |
| Disabled bg | `#dee5ef` |
| Placeholder | `#91a0b3` |

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use TextField for text inputs
<TextField label="Name" placeholder="Enter name" />

// Show error state with message
<TextField
  label="Email"
  errorText="Invalid email"
/>

// Use fullWidth for form layouts
<TextField label="Address" fullWidth />

// Combine with other form components
<form>
  <TextField label="Title" />
  <TextArea label="Description" />
</form>
```

### ❌ Don't

```tsx
// Don't use raw input elements
<input 
  style={{ border: '1px solid #ccc' }}  {/* Bad */}
  placeholder="Name"
/>

// Don't hardcode colors
<TextField
  inputStyle={{ borderColor: '#ff0000' }}  {/* Bad */}
/>

// Don't skip labels for accessibility
<TextField placeholder="Email" />  {/* Missing label */}
```

---

## Figma Mapping

| Figma State | Component Props |
|-------------|-----------------|
| `State=Default` | `<TextField />` |
| `State=Filled` | `<TextField value="..." />` |
| `State=Hover` | Automatic on mouse over |
| `State=Active` | Automatic on focus |
| `State=Disabled` | `<TextField disabled />` |
| `State=Error` | `<TextField errorText="..." />` |
| `Label=true` | `<TextField label="..." />` |
| `Label=false` | `<TextField />` (no label prop) |

---

## Accessibility

- Always provide a `label` for screen readers
- Use `required` to indicate mandatory fields
- Error messages are associated with input
- Focus states are clearly visible
- Disabled state prevents interaction
