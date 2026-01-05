# Table

A data table with header, rows, and cells.

**Figma Source:** [Table](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22499-29218)

---

## Overview

Table provides a **structural layout** for tabular data. It is NOT a full data-grid - use existing DS components inside cells for content types.

**Use cases:**
- Data display
- Product lists
- User lists

---

## Components

| Component | Description |
|-----------|-------------|
| `Table` | Container |
| `TableHeader` | Header row |
| `TableHeaderCell` | Column header |
| `TableRow` | Data row |
| `TableCell` | Data cell |

---

## Reuse Existing Components

**For cell content, use existing DS components:**

| Cell Type | Use Component |
|-----------|---------------|
| Status | `StatusIndicator` |
| User | `Avatar` + text |
| Action | `Button` |
| Count | `CountIndicator` |

---

## Visual Specifications

### Header
- **Height:** 40px
- **Padding:** 0 16px
- **Font:** Inter Medium, 12px
- **Color:** #4d5c6e

### Row
- **Height:** 42px
- **Padding:** 0 16px
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px
- **Background:** white
- **Hover:** #f7f9fb
- **Selected:** #e7f1ff

### Cell
- **Height:** 40px
- **Padding:** 0 16px
- **Gap:** 10px
- **Font:** Inter Medium, 12px

---

## Usage Examples

### Basic Table

```tsx
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from '@syndigo/components';

<Table>
  <TableHeader>
    <TableHeaderCell sortable>Name</TableHeaderCell>
    <TableHeaderCell sortable>Status</TableHeaderCell>
    <TableHeaderCell>Actions</TableHeaderCell>
  </TableHeader>
  <TableRow>
    <TableCell>Product Name</TableCell>
    <TableCell>Active</TableCell>
    <TableCell>Edit</TableCell>
  </TableRow>
</Table>
```

### With Existing Components

```tsx
import { 
  Table, TableHeader, TableHeaderCell, TableRow, TableCell,
  StatusIndicator,
  Avatar,
  Button,
} from '@syndigo/components';

<Table>
  <TableHeader>
    <TableHeaderCell width={200}>Product</TableHeaderCell>
    <TableHeaderCell>Status</TableHeaderCell>
    <TableHeaderCell>Owner</TableHeaderCell>
    <TableHeaderCell width={100}>Actions</TableHeaderCell>
  </TableHeader>
  
  <TableRow onClick={() => selectRow(1)}>
    <TableCell>
      <img src={productImage} style={{ width: 30, height: 30, borderRadius: 4 }} />
      Product Name
    </TableCell>
    <TableCell>
      <StatusIndicator type="success" label="Synchronized" />
    </TableCell>
    <TableCell>
      <Avatar size="sm" name="John Doe" />
      John Doe
    </TableCell>
    <TableCell>
      <Button variant="text">Edit</Button>
    </TableCell>
  </TableRow>
</Table>
```

---

## What's NOT Included (Don't Invent)

This is a **DS-scoped table**, NOT a data-grid:

- ❌ Built-in sorting logic (use `onSort` callback)
- ❌ Built-in filtering
- ❌ Built-in pagination
- ❌ Virtual scrolling
- ❌ Column resizing
- ❌ Cell editing

---

## Accessibility

- `role="table"` on container
- `role="row"` on rows
- `role="columnheader"` on header cells
- `role="cell"` on data cells
- Keyboard navigation via native focus

---

## Do's and Don'ts

### Do's
- ✅ Use existing DS components in cells
- ✅ Keep cells simple
- ✅ Use sortable for sortable columns
- ✅ Show row selection state

### Don'ts
- ❌ Don't recreate StatusIndicator, Avatar, Button
- ❌ Don't build a full data-grid
- ❌ Don't add complex cell types
- ❌ Don't override DS styling

---

## Related Components

- [StatusIndicator](./status-indicator.md) - Status cells
- [Avatar](./avatar.md) - User cells
- [Button](./button.md) - Action cells
- [CountIndicator](./count-indicator.md) - Count badges
