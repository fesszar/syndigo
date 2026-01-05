# OpenPages

A colored pill badge component indicating open pages/sections in navigation.

**Figma Source:** [Open Pages](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22486-19167)

---

## Overview

The OpenPages component displays colored pill badges representing different open pages or sections. It's UI-only with no routing logic - click handlers are passed in by the parent.

---

## Page Types

| Type | Label | Background | Text Color |
|------|-------|------------|------------|
| `digitalAssets` | Digital Assets | #cbffb7 | #4d5c6e |
| `product` | Product | #c8deff | #4d5c6e |
| `rdm` | Reference Data Management | #ffd6b0 | #4d5c6e |
| `edit` | Currently Editing | transparent | #4d5c6e |
| `productDetails` | Product Details | #5291f0 | #efefef |
| `tdm` | Taxonomy Data Management | #ffd6d6 | #4d5c6e |
| `bulkEdit` | Bulk Edit | #4d5c6e | #efefef |
| `settings` | Settings | #dee5ef | #4d5c6e |
| `syndication` | Syndication | #d1fff1 | #4d5c6e |
| `reporting` | Reporting | #505050 | white |
| `apps` | Apps | #8fedd0 | #4d5c6e |
| `backgroundTasks` | Background Tasks | #d4b3ff | #4d5c6e |

---

## Props

### OpenPages

```typescript
interface OpenPagesProps {
  /** Page type determines color and label */
  type: OpenPagesType;
  /** Custom label override (optional) */
  label?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
```

### OpenPagesList

```typescript
interface OpenPagesListProps {
  /** Array of page items to display */
  items: Array<{
    type: OpenPagesType;
    label?: string;
    id?: string;
  }>;
  /** Click handler for individual items */
  onItemClick?: (type: OpenPagesType, id?: string) => void;
  /** Gap between items (default: 5) */
  gap?: number;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
}
```

---

## Visual Specifications

### Dimensions
- **Height:** ~15px (auto)
- **Padding:** 2px vertical, 10px horizontal
- **Border radius:** 40px (pill shape)

### Typography
- **Font:** Inter Medium
- **Size:** 9px
- **Line height:** 11px

### Special Variants
- **Edit type:** Includes edit icon (12×12px) before label

---

## Usage Examples

### Single Badge

```tsx
import { OpenPages } from '@syndigo/components';

<OpenPages type="digitalAssets" />
<OpenPages type="product" onClick={() => navigateToProduct()} />
<OpenPages type="edit" />
```

### Custom Label

```tsx
<OpenPages type="product" label="Product ABC-123" />
```

### List of Pages

```tsx
import { OpenPagesList } from '@syndigo/components';

<OpenPagesList
  items={[
    { type: 'digitalAssets' },
    { type: 'product', label: 'SKU-12345' },
    { type: 'settings' },
  ]}
  onItemClick={(type, id) => handleNavigate(type, id)}
  direction="vertical"
  gap={5}
/>
```

### Horizontal Layout

```tsx
<OpenPagesList
  items={openPages}
  direction="horizontal"
  gap={8}
/>
```

---

## Accessibility

- Interactive badges have `role="button"` and `tabIndex={0}`
- Click handlers are keyboard accessible
- Color contrast meets WCAG AA for text

---

## Do's and Don'ts

### Do's
- ✅ Use to indicate currently open pages/tabs
- ✅ Pass click handlers for navigation
- ✅ Use in sidebars, headers, or breadcrumbs
- ✅ Keep labels concise

### Don'ts
- ❌ Don't include routing logic in the component
- ❌ Don't use for status indicators (use StatusBadge instead)
- ❌ Don't override colors - use predefined types

---

## Related Components

- [StatusBadge](./status-badge.md) - For status indicators
- [Tag](./tag.md) - For categorization labels
