# Color Tokens

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

Color tokens define all colors in the design system. The system has two layers:

1. **Base Palette** — Raw color values (do not use directly)
2. **Semantic Tokens** — Contextual colors for specific use cases (use these)

---

## Naming Conventions

### CSS Variables (kebab-case)

```css
--color-{category}-{name}
```

**Examples:**
- `--color-text-primary`
- `--color-surface-white`
- `--color-stroke-light`
- `--color-blue-100` (base palette)

### TypeScript (camelCase)

```ts
colors.text.primary
colors.surface.white
basePalette.blue[100]
```

---

## Base Palette

⚠️ **DO NOT USE DIRECTLY** in components. These exist for reference and are used internally by semantic tokens.

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `basePalette.gray.white` | `--color-gray-white` | #ffffff | Internal only |
| `basePalette.blue.100` | `--color-blue-100` | #e7f1ff | Internal only |

---

## Semantic Tokens

✅ **USE THESE** in all components and styles.

### Text Colors

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `colors.text.primary` | `--color-text-primary` | #1d3261 | Primary text, headings |
| `colors.text.secondary` | `--color-text-secondary` | #4d5c6e | Secondary text, captions |

### Surface Colors

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `colors.surface.white` | `--color-surface-white` | #ffffff | Card backgrounds, primary surfaces |
| `colors.surface.black` | `--color-surface-black` | #000000 | Dark mode surfaces, overlays |
| `colors.surface.light` | `--color-surface-light` | #f7f9fb | Subtle backgrounds, alternating rows |

### Stroke Colors

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `colors.stroke.light` | `--color-stroke-light` | #dee5ef | Borders, dividers, outlines |

---

## Mode Handling (Light/Dark)

Currently, the design system supports **light mode only**. Semantic tokens are designed to support future dark mode by swapping values at the CSS variable level.

### Future Dark Mode Pattern

```css
/* Light mode (default) */
:root {
  --color-text-primary: #1d3261;
  --color-surface-white: #ffffff;
}

/* Dark mode (future) */
:root[data-theme="dark"] {
  --color-text-primary: #ffffff;
  --color-surface-white: #1a1a1a;
}
```

**Why semantic tokens matter:** When dark mode is added, components using `--color-text-primary` will automatically adapt without code changes.

---

## Usage Examples

### CSS

```css
.card {
  background: var(--color-surface-white);
  border: 1px solid var(--color-stroke-light);
  color: var(--color-text-primary);
}

.caption {
  color: var(--color-text-secondary);
}
```

### TypeScript/React

```tsx
import { colors } from '@syndigo/design-system';

const styles = {
  backgroundColor: colors.surface.white,
  color: colors.text.primary,
  borderColor: colors.stroke.light,
};
```

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use semantic tokens
<div style={{ color: colors.text.primary }}>
  Content
</div>

// Use CSS variables
.element {
  background: var(--color-surface-light);
}
```

### ❌ Don't

```tsx
// Don't use hex colors
<div style={{ color: '#1d3261' }}>Bad</div>

// Don't use base palette directly
<div style={{ background: basePalette.gray.white }}>
  Use colors.surface.white instead
</div>

// Don't use rgb/hsl
.element {
  color: rgb(29, 50, 97); /* Bad */
}

// Don't invent new colors
.element {
  background: #f0f0f0; /* Not in design system */
}
```

---

## Adding New Colors

New colors must come from Figma. Do not invent tokens.

1. Request the color be added to Figma design system
2. Export using Figma MCP
3. Add to `tokens.css` (CSS variable) and `colors.ts` (TypeScript)
4. Document in this file

---

## Figma Variable Mapping

| Figma Variable | CSS Variable | TypeScript |
|----------------|--------------|------------|
| `Gray/white` | `--color-gray-white` | `basePalette.gray.white` |
| `Blue/100` | `--color-blue-100` | `basePalette.blue[100]` |
| `Text/-text-primary` | `--color-text-primary` | `colors.text.primary` |
| `Text/-text-secondary` | `--color-text-secondary` | `colors.text.secondary` |
| `Surface/-surface-white` | `--color-surface-white` | `colors.surface.white` |
| `Surface/-surface-black` | `--color-surface-black` | `colors.surface.black` |
| `Surface/-surface-light` | `--color-surface-light` | `colors.surface.light` |
| `Stroke/-stroke-light` | `--color-stroke-light` | `colors.stroke.light` |
