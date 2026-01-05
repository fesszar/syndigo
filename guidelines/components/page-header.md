# PageHeader

A page header component with breadcrumb navigation and action slots.

**Figma Source:** [Page Header](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22488-19490)

---

## Overview

The PageHeader component displays a page title with optional breadcrumb trail and action buttons. It uses a slot-based pattern for flexible composition of actions on the right side.

---

## Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Breadcrumb] / [Breadcrumb] / Title        [Actions Slot]   │
└─────────────────────────────────────────────────────────────┘
```

- **Left slot:** Breadcrumb trail + page title
- **Right slot:** Action buttons (RecipientSelector, buttons, etc.)

---

## Props

### PageHeader

```typescript
interface PageHeaderProps {
  /** Page title (required) */
  title: string;
  /** Breadcrumb trail (optional) */
  breadcrumbs?: BreadcrumbItem[];
  /** Actions slot - rendered on the right side */
  actions?: ReactNode;
  /** Whether to show bottom border (default: true) */
  showBorder?: boolean;
}

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}
```

### RecipientSelector

```typescript
interface RecipientSelectorProps {
  /** Current locale/recipient display text */
  label: string;
  /** Icon element (optional, defaults to globe) */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
}
```

---

## Visual Specifications

### Container
- **Height:** 62px (auto)
- **Padding:** 14px
- **Background:** white
- **Border:** bottom 1px solid #dee5ef

### Typography
- **Title:** Inter Semi Bold, 16px/20px, black
- **Breadcrumb links:** Inter Medium, 16px/20px, #4d5c6e
- **Max breadcrumb width:** 150px (truncated with ellipsis)

### Separator
- Slash icon, 12×12px, #91a0b3

---

## Usage Examples

### Simple Title Only

```tsx
import { PageHeader } from '@syndigo/components';

<PageHeader title="Dashboard" />
```

### With Breadcrumbs

```tsx
<PageHeader
  title="Men's Oxford Shoes"
  breadcrumbs={[
    { label: 'Product Catalog', onClick: () => navigate('/catalog') },
  ]}
/>
```

### Multi-level Breadcrumbs

```tsx
<PageHeader
  title="Vitamin Gummy.jpg"
  breadcrumbs={[
    { label: 'Product Catalog', onClick: () => navigate('/catalog') },
    { label: 'Forever Alert Daily...', onClick: () => navigate('/product/123') },
  ]}
/>
```

### With Actions

```tsx
import { PageHeader, RecipientSelector } from '@syndigo/components';

<PageHeader
  title="Men's Oxford Shoes"
  breadcrumbs={[{ label: 'Product Catalog' }]}
  actions={
    <RecipientSelector
      label="Global • English (US)"
      onClick={() => openLocaleSelector()}
    />
  }
/>
```

### With Button Actions

```tsx
import { PageHeader, Button } from '@syndigo/components';

<PageHeader
  title="Dashboard"
  actions={
    <Button variant="secondary" leftIcon={<SettingsIcon />}>
      Edit Dashboard
    </Button>
  }
/>
```

### Multiple Actions

```tsx
<PageHeader
  title="Product Details"
  breadcrumbs={[{ label: 'Products' }]}
  actions={
    <>
      <RecipientSelector label="Global • English (US)" />
      <Button variant="primary">Save</Button>
    </>
  }
/>
```

---

## Composition Pattern

The PageHeader follows the **slot pattern** for flexible composition:

1. **Left slot** - Fixed: breadcrumbs + title
2. **Right slot** - Flexible: any ReactNode passed to `actions`

This allows composing any combination of buttons, selectors, or custom components.

---

## Accessibility

- Uses semantic `<header>` element
- Breadcrumb links are keyboard accessible
- Actions inherit accessibility from child components
- Proper heading hierarchy maintained

---

## Do's and Don'ts

### Do's
- ✅ Use for page-level headers
- ✅ Keep breadcrumb labels concise
- ✅ Use consistent action patterns across pages
- ✅ Include navigation handlers for breadcrumbs

### Don'ts
- ❌ Don't nest PageHeader inside other headers
- ❌ Don't use for section headers (use SectionHeader)
- ❌ Don't exceed 4 breadcrumb levels
- ❌ Don't hide the title

---

## Related Components

- [Breadcrumb](./breadcrumb.md) - Standalone breadcrumb
- [Button](./button.md) - Action buttons
- [OpenPages](./open-pages.md) - Page tags
