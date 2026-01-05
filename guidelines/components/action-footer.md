# ActionFooter Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk` (node-id: 11397-44312)

---

## Overview

The `<ActionFooter>` component is a standardized footer bar for dialogs, panels, and forms. It contains action buttons (typically Save/Cancel) aligned to the right with consistent spacing.

## Purpose

- Provide consistent action placement across dialogs and panels
- Ensure proper button hierarchy (primary action prominent)
- Maintain spacing and styling from design system

---

## API

```tsx
interface ActionFooterProps {
  showSecondaryButton?: boolean;  // default: true
  primaryLabel?: string;          // default: "Save"
  secondaryLabel?: string;        // default: "Cancel"
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  primaryLoading?: boolean;
  primaryButton?: ReactNode;      // Custom override
  secondaryButton?: ReactNode;    // Custom override
  className?: string;
  style?: CSSProperties;
}
```

---

## Variants

### With Secondary Button (Default)

Shows both Cancel and Save buttons.

```tsx
<ActionFooter
  primaryLabel="Save"
  secondaryLabel="Cancel"
  onPrimaryClick={handleSave}
  onSecondaryClick={handleCancel}
/>
```

### Primary Only

Shows only the primary action button.

```tsx
<ActionFooter
  showSecondaryButton={false}
  primaryLabel="Done"
  onPrimaryClick={handleDone}
/>
```

### Loading State

Primary button shows loading spinner.

```tsx
<ActionFooter
  primaryLabel="Saving..."
  primaryLoading
  onSecondaryClick={handleCancel}
/>
```

### Disabled State

```tsx
<ActionFooter
  primaryLabel="Save"
  primaryDisabled={!isFormValid}
  onPrimaryClick={handleSave}
  onSecondaryClick={handleCancel}
/>
```

---

## Examples

### Example 1: Edit Dialog Footer

```tsx
function EditProductDialog({ onClose, onSave, isSubmitting }) {
  return (
    <Dialog>
      <DialogHeader title="Edit Product" />
      <DialogBody>
        {/* Form fields */}
      </DialogBody>
      <ActionFooter
        primaryLabel={isSubmitting ? "Saving..." : "Save Changes"}
        secondaryLabel="Cancel"
        onPrimaryClick={onSave}
        onSecondaryClick={onClose}
        primaryLoading={isSubmitting}
        primaryDisabled={isSubmitting}
      />
    </Dialog>
  );
}
```

### Example 2: Confirmation Panel

```tsx
function ConfirmationPanel({ onConfirm, onCancel }) {
  return (
    <Panel>
      <PanelContent>
        <Text>Are you sure you want to publish these changes?</Text>
      </PanelContent>
      <ActionFooter
        primaryLabel="Publish"
        secondaryLabel="Go Back"
        onPrimaryClick={onConfirm}
        onSecondaryClick={onCancel}
      />
    </Panel>
  );
}
```

---

## Styling Tokens

| Property | Token |
|----------|-------|
| Background | `--color-surface-white` |
| Border top | `--color-stroke-light` |
| Gap | `--spacing-8` (8px) |
| Padding horizontal | `--spacing-16` (16px) |
| Padding vertical | `--spacing-8` (8px) |

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use ActionFooter for dialog/panel actions
<Dialog>
  <DialogBody>{/* content */}</DialogBody>
  <ActionFooter
    primaryLabel="Confirm"
    secondaryLabel="Cancel"
  />
</Dialog>

// Show loading state during async operations
<ActionFooter
  primaryLoading={isSubmitting}
  primaryLabel="Save"
/>

// Disable when form is invalid
<ActionFooter
  primaryDisabled={!isValid}
  primaryLabel="Submit"
/>

// Use descriptive button labels
<ActionFooter
  primaryLabel="Publish Changes"
  secondaryLabel="Discard"
/>
```

### ❌ Don't

```tsx
// Don't use custom buttons with raw styles
<ActionFooter
  primaryButton={
    <button style={{ backgroundColor: 'blue' }}>Save</button>
  }
/>

// Don't put ActionFooter in the middle of content
<div>
  <ActionFooter />  {/* Should be at bottom */}
  <Content />
</div>

// Don't use vague labels
<ActionFooter
  primaryLabel="OK"
  secondaryLabel="No"
/>

// Don't hide secondary button for destructive actions
<ActionFooter
  showSecondaryButton={false}
  primaryLabel="Delete All"  {/* User needs escape! */}
/>
```

---

## Figma Mapping

| Figma Property | Component Prop |
|----------------|----------------|
| `secondaryButton=true` | `showSecondaryButton={true}` |
| `secondaryButton=false` | `showSecondaryButton={false}` |
| Button label | `primaryLabel`, `secondaryLabel` |

---

## Accessibility

- Primary action should be focusable first (tab order)
- Escape key should trigger secondary/cancel action
- Loading state should be announced to screen readers
- Disabled buttons should explain why via tooltip
