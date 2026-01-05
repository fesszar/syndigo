# ProductPanel

A product detail card for displaying product information.

**Figma Source:** [Product Panel](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22490-19517)

---

## Overview

The ProductPanel component displays product information in a card layout. It's a layout/presentation component with no app logic.

---

## Props

```typescript
interface ProductPanelProps {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  typeLabel?: string;
  productId?: string;
  metaFields?: ProductMetaField[];
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onClick?: () => void;
  typeIcon?: ReactNode;
}

interface ProductMetaField {
  label: string;
  value: string;
}
```

---

## Visual Specifications

| Element | Value |
|---------|-------|
| Container padding | 14px |
| Container border | 1px solid #dee5ef |
| Container radius | 4px |
| Image aspect ratio | 1:1 |
| Favorite button | 30×30px, top-right |
| Title font | Inter Medium, 16px |
| Tag height | 24px, pill shape |

---

## Usage

```tsx
import { ProductPanel } from '@syndigo/components';

<ProductPanel
  title="Men's Oxford Shoes"
  imageUrl="/images/product.jpg"
  typeLabel="Item"
  productId="17157359123978130443"
  metaFields={[
    { label: 'Created By', value: 'Jessica James' },
    { label: 'Created On', value: '01/07/2022 06:53 PM' },
  ]}
  isFavorite={false}
  onFavoriteClick={() => toggleFavorite()}
/>
```

---

## Do's and Don'ts

### Do's
- Use for product detail views
- Pass click handlers for interactions
- Keep metadata fields concise

### Don'ts
- Don't include app/business logic
- Don't modify internal styling
