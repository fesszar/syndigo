# Logo Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

The `<Logo>` component renders brand logos with configurable color, type, and brand variants.

## API

```tsx
interface LogoProps {
  color?: 'blue' | 'white' | 'black' | 'fullColor';
  type?: 'full' | 'wordmark' | 'icon';
  brand?: 'syndigo' | 'whiteLabel';
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}
```

---

## Variants

### Colors

| Color | Description | Usage |
|-------|-------------|-------|
| `black` | Black monochrome logo | Light backgrounds |
| `white` | White monochrome logo | Dark backgrounds |
| `blue` | Brand blue logo | Light backgrounds, primary brand |
| `fullColor` | Full color (white label only) | White label brand |

### Types

| Type | Description | Elements |
|------|-------------|----------|
| `full` | Complete logo | Icon + Wordmark |
| `wordmark` | Text only | "Syndigo" text |
| `icon` | Symbol only | Syndigo icon/symbol |

### Brands

| Brand | Description |
|-------|-------------|
| `syndigo` | Primary Syndigo brand |
| `whiteLabel` | White label/partner brand |

---

## Usage Examples

### Basic Usage

```tsx
import { Logo } from '@syndigo/design-system';

// Default: Black, Full, Syndigo
<Logo />

// Blue full logo
<Logo color="blue" />

// White logo for dark backgrounds
<Logo color="white" />
```

### Logo Types

```tsx
// Full logo (icon + wordmark)
<Logo type="full" color="black" />

// Wordmark only
<Logo type="wordmark" color="black" />

// Icon only
<Logo type="icon" color="black" />
```

### Sizing

```tsx
// Default height (24px)
<Logo />

// Custom height
<Logo height={32} />

// Custom width and height
<Logo width={200} height={48} />
```

### White Label

```tsx
// White label logo (only supports fullColor)
<Logo brand="whiteLabel" color="fullColor" />
```

---

## Context-Specific Usage

### Header/Navigation

```tsx
function Header() {
  return (
    <header>
      <Logo color="black" height={24} />
    </header>
  );
}
```

### Footer (Dark Background)

```tsx
function Footer() {
  return (
    <footer style={{ background: '#1d3261' }}>
      <Logo color="white" height={20} />
    </footer>
  );
}
```

### Favicon/App Icon

```tsx
// Use icon-only variant for small spaces
<Logo type="icon" color="blue" height={32} />
```

---

## Asset Files

Logo assets must be placed in `public/assets/logos/`:

```
public/
  assets/
    logos/
      syndigo-icon-black.svg
      syndigo-wordmark-black.svg
      syndigo-icon-blue.svg
      syndigo-wordmark-blue.svg
      syndigo-icon-white.svg
      syndigo-wordmark-white.svg
      white-label-logo.png
```

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use the Logo component
<Logo color="black" />

// Use appropriate color for background
<div style={{ background: '#000' }}>
  <Logo color="white" />
</div>

// Maintain aspect ratio with height only
<Logo height={32} />
```

### ❌ Don't

```tsx
// Don't use raw img tags
<img src="/logo.svg" />

// Don't stretch the logo
<Logo width={300} height={20} /> // Distorted!

// Don't use wrong color for background
<div style={{ background: '#000' }}>
  <Logo color="black" /> // Not visible!
</div>

// Don't create custom logo variants
<img src="/custom-logo.png" style={{ filter: 'hue-rotate(45deg)' }} />
```

---

## Figma Mapping

| Figma Variant | Component Props |
|---------------|-----------------|
| `Color=Black, Type=Full, Brand=Syndigo` | `<Logo color="black" type="full" />` |
| `Color=Black, Type=Wordmark, Brand=Syndigo` | `<Logo color="black" type="wordmark" />` |
| `Color=Black, Type=Icon, Brand=Syndigo` | `<Logo color="black" type="icon" />` |
| `Color=Blue, Type=Full, Brand=Syndigo` | `<Logo color="blue" type="full" />` |
| `Color=White, Type=Full, Brand=Syndigo` | `<Logo color="white" type="full" />` |
| `Color=Full color, Type=Full, Brand=White label` | `<Logo brand="whiteLabel" color="fullColor" />` |
