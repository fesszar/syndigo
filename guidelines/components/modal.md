# Modal

A modal component for displaying complex content like forms, selections, and multi-step flows.

**Figma Source:** [Modal](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=14720-20653)

---

## Modal vs Dialog Decision Rule

| Use **Modal** when... | Use **Dialog** when... |
|-----------------------|------------------------|
| Displaying forms or complex inputs | Simple yes/no confirmations |
| Multi-step flows or wizards | Destructive action warnings |
| Product selection or search | Alert messages |
| Content requires significant space | Quick user decisions |
| User needs to perform actions | Brief acknowledgments |

**Key Differences:**

| Feature | Modal | Dialog |
|---------|-------|--------|
| Width | 380/620/980px (S/M/L) | 380-500px fixed |
| Title size | 16px | 11px |
| Content | Flexible slot | Simple text |
| Use case | Complex content | Confirmations |

---

## Props

```typescript
interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Modal title */
  title?: string;
  /** Whether to show title bar */
  showTitle?: boolean;
  /** Size: 'small' (380px) | 'medium' (620px) | 'large' (980px) */
  size?: ModalSize;
  /** Modal content */
  children: ReactNode;
  /** Primary button label */
  primaryLabel?: string;
  /** Secondary button label */
  secondaryLabel?: string;
  /** Primary action handler */
  onPrimaryAction?: () => void;
  /** Secondary action handler */
  onSecondaryAction?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Show secondary button */
  showSecondaryButton?: boolean;
  /** Show action footer */
  showFooter?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
}
```

---

## Visual Specifications

### Sizes

| Size | Width | Use Case |
|------|-------|----------|
| small | 380px | Simple forms |
| medium | 620px | Standard forms |
| large | 980px | Complex content, tables |

### Title Bar
- **Background:** #f7f9fb
- **Padding:** 12px 16px
- **Title font:** Inter Semi Bold, 16px/20px
- **Close icon:** 24×24px

### Content Area
- **Padding:** 16px
- **Background:** white
- **Overflow:** scrollable

### Footer
- **Padding:** 8px 16px
- **Border top:** 1px solid #dee5ef
- **Button gap:** 8px

---

## Usage Examples

### Basic Modal

```tsx
import { Modal } from '@syndigo/components';

<Modal
  open={isOpen}
  title="Select Products"
  onClose={() => setIsOpen(false)}
  onPrimaryAction={handleSubmit}
>
  <ProductList />
</Modal>
```

### Without Title Bar

```tsx
<Modal
  open={isOpen}
  showTitle={false}
  onClose={() => setIsOpen(false)}
>
  <CustomContent />
</Modal>
```

### Different Sizes

```tsx
// Small modal
<Modal size="small" open={isOpen} title="Quick Edit">
  <QuickEditForm />
</Modal>

// Large modal
<Modal size="large" open={isOpen} title="Product Selection">
  <ProductTable />
</Modal>
```

### Without Footer

```tsx
<Modal
  open={isOpen}
  title="Preview"
  showFooter={false}
  onClose={() => setIsOpen(false)}
>
  <ImagePreview />
</Modal>
```

### Custom Button Labels

```tsx
<Modal
  open={isOpen}
  title="Export Products"
  primaryLabel="Export"
  secondaryLabel="Back"
  onPrimaryAction={handleExport}
  onSecondaryAction={handleBack}
>
  <ExportOptions />
</Modal>
```

---

## Accessibility

The Modal component includes:
- `role="dialog"` for screen readers
- `aria-modal="true"` to indicate modal behavior
- `aria-labelledby` pointing to title
- `aria-describedby` pointing to content
- Escape key closes modal
- Focus trap (documented for implementation)

### Focus Management

When modal opens:
1. Focus should move to first focusable element
2. Tab navigation should be trapped within modal
3. On close, focus returns to trigger element

```tsx
// Focus management should be handled by parent
const triggerRef = useRef<HTMLButtonElement>(null);

<button ref={triggerRef} onClick={() => setOpen(true)}>
  Open Modal
</button>

<Modal
  open={isOpen}
  onClose={() => {
    setOpen(false);
    triggerRef.current?.focus();
  }}
>
  ...
</Modal>
```

---

## Do's and Don'ts

### Do's
- ✅ Use for complex forms and content
- ✅ Provide clear title describing purpose
- ✅ Include cancel/close option
- ✅ Use appropriate size for content

### Don'ts
- ❌ Don't use for simple confirmations (use Dialog)
- ❌ Don't nest modals
- ❌ Don't make content taller than viewport
- ❌ Don't use for quick alerts

---

## Related Components

- [Dialog](./dialog.md) - Simple confirmations
- [Drawer](./drawer.md) - Side panel content
