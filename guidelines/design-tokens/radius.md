# Radius Tokens

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

Radius tokens define border-radius values for rounded corners. The scale uses **semantic naming** (md, lg).

## Naming Convention

- **CSS:** `--radius-{size}` (e.g., `--radius-md`)
- **TypeScript:** `radius.{size}` (e.g., `radius.md`)

---

## Radius Scale

| Token | CSS Variable | Value | Intended Usage |
|-------|--------------|-------|----------------|
| `radius.md` | `--radius-md` | 12px | Default radius (cards, inputs, buttons) |
| `radius.lg` | `--radius-lg` | 24px | Large radius (modals, prominent containers) |

---

## Usage Examples

### CSS

```css
.card {
  border-radius: var(--radius-md);
}

.modal {
  border-radius: var(--radius-lg);
}

.button {
  border-radius: var(--radius-md);
}
```

### TypeScript/React

```tsx
import { radius } from '@syndigo/design-system';

const cardStyle = {
  borderRadius: radius.md,
};

const modalStyle = {
  borderRadius: radius.lg,
};
```

---

## Do's and Don'ts

### ✅ Do

```css
/* Use radius tokens */
.card {
  border-radius: var(--radius-md);
}

.modal {
  border-radius: var(--radius-lg);
}
```

### ❌ Don't

```css
/* Don't use hardcoded pixel values */
.card {
  border-radius: 12px;  /* Bad - use var(--radius-md) */
}

/* Don't invent new radius values */
.element {
  border-radius: 8px;   /* Not in design system */
  border-radius: 16px;  /* Not in design system */
}

/* Don't use percentage or other units */
.element {
  border-radius: 50%;   /* Not a token */
}
```

---

## Special Cases

### Pill/Round Elements

For fully rounded elements (pills, avatars), use a large fixed value or `9999px`:

```css
.pill {
  border-radius: 9999px;
}
```

> **Note:** This is an exception to the token rule since "fully rounded" is a pattern, not a design token.

### Individual Corners

When only specific corners need rounding:

```css
.tooltip {
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
```

---

## Adding New Radius Values

New radius values must come from Figma. Do not invent tokens.

1. Request the radius be added to Figma design system
2. Export using Figma MCP
3. Add to `tokens.css` and `radius.ts`
4. Document in this file

---

## Figma Variable Mapping

| Figma Variable | CSS Variable | TypeScript |
|----------------|--------------|------------|
| `Radius/-border-radius-md` | `--radius-md` | `radius.md` |
| `Radius/24` | `--radius-lg` | `radius.lg` |
