# Button Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`

---

## Overview

The `<Button>` component is the primary interactive element for triggering actions. It supports multiple variants, states, and icon configurations.

## API

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'critical' | 'text';
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  // ...standard button HTML attributes
}
```

---

## Variants

### Primary

**When to use:**
- Main call-to-action on a page
- Form submission
- Completing a workflow step
- Actions you want users to take

```tsx
<Button variant="primary">Save Changes</Button>
<Button variant="primary">Submit</Button>
<Button variant="primary">Create New</Button>
```

| State | Background | Shadow |
|-------|------------|--------|
| Default | `--color-button-primary` (#2d75e2) | None |
| Hover | `--color-button-primary` (#2d75e2) | 0 3px 8px rgba(45,117,226,0.48) |
| Active | `--color-blue-400` (#5291f0) | None |
| Disabled | `--color-gray-200` (#dee5ef) | None |

### Secondary

**When to use:**
- Alternative actions alongside primary
- Cancel buttons
- Less prominent actions
- Navigation that looks like a button

```tsx
<Button variant="secondary">Cancel</Button>
<Button variant="secondary">Edit</Button>
<Button variant="secondary">View Details</Button>
```

| State | Background | Border | Shadow |
|-------|------------|--------|--------|
| Default | `--color-surface-white` (white) | `--color-stroke-light` (#dee5ef) | 0 1px 3px rgba(0,0,0,0.1) |
| Hover | `--color-surface-light` (#f7f9fb) | `--color-stroke-medium` (#91a0b3) | 0 1px 3px rgba(0,0,0,0.1) |
| Active | `--color-surface-light` (#f7f9fb) | `--color-stroke-light` (#dee5ef) | None |
| Disabled | `--color-surface-medium` (#dee5ef) | #dee5ef | None |

### Critical

**When to use:**
- Destructive actions (delete, remove)
- Irreversible operations
- Actions requiring extra caution

```tsx
<Button variant="critical">Delete</Button>
<Button variant="critical">Remove Item</Button>
<Button variant="critical">Permanently Delete</Button>
```

| State | Background | Shadow |
|-------|------------|--------|
| Default | `--color-system-critical` (#db3a3a) | None |
| Hover | `--color-system-critical` (#db3a3a) | 0 3px 8px rgba(219,58,58,0.48) |
| Active | `--color-red-400` (#f17676) | None |
| Disabled | `--color-gray-200` (#dee5ef) | None |

### Text

**When to use:**
- Inline actions within content
- Low-emphasis actions
- Links that behave like buttons
- Space-constrained areas

```tsx
<Button variant="text">Learn More</Button>
<Button variant="text">View All</Button>
<Button variant="text">Skip</Button>
```

| State | Color | Border | Font Weight |
|-------|-------|--------|-------------|
| Default | `--color-text-link` (#2d75e2) | None | 600 (semibold) |
| Hover | `--color-text-link` (#2d75e2) | Bottom: `--color-blue-200` (#c8deff) | 600 (semibold) |
| Active | `--color-text-link` (#2d75e2) | Bottom: `--color-blue-400` (#5291f0) | 600 (semibold) |
| Disabled | `--color-blue-300` (#85b4fb) | None | 600 (semibold) |

---

## States

### Default
Normal interactive state.

### Hover
Visual feedback when cursor is over button.

### Active (Clicked)
Visual feedback during click/press.

### Disabled
Non-interactive state. Use when:
- Action is not available
- Prerequisites not met
- Form is invalid

```tsx
<Button disabled>Cannot Submit</Button>
```

### Loading
Shows spinner while action is processing.

```tsx
<Button loading>Saving...</Button>
```

---

## Icons

### Start Icon (Left)

```tsx
<Button startIcon={<PlusIcon />}>Add Item</Button>
<Button variant="secondary" startIcon={<EditIcon />}>Edit</Button>
```

### End Icon (Right)

```tsx
<Button endIcon={<ArrowRightIcon />}>Next</Button>
<Button variant="secondary" endIcon={<ChevronDownIcon />}>Options</Button>
```

### Both Icons

```tsx
<Button startIcon={<FileIcon />} endIcon={<DownloadIcon />}>
  Download Report
</Button>
```

---

## Usage Examples

### Form Actions

```tsx
function FormActions() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </div>
  );
}
```

### Destructive Confirmation

```tsx
function DeleteConfirmation() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="critical">Delete Permanently</Button>
    </div>
  );
}
```

### Loading State

```tsx
function SubmitButton({ isSubmitting }) {
  return (
    <Button variant="primary" loading={isSubmitting} disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </Button>
  );
}
```

### With Icons

```tsx
function ActionButtons() {
  return (
    <>
      <Button variant="primary" startIcon={<PlusIcon />}>
        Create New
      </Button>
      <Button variant="secondary" endIcon={<ChevronDownIcon />}>
        More Options
      </Button>
    </>
  );
}
```

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use primary for main actions
<Button variant="primary">Submit</Button>

// Use secondary for alternative actions
<Button variant="secondary">Cancel</Button>

// Use critical for destructive actions
<Button variant="critical">Delete</Button>

// Pair cancel with primary action
<div>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</div>

// Use loading state for async actions
<Button loading={isLoading}>Save</Button>
```

### ❌ Don't

```tsx
// Don't use multiple primary buttons
<div>
  <Button variant="primary">Save</Button>
  <Button variant="primary">Save and Continue</Button> // Bad
</div>

// Don't use critical for non-destructive actions
<Button variant="critical">Submit</Button> // Bad

// Don't disable without explanation
<Button disabled>Submit</Button> // Provide tooltip or message

// Don't mix custom styles with variants
<Button variant="primary" style={{ backgroundColor: 'green' }}>
  Custom Color // Bad - breaks design system
</Button>
```

---

## Figma Mapping

| Figma Variant | Component Props |
|---------------|-----------------|
| `Button/Primary/Default/None` | `<Button variant="primary" />` |
| `Button/Primary/Default/Left` | `<Button variant="primary" startIcon={...} />` |
| `Button/Primary/Default/Right` | `<Button variant="primary" endIcon={...} />` |
| `Button/Primary/Hover/*` | Automatic on hover |
| `Button/Primary/Clicked/*` | Automatic on click |
| `Button/Primary/Disabled/*` | `<Button variant="primary" disabled />` |
| `Button/Secondary/Default/*` | `<Button variant="secondary" />` |
| `Button/Critical/Default/*` | `<Button variant="critical" />` |
| `Button/Text/Default/*` | `<Button variant="text" />` |

---

## Accessibility

- Always provide descriptive text or `aria-label`
- Disabled buttons should explain why via tooltip
- Loading state should announce to screen readers
- Maintain sufficient color contrast
