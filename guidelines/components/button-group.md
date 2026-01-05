# ButtonGroup Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

The `<ButtonGroup>` component groups related buttons together with consistent spacing and alignment. It reuses the `<Button>` component internally.

## API

```tsx
interface ButtonGroupProps {
  orientation?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'end';
  gap?: number | string;
  attached?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
```

---

## Properties

### Orientation

Controls the direction buttons are laid out.

| Value | Description |
|-------|-------------|
| `horizontal` | Buttons in a row (default) |
| `vertical` | Buttons in a column |

### Alignment

Controls how buttons are aligned within the group.

| Value | Description |
|-------|-------------|
| `start` | Align to start (left/top) |
| `center` | Center alignment |
| `end` | Align to end (right/bottom) - default |

### Gap

Space between buttons. Default is `8px` (from Figma `--p-space-button-group-gap`).

### Attached

When `true`, buttons are visually connected with shared borders and adjusted radii.

### Full Width

When `true`, the group expands to fill its container.

---

## Usage Examples

### Basic Horizontal Group

```tsx
import { ButtonGroup, Button } from '@syndigo/design-system';

function FormActions() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  );
}
```

### Vertical Group

```tsx
function VerticalActions() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="critical">Delete</Button>
      <Button variant="text">Cancel</Button>
    </ButtonGroup>
  );
}
```

### Left-Aligned Group

```tsx
function LeftAlignedActions() {
  return (
    <ButtonGroup align="start">
      <Button variant="secondary">Back</Button>
      <Button variant="primary">Continue</Button>
    </ButtonGroup>
  );
}
```

### Attached Buttons (Segmented)

```tsx
function SegmentedControl() {
  return (
    <ButtonGroup attached>
      <Button variant="secondary">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
    </ButtonGroup>
  );
}
```

### Custom Gap

```tsx
function WidelySpacedButtons() {
  return (
    <ButtonGroup gap={16}>
      <Button variant="secondary">Option A</Button>
      <Button variant="secondary">Option B</Button>
    </ButtonGroup>
  );
}
```

### Full Width

```tsx
function FullWidthActions() {
  return (
    <ButtonGroup fullWidth align="end">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </ButtonGroup>
  );
}
```

---

## Common Patterns

### Form Footer

```tsx
function FormFooter({ onCancel, onSubmit, isSubmitting }) {
  return (
    <ButtonGroup>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button 
        variant="primary" 
        onClick={onSubmit}
        loading={isSubmitting}
      >
        Submit
      </Button>
    </ButtonGroup>
  );
}
```

### Delete Confirmation

```tsx
function DeleteConfirmation({ onCancel, onDelete }) {
  return (
    <ButtonGroup orientation="vertical" align="center">
      <Button variant="critical" onClick={onDelete}>
        Delete Permanently
      </Button>
      <Button variant="text" onClick={onCancel}>
        Cancel
      </Button>
    </ButtonGroup>
  );
}
```

### Toolbar Actions

```tsx
function Toolbar() {
  return (
    <ButtonGroup gap={4}>
      <Button variant="secondary" startIcon={<EditIcon />}>Edit</Button>
      <Button variant="secondary" startIcon={<CopyIcon />}>Copy</Button>
      <Button variant="secondary" startIcon={<DeleteIcon />}>Delete</Button>
    </ButtonGroup>
  );
}
```

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use ButtonGroup for related actions
<ButtonGroup>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>

// Use vertical for stacked CTAs
<ButtonGroup orientation="vertical">
  <Button variant="primary">Primary Action</Button>
  <Button variant="text">Secondary Action</Button>
</ButtonGroup>

// Use attached for segmented controls
<ButtonGroup attached>
  <Button>Option 1</Button>
  <Button>Option 2</Button>
</ButtonGroup>
```

### ❌ Don't

```tsx
// Don't manually add spacing between buttons
<div style={{ display: 'flex', gap: '8px' }}>
  <Button>Cancel</Button>
  <Button>Save</Button>
</div>

// Don't mix unrelated actions
<ButtonGroup>
  <Button>Save</Button>
  <Button>Help</Button>  {/* Unrelated action */}
</ButtonGroup>

// Don't use too many buttons in one group
<ButtonGroup>
  <Button>A</Button>
  <Button>B</Button>
  <Button>C</Button>
  <Button>D</Button>
  <Button>E</Button>  {/* Too many! */}
</ButtonGroup>
```

---

## Figma Mapping

| Figma Property | Component Prop |
|----------------|----------------|
| Direction: Horizontal | `orientation="horizontal"` |
| Direction: Vertical | `orientation="vertical"` |
| Gap (tight/8px) | `gap={8}` (default) |
| Justify: End | `align="end"` (default) |
| Justify: Start | `align="start"` |
| Justify: Center | `align="center"` |

---

## Spacing Token

The default gap uses the Figma token `--p-space-button-group-gap` which equals `8px`.

---

## Accessibility

- ButtonGroup should contain semantically related actions
- Consider wrapping in a `<nav>` or using `role="group"` for screen readers
- Ensure focus order is logical (left-to-right or top-to-bottom)
