# Thumbnail

A thumbnail component for displaying images or placeholder icons.

**Figma Source:** [Thumbnail](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22500-29539)

---

## Overview

Thumbnail provides a **consistent container for image previews** with multiple sizes and fallback placeholder support. When no image is provided, it displays a placeholder icon.

**Use cases:**
- Product image previews
- Asset thumbnails
- Media galleries
- List item previews

---

## Component Composition

**Thumbnail reuses:**
- `ImagePlaceholderIcon` - Fallback placeholder when no image source

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | `''` | Alt text for the image |
| `size` | `'xsmall' \| 'small' \| 'default' \| 'large'` | `'default'` | Thumbnail size |
| `radius` | `'full' \| 'half'` | `'full'` | Border radius |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional styles |

---

## Size Variants

| Size | Dimensions | Icon Size | Radius (full) | Radius (half) |
|------|------------|-----------|---------------|---------------|
| xsmall | 24×24 | 12px | 4px | 2px |
| small | 40×40 | 16px | 4px | 2px |
| default | 60×60 | 24px | 8px | 4px |
| large | 80×80 | 32px | 8px | 4px |

---

## Visual Specifications

### With Image
- **Background:** white
- **Image:** object-fit cover, centered
- **Border:** none
- **Shadow:** subtle (0px 1px for large size)

### Placeholder (no image)
- **Background:** white
- **Border:** 1px solid stroke/light (#dee5ef)
- **Icon:** ImagePlaceholderIcon, centered, color #91a0b3

---

## Usage Examples

### With Image

```tsx
import { Thumbnail } from '@syndigo/components';

<Thumbnail
  src="/images/product.jpg"
  alt="Product image"
  size="default"
/>
```

### Placeholder (no image)

```tsx
<Thumbnail
  size="default"
  alt="No image available"
/>
```

### Different Sizes

```tsx
<Thumbnail src="/img.jpg" size="xsmall" /> {/* 24×24 */}
<Thumbnail src="/img.jpg" size="small" />  {/* 40×40 */}
<Thumbnail src="/img.jpg" size="default" /> {/* 60×60 */}
<Thumbnail src="/img.jpg" size="large" />  {/* 80×80 */}
```

### Different Radii

```tsx
<Thumbnail src="/img.jpg" radius="full" /> {/* 8px radius */}
<Thumbnail src="/img.jpg" radius="half" /> {/* 4px radius */}
```

---

## Accessibility

- Always provide `alt` text for images
- Placeholder icon is decorative (not announced)
- Image uses `object-fit: cover` for consistent aspect ratio

---

## Fallback Behavior

| Condition | Display |
|-----------|---------|
| `src` provided | Image fills container |
| `src` not provided | ImagePlaceholderIcon centered |
| Image fails to load | Browser default (consider onError handler) |

---

## Do's and Don'ts

### Do's
- ✅ Provide meaningful alt text
- ✅ Use appropriate size for context
- ✅ Use consistent sizes in lists/grids
- ✅ Handle image loading errors gracefully

### Don'ts
- ❌ Don't use for avatars (use Avatar component)
- ❌ Don't stretch images out of aspect ratio
- ❌ Don't mix sizes inconsistently in the same context

---

## Related Components

- [Avatar](./avatar.md) - For user profile images
- [ImagePlaceholderIcon](./icons.md) - Fallback icon
