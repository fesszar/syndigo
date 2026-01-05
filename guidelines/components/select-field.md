# SelectField

A dropdown selection field with label support and search capability.

**Figma Source:** [Dropdown Input Field](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=17809-13864)

---

## Overview

The SelectField component provides a dropdown selection interface with optional search.

---

## States

| State | Description |
|-------|-------------|
| `default` | Initial state |
| `hover` | Mouse over |
| `active` | Dropdown open |
| `disabled` | Not interactive |
| `error` | Validation error |

---

## Props

```typescript
interface SelectFieldProps {
  label?: string;
  required?: boolean;
  helpText?: string;
  errorText?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  state?: SelectFieldState;
  showSearch?: boolean;
  onChange?: (value: string) => void;
}
```

---

## Visual Specifications

- **Height:** 34px
- **Width:** 218px
- **Border radius:** 4px
- **Font:** Inter Medium, 12px

---

## Usage

```tsx
<SelectField
  label="Category"
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

---

## Related Components

- [TextField](./text-field.md)
- [SearchField](./search-field.md)
