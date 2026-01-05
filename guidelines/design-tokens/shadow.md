# Shadow/Elevation Tokens

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

Shadow tokens define box-shadow values for elevation and depth effects. The design system includes both **component-specific shadows** (for buttons) and **general elevation shadows** (for dropdowns/menus).

## Naming Convention

- **CSS:** `--shadow-{context}-{state}` (e.g., `--shadow-button-primary-hover`)
- **TypeScript:** `shadow.{contextState}` (e.g., `shadow.buttonPrimaryHover`)

---

## Shadow Tokens

### Menu/Dropdown Shadow

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `shadow.menuDropdown` | `--shadow-menu-dropdown` | `0 14px 18px 0 #4d5c6e26` | Dropdown menus, popovers, floating panels |

### Button Shadows

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| `shadow.buttonPrimaryHover` | `--shadow-button-primary-hover` | `0 3px 8px 0 #2d75e27a` | Primary button hover state (blue glow) |
| `shadow.buttonSecondaryDefault` | `--shadow-button-secondary-default` | `0 1px 3px 0 #0000001a` | Secondary button default state |
| `shadow.buttonSecondaryHover` | `--shadow-button-secondary-hover` | `0 1px 3px 0 #0000001a` | Secondary button hover state |
| `shadow.buttonCriticalHover` | `--shadow-button-critical-hover` | `0 3px 8px 0 #db3a3a7a` | Critical/danger button hover (red glow) |

---

## Usage Examples

### CSS

```css
/* Dropdown menu */
.dropdown-menu {
  box-shadow: var(--shadow-menu-dropdown);
}

/* Primary button hover */
.button-primary:hover {
  box-shadow: var(--shadow-button-primary-hover);
}

/* Secondary button */
.button-secondary {
  box-shadow: var(--shadow-button-secondary-default);
}

/* Critical button hover */
.button-critical:hover {
  box-shadow: var(--shadow-button-critical-hover);
}
```

### TypeScript/React

```tsx
import { shadow } from '@syndigo/design-system';

// Dropdown
const dropdownStyle = {
  boxShadow: shadow.menuDropdown,
};

// Primary button hover
const primaryButtonHoverStyle = {
  boxShadow: shadow.buttonPrimaryHover,
};

// Critical button hover
const criticalButtonHoverStyle = {
  boxShadow: shadow.buttonCriticalHover,
};
```

---

## Do's and Don'ts

### ✅ Do

```css
/* Use shadow tokens */
.dropdown {
  box-shadow: var(--shadow-menu-dropdown);
}

.button:hover {
  box-shadow: var(--shadow-button-primary-hover);
}
```

### ❌ Don't

```css
/* Don't use hardcoded shadow values */
.dropdown {
  box-shadow: 0 14px 18px rgba(0, 0, 0, 0.1);  /* Bad */
}

/* Don't invent shadow values */
.card {
  box-shadow: 0 4px 8px #00000020;  /* Not in design system */
}

/* Don't mix shadow colors */
.button:hover {
  box-shadow: 0 3px 8px rgba(255, 0, 0, 0.5);  /* Bad - use token */
}
```

---

## Shadow Anatomy

Each shadow follows the CSS box-shadow format:
```
offset-x offset-y blur-radius spread-radius color
```

| Shadow | X | Y | Blur | Spread | Color |
|--------|---|---|------|--------|-------|
| Menu/Dropdown | 0 | 14px | 18px | 0 | #4d5c6e26 (muted, 15% opacity) |
| Button Primary Hover | 0 | 3px | 8px | 0 | #2d75e27a (blue, 48% opacity) |
| Button Secondary | 0 | 1px | 3px | 0 | #0000001a (black, 10% opacity) |
| Button Critical Hover | 0 | 3px | 8px | 0 | #db3a3a7a (red, 48% opacity) |

---

## Figma Variable Mapping

| Figma Variable | CSS Variable | TypeScript |
|----------------|--------------|------------|
| `Menu/Dropdown` | `--shadow-menu-dropdown` | `shadow.menuDropdown` |
| `Button/Primary Hover` | `--shadow-button-primary-hover` | `shadow.buttonPrimaryHover` |
| `Button/Secondary Default` | `--shadow-button-secondary-default` | `shadow.buttonSecondaryDefault` |
| `Button/Secondary Hover` | `--shadow-button-secondary-hover` | `shadow.buttonSecondaryHover` |
| `Button/Critical Hover` | `--shadow-button-critical-hover` | `shadow.buttonCriticalHover` |
