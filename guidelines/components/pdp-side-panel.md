# PDPSidePanel

A generic side panel component for displaying item details with image, metadata, and actions.

**Figma Source:** [PDP Side Panel](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22493-23238)

---

## Overview

The PDPSidePanel is a **generic, reusable** component for displaying detailed information about an item. It contains no product-specific logic - all data is passed via props.

**Use cases:**
- Product detail pages
- Asset information panels
- Item preview sidebars

---

## Props

```typescript
interface SidePanelMetaField {
  label: string;  // e.g., "Created By"
  value: string;  // e.g., "Jessica James"
}

interface PDPSidePanelProps {
  /** Show loading skeleton */
  loading?: boolean;
  /** Image URL */
  imageUrl?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Title text */
  title?: string;
  /** Type/category label */
  typeLabel?: string;
  /** Custom type icon */
  typeIcon?: ReactNode;
  /** Item identifier */
  itemId?: string;
  /** Metadata fields */
  metaFields?: SidePanelMetaField[];
  /** Favorite state */
  isFavorite?: boolean;
  /** Favorite click handler */
  onFavoriteClick?: () => void;
}
```

---

## Visual Specifications

### Container
- **Background:** white
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px
- **Padding:** 14px
- **Gap:** 14px

### Image Section
- **Aspect ratio:** 1:1 (square)
- **Border:** 1px solid #dee5ef
- **Border radius:** 6px
- **Favorite button:** 30×30px, top-right

### Typography
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Title | Inter | 16px | 500 | black |
| Type tag | Inter | 12px | 500 | #4d5c6e |
| ID | Inter | 12px | 500 | #4d5c6e |
| Meta label | Inter | 12px | 500 | #4d5c6e |
| Meta value | Inter | 13px | 500 | black |

### Type Tag
- **Height:** 24px
- **Padding:** 4px 7px
- **Background:** #f7f9fb
- **Border:** 1px solid #4d5c6e
- **Border radius:** 30px (pill)

---

## Usage Examples

### Basic Usage

```tsx
import { PDPSidePanel } from '@syndigo/components';

<PDPSidePanel
  imageUrl="/images/product.jpg"
  title="Men's Oxford, Casual Lace-Up Dress Shoes"
  typeLabel="Item"
  itemId="#17157359123978130443"
  metaFields={[
    { label: 'Created By', value: 'Jessica James' },
    { label: 'Created On', value: '01/07/2022 06:53 PM' },
  ]}
/>
```

### With Favorite

```tsx
<PDPSidePanel
  imageUrl="/images/product.jpg"
  title="Product Name"
  isFavorite={isFavorited}
  onFavoriteClick={() => toggleFavorite()}
  metaFields={[
    { label: 'SKU', value: 'ABC123' },
  ]}
/>
```

### Loading State

```tsx
<PDPSidePanel loading />
```

### Custom Type Icon

```tsx
<PDPSidePanel
  title="Asset Name"
  typeLabel="Digital Asset"
  typeIcon={<FileIcon />}
  metaFields={[
    { label: 'File Type', value: 'PNG' },
    { label: 'Size', value: '2.4 MB' },
  ]}
/>
```

### Without Image

```tsx
<PDPSidePanel
  title="Category Name"
  typeLabel="Category"
  metaFields={[
    { label: 'Items', value: '156' },
    { label: 'Last Updated', value: '12/05/2024' },
  ]}
/>
```

---

## States

### Default
Shows all content with image, title, type tag, ID, and metadata fields.

### Skeleton (Loading)
Shows animated placeholder bars while data is loading. Use when fetching item data.

```tsx
// Show skeleton while loading
{isLoading ? (
  <PDPSidePanel loading />
) : (
  <PDPSidePanel {...itemData} />
)}
```

---

## Do's and Don'ts

### Do's
- ✅ Use for displaying item details in sidebars
- ✅ Show loading skeleton during data fetch
- ✅ Pass all data via props (keep generic)
- ✅ Use appropriate meta fields for context

### Don'ts
- ❌ Don't hardcode product-specific logic
- ❌ Don't use without image when image is available
- ❌ Don't overcrowd with too many meta fields
- ❌ Don't use for non-detail contexts

---

## Related Components

- [ProductPanel](./product-panel.md) - Compact product cards
- [Modal](./modal.md) - Full modal for detailed views
