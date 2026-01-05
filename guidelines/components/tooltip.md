# Tooltip

A tooltip for displaying contextual information on hover or focus.

**Figma Source:** [Tooltip](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22506-30008)

---

## Overview

Tooltip provides **contextual help text** that appears when users hover over or focus on a trigger element. It supports optional arrows to indicate the tooltip's relationship to its trigger.

**Use cases:**
- Help text for icons or buttons
- Abbreviated text expansion
- Additional context for form fields
- Feature explanations

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | required | Tooltip content |
| `direction` | `'none' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'none'` | Arrow direction |
| `id` | `string` | required | Unique ID for aria-describedby linkage |
| `visible` | `boolean` | `true` | Whether tooltip is visible |
| `maxWidth` | `number` | `250` | Max width in pixels |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional styles |

---

## Arrow Directions

| Direction | Arrow Points | Tooltip Appears |
|-----------|--------------|-----------------|
| `none` | No arrow | Positioned by consumer |
| `top` | Up | Below trigger |
| `bottom` | Down | Above trigger |
| `left` | Left | Right of trigger |
| `right` | Right | Left of trigger |

---

## Visual Specifications

### Simple Tooltip (Default)
- **Background:** grey/500 (#4d5c6e)
- **Text:** white, 12px medium
- **Padding:** 12px
- **Border radius:** 8px
- **Shadow:** 0px 4px 12px rgba(0, 0, 0, 0.22)
- **Max width:** 250px (default)

### Arrow
- **Size:** 16×8px triangle
- **Color:** Matches tooltip background

---

## Accessibility (A11y)

### aria-describedby Linkage

The tooltip's `id` must be linked to the trigger element using `aria-describedby`:

```tsx
// Trigger element
<button aria-describedby="my-tooltip-id">
  Hover me
</button>

// Tooltip
<Tooltip
  id="my-tooltip-id"
  content="This is helpful information"
  visible={isHovered}
/>
```

### Requirements
- Tooltip must have `role="tooltip"`
- Trigger must have `aria-describedby` pointing to tooltip `id`
- Tooltip should be keyboard accessible (show on focus)
- Content should be concise and informative

---

## Usage Examples

### Basic Tooltip

```tsx
import { Tooltip } from '@syndigo/components';

const [visible, setVisible] = useState(false);

<div
  onMouseEnter={() => setVisible(true)}
  onMouseLeave={() => setVisible(false)}
  onFocus={() => setVisible(true)}
  onBlur={() => setVisible(false)}
>
  <button aria-describedby="help-tooltip">
    Help
  </button>
  <Tooltip
    id="help-tooltip"
    content="Click here for more information"
    visible={visible}
    direction="bottom"
  />
</div>
```

### With Arrow

```tsx
<Tooltip
  id="arrow-tooltip"
  content="Arrow points up"
  direction="top"
  visible
/>
```

### Custom Max Width

```tsx
<Tooltip
  id="wide-tooltip"
  content="This tooltip has more content and needs a wider container"
  maxWidth={350}
  visible
/>
```

### With ReactNode Content

```tsx
<Tooltip
  id="rich-tooltip"
  content={
    <div>
      <strong>Title</strong>
      <p>Description text here</p>
    </div>
  }
  visible
/>
```

---

## Behavior (From DS Only)

| Behavior | Description |
|----------|-------------|
| Visibility | Controlled via `visible` prop |
| Positioning | Consumer handles positioning |
| Arrow | Optional, indicates direction |

**Note:** No hover delays, animations, or auto-positioning logic is specified in the DS. These behaviors are not implemented.

---

## Do's and Don'ts

### Do's
- ✅ Use `aria-describedby` for accessibility
- ✅ Keep tooltip content concise
- ✅ Show on both hover and focus
- ✅ Use arrows to clarify relationship to trigger

### Don'ts
- ❌ Don't put interactive content in tooltips
- ❌ Don't use for critical information
- ❌ Don't invent behaviors not in DS (delays, animations)
- ❌ Don't make tooltips too wide

---

## Related Components

- [Popover](./popover.md) - For interactive content
- [Toast](./toast.md) - For notifications
