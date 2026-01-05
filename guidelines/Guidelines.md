# Syndigo Design System Guidelines

This document defines the rules and best practices for using the Syndigo Design System with Figma Make.

---

## Core Rules

### 1. Use Only Components from This Package

**All UI components must come from `@syndigo/design-system`.**

- Do NOT create custom components that replicate design system functionality
- Do NOT copy component code and modify it
- If a component is missing, create a TODO entry in `TODO/MISSING.md` and request it be added

```tsx
// ✅ Correct
import { Button, Card } from '@syndigo/design-system';

// ❌ Wrong - creating custom components
const MyButton = styled.button`...`;
```

### 2. Do Not Create New Components

**Extend, don't reinvent.**

- If existing components don't meet your needs, file a request to extend them
- Composition of existing components is allowed
- Wrapper components for specific use-cases are acceptable only if they:
  - Use only design system components internally
  - Do not introduce new styling

```tsx
// ✅ Correct - composing existing components
function UserCard({ user }) {
  return (
    <Card>
      <Avatar src={user.avatar} />
      <Text>{user.name}</Text>
    </Card>
  );
}

// ❌ Wrong - creating new styled component
function UserCard({ user }) {
  return (
    <div style={{ padding: '16px', background: '#fff' }}>
      ...
    </div>
  );
}
```

### 3. No Custom CSS Beyond Tokens

**All styling must use design tokens.**

- Import `tokens.css` or use the `tokens` TypeScript object
- Never use raw hex colors (`#fff`, `#000`, `#3b82f6`)
- Never use `rgb()`, `rgba()`, `hsl()`, `hsla()` directly
- Never hardcode spacing (`padding: 12px`, `margin: 8px`)
- Never hardcode border-radius values

```css
/* ✅ Correct - using CSS variables */
.card {
  background: var(--color-surface-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}

/* ❌ Wrong - hardcoded values */
.card {
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
}
```

---

## Token Usage

### Before Writing Any Styles

1. Read the token documentation in `guidelines/design-tokens/`
2. Identify which token category applies (color, spacing, typography, etc.)
3. Use the appropriate CSS variable or TypeScript token

### Available Token Categories

| Category   | CSS Variable Prefix | TypeScript Path     |
| ---------- | ------------------- | ------------------- |
| Colors     | `--color-*`         | `tokens.colors.*`   |
| Spacing    | `--spacing-*`       | `tokens.spacing.*`  |
| Typography | `--font-*`          | `tokens.typography.*` |
| Radius     | `--radius-*`        | `tokens.radius.*`   |
| Shadows    | `--shadow-*`        | `tokens.shadow.*`   |

---

## Guardrails

This repository includes automated checks that will fail builds if:

- Raw color values are detected in component code
- Hardcoded spacing or radius values are found

Run `npm run lint:tokens` to check for violations before committing.

---

## Composition Rules

### Required Primitives

When building or extending components, you **MUST** use these primitives:

| Primitive | Usage | Example |
|-----------|-------|---------|
| `Text` | ALL typography (labels, titles, badges, etc.) | `<Text variant="body13Medium">Label</Text>` |
| `Button` | ALL button actions in overlays/footers | `<Button variant="primary">Confirm</Button>` |
| `CloseIcon` | ALL close buttons | `import { CloseIcon } from '../Icons'` |
| `InlineError` | ALL error messages in forms | `<InlineError message="Required" />` |

### Typography Normalization

**Never use inline font properties.** Always use `<Text>` component:

```tsx
// ❌ Wrong - inline font styles
const labelStyle = {
  fontFamily: 'Inter',
  fontSize: '13px',
  fontWeight: 500,
};
<span style={labelStyle}>{label}</span>

// ✅ Correct - using Text component
<Text variant="body13Medium">{label}</Text>
```

### Variant Mapping

| Font Size | Weight | Text Variant |
|-----------|--------|--------------|
| 11px | 500 | `supporting11Medium` |
| 12px | 500 | `body12Medium` |
| 12px | 600 | `body12Semibold` |
| 13px | 500 | `body13Medium` |
| 13px | 600 | `body13Semibold` |
| 14px | 500 | `body14Medium` |
| 16px | 600 | `heading16Semibold` |

### Menu & List Items

- **SideNav**: Uses internal `SideNavMenuItem` (DS-specific styling)
- **SelectMenu**: Uses internal `SelectMenuItem` (checkbox support)
- **DropdownMenu**: Use `MenuItem` component

Do NOT create custom menu row implementations. Use the appropriate component.

### Form Composition

All form inputs should compose with `InputField` for consistent label/help/error:

```tsx
// ✅ Correct - composing with InputField
<InputField label="Email" errorText={error}>
  <input type="email" ... />
</InputField>
```

### Overlay Components

- **Modal**: For complex forms, multi-step flows
- **Dialog**: For simple confirmations/alerts

Both use shared `CloseIcon` and `Button` components internally.

---

## When in Doubt

1. Check existing components for patterns
2. Read the component-specific guidelines in `guidelines/components/`
3. Ask before creating new patterns
