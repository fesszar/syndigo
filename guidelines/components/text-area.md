# TextArea

A multi-line text input field with resizable handle.

**Figma Source:** [Text Area](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=19765-13557)

---

## Overview

The TextArea component provides a multi-line text input for longer content like descriptions and notes.

---

## States

| State | Description |
|-------|-------------|
| `default` | Initial state |
| `hover` | Mouse over |
| `active` | Focused |
| `filled` | Contains content |
| `disabled` | Not interactive |

---

## Props

```typescript
interface TextAreaProps {
  label?: string;
  required?: boolean;
  helpText?: string;
  errorText?: string;
  state?: TextAreaState;
  resizable?: boolean;
  rows?: number;
  fullWidth?: boolean;
  // ...extends TextareaHTMLAttributes
}
```

---

## Visual Specifications

- **Min height:** 76px
- **Width:** 323px (default)
- **Padding:** 10px
- **Border radius:** 4px
- **Font:** Inter Medium, 12px/17px

---

## Usage

```tsx
<TextArea
  label="Description"
  placeholder="Enter details"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
/>
```

---

## Related Components

- [TextField](./text-field.md)
- [InputField](./input-field.md)
