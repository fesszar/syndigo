# Spacing Tokens

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

Spacing tokens define consistent spacing throughout the design system. The scale uses **numeric naming** based on pixel values.

## Naming Convention

- **CSS:** `--spacing-{value}` (e.g., `--spacing-12`)
- **TypeScript:** `spacing[value]` (e.g., `spacing[12]`)

---

## Spacing Scale

| Token | CSS Variable | Value | Intended Usage |
|-------|--------------|-------|----------------|
| `spacing[0]` | `--spacing-0` | 0px | No spacing, reset |
| `spacing[12]` | `--spacing-12` | 12px | Compact spacing (input padding, small gaps) |
| `spacing[24]` | `--spacing-24` | 24px | Default spacing (card padding, section gaps) |
| `spacing[64]` | `--spacing-64` | 64px | Large spacing (page sections, major separations) |

---

## Usage Examples

### CSS

```css
.card {
  padding: var(--spacing-24);
}

.compact-list {
  gap: var(--spacing-12);
}

.page-section {
  margin-bottom: var(--spacing-64);
}
```

### TypeScript/React

```tsx
import { spacing } from '@syndigo/design-system';

const styles = {
  padding: spacing[24],
  gap: spacing[12],
};
```

---

## Do's and Don'ts

### ✅ Do

```css
/* Use spacing tokens */
.element {
  padding: var(--spacing-12);
  margin: var(--spacing-24);
  gap: var(--spacing-12);
}
```

### ❌ Don't

```css
/* Don't use hardcoded pixel values */
.element {
  padding: 12px;    /* Bad - use var(--spacing-12) */
  margin: 24px;     /* Bad - use var(--spacing-24) */
  gap: 8px;         /* Bad - not in scale */
}

/* Don't invent new spacing values */
.element {
  padding: 16px;    /* Not in design system */
  margin: 32px;     /* Not in design system */
}
```

---

## Adding New Spacing Values

New spacing values must come from Figma. Do not invent tokens.

1. Request the spacing be added to Figma design system
2. Export using Figma MCP
3. Add to `tokens.css` and `spacing.ts`
4. Document in this file

---

## Figma Variable Mapping

| Figma Variable | CSS Variable | TypeScript |
|----------------|--------------|------------|
| `var(--p-sapce-0)` | `--spacing-0` | `spacing[0]` |
| `12` | `--spacing-12` | `spacing[12]` |
| `size-600` / `24` | `--spacing-24` | `spacing[24]` |
| `64` | `--spacing-64` | `spacing[64]` |
