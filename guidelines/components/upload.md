# Upload

A drag and drop upload dropzone component (UI only).

**Figma Source:** [Drag & Drop](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22507-30263)

---

## Overview

Upload provides a **visual dropzone** for file uploads with drag and drop support. This component handles UI presentation only - file upload logic must be implemented by the consumer.

**Use cases:**
- Image uploads
- Document uploads
- Asset imports
- Bulk file uploads

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Click or Drag & Drop'` | Title text |
| `helperText` | `string` | `'SVG, PNG, JPG or GIF (max. 800x400px and 5GB)'` | Helper text |
| `isDragOver` | `boolean` | `false` | Whether files are being dragged over |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `() => void` | - | Click handler |
| `onDragEnter` | `(e: DragEvent) => void` | - | Drag enter handler |
| `onDragLeave` | `(e: DragEvent) => void` | - | Drag leave handler |
| `onDragOver` | `(e: DragEvent) => void` | - | Drag over handler |
| `onDrop` | `(e: DragEvent) => void` | - | Drop handler |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional styles |

---

## Visual States

| State | Background | Border | Icon Color | Icon Size |
|-------|------------|--------|------------|-----------|
| Default | grey/200 (#f7f9fb) | grey/400 dashed | grey (#4d5c6e) | 40px |
| Drag Over | blue/100 (#e7f1ff) | blue/500 dashed | blue (#2d75e2) | 56px |
| Disabled | grey/200 (50% opacity) | grey/400 dashed | grey (#4d5c6e) | 40px |

---

## Visual Specifications

### Container
- **Padding:** 14px 16px
- **Border:** 1px dashed
- **Border radius:** 6px
- **Gap:** 15px (between icon and text)

### Icon
- **Default size:** 40px
- **Drag over size:** 56px
- **Icon:** image-plus

### Typography
- **Title:** 13px semibold, "Click" highlighted in blue
- **Helper:** 11px medium, text/secondary

---

## Usage Examples

### Basic Usage

```tsx
import { Upload } from '@syndigo/components';
import { useState, useRef } from 'react';

function FileUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    // Handle files...
  };

  return (
    <>
      <Upload
        isDragOver={isDragOver}
        onClick={handleClick}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        onDragOver={() => setIsDragOver(true)}
        onDrop={handleDrop}
      />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {/* Handle files */}}
      />
    </>
  );
}
```

### Custom Text

```tsx
<Upload
  title="Click or Drag & Drop"
  helperText="PDF, DOC, or DOCX (max. 10MB)"
  isDragOver={isDragOver}
  onClick={handleClick}
  onDrop={handleDrop}
/>
```

### Disabled State

```tsx
<Upload
  disabled
  title="Upload disabled"
  helperText="You don't have permission to upload"
/>
```

---

## Event Handlers

| Event | When Triggered | Use Case |
|-------|----------------|----------|
| `onClick` | User clicks dropzone | Open file picker |
| `onDragEnter` | Files dragged over | Set `isDragOver` true |
| `onDragLeave` | Files dragged away | Set `isDragOver` false |
| `onDragOver` | Files hovering | Prevent default, maintain state |
| `onDrop` | Files dropped | Access files via `e.dataTransfer.files` |

---

## Implementation Notes

⚠️ **This is UI only** - no file handling logic is included.

The consumer must:
1. Manage `isDragOver` state
2. Handle `onDrop` to access dropped files
3. Provide hidden `<input type="file">` for click-to-upload
4. Implement actual file upload logic

---

## Accessibility

- `role="button"` for keyboard accessibility
- `tabIndex` for focus management
- `aria-disabled` for disabled state
- Keyboard activation support (Enter/Space)

---

## Do's and Don'ts

### Do's
- ✅ Provide clear file type and size limits
- ✅ Show visual feedback on drag over
- ✅ Handle both click and drag interactions
- ✅ Implement proper file validation

### Don'ts
- ❌ Don't invent upload logic in the component
- ❌ Don't add progress bars (use separate component)
- ❌ Don't add file previews inline (separate concern)
- ❌ Don't auto-upload without user confirmation

---

## Related Components

- [Button](./button.md) - Alternative upload trigger
- [ProgressBar](./progress-bar.md) - For upload progress
- [FilePreview](./file-preview.md) - For showing uploaded files
