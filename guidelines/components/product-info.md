# ProductInfo

A generic info row component for displaying item details with optional avatar, badge, and trailing actions.

**Figma Source:** [Product Info](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-24089)

---

## Overview

ProductInfo is a **composition component** that displays a single row of information. It contains **no domain-specific data rules** - all content is passed via props.

**Use cases:**
- Metadata rows (workflow info, settings)
- Product list items
- Asset info rows
- Any key-value display row

---

## DS Components Used

This component can compose the following existing DS components:

| Component | Usage |
|-----------|-------|
| Avatar | Leading initials display |
| Thumbnail | Leading image display |
| CountIndicator | Badge count display |

---

## Props

```typescript
interface ProductInfoProps {
  /** Display type */
  type?: 'metadata' | 'product';
  /** Row level */
  level?: 'main' | 'sub';
  /** Visual state */
  state?: 'default' | 'hover' | 'disabled';
  /** Primary text */
  title: string;
  /** Secondary text */
  subtitle?: string;
  /** Metadata items (with dot separators) */
  metaItems?: string[];
  /** Leading content (avatar/thumbnail) */
  leadingContent?: ReactNode;
  /** Show badge */
  showBadge?: boolean;
  /** Badge count */
  badgeCount?: number | string;
  /** Badge type */
  badgeType?: 'critical' | 'success' | 'warning' | 'neutral' | 'default';
  /** Trailing icon */
  trailingIcon?: ReactNode;
  /** Show trailing icon */
  showTrailingIcon?: boolean;
  /** Click handler */
  onClick?: () => void;
}
```

---

## Visual Specifications

### Container
- **Padding:** 8px 16px
- **Gap:** 24px (between left/right)
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px
- **Background:** white (default)

### States

| State | Background | Opacity |
|-------|------------|---------|
| default | white | 1 |
| hover | #f7f9fb | 1 |
| disabled | white | 0.5 |

### Typography

| Element | Font | Size | Color |
|---------|------|------|-------|
| Title | Inter Medium | 12px | black |
| Subtitle | Inter Medium | 11px | #4d5c6e |
| Meta items | Inter Medium | 11px | #4d5c6e |

### Badge Colors

| Type | Background |
|------|------------|
| critical | #db3a3a |
| success | #0e8662 |
| warning | #f58319 |
| neutral | #4d5c6e |
| default | #4d5c6e |

---

## Usage Examples

### Metadata Type (with Avatar)

```tsx
import { ProductInfo } from '@syndigo/components';

<ProductInfo
  type="metadata"
  title="Media Enrichment"
  subtitle="Started at 09/24/2024 12:39:39 AM"
  leadingContent={<Avatar initials="FL" size="md" />}
  showBadge
  badgeCount={2}
  badgeType="critical"
/>
```

### Product Type (with Thumbnail)

```tsx
<ProductInfo
  type="product"
  title="Forever Alert Daily Vitamins"
  metaItems={['134 products', 'SKU 1234567890', 'Created by Jessica Javeed']}
  leadingContent={<Thumbnail src="/product.jpg" size="small" />}
/>
```

### Without Badge

```tsx
<ProductInfo
  title="Settings Item"
  subtitle="Description text"
  showBadge={false}
/>
```

### Disabled State

```tsx
<ProductInfo
  title="Disabled Item"
  state="disabled"
/>
```

### Custom Trailing Icon

```tsx
<ProductInfo
  title="Custom Action"
  trailingIcon={<EditIcon />}
/>
```

---

## Composition Pattern

ProductInfo is designed for composition with existing DS components:

```tsx
// With Avatar
<ProductInfo
  title="Workflow Name"
  leadingContent={
    <Avatar initials="WF" size="md" />
  }
/>

// With Thumbnail
<ProductInfo
  title="Product Name"
  leadingContent={
    <Thumbnail src={imageUrl} size="small" />
  }
/>

// With custom content
<ProductInfo
  title="Custom Item"
  leadingContent={
    <div className="custom-icon">...</div>
  }
/>
```

---

## No Domain-Specific Rules

This component does NOT:
- ❌ Fetch product data
- ❌ Format dates or IDs
- ❌ Apply business logic
- ❌ Transform input data

All formatting and data transformation should happen at the usage site:

```tsx
// Good - formatting done outside component
<ProductInfo
  title={product.name}
  subtitle={formatDate(product.createdAt)}
  metaItems={[
    `${product.count} products`,
    `SKU ${product.sku}`,
  ]}
/>

// Bad - expecting component to format
<ProductInfo
  product={productData}  // ❌ Don't pass raw domain objects
/>
```

---

## Do's and Don'ts

### Do's
- ✅ Use for info rows in lists
- ✅ Pass pre-formatted strings
- ✅ Compose with Avatar/Thumbnail
- ✅ Use appropriate badge types

### Don'ts
- ❌ Don't pass raw domain objects
- ❌ Don't expect date formatting
- ❌ Don't use for primary actions
- ❌ Don't use without title

---

## Related Components

- [Avatar](./avatar.md) - Initials display
- [Thumbnail](./thumbnail.md) - Image display
- [ProductPanel](./product-panel.md) - Product cards
