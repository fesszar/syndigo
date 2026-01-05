# EmptyState Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`, node `22481:10408`

---

## Overview

The `<EmptyState>` component displays a centered message with an icon when there's no content to show. It supports preset types (recipient, search, tasks) with customizable content and optional action buttons.

## API

```tsx
interface EmptyStateProps {
  type?: 'recipient' | 'search' | 'tasks';
  icon?: ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  noBorder?: boolean;
  className?: string;
  style?: CSSProperties;
}
```

---

## Props

### type (default: 'recipient')
Preset type that provides default icon, title, and description.

| Type | Icon | Default Title | Default Description |
|------|------|---------------|---------------------|
| `recipient` | Building | "No linked recipients." | "Select the retailers or channels..." |
| `search` | Search | "No results found" | "No results matched your search criteria." |
| `tasks` | Sun | "All caught up" | "No action needed at this time." |

### icon
Custom icon element. Overrides the default icon for the selected type.

### title
Custom title text. Overrides the default title for the selected type.

### description
Custom description text. Overrides the default description for the selected type.

### actionLabel / onAction
Shows an action button. Both must be provided for the button to render.

### noBorder
When `true`, removes the container border and background.

---

## Figma → Props Mapping

| Figma Type | Component Props |
|------------|-----------------|
| `Type=Recipient` | `type="recipient"` |
| `Type=Search` | `type="search"` |
| `Type=Tasks` | `type="tasks"` |
| `button=true` | `actionLabel="..." onAction={...}` |

---

## Usage Examples

### Recipient Empty State

```tsx
import { EmptyState } from '@syndigo/design-system';

<EmptyState
  type="recipient"
  actionLabel="Add Recipients"
  onAction={() => openRecipientModal()}
/>
```

### Search Empty State

```tsx
<EmptyState
  type="search"
  actionLabel="Clear Search"
  onAction={() => clearFilters()}
/>
```

### Tasks Complete

```tsx
<EmptyState type="tasks" />
```

### Custom Empty State

```tsx
<EmptyState
  icon={<CustomIcon />}
  title="No products yet"
  description="Start by adding your first product to the catalog."
  actionLabel="Add Product"
  onAction={() => navigate('/products/new')}
/>
```

### Without Border (inline use)

```tsx
<EmptyState
  type="search"
  noBorder
/>
```

---

## Visual Specifications

### Container
- Background: white
- Border: 1px solid `#dee5ef`
- Border radius: 16px
- Padding: 64px

### Icon
- Size: 50px × 50px
- Color: `#91a0b3` (icon/tertiary)

### Title
- Font: 14px bold
- Color: black (text/primary)
- Line height: 18px

### Description
- Font: 12px medium
- Color: `#91a0b3` (text/tertiary)
- Line height: 14px

### Text Wrapper
- Width: 320px
- Gap: 4px between title and description
- Padding: 16px top, 32px bottom
- Text align: center

### Action Button
- Height: 34px
- Background: white
- Border: 1px solid `#dee5ef`
- Border radius: 4px
- Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
- Font: 12px medium

---

## Default Content by Type

### Recipient
```tsx
{
  icon: <BuildingIcon />,
  title: "No linked recipients.",
  description: "Select the retailers or channels you'd like to share your product data with.",
  actionLabel: "Add Recipients"
}
```

### Search
```tsx
{
  icon: <SearchIcon />,
  title: "No results found",
  description: "No results matched your search criteria.",
  actionLabel: "Clear Search"
}
```

### Tasks
```tsx
{
  icon: <SunIcon />,
  title: "All caught up",
  description: "No action needed at this time."
}
```

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use preset types for common scenarios
<EmptyState type="search" ... />

// Customize text while keeping the icon
<EmptyState
  type="recipient"
  title="No vendors selected"
  description="Choose vendors to collaborate with."
/>

// Provide both actionLabel AND onAction for buttons
<EmptyState
  actionLabel="Add Item"
  onAction={handleAdd}
/>
```

### ❌ Don't

```tsx
// Don't provide actionLabel without onAction
<EmptyState actionLabel="Add" /> // Button won't render

// Don't use very long descriptions
<EmptyState description="Very very long text..." />

// Don't invent new types - use custom props instead
<EmptyState type="custom" /> // ❌ Not supported
```

---

## Color Reference

| Element | Token | Hex |
|---------|-------|-----|
| Container bg | `--surface-white` | white |
| Border | `--stroke-light` | #dee5ef |
| Icon | `--icon-tertiary` | #91a0b3 |
| Title | `--text-primary` | black |
| Description | `--text-tertiary` | #91a0b3 |
| Button bg | `--surface-white` | white |
| Button border | `--stroke-light` | #dee5ef |
