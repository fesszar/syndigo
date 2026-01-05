# Tag

A removable tag/chip component with label and optional close button.

**Figma Source:** [Tag](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22499-29113)

---

## Overview

Tag is a **compact label** used to categorize, filter, or represent selections. It can optionally include a close button for removal.

**Use cases:**
- Filter selections
- Category labels
- Multi-select values
- Applied filters display

---

## Props

```typescript
interface TagProps {
  /** Tag label */
  label: string;
  /** Show close button */
  removable?: boolean;
  /** Remove handler */
  onRemove?: () => void;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Selected state */
  selected?: boolean;
}
```

---

## Tag States (Exactly 5)

| State | Background | Border | Text Color | Shadow |
|-------|------------|--------|------------|--------|
| `default` | white | #dee5ef | black | none |
| `hover` | #f7f9fb | #91a0b3 | black | 0px 1px 3px rgba(0,0,0,0.1) |
| `focused` | #e7f1ff | #2d75e2 | black | none |
| `disabled` | white | #dee5ef | #91a0b3 | none |
| `selected` | #f7f9fb | #91a0b3 | black | 0px 1px 3px rgba(0,0,0,0.1) |

---

## Visual Specifications

### Container
- **Padding:** 10px
- **Border radius:** 4px
- **Border:** 1px solid
- **Gap:** 10px

### Label
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 14px

### Close Icon
- **Size:** 18×18px
- **Color (default):** #718094
- **Color (disabled):** #91a0b3

---

## Usage Examples

### Basic Removable Tag

```tsx
import { Tag } from '@syndigo/components';

<Tag
  label="Category"
  removable
  onRemove={() => handleRemove('category')}
/>
```

### Non-removable Tag

```tsx
<Tag label="Status: Active" removable={false} />
```

### Selected Tag

```tsx
<Tag
  label="Selected Filter"
  selected
  onClick={() => toggleSelection()}
  onRemove={() => removeFilter()}
/>
```

### Disabled Tag

```tsx
<Tag label="Locked" disabled />
```

### Tag List

```tsx
const [tags, setTags] = useState(['React', 'TypeScript', 'Design System']);

<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
  {tags.map((tag) => (
    <Tag
      key={tag}
      label={tag}
      removable
      onRemove={() => setTags(tags.filter(t => t !== tag))}
    />
  ))}
</div>
```

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Trigger onClick |
| `Backspace` / `Delete` | Trigger onRemove (if removable) |
| `Tab` | Move focus to next element |

---

## Accessibility

- `role="button"` on container
- `tabIndex={0}` for keyboard focus
- `aria-disabled` for disabled state
- `aria-label` on close button

---

## Do's and Don'ts

### Do's
- ✅ Use for categorization and filtering
- ✅ Keep labels short
- ✅ Provide remove handler for removable tags
- ✅ Show clear visual feedback on interaction

### Don'ts
- ❌ Don't use for navigation
- ❌ Don't use for status indicators (use StatusIndicator)
- ❌ Don't use overly long labels
- ❌ Don't mix removable and non-removable in same context

---

## Related Components

- [StatusIndicator](./status-indicator.md) - Status display
- [Badge](./badge.md) - Notification badges
- [Pill](./pill.md) - Selection pills
