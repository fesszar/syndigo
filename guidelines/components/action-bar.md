# ActionBar Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk` (node-id: 18461-39369)

---

## Overview

The `<ActionBar>` component is a flexible toolbar container with left/center/right slots for actions, filters, and navigation. It matches Figma's auto-layout behavior for consistent spacing and alignment.

## Purpose

- Provide consistent toolbar layout across different views
- Support context-specific actions (search, filters, toggles)
- Maintain spacing and alignment from design system

---

## API

```tsx
interface ActionBarProps {
  variant?: 'attributes' | 'relationships' | 'assets' | 'productSearch';
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  showBorder?: boolean;      // default: true
  altBackground?: boolean;   // default: false
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
```

---

## Variants (from Figma)

| Variant | Background | Border | Use Case |
|---------|------------|--------|----------|
| `attributes` | `--color-surface-white` | Bottom | Attribute editing views |
| `relationships` | `--color-surface-white` | Bottom | Relationship management |
| `assets` | `--color-surface-white` | Bottom | Asset management |
| `productSearch` | `#e7ecf4` | None | Product search page |

### Variant Content Structure

| Variant | Leading (Left) | Trailing (Right) |
|---------|----------------|------------------|
| `attributes` | AttributeGroupSelector, SearchInput, FilterIcon | AI stars icon |
| `relationships` | *None* | List/Grid view toggle icons |
| `assets` | *None* | List/Grid view toggle icons |
| `productSearch` | AI button, Search, SavedFilters, AdvancedSearch | View toggles, Grid icon |

**Note:** The `relationships` and `assets` variants only display trailing (right) content. Use the `right` slot prop for these variants.

---

## Slot API

### Left Slot
Contains primary actions like selectors, search inputs.

### Center Slot (optional)
Contains centered content like tabs or titles.

### Right Slot
Contains trailing actions like filters, view toggles.

---

## Usage Examples

### Example 1: Attributes View

```tsx
import { ActionBar, TextField, Button } from '@syndigo/design-system';

function AttributesActionBar() {
  return (
    <ActionBar
      variant="attributes"
      left={
        <>
          <AttributeGroupSelector />
          <TextField placeholder="Search attributes" />
          <FilterButton />
        </>
      }
      right={
        <AIAssistButton />
      }
    />
  );
}
```

### Example 2: Relationships/Assets (Right Only)

```tsx
function RelationshipsActionBar() {
  return (
    <ActionBar
      variant="relationships"
      right={
        <>
          <IconButton icon="list" active />
          <IconButton icon="grid" />
        </>
      }
    />
  );
}
```

### Example 3: Product Search

```tsx
function ProductSearchActionBar() {
  return (
    <ActionBar
      variant="productSearch"
      left={
        <>
          <AISearchButton />
          <TextField placeholder="Search products" />
          <SavedFiltersDropdown />
          <Button variant="primary">Advanced Search</Button>
        </>
      }
      right={
        <>
          <ViewToggle />
          <GridButton />
        </>
      }
    />
  );
}
```

### Example 3: Using Children

```tsx
function CustomActionBar() {
  return (
    <ActionBar>
      <ActionBar.Left>
        <SearchInput />
      </ActionBar.Left>
      <ActionBar.Center>
        <TabNavigation />
      </ActionBar.Center>
      <ActionBar.Right>
        <IconButton icon="settings" />
      </ActionBar.Right>
    </ActionBar>
  );
}
```

---

## Styling Tokens

| Property | Token | Value |
|----------|-------|-------|
| Background | `--color-surface-white` | white |
| Alt Background | (literal) | `#e7ecf4` |
| Border | `--color-stroke-light` | #dee5ef |
| Padding | `--spacing-16` | 16px |
| Gap (left slot) | `--spacing-16` | 16px |
| Gap (right slot) | `--spacing-8` | 8px |
| Border radius (top) | `--radius-sm` | 4px |

**Note:** `#e7ecf4` is a composed-style exception for the product search variant as specified in Figma.

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use ActionBar for consistent toolbar layout
<ActionBar
  left={<SearchInput />}
  right={<FilterButton />}
/>

// Use variant for context-specific styling
<ActionBar variant="productSearch">
  <ProductSearchControls />
</ActionBar>

// Group related actions in slots
<ActionBar
  left={
    <>
      <Selector />
      <Search />
    </>
  }
/>

// Use compound components for complex layouts
<ActionBar>
  <ActionBar.Left>
    <Content />
  </ActionBar.Left>
</ActionBar>
```

### ❌ Don't

```tsx
// Don't use ActionBar for footer actions
<ActionBar>
  <Button>Cancel</Button>
  <Button>Save</Button>  {/* Use ActionFooter instead */}
</ActionBar>

// Don't override layout tokens
<ActionBar style={{ padding: '8px' }}>  {/* Inconsistent */}
  <Content />
</ActionBar>

// Don't mix slots and children
<ActionBar left={<A />}>
  <B />  {/* Confusing! Use one pattern */}
</ActionBar>

// Don't add too many actions
<ActionBar
  left={
    <>
      <A /><B /><C /><D /><E /><F />  {/* Too crowded! */}
    </>
  }
/>
```

---

## Figma Mapping

| Figma Property | Component Prop |
|----------------|----------------|
| `Type=Attributes` | `variant="attributes"` |
| `Type=Relationships` | `variant="relationships"` |
| `Type=Assets` | `variant="assets"` |
| `Type=Product Search` | `variant="productSearch"` |
| Leading slot | `left` prop |
| Trailing slot | `right` prop |

---

## Accessibility

- ActionBar should use `role="toolbar"` if it contains action buttons
- Ensure keyboard navigation works for all interactive elements
- Group related actions with proper ARIA labels
