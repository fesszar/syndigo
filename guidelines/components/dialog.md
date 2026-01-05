# Dialog Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`, node `22480:10362`

---

## Overview

The `<Dialog>` component displays modal dialogs for confirmations, destructive actions, and error notifications. It includes built-in accessibility support with proper ARIA attributes and focus management.

## API

### Dialog

```tsx
interface DialogProps {
  type?: 'confirm' | 'destructive' | 'tooltip';
  open?: boolean;
  title?: string;
  children?: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onClose?: () => void;
  hideCloseButton?: boolean;
  hideSecondaryButton?: boolean;
  titleId?: string;
  descriptionId?: string;
  className?: string;
  style?: CSSProperties;
}
```

### TooltipDialog

```tsx
interface TooltipDialogProps {
  open?: boolean;
  categoryLabel?: string;
  errors?: string[];
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}
```

---

## Props

### type (default: 'confirm')
Dialog variant that determines the primary button styling.

| Type | Primary Button | Use Case |
|------|----------------|----------|
| `confirm` | Blue (#2d75e2) | Standard confirmations |
| `destructive` | Red (#db3a3a) | Dangerous/irreversible actions |
| `tooltip` | N/A | Use `TooltipDialog` instead |

### open
Controls dialog visibility. Dialog renders nothing when `false`.

### title
Header text displayed in the dialog header bar.

### children
Content to display in the dialog body. Can be a string or React nodes.

### primaryLabel / secondaryLabel
Button labels for the footer actions.

### onPrimaryAction / onSecondaryAction / onClose
Event handlers for user interactions.

---

## Figma → Props Mapping

| Figma Type | Component Props |
|------------|-----------------|
| `Type=Confirm` | `type="confirm"` |
| `Type=Destructive` | `type="destructive"` |
| `Type=Tooltip` | Use `<TooltipDialog>` component |

---

## Usage Examples

### Confirmation Dialog

```tsx
import { Dialog } from '@syndigo/design-system';

function ConfirmDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      type="confirm"
      title="Save Changes"
      primaryLabel="Save"
      secondaryLabel="Cancel"
      onPrimaryAction={() => {
        saveChanges();
        setOpen(false);
      }}
      onClose={() => setOpen(false)}
    >
      Are you sure you want to save these changes?
    </Dialog>
  );
}
```

### Destructive Dialog

```tsx
<Dialog
  open={isOpen}
  type="destructive"
  title="Delete Item"
  primaryLabel="Delete"
  secondaryLabel="Cancel"
  onPrimaryAction={handleDelete}
  onClose={() => setIsOpen(false)}
>
  This action cannot be undone. Are you sure you want to delete this item?
</Dialog>
```

### Error Tooltip Dialog

```tsx
import { TooltipDialog } from '@syndigo/design-system';

<TooltipDialog
  open={hasErrors}
  categoryLabel="ERRORS TO FIX"
  errors={[
    'Value 1: Invalid characters',
    'Value 2: Required',
    'Character count must be under 250',
  ]}
  actionLabel="Fix errors"
  onAction={scrollToFirstError}
  onClose={() => setHasErrors(false)}
/>
```

---

## Visual Specifications

### Container
- Min width: 380px
- Max width: 500px
- Border: 1px solid `#dee5ef`
- Border radius: 4px
- Shadow: 0 14px 18px rgba(77, 92, 110, 0.15)

### Header
- Background: `#f7f9fb` (surface/light)
- Border bottom: 1px solid `#dee5ef`
- Padding: 8px vertical, 10px horizontal
- Title: 11px semibold, black

### Content
- Background: white
- Padding: 20px
- Text: 13px medium, `#4d5c6e`

### Footer
- Background: white
- Padding: 0 top, 20px bottom, 16px horizontal
- Button gap: 8px

### Buttons
- Secondary: 32px height, white bg, border `#dee5ef`, shadow
- Primary: 34px height, blue `#2d75e2` bg
- Critical: 34px height, red `#db3a3a` bg

### Tooltip Dialog
- Red accent bar: 3px width, `#db3a3a`
- Category label: 10px semibold caps, `#4d5c6e`
- Error text: 12px medium, `#db3a3a`
- Content padding: 12px
- Error list gap: 4px

---

## Accessibility

### ARIA Attributes
- `role="dialog"` on the dialog container
- `aria-modal="true"` to indicate modal behavior
- `aria-labelledby` pointing to the title element
- `aria-describedby` pointing to the content element

### Focus Management
- Escape key closes the dialog
- Clicking outside (backdrop) closes the dialog
- Body scroll is prevented when dialog is open
- Close button has `aria-label="Close dialog"`

### Usage Notes
```tsx
// IDs are auto-generated, but can be customized:
<Dialog
  titleId="my-dialog-title"
  descriptionId="my-dialog-description"
  ...
/>
```

---

## Button Arrangement

| Dialog Type | Secondary | Primary |
|-------------|-----------|---------|
| Confirm | Left (Cancel) | Right (Blue) |
| Destructive | Left (Cancel) | Right (Red) |

Footer buttons are right-aligned with secondary button first.

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use destructive type for dangerous actions
<Dialog type="destructive" title="Delete Product" ... />

// Provide clear action labels
<Dialog primaryLabel="Save Changes" secondaryLabel="Discard" ... />

// Handle close properly
<Dialog onClose={() => setOpen(false)} ... />
```

### ❌ Don't

```tsx
// Don't use confirm type for destructive actions
<Dialog type="confirm" title="Delete All" ... /> // ❌

// Don't hide close button without alternative
<Dialog hideCloseButton ... /> // Ensure onSecondaryAction closes

// Don't use very long content without scrolling
<Dialog>Very long content...</Dialog> // Consider breaking up
```

---

## Color Reference

| Element | Token | Hex |
|---------|-------|-----|
| Header background | `--surface-light` | #f7f9fb |
| Header border | `--surface-medium` | #dee5ef |
| Content text | `--text-secondary` | #4d5c6e |
| Primary button | `--button-primary` | #2d75e2 |
| Critical button | `--system-critical` | #db3a3a |
| Close icon | `--icon-secondary` | #718094 |
